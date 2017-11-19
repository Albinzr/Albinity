
import expect from 'expect'
import request from 'supertest'

import app from '../server.js'


it('init User Test', () => {
  var start = "Start"
  expect(start).toBe("Start").toBeA('string')
});

describe('POST /api/login', () => {
  it('should fail login', (done) => {
    request(app)
      .post('/api/login')
      .send({
        username: "qwdwqd",
        password: "2ewqdq"
      })
      .expect(403)
      .expect((res) => {
        expect(res.body.success).toBe(false);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  })
});

// NOTE - Register Test
describe('POST /api/resister', () => {
  let email = Math.random().toString(36).substring(7) + "@gmail.com"
  let username = "acr"
  let password = Math.random().toString(36).substring(1)
  let phoneNo = Math.floor(Math.random() * 10000000000);
  it('Create a new user', (done) => {
    request(app)
      .post('/api/register')
      .send({
        username: username,
        password: email,
        email: email,
        phno: phoneNo
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.success).toBe(true)
      }).end((err, res) => {

      if (err) {
        return done(err)
      }
      done()
    })
  })
})

describe('POST /api/resister', () => {
  let email = Math.random().toString(36).substring(7)
  let username = Math.random().toString(36).substring(1)
  let password = Math.random().toString(36).substring(1)
  let phoneNo = Math.floor(Math.random() * 10000000000);
  it('Should fail because of email is invalid', (done) => {
    request(app)
      .post('/api/register')
      .send({
        username: username,
        password: email,
        email: email,
        phno: phoneNo
      })
      .expect(403)
      .expect((res) => {
        expect(res.body.success).toBe(false)
      }).end((err, res) => {
        if (err) {
          return done(err)
        }
        done()
      })
  })
})

//NOTE - Logout Test
describe("GET /appi/logout", () => {
  it('should logout user', (done) => {
    request(app)
      .get('/api/logout')
      .expect(200)
      .expect((res) => {
        expect(res.body.success).toBe(true)
      })
      .end((err, res) => {
        console.log(res.body);
        if (err) {
          done(err)
        }
        done()
      })
  })
})
