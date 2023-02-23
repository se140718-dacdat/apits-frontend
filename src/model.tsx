export enum Roles {
    Admin = 1,
    Candidate = 2,
    Employee = 3,
    Enterprise = 4,
}

export interface User {
    token: string;
    roleID: number;
}
