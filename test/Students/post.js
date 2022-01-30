
process.env.NODE_ENV="test"
const expect=require('chai').expect;
const request=require('supertest');
const app=require('../../server');
const conn=require("../../config/db_test");


// Test Case for post students
describe('POST /student',()=>{
    before((done)=>{
        conn.connect().then(()=>done()).catch((err)=>done(err));
    })
    after((done)=>{
        conn.close().then(()=>done()).catch((err)=>done(err));
    })

    it('OK, creating a new student',(done)=>{
        request(app).post('/api/v1/students').send({ 
        "name": "Govind Kumar",
        "rollNo": "B18EC025",
        "email": "govind@gmail.com",
        "passoutYear": 2022,
        "phone": "9719571189",
        "branch": "ECE",
        "currentCompany": "Swiggy"}).then((res)=>{
            const body=res.body;
            expect(res.status).to.eql(201);
            expect(body).to.contain.property('success');
            expect(body).to.contain.property('data');
            expect(body.data).to.contain.property('_id');
            done();
        }).catch((err) => done(err));
    })
})