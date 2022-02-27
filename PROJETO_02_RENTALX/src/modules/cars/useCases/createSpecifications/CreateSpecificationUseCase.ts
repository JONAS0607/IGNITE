import { inject, injectable } from "tsyringe";

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
  execute({ description, name }: IRequest): void {
    const specification_already_existis =
      this.specifications_repository.findByName(name);
    if (specification_already_existis) {
      throw new Error("Specification already exists!");
    }
    this.specifications_repository.create({
      description,
      name,
    });
  }
}

export { CreateSpecificationUseCase };
