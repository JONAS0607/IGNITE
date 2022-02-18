import express from "express";

import { categories_routes } from "./routes/categories.routes";

const app = express();
app.use(express.json());
app.use(categories_routes);
app.listen(3333, () => console.log("Server is running!"));
