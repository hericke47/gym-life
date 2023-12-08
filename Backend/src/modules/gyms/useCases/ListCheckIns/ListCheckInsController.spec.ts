import request from "supertest";
import { Connection } from "typeorm";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";
import ICreateGymDTO from "@modules/gyms/dtos/ICreateGymDTO";

let connection: Connection;
describe("List all check-ins", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to list all check-ins", async () => {
    const createdUser = await request(app).post("/users").send({
      name: "User john Doe",
      email: "userjhondoe@example.com",
      password: "example-password",
    });

    await connection.query(
      `UPDATE users SET is_admin = true where id = '${createdUser.body.id}'`
    );

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

    const checkIns = await request(app)
      .get(`/gyms/checkIns`)
      .set("Authorization", `bearer ${auth.body.token}`);

    const result = {
      ...createdCheckIn.body,
      gym: createdGym.body,
      user: {
        ...createdUser.body,
        isAdmin: true,
      },
    };

    expect(checkIns.status).toBe(200);
    expect(checkIns.body.checkIns).toStrictEqual([result]);
    expect(checkIns.body.count).toStrictEqual(1);
  });
});
