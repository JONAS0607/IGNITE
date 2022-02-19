import express from "express";

import { categories_routes } from "./routes/categories.routes";
import { specifications_routes } from "./routes/specifications.routes";

const app = express();
app.use(express.json());
app.use("/categories", categories_routes);
app.use("/specifications", specifications_routes);
app.listen(3333, () => console.log("Server is running!"));
