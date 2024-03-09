import { app } from "../app";
import supertest from "supertest";


//GET 
describe("get request", () => {

  it("should get all pogs", async () => {
    const response = await supertest(app).get("/pogs");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });
});

//GET by ID
describe("get request by id", () => {
  let pogId = 16;
  it("should get a pog by id", async () => {
    const response = await supertest(app).get(`/pogs/${pogId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });
});

//POST
describe("post request", () => {
  it("should add a pog", async () => {
    const response = await supertest(app)
      .post("/pogs")
      .send({
        "name": "Aljason",
        "ticker_symbol": "Alj",
        "price": 69,
        "color": "White",
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(expect.any(Array));
  });
});

//PUT
describe("put request", () => {
  let pogId = 16;
  it("should update a pog", async () => {
    const response = await supertest(app)
      .put(`/pogs/${pogId}`)
      .send({
        name: "Allan Coin",
        ticker_symbol: "POG",
        price: 3,
        color: "pink",
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });
});

//DELETE
describe("delete request", () => {
  let pogId = 16;
  it("should delete a pog", async () => {
    const response = await supertest(app).delete(`/pogs/${pogId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });
});






