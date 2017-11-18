import expect from 'expect'
import request from 'supertest'


import app from '../server.js'

describe(' GET /api/post', () => {

  it('shoild return all afflication details ', (done) => {
    console.log("step 1")
    request(app)
      .get('/api/post')
      .expect(200)
      .expect((res) => {
        console.log("step 2")
        expect(res.body.success).toBe(true);
      })
      .end((err, res) => {
        console.log("step 3")
        if (err) {
          console.log("step 4")
          return done(err)
        }
        console.log("step 5")
        done()
      })

  })
})

describe(' GET /api/post', () => {

  it('shoild return afflication with limit and offset ', (done) => {
    request(app)
      .get('/api/post?limit=1&offset=1')
      .expect(200)
      .expect((res) => {

        expect(res.body.success).toBe(true);
        expect(res.body.data.length).toBe(0) || expect(res.body.data.length).toBe(1) 
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        done()
      })

  })
})


// describe(' POST /api/deactivate', () => {
//
//   it('should deactivate selected affliction', (done) => {
//     request(app)
//       .post('/api/deactivate')
//       .send({
//         id: ""
//       })
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.success).toBe(true);
//       })
//       .end((err, res) => {
//         if (err) {
//           return done(err)
//         }
//         done()
//       })
//
//   })
// })

// describe(' POST /api/remove', () => {
//
//   it('should remove selected affliction', (done) => {
//     request(app)
//       .post('/api/remove')
//       .send({
//         id: ""
//       })
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.success).toBe(true);
//       })
//       .end((err, res) => {
//         if (err) {
//           return done(err)
//         }
//         done()
//       })
//
//   })
// })
