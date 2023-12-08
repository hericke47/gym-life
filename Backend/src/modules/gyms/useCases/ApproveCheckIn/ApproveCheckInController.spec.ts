import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";
import ICreateGymDTO from "@modules/gyms/dtos/ICreateGymDTO";
import { hash } from "bcrypt";

let connection: Connection;
describe("Approve Check-in", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const uuid = uuidV4();
    const password = await hash("example-password", 8);

    await connection.query(
      `INSERT INTO users(id, name, email, password, created_at, updated_at, active, is_admin)
        values('${uuid}', 'User john Doe', 'userjhondoe@example.com', '${password}', 'now()', 'now()', true, true)`
    );
  });

  beforeEach(async () => {
    await connection.query(`delete from check_ins`);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to approve a check-in", async () => {
    const gym: ICreateGymDTO = {
      name: "example-gym",
      description: "example-gym-description",
      phone: "48 999999999",
      latitude: -28.46754,
      longitude: -49.036143,
    };

    const auth = await request(app).post("/sessions").send({
      email: "userjhondoe@example.com",
      password: "example-password",
    });

    const createdGym = await request(app)
      .post("/gyms")
      .send(gym)
      .set("Authorization", `bearer ${auth.body.token}`);

    const createdCheckIn = await request(app)
      .post(`/gyms/checkIn/${createdGym.body.id}`)
      .send({
        latitude: -28.46754,
        longitude: -49.036143,
      })
      .set("Authorization", `bearer ${auth.body.token}`);

    const approvedCheckIn = await request(app)
      .patch(`/gyms/checkIn/${createdCheckIn.body.id}`)
      .set("Authorization", `bearer ${auth.body.token}`);

    expect(approvedCheckIn.status).toBe(200);
    expect(approvedCheckIn.body).toHaveProperty("id");
    expect(approvedCheckIn.body).toHaveProperty("userId");
    expect(approvedCheckIn.body).toHaveProperty("gymId");
    expect(approvedCheckIn.body.gymId).toEqual(createdGym.body.id);
    expect(approvedCheckIn.body.approved).toEqual(true);
  });

  it("should not be able to approve a check-in if check-in does not exists", async () => {
    const auth = await request(app).post("/sessions").send({
      email: "userjhondoe@example.com",
      password: "example-password",
    });

    const nonExistentCheckIn = uuidV4();

    const approvedCheckIn = await request(app)
      .patch(`/gyms/checkIn/${nonExistentCheckIn}`)
      .set("Authorization", `bearer ${auth.body.token}`);

    expect(approvedCheckIn.status).toBe(400);
    expect(approvedCheckIn.body).toHaveProperty("message");
    expect(approvedCheckIn.body.message).toEqual("Check-in does not exists");
  });
});
