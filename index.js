const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express()
app.use(cors());
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
            app.get('/services', async (req, res) => {
                const query = {};
                const cursor = serviceCollection.find(query);
                const services = await cursor.toArray();
                console.log(services);
                res.send(services)
            })


        }
        finally {

        }

    }
    run().catch(err => console.log(err))
});


app.get('/users', (req, res) => {
    res.send(users)
})

app.listen(port, () => {
    console.log(` Listening On Port ${port}`);
})
