export class User {
  private id: number;
  private firstName: string;
  private lastName: string;
  private email: string;
  private password: string;

  constructor(firstName: string, lastName: string, email: string, password: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }

  getId(): number {
    return this.id;
  }

  setId(value: number) {
    this.id = value;
  }

  getFirstName(): string {
    return this.firstName;
  }

  setFirstName(value: string) {
    this.firstName = value;
  }

  getLastName(): string {
    return this.lastName;
  }

  setLastName(value: string) {
    this.lastName = value;
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

