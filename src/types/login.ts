export interface Login {
  email: string;
  password: string;
}

export interface LoggedUser {
  id: string;
  email: string;
  role: string;
}
