const express = require("express")
const app = express()
const port = process.env.PORT || 8080
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const secret = 'pts2021'
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors')

const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'user'
});




app.get("/",(req,res)=>{
    res.json({result:"ok",data:[1,2,3,4,5,6]})
})
app.post('/register', jsonParser, (req, res, next)=> {
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;
    let tel = req.body.tel;
    let card = req.body.card;
    let password = req.body.password;

    bcrypt.hash(password, saltRounds, function (err, hash) {
        connection.execute(
            'INSERT INTO user_db (fullname,email,tel,pid,password,status,position) VALUES(?,?,?,?,?,?,?)',
            [fname + " " + lname,
            email,
            tel,
            card,
            hash,
            'Disable',
            'Admin'],
            function (err, results, fields) {
                if (err) {
                    res.json({ status: '1', message: err.code })
                    return;
                } else {
                    res.json({ status: 'ok'})
                    return;
                }
            }
        )
    });

})


app.listen(port,()=>{
    console.log(`Server is running on. ${port}`)

})