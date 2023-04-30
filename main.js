const express=require('express');
const bodyParser=require('body-parser');
const app=express();


//middleware, express can also do it
//app.use(express.urlencoded({extended:false}))
//app.use(express.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

const dbConfig=require('./config/database.config')
const mongoose=require('mongoose')

mongoose.Promise=global.Promise;

//connecting to the databse
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
   }).then(() => {
       console.log("Successfully connected to the database");    
   }).catch(err => {
       console.log('Could not connect to the database. Exiting now...', err);
       process.exit();
   });


//define a simple route
app.get('/',(req,res)=>{
    res.json({"message": "Welcome to Todo app"})
})

//the position of this line matters!!!!all backend logic start from here
require('./app/routes/todo.routes.js')(app);

app.listen(4000,()=>{
    console.log("Server is listening on port 4000");
})

