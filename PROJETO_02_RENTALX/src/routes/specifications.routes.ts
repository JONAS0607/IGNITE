import { Router } from "express";

import { SpecificationsRepository } from "../modules/cars/repositories/implementations/SpecificationsRepository";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService";

const specifications_routes = Router();

const specification_repository = new SpecificationsRepository();
specifications_routes.post("/", (request, response) => {
  const { name, description } = request.body;
  const create_specification_service = new CreateSpecificationService(
    specification_repository
  );
  create_specification_service.execute({ name, description });
  return response.status(202).send();
});

export { specifications_routes };
