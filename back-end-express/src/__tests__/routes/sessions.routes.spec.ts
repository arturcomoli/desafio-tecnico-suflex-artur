import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import request from "supertest";
import app from "../../app";
import { mockUser, mockUserCreation } from "../utils";
import User from "../../models/User";

describe("API route tests for users model", () => {
  let connection: DataSource;
  let userId: string;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during data source initialization", err)
      );

    const userRepository = AppDataSource.getRepository(User);
    const user = userRepository.create(mockUser);
    await userRepository.save(user);

    userId = user.id;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be able to login with right credentials", async () => {
    const response = await request(app).post("/users/login").send(mockUser);

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user).toHaveProperty("name");
    expect(response.body.user).toHaveProperty("created_at");
    expect(response.body.user).toHaveProperty("updated_at");
    expect(response.body.user).toHaveProperty("favorite_characters");

    expect(response.body.password).toBeUndefined();
  });

  test("Should not be able to login with invalid credentials", async () => {
    const response = await request(app)
      .post("/users/login")
      .send(mockUserCreation);

    expect(response.status).toBe(400);

    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual(
      "Invalid name or password, please, check yout credentials"
    );
  });

  test("Should not be able to login without sending any data", async () => {
    const response = await request(app).post("/users/login").send({});

    expect(response.status).toBe(400);

    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toContain("required");
  });
});
