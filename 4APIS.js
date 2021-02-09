// importing express we got only express function here
const exp=require("express");
// we calling express function to get express object
const app=exp();

// Body parser
app.use(exp.json());
var dbo;
var ooloi;

// importing MongoClient
const mc=require("mongodb").MongoClient;
const dbUrl="mongodb+srv://mani:mani@cluster0.2sn8p.mongodb.net/<dbname>?retryWrites=true&w=majority";

// connecting to database using Url
mc.connect(dbUrl,{useNewUrlParser:true,useUnifiedTopology:true},(error,client)=>{
    if(error)
    {
        console.log("error in connecting");
    }
    else{
        dbo=client.db("ooloi");
        ooloi=dbo.collection("ooloicollection");
        console.log("Database connected");
    }
})

// giving port number
const PORTNO=8000;
app.listen(8000,()=>{
    console.log(`server is running ${PORTNO}`);
})


// // Reading data 
app.get(`/readdata`,(request,response)=>{
ooloi.find().toArray((error,result)=>{
    if(error)
    {
        console.log("error in reading");
    }
    else if(result==null)
    {
        response.send({message:"Data not found"});
    }
    else{
    response.send({message:result});
    }
})

});


// Posting data
app.post(`/postingdata`,(request,response)=>{
    ooloi.insertOne(request.body,(error,postedData)=>{
        if(error)
        {
            console.log("error in posting data");
        }
        else
        {
         response.send({message:"data posted"});   
        }
    })
})


// updating or modifying data with name label
app.put(`/editingdata/:name`,(request,response)=>{
    ooloi.update({name:request.body.name},{title:request.body.title,
        name:request.body.name,
         date:request.body.date,
         abouttheevent:request.body.abouttheevent,
          file:request.body.file,
          email:request.body.email,
          password:request.body.password,
          branch:request.body.branch},(error,result)=>{
              if(error)
              {
                  console.log("error in updating");
              }
              else
              {
                  response.send({message:`Data updated with ${request.params.name}` });
              }
          })  
})

// deleting data using name label
app.delete(`/deleting/:name`,(request,response)=>{

    ooloi.deleteOne({name:request.params.name},(error,result)=>{
        if(error)
        {
            console.log("error in deleting");
        }
        else
        {
            response.send({message:`Data deleted with name is ${request.params.name}`})
        }
    })
})



