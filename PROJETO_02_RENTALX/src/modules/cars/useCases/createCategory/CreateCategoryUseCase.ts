import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}
@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categories_repository: ICategoriesRepository
  ) {}
  async execute({ name, description }: IRequest): Promise<void> {
    const category_already_exists = await this.categories_repository.findByName(
      name
    );
    if (category_already_exists) {
      throw new AppError("Category already exists!");
      // return response.status(400).json({ error: "Category already existis!" });
    }

    this.categories_repository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
