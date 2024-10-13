import express from "express";
import { app } from "./app";

const port = process.env.PORT || 8000;

app.use(express.json());

app.listen(port, () => console.log(`http://localhost:${port}`));