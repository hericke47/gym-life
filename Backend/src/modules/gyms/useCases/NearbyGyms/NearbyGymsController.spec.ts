import request from "supertest";
import { Connection } from "typeorm";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";
import ICreateGymDTO from "@modules/gyms/dtos/ICreateGymDTO";
import { v4 as uuidV4 } from "uuid";
import { hash } from "bcrypt";

let connection: Connection;
describe("Search nearby gyms", () => {
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

  it("should be able to search nearby gyms", async () => {
    const auth = await request(app).post("/sessions").send({
      email: "userjhondoe@example.com",
      password: "example-password",
    });

    const firstGym: ICreateGymDTO = {
      name: "example-gym",
      description: "example-gym-description",
      phone: "48 999999999",
      latitude: -28.46754,
      longitude: -49.036143,
    };

    const secondGym: ICreateGymDTO = {
      name: "second-gym",
      description: "second-gym-description",
      phone: "48 999999999",
      latitude: -33.8688,
      longitude: 151.2093,
    };

    const firstGymCreated = await request(app)
      .post("/gyms")
      .send(firstGym)
      .set("Authorization", `bearer ${auth.body.token}`);

    await request(app)
      .post("/gyms")
      .send(secondGym)
      .set("Authorization", `bearer ${auth.body.token}`);

    const gyms = await request(app)
      .get(`/gyms?latitude=${-28.46754}&longitude=${-49.036143}`)
      .send(secondGym)
      .set("Authorization", `bearer ${auth.body.token}`);

    expect(gyms.status).toBe(200);
    expect(gyms.body).toStrictEqual([firstGymCreated.body]);
  });
});
