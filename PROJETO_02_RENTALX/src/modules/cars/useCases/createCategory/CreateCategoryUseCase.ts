import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categories_repository: ICategoriesRepository) {}
  execute({ name, description }: IRequest) {
    const category_already_exists = this.categories_repository.findByName(name);
    if (category_already_exists) {
      throw new Error("Category already exists!");
      // return response.status(400).json({ error: "Category already existis!" });
    }

    this.categories_repository.create({ name, description });
  }
}

export { CreateCategoryUseCase };