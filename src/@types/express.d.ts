declare namespace Express {
  export interface Request {
    usersId: string;
    useMaster: boolean;
    useEmployee: boolean;
  }
}
