import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";
import ICreateGymDTO from "@modules/gyms/dtos/ICreateGymDTO";
import { hash } from "bcrypt";

let connection: Connection;
describe("Create Check in", () => {
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

  it("should be able to create a check-in", async () => {
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

    expect(createdCheckIn.status).toBe(201);
    expect(createdCheckIn.body).toHaveProperty("id");
    expect(createdCheckIn.body).toHaveProperty("userId");
    expect(createdCheckIn.body.gymId).toEqual(createdGym.body.id);
    expect(createdCheckIn.body.approved).toEqual(false);
  });

  it("should not be able to create a check-in if gym does not exists", async () => {
    const auth = await request(app).post("/sessions").send({
      email: "userjhondoe@example.com",
      password: "example-password",
    });

    const nonExistentGymId = uuidV4();

    const createdCheckIn = await request(app)
      .post(`/gyms/checkIn/${nonExistentGymId}`)
      .send({
        latitude: -28.46754,
        longitude: -49.036143,
      })
      .set("Authorization", `bearer ${auth.body.token}`);

    expect(createdCheckIn.status).toBe(400);
    expect(createdCheckIn.body).toHaveProperty("message");
    expect(createdCheckIn.body.message).toEqual("Gym not found!");
  });

  it("should not be able to check-in with someone already done today", async () => {
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

    await request(app)
      .post(`/gyms/checkIn/${createdGym.body.id}`)
      .send({
        latitude: -28.46754,
        longitude: -49.036143,
      })
      .set("Authorization", `bearer ${auth.body.token}`);

    const createdCheckIn = await request(app)
      .post(`/gyms/checkIn/${createdGym.body.id}`)
      .send({
        latitude: -28.46754,
        longitude: -49.036143,
      })
      .set("Authorization", `bearer ${auth.body.token}`);

    expect(createdCheckIn.status).toBe(400);
    expect(createdCheckIn.body).toHaveProperty("message");
    expect(createdCheckIn.body.message).toEqual("check-in limit reached");
  });

  it("should not be able to check-in if gym is too far", async () => {
    const gym: ICreateGymDTO = {
      name: "example-gym",
      description: "example-gym-description",
      phone: "48 999999999",
      latitude: -33.8688,
      longitude: 151.2093,
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

    expect(createdCheckIn.status).toBe(400);
    expect(createdCheckIn.body).toHaveProperty("message");
    expect(createdCheckIn.body.message).toEqual("too far to check in");
  });
});
