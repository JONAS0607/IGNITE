import { InMemoryCarsRepository } from "@modules/cars/repositories/in-memory/InMemoryCarsRepository";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: InMemoryCarsRepository;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new InMemoryCarsRepository();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });
  it("Should be able to create a new car", async () => {
    await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });
  });
});
