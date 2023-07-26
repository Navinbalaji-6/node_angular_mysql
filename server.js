const express = require('express')
const cors = require('cors')
var bodyParser = require('body-parser')
const mysql = require('mysql')
const app = express()
app.use(bodyParser.json())
app.use(cors())

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"angular_mysql_node"
});

db.connect(function(error){
    if(error){
        console.log("Error connecting db");
    }
    else{
        console.log("connected successfully");
    }
});

app.post('/api/student/add',(req,res) => {
    let details = {
        name : req.body.name,
        course : req.body.course,
        fee : req.body.fee,
    };
    let sql = "INSERT INTO student SET ?"
    db.query( sql , details , (error) =>{
        if(error){
            res.send({ status: false,message : "Student creation Failed" });
        }
        else{
            res.send({ status: true, message: "Student created successfully"});
        }
    } );
})

app.get('/api/student', (req,res) => {
    var sql = "SELECT * FROM student";
    db.query( sql , function (error,result){
    if(error){
        console.log("Error retrieving data");
    }
    else{
        res.send({ status : true , data : result});
    }
})
})

app.get('/api/student/:id', (req,res) => {
    var studentid = req.params.id;
    var sql = "SELECT * FROM student WHERE id=" + studentid;
    db.query(sql, function(error,result){
        if(error){
            console.log("Error fetching data");
        }
        else{
            res.send({ status:true, data:result});
        }
    }); 
});

app.put('/api/student/update/:id', (req,res) => {
    let sql = "UPDATE student SET name='"+req.body.name+"',course='"+req.body.course+"',fee='"+req.body.fee+"'WHERE id="+req.params.id;
    let query = db.query(sql,(error,result) => {
        if(error){
            res.send({ status : false , message : "Student Updation Failed"});
        }
        else{
            res.send({ status: true , message : "Student Update Successfully"});
        }
    });
});

app.delete('/api/student/delete/:id',(req,res) =>{
    let sql = "DELETE FROM student WHERE id="+req.params.id+"";
    let query = db.query(sql, (error) =>{
        if(error){
            res.send({ status: false , message:"Student Deleted Failed"});
        }
        else{
            res.send({ status: true, message : "Student Deleted Successfully"});
        }
    })
})

app.listen(5000, function check(error){
    if(error) console.log("Error...!!!");
    else console.log("App started..");
})