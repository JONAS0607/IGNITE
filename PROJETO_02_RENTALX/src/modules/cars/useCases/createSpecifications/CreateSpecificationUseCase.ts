import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}
@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specifications_repository: ISpecificationsRepository
  ) {}
  async execute({ description, name }: IRequest): Promise<void> {
    const specification_already_existis =
      await this.specifications_repository.findByName(name);
    if (specification_already_existis) {
      throw new AppError("Specification already exists!");
    }
    await this.specifications_repository.create({
      description,
      name,
    });
  }
}

export { CreateSpecificationUseCase };
