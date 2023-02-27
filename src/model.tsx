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

export interface Skill {
    skillId: string;
    skillName: string;
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
    skillName: "java"

}

export const aps: Skill = {
    skillId: "APS.NET",
    skillName: "APS.NET"
}

export const developer: Category = {
    categoryId: "dev",
    levelId: 1,
    skillList: [java, aps],
    categoryName: "Developer"
}

export const python: Skill = {
    skillId: "python",
    skillName: "Python"

}

export const dataScience: Skill = {
    skillId: "dataScience",
    skillName: "Data Science"
}


export const dataEngineer: Category = {
    categoryId: "dataEngineer",
    levelId: 1,
    skillList: [python, dataScience],
    categoryName: "Data Engineer"
}

