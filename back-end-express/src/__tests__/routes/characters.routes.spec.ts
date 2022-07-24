import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import request from "supertest";
import app from "../../app";
import {
  mockChar,
  mockChar2,
  mockUser,
  mockUserCreation,
  newData,
} from "../utils";
import User from "../../models/User";
import Character from "../../models/Character";

import * as bcrypt from "bcryptjs";

describe("API route tests for users model", () => {
  let connection: DataSource;
  let userId: string;
  let userToken: string;
  let charId: number;

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

    const charRepository = AppDataSource.getRepository(Character);
    const char = charRepository.create({ ...mockChar2, userId: user.id });
    await charRepository.save(char);

    const login = await request(app).post("/login").send(mockUser);

    charId = char.id;
    userToken = login.body.token;
    userId = user.id;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should not be able to create new favorite char without token", async () => {
    const response = await request(app).post("/characters").send(mockChar);

    expect(response.status).toBe(401);

    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Missing authorization token.");
  });

  test("Should be able to create a char when logged", async () => {
    const response = await request(app)
      .post("/characters")
      .set("Authorization", `Bearer ${userToken}`)
      .send(mockChar);

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("species");
    expect(response.body).toHaveProperty("type");
    expect(response.body).toHaveProperty("gender");
    expect(response.body).toHaveProperty("origin");
    expect(response.body).toHaveProperty("location");
    expect(response.body).toHaveProperty("image");
    expect(response.body).toHaveProperty("episode");
    expect(response.body).toHaveProperty("url");
    expect(response.body).toHaveProperty("created");
    expect(response.body).toHaveProperty("userId");
  });

  test("Should not be able to create double favorite chars", async () => {
    await request(app)
      .post("/characters")
      .set("Authorization", `Bearer ${userToken}`)
      .send(mockChar);

    const response = await request(app)
      .post("/characters")
      .set("Authorization", `Bearer ${userToken}`)
      .send(mockChar);

    expect(response.status).toBe(400);

    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual(
      "You already have this character in your list!"
    );
  });

  test("Should not be able to retrieve data from one favorite char when not logged", async () => {
    const response = await request(app).get(`/characters/${charId}`);

    expect(response.status).toBe(401);

    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Missing authorization token.");
  });

  test("Should not be able to retrieve an unexisting char", async () => {
    const response = await request(app)
      .get(`/characters/${651651}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.status).toBe(404);

    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("character not found.");
  });

  test("Should be able to retrieve a char data when logged", async () => {
    const response = await request(app)
      .get(`/characters/${charId}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("species");
    expect(response.body).toHaveProperty("type");
    expect(response.body).toHaveProperty("gender");
    expect(response.body).toHaveProperty("origin");
    expect(response.body).toHaveProperty("location");
    expect(response.body).toHaveProperty("image");
    expect(response.body).toHaveProperty("episode");
    expect(response.body).toHaveProperty("url");
    expect(response.body).toHaveProperty("created");
    expect(response.body).toHaveProperty("userId");
  });

  test("Should be able to list all chars", async () => {
    const response = await request(app)
      .get(`/characters/all`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("map");
  });

  test("Should not be able to create a char without the data", async () => {
    const response = await request(app)
      .post("/characters")
      .set("Authorization", `Bearer ${userToken}`)
      .send({});

    expect(response.status).toBe(400);

    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("message");
  });

  test("Should not be able to delete a char without being logged", async () => {
    const response = await request(app).delete(`/characters/${charId}`);

    expect(response.status).toBe(401);

    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Missing authorization token.");
  });

  test("Should not be able to delete other users char when logged in", async () => {
    await request(app).post("/users").send(mockUserCreation);
    const login = await request(app).post("/login").send(mockUserCreation);

    const response = await request(app)
      .delete(`/characters/${charId}`)
      .set("Authorization", `Bearer ${login.body.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual(
      "You do not have permission to perform this action."
    );
  });

  test("Should be able to delete own char when logged in", async () => {
    const response = await request(app)
      .delete(`/characters/${charId}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.status).toBe(204);
  });

  test("Should not be able to delete an inexistent char", async () => {
    const response = await request(app)
      .delete(`/characters/${16516}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("character not found");
  });
});
