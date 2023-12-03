import request from "supertest";
import { Connection } from "typeorm";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";

let connection: Connection;
describe("Create User", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new user ", async () => {
    const user: ICreateUserDTO = {
      name: "User john Doe",
      email: "userjhondoe@example.com",
      password: "example-password",
    };

    const response = await request(app).post("/users").send(user);

    expect(response.body.name).toEqual(user.name);
    expect(response.body.email).toEqual(user.email);
    expect(response.status).toBe(201);
  });

  it("should not be able to create a new user whith email from another", async () => {
    const response = await request(app).post("/users").send({
      name: "User john Doe",
      email: "userjhondoe@example.com",
      password: "example-password",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Email address already used.");
  });
});
