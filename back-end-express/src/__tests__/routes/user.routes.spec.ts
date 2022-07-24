import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import request from "supertest";
import app from "../../app";
import { mockUser, mockUserCreation, newData } from "../utils";
import User from "../../models/User";
import * as bcrypt from "bcryptjs";

describe("API route tests for users model", () => {
  let connection: DataSource;
  let userId: string;
  let userToken: string;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during data source initialization", err)
      );

    const userRepository = AppDataSource.getRepository(User);
    const user = userRepository.create({
      ...mockUser,
      password: await bcrypt.hash(mockUser.password, 10),
    });
    await userRepository.save(user);

    const login = await request(app).post("/login").send(mockUser);

    userToken = login.body.token;
    userId = user.id;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be able to create a new user", async () => {
    const response = await request(app).post("/users").send(mockUserCreation);

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("updated_at");

    expect(response.body).toHaveProperty("favorite_characters");

    expect(response.body.password).toBeUndefined();
  });

  test("Should not be able to create double names user", async () => {
    const response = await request(app).post("/users").send(mockUser);

    expect(response.status).toBe(400);

    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual(
      "Invalid name, please try again with a different name."
    );
  });

  test("Should not be able do update a user without being logged", async () => {
    const response = await request(app).patch("/users").send(newData);

    expect(response.status).toBe(401);

    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Missing authorization token.");
  });

  test("Should be able do update a user when logged", async () => {
    const response = await request(app)
      .patch("/users")
      .set("Authorization", `Bearer ${userToken}`)
      .send(newData);

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("updated_at");

    expect(response.body.password).toBeUndefined();
  });

  test("Should not be able do update to same password", async () => {
    const response = await request(app)
      .patch("/users")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ password: newData.password });

    expect(response.status).toBe(400);

    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual(
      "Please, provide a different password than your current one."
    );
  });

  test("Should not be able to list users data without being logged", async () => {
    const response = await request(app).get("/users/all");

    expect(response.status).toBe(401);

    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Missing authorization token.");
  });

  test("Should be able to list users data when logged", async () => {
    const response = await request(app)
      .get("/users/all")
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("map");
  });

  test("Should not be able do retrieve user data without being logged", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(401);

    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Missing authorization token.");
  });

  test("Should be able to retrieve logged user data", async () => {
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("updated_at");
    expect(response.body).toHaveProperty("favorite_characters");

    expect(response.body.id).toEqual(userId);
  });

  test("Should be able do update a user when logged", async () => {
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("updated_at");
    expect(response.body).toHaveProperty("favorite_characters");

    expect(response.body.password).toBeUndefined();
  });
});
