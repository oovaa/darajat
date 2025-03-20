import express from "express";
import bodyParser from "body-parser";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { config } from "dotenv";
import fs from "fs";
import path from "path";
import { match } from "assert";
import { env } from "process";

config();

const app = express();
app.use(bodyParser.json());

const VECTOR_DB_PATH = Bun.env.DATABASE_PATH;


const vectorStore = await FaissStore.load(VECTOR_DB_PATH, new GoogleGenerativeAIEmbeddings({
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT
    }));

export async function search(query:string){
    const results =  await vectorStore.similaritySearch(query, 8); // Top-N result
    let match = ""
    results.forEach(element => {
        match +=element.pageContent
    });
    return match
}

