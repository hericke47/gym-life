import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import auth from "@config/auth";

let connection: Connection;
describe("Refresh User Token", () => {
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

  it("should be able to generate a new token", async () => {
    const auth = await request(app).post("/sessions").send({
      email: "userjhondoe@example.com",
      password: "example-password",
    });

    const response = await request(app).post("/sessions/refreshToken").send({
      refreshToken: auth.body.refreshToken,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("refreshToken");
  });

  it("should not be able to generate a new token for a non existent user", async () => {
    const refreshToken = sign(
      { email: "false@example.com" },
      auth.secretRefreshToken,
      {
        subject: uuidV4(),
        expiresIn: auth.expiresInRefreshToken,
      }
    );

    const response = await request(app).post("/sessions/refreshToken").send({
      refreshToken,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Refresh Token does not exists!");
  });
});
