class ValidationError extends Error {
  constructor (errors, status) {
    super();
    this.errors = errors;
    this.name = 'ValidationError';
  }
}

export default ValidationError;
