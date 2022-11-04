const express = require('express');
const cors = require('cors');
 require('dotenv').config();

const app= express()
app.use(cors());
const port   = process.env.PORT || 5000;
const users = [
    {id:1 ,name: " nafiz", email: " nafiz@g.com"},
    {id:2 ,name: " tanvir", email: " tanvir@g.com"},
    {id:3 ,name: " saikat", email: " saikat@g.com"},
]

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster1.zscbcon.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log(' DB Connected');
  client.close();
});


app.get('/users', (req, res)=>{
    res.send(users)
})
console.log(process.env.DB_USER);

app.listen(port, ()=>{
    console.log(` Listening On Port ${port}`);
})
