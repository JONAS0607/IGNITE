import { AppError } from "@shared/errors/AppError";

import { InMemoryCategoriesRepository } from "../../repositories/in-memory/InMemoryCategoriesRepository";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let inMemoryCategoriesRepository: InMemoryCategoriesRepository;

describe("Create Category", () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    createCategoryUseCase = new CreateCategoryUseCase(
      inMemoryCategoriesRepository
    );
  });
  it("should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Category description Test",
    };
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });
    const categoryCreated = await inMemoryCategoriesRepository.findByName(
      category.name
    );
    // console.log(categoryCreated);
    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able to create a new category with same name", async () => {
    expect(async () => {
      const category = {
        name: "Category Test",
        description: "Category description Test",
      };
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
