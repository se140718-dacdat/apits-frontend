export enum Roles {
    Admin = 1,
    Candidate = 2,
    Employee = 3,
    Enterprise = 4,
}

export interface Login {
    email: string;
    password: string;
}

export interface UserLogin {
    token: string;
    roleID: number;
}

export interface CandidateUpdate {
    name: string;
    phone: string;
    image: string;
    gender: string;
    dob: string;
    address: string;
}

export interface User {
    accountId: number,
    token: string,
    roleName: string,
    email: string,
    status: string,
    candidate: {
        id: number,
        name: string,
        phone: string,
        image: string,
        gender: string,
        dob: string,
        email: string,
        address: string,
        status: string
    },
    provider: string
}

export interface Skill {
    skillId: string;
    skillName: string;
    skillIcon: string;
}

export interface Category {
    categoryId: string;
    levelId: number;
    skillList: Skill[];
    categoryName: string;
}

export interface Level {
    levelId: number;
    levelName: number;
}

export const level1: Level = {
    levelId: 1,
    levelName: 1
}
export const level2: Level = {
    levelId: 2,
    levelName: 2
}
export const level3: Level = {
    levelId: 3,
    levelName: 3
}
export const level4: Level = {
    levelId: 4,
    levelName: 4
}
export const level5: Level = {
    levelId: 5,
    levelName: 5
}
export const level6: Level = {
    levelId: 6,
    levelName: 6
}

export const java: Skill = {
    skillId: "java",
    skillName: "java",
    skillIcon: "/images/JavaIcon.png"

}

export const aps: Skill = {
    skillId: "APS.NET",
    skillName: "APS.NET",
    skillIcon: "/images/aps.png"
}

export const developer: Category = {
    categoryId: "dev",
    levelId: 1,
    skillList: [java, aps],
    categoryName: "Developer"
}

export const python: Skill = {
    skillId: "python",
    skillName: "Python",
    skillIcon: "/images/PythonIcon.png"
}

export const dataScience: Skill = {
    skillId: "dataScience",
    skillName: "Data Science",
    skillIcon: "/images/dataIcon.png"
}


export const dataEngineer: Category = {
    categoryId: "dataEngineer",
    levelId: 1,
    skillList: [python, dataScience],
    categoryName: "Data Engineer"
}

export const genderList = ["Male", "Female", "Other"]

