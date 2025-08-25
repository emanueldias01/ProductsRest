export class ProductCodeAlreadyExists extends Error {
  constructor() {
    super(`This code product already exists in database`);
    this.name = 'ProductCodeAlreadyExist';
  }
}

export class ProductNotFound extends Error {
  constructor() {
    super(`Product with this id not exists`);
    this.name = 'ProductNotFound';
  }
}
