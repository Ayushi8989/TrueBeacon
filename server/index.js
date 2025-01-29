import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const app = express()

const port = process.env.PORT;

app.get('/', (req, res)=>{
    res.send("Welcome!");
})

app.use(express.json()); 

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost/${port}`);
})