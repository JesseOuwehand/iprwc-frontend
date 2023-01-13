export class LoginCredentials {
  private email: string;
  private password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  getEmail(): string {
    return this.email;
  }

  setEmail(value: string) {
    this.email = value;
  }

  getPassword(): string {
    return this.password;
  }

  setPassword(value: string) {
    this.password = value;
  }
}
