import { app } from "../app";
import supertest from "supertest";


//this should test the get request of the code
describe("get request", () => {

  it("should get all pogs", async () => {
    const response = await supertest(app).get("/pogs");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });
});

//this should test the get request by ID of the code
describe("get request by id", () => {
  let pogId = 1;
  it("should get a pog by id", async () => {
    const response = await supertest(app).get(`/pogs/${pogId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });
});

//this should test the post request of the code
describe("post request", () => {
  it("should add a pog", async () => {
    const response = await supertest(app)
      .post("/pogs")
      .send({
        "name": "Aljason",
        "ticker_symbol": "Alj",
        "price": 300,
        "color": "White",
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(expect.any(Array));
  });
});

//this should test the put request or the update of the code
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

//this should test the delete request of the code
describe("delete request", () => {
  let pogId = 16;
  it("should delete a pog", async () => {
    const response = await supertest(app).delete(`/pogs/${pogId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });
});






