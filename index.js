const express=require('express');
const app=express();
const cors=require('cors');
const bodyParser=require("body-parser")
const mongoose=require("mongoose");
const {setFare,getFare}=require("./controller/index")


const PORT=8000;

app.use(cors());
app.use(bodyParser.json())

mongoose.connect("mongodb://localhost:27017/fare",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>console.log("DATABASE IS CONNECTED"))
.catch(err=>console.log(err))

app.post("/setFare",setFare);
app.post("/getFare",getFare);


app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
})
