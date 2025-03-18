const axios = require('axios');
import { Router } from "express";
import { contentAnswer } from "../../lib/contentGenerator";

const contentRouter = Router();


async function postData(data:string) {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        query:data
      });
      return response.data
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
contentRouter.post("/generate-content", async (req, res) => {
    let data = ""

    const {lessons} = req.body
    lessons.array.forEach((element:string) => {
        data += element
    });
    const material = await postData(data)

    contentAnswer(lessons, material)
    if(lessons.length === 0){
        return res.status(400).json({ error: "lessons must be a non-empty array" });
    }
    if(material === undefined){
        return res.status(400).json({ error: "Material is not defined" });
    }
    return res.status(200).json({ answer: contentAnswer(lessons,material) }); 
});