import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;
describe("Authenticate User Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const uuid = uuidV4();
    const password = await hash("example-password", 8);

    await connection.query(
      `INSERT INTO users(id, name, email, password, created_at, updated_at, active, is_admin)
        values('${uuid}', 'User john Doe', 'userjhondoe@example.com', '${password}', 'now()', 'now()', true, false)`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to authenticate", async () => {
    const response = await request(app).post("/sessions").send({
      email: "userjhondoe@example.com",
      password: "example-password",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("refreshToken");
    expect(response.body.user.email).toEqual("userjhondoe@example.com");
    expect(response.body.user.name).toEqual("User john Doe");
  });

  it("should not be able to authenticate a non existent user", async () => {
    const response = await request(app).post("/sessions").send({
      email: "non-existent-email@example.com",
      password: "example-password",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Email or password incorrect!");
  });

  it("should not be able to authenticate a user with incorrect password", async () => {
    const response = await request(app).post("/sessions").send({
      email: "userjhondoe@example.com",
      password: "incorrect-password",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Email or password incorrect!");
  });
});
