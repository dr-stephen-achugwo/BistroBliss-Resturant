class WrongEmailOrPassword extends Error {
  constructor() {
    super();
    this.name = 'WronhEmailOrPassword';
    this.message = 'Invalid email or password.';
    this.status = 401;
  }
}

class NotFound extends Error {
  constructor(message) {
    super();
    this.name = 'NotFound';
    this.message = message;
    this.status = 404;
  }
}

module.exports = { WrongEmailOrPassword, NotFound };