const baseurl = "https://reqres.in/";
const chai = require("chai");
const supertest = require("supertest");
const chaiJsonSchema = require('chai-json-schema');
const fs = require('fs');

chai.use(chaiJsonSchema);
const expect = chai.expect;

describe('reqres-api API Test ', () => {
    it('T1 - GET Single User', async () => {
        const schema = JSON.parse(fs.readFileSync("schema/get_single_user_schema.json",'utf8'));
        const response = await supertest(baseurl).get("api/users/2");

        //console.log(response.body);
        expect(response.status).to.equal(200);
        expect(response.body.data.id).to.be.a('number');
        expect(response.body.data.last_name).to.have.string;  
        expect(response.body.data.first_name).to.have.string;  
        expect(response.body.data.email).to.contain("@");
        expect(response.body).to.be.jsonSchema(schema);
    });

    it('T2 - POST Login Success', async () => {
        const body = {
                "name": "morpheus",
                "job": "leader",
                "id": "460",
                "createdAt": "2024-06-19T09:03:11.004Z"
        };
        const schema = JSON.parse(fs.readFileSync("schema/post_create_user_schema.json",'utf8'));
        const response = await supertest(baseurl).post("api/users").send(body);

        expect(response.status).to.equal(201);
        expect(response.body.name).to.have.string;  
        expect(response.body.job).to.have.string;
        expect(response.body.id).to.have.string;  
        //expect(response.body.createdAt).to.have.string;
        expect(response.body).to.be.jsonSchema(schema);
    });

    it('T3 - DELETE Delete', async() => {
        const response = await supertest (baseurl).delete("api/users/2");

        //console.log(response.status);
        expect(response.status).to.equal(204);
    });

    it('T4 - PUT Update', async() => {
        const body = {
            "name": "morpheus",
            "job": "zion resident",
            "updatedAt": "2024-06-19T13:31:24.877Z"
        };
        const schema = JSON.parse(fs.readFileSync("schema/put_update_user_schema.json",'utf8'));
        const response = await supertest(baseurl).put("api/users/2").send(body);

        //console.log(response.status);
        //console.log(response.body);
        expect(response.status).to.equal(200);
        expect(response.body.name).to.have.string;
        expect(response.body.job).to.have.string;
        expect(response.body).to.be.jsonSchema(schema);
    });
});