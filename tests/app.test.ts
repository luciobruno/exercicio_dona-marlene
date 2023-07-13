import supertest from "supertest";
import app from "../src/app";
import httpStatus from "http-status";

const api = supertest(app);

describe('POST /fruits', () => {
    it('should return 201 when inserting a fruit', async () => {
        const response = await api.post('/fruits').send({
            name: "Abacaxi",
            price: 3000,
        })
        expect(response.status).toBe(httpStatus.CREATED);
    })

    it('should return 409 when inserting a fruit that is already registered',async () => {
        const response = await api.post('/fruits').send({
            name: "Abacaxi",
            price: 3000,
        })
        expect(response.status).toBe(httpStatus.CONFLICT);
    })

    it('should return 422 when inserting a fruit with data missing',async () => {
        const response = await api.post('/fruits').send({})
        expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    })
})

describe('GET /fruits', () => {

    it("shoud return 404 when trying to get a fruit that doesn't exists",async () => {
        const response = await api.get('fruits/100')
        expect(response.status).toBe(httpStatus.NOT_FOUND);
    })

    it('should return 400 when id param is not valid',async () => {
        const response = await api.get('/fruits/banana')
        expect(response.status).toBe(httpStatus.BAD_REQUEST)
    })

    it('should return a fruit given an id',async () => {
        const response = await api.get('/fruits/1')
        expect(response.body).toEqual({
            id: expect.any(Number),
            name: expect.any(String),
            price: expect.any(Number),
        })
    })

    it('should return all fruits',async () => {
        const response = await api.get('/fruits')
        expect(response.body).toEqual([{
            id: expect.any(Number),
            name: expect.any(String),
            price: expect.any(Number),
        }]);
    })
})