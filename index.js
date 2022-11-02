const express = require('express');
const cors = require('cors');

const app= express()
app.use(cors());
const port   = process.env.PORT || 5000;
const users = [{name: " nafiz", email: " nafiz@g.com"}]

app.get('/users', (req, res)=>{
    res.send(users)
})

app.listen(port, ()=>{
    console.log(` Listening On Port ${port}`);
})
