const { assert } = require('chai');
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
let should = chai.should();
chai.use(chaiHttp);

// describe('/Logon', () => {
//     it('Create a new user', (done) => {

//         const user = {
//             email : 'admin3@gmail.com',
//             password : 'abcd',
//             name : 'admin',
//             isadmin : true
//         }

//         chai.request(server)
//         .post('/user/logon')
//         .send(user)
//         .end((err, res) => {
//             res.should.have.status(200);
//             res.should.have.message('Success');
//             done();
//         })
//     })
// })

describe('/Login', () => {
    it('Log in a user', (done) => {

        const user = {
            email : 'admin2@gmail.com',
            password : 'qwerty',
        }

        chai.request(server)
        .post('/user/login')
        .send(user)
        .end((err, res) => {
            //console.log("555555555555555",res.body);
            should.exist(res.body);
            res.should.have.status(200);
            res.body.should.have.property('message');
            res.body.should.have.property('token');
            assert.typeOf(res.body.token, 'string'); 
            done();
        })
    })
})