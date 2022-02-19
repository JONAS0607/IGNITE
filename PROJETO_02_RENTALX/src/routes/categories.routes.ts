import { Router } from "express";

import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository";
import { PostgresCategoriesRepository } from "../modules/cars/repositories/PostgresCategoriesRepository";
import { CreateCategoryService } from "../modules/cars/services/CreateCategoryService";

const categories_routes = Router();
const categories_repository = new CategoriesRepository();

categories_routes.post("/", (request, response) => {
  const { name, description } = request.body;
  const createCategoryService = new CreateCategoryService(
    categories_repository
  );
  createCategoryService.execute({ name, description });
  return response.status(201).send();
});
categories_routes.get("/", (request, response) => {
  const all = categories_repository.list();
  return response.status(200).json({ all });
});
export { categories_routes };
