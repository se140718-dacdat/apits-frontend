import { GridRowId } from "@mui/x-data-grid";

export enum Roles {
    Admin = 1,
    Candidate = 2,
    Employee = 3,
    Enterprise = 4,
}

export enum Status {
    NotStarted = "#9e9e9e",
    Studying = "#2196f3",
    Processing = "#ffc107",
    Expired = "#f44336",
    Done = "#4caf50"
}

export interface Login {
    email: string;
    password: string;
    notificationToken: string;
}



export interface RegisterEnterprise {
    name: string;
    address: string;
    phone: string;
    scale: string;
    introduction: string;
    email: string;
    password: string;
    website: string;
    image: string;
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
    payment: string;
    cv: string;
    description: string;
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
    levelName: string;
}

export const level1: Level = {
    levelId: 1,
    levelName: "Beginner"
}
export const level2: Level = {
    levelId: 2,
    levelName: "Advanced"
}
export const level3: Level = {
    levelId: 3,
    levelName: "Intensive"
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

export interface Specialty {
    id: number;
    name: string;
    skills: string[];
}

export interface Candidate {
    id: number;
    name: string;
    gender: string;
    address: string;
    specialties: Specialty[];
    status: string;
}



export interface Interview {
    id: string;
    title: string;
    duration: string;
    date: string;
    time: string;
    link: string;
    participant: string;
    host: string;
    type: number;
}

export interface NotificationCandidate {
    id: string;
    type: string;
    title: string;

}export interface CourseEntity {
    id: number;
    link: string;
    name: string;
    status: string;
    startAt: Date;
}

export interface LevelEntity {
    id: number;
    name: string;
    status: string;
    courses: CourseEntity[];
}

export interface SkillEntity {
    id: number;
    name: string;
    image: string;
    status: string;
    levels: LevelEntity[];
}


export interface SpecialtyEntity {
    id: number;
    name: string;
    status: string;
    skills: SkillEntity[];
}

export interface CandidateSpecialty {
    id: number;
    name: string;
    specialty: SpecialtyEntity;
}



export interface Notification {
    id: string;
    title: string;
    date: string;
    time: string;
    WorkForm: string;
    Salary: string;
    Company: string;
    type: number;
}

export interface Distance {
    image: string;
    levels: Level[]
}

export interface CandidateCourse {
    id: number;
    name: string;
    link: string;
    status: string;
    sccId: number;
    startAt: Date;
}

export interface CandidateCourses {
    id: number;
    name: string;
    courses: CandidateCourse[]
}

export interface Employee {
    id: number,
    employeeName: string,
    employeeCode: string,
    phone: string,
    gender: string,
    address: string,
    image: string,
    dob: string,
    status: string,
    position: Position
}

export interface Position {
    id: number;
    name: string;
    status: string;
}

export interface Assign {
    status: string;
    experience: string;
    screeningStatus: string;
    recruitmentRequestId: number,
    assignerId: number,
    candidateIds: GridRowId[]
}

export interface PositionResponse {
    id: number;
    name: string;
    status: string;
    numberUsePosition: number;
}
