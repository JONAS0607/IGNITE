import { Router } from "express";

const categories_routes = Router();
const categories = [];

categories_routes.post("/categories", (request, response) => {
  const { name, description } = request.body;
  categories.push({
    name,
    description,
  });
  return response.status(201).json({ error: "Category created!" });
});
export { categories_routes };
