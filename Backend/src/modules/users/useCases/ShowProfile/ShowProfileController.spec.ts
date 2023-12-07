import request from "supertest";
import { Connection } from "typeorm";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";

let connection: Connection;
describe("Show Profile", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  beforeEach(async () => {
    await connection.query(`delete from users`);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to show profile", async () => {
    const user: ICreateUserDTO = {
      name: "User john Doe",
      email: "userjhondoe@example.com",
      password: "example-password",
    };

    const createdUser = await request(app).post("/users").send(user);

    const auth = await request(app).post("/sessions").send({
      email: user.email,
      password: user.password,
    });

    const response = await request(app)
      .get(`/users/profile`)
      .set("Authorization", `bearer ${auth.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toEqual(createdUser.body.name);
    expect(response.body.email).toEqual(createdUser.body.email);
    expect(response.body.active).toEqual(createdUser.body.active);
    expect(response.body.createdAt).toEqual(createdUser.body.createdAt);
    expect(response.body.isAdmin).toEqual(createdUser.body.isAdmin);
  });

  it("should not be able to show profile if user does not exists", async () => {
    const user: ICreateUserDTO = {
      name: "User john Doe",
      email: "userjhondoe@example.com",
      password: "example-password",
    };

    const createdUser = await request(app).post("/users").send(user);

    const auth = await request(app).post("/sessions").send({
      email: user.email,
      password: user.password,
    });

    await connection.query(
      `delete from users where id = '${createdUser.body.id}'`
    );

    const response = await request(app)
      .get(`/users/profile`)
      .set("Authorization", `bearer ${auth.body.token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("User not found");
  });
});
