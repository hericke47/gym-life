import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";
import ICreateGymDTO from "@modules/gyms/dtos/ICreateGymDTO";
import { hash } from "bcrypt";

let connection: Connection;
describe("Show Profile", () => {
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

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a gym", async () => {
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

    expect(createdGym.status).toBe(201);
    expect(createdGym.body).toHaveProperty("id");
    expect(createdGym.body.name).toEqual(gym.name);
    expect(createdGym.body.description).toEqual(gym.description);
    expect(createdGym.body.active).toEqual(true);
    expect(createdGym.body.phone).toEqual(gym.phone);
    expect(createdGym.body.latitude).toEqual(gym.latitude);
    expect(createdGym.body.longitude).toEqual(gym.longitude);
  });
});
