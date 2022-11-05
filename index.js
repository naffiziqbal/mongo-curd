const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express()
app.use(cors());
app.use(express.json())
const port = process.env.PORT || 5000;
const users = [
    { id: 1, name: " nafiz", email: " nafiz@g.com" },
    { id: 2, name: " tanvir", email: " tanvir@g.com" },
    { id: 3, name: " saikat", email: " saikat@g.com" },
]


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster1.zscbcon.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    async function run() {
        try {
            const serviceCollection = client.db('genius-car').collection('services');
            const orderCollection = client.db('genius-car').collection('Orders');


            app.get('/services', async (req, res) => {
                const query = {};
                const cursor = serviceCollection.find(query);
                const services = await cursor.toArray();
                res.send(services)
            });

            app.get('/services/:id', async(req, res) => {
                const id = req.params.id;
                const query = { _id : ObjectId(id)};
                const service= await serviceCollection.findOne(query);
            
                res.send(service)
            })

            //   Orders api;
            app.get('/orders', async(req,res)=>{
                let query  = {};
                console.log()
                if(req.query?.email){
                    query = {
                        email: req.query.email
                    }
                }

                const cursor = orderCollection.find(query);
                const orders =await  cursor.toArray();
                res.send(orders)
            })

            app.post('/orders', async(req, res)=>{
                const order = req.body;
                const result =await orderCollection.insertOne(order);
                res.send(result);

            })


        }
        finally {

        }

    }
    run().catch(err => console.log(err))
});


// app.get('/services/:id', async(req, res) => {
//     const id = req.params.id;
//     const query = { _id : ObjectId(id)};
//     const service= await serviceCollection.findOne(query);

//     res.send(service)
// })

app.listen(port, () => {
    console.log(` Listening On Port ${port}`);
})
