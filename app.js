import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

import authRoute from "./routes/auth.routes.js";
import messageRoute from "./routes/message.route.js";
import userRoute from "./routes/user.route.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";
const PORT = process.env.PORT || 8000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.resolve(__dirname, "dist")));
app.use(express.json()); // to parse the incoming req
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);
app.use("/api/users", userRoute);
app.get("*", (req, res) => res.sendFile(path.resolve("dist", "index.html")));

app.get("/", (req, res) => {
  res.json({ mesaage: "working" });
});

app.get("/api/auth/signup", (req, res) => {
  console.log("signup route");
});

server.listen(PORT, () => {
  connectToMongoDB();
  console.log("Server is running on PORT:", PORT);
});
