import { Router } from "express";

import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository";
import { createCategoryController } from "../modules/cars/useCases/createCategory";

const categories_routes = Router();
const categories_repository = new CategoriesRepository();

categories_routes.post("/", (request, response) => {
  return createCategoryController.handle(request, response);
});
categories_routes.get("/", (request, response) => {
  const all = categories_repository.list();
  return response.status(200).json({ all });
});
export { categories_routes };
