import { List } from "reselect/es/types";

interface EnterpriseEntity {
    id: number;
    website: string;
    email: string;
    name: string;
    address: string;
    phone: string;
    scale: string;
    industry: string;
    introduction: string;
    avt: string;
    backgroundImg: string;
    status: boolean;
    createAt: Date;
}

interface Experience {
    id: number;
    name: string;
    description: string;
}

interface Certificate {
    id: number;
    name: string;
    description: string;
}

export interface CandidateResponse {
    address: string;
    candidateCode: string;
    createAt: string;
    cv: string;
    description: string;
    dob: string;
    email: string;
    experience: string;
    gender: string;
    id: number;
    image: string;
    name: string;
    payment: string;
    personalcertificate: string;
    phone: string;
    status: string;
}

interface CandidateEntity {
    id: number;
    email: string;
    name: string;
    address: string;
    phone: string;
    gender: string;
    payment: string;
    dob: Date;
    avt: string;
    //default là null, khi ký hợp đồng với cty bất kỳ sẽ add name cty vào (Có thể bỏ field này và render qua api khác)
    working: string;
    //default là null, khi ký hợp đồng với cty bất kỳ sẽ add thời gian thuê trong hợp đồng vào (Có thể bỏ field này và render qua api khác)
    hiring: string;
    cv: File;
    //liên kết với entity Experience để thêm xóa experience
    exerpriencesList: List;
    //liên kết với entity Certificate để thêm xóa experience
    certificationsList: List;
    specialtyList: List;
    skillList: List;
    introduction: string;
    status: boolean;
    createAt: Date;
}

export interface PostEntity {
    expiryDate: string,
    title: string,
    name: string,
    quantity: number,
    benefits: string,
    experience: string,
    typeOfWork: string,
    salaryFrom: string,
    salaryTo: string,
    description: string,
    requirement: string,
    workLocation: string,
    hrName: string,
    hrPhone: string,
    hrEmail: string,
    enterpriseId: number,
    skillIds: number[],
    specialtyIds: number[]
}

export interface PostResponse {
    id: number,
    expiryDate: string,
    title: string,
    name: string,
    quantity: number,
    benefits: string,
    experience: string,
    typeOfWork: string,
    salaryFrom: string,
    salaryTo: string,
    description: string,
    requirement: string,
    workLocation: string,
    hrName: string,
    hrPhone: string,
    hrEmail: string,
    enterpriseId: number,
    skillIds: number[],
    specialtyIds: number[],
    date: string,
    creator: CreatorEntity
}

export interface CreatorEntity {
    id: number;
    name: string;
    address: string;
    status: string;
    email: string;
    phone: string;
    website: string;
    createAt: string;
    scale: string;
    image: string;
    introduction: string;
}

export interface Post {
    id: 1,
    date: Date,
    expiryDate: Date,
    industry: null,
    name: string,
    amount: 0,
    jobLevel: null,
    experience: string,
    typeOfWork: string,
    salaryDetail: string,
    description: string,
    requirement: string,
    status: string,
    creator: EnterpriseEntity
}


interface EmployeeEntity {
    id: number;
    name: string;
    email: string;
    phone: string;
    position: string;
    status: boolean;
}

interface Skill {
    id: number;
    name: string;
    levelList: Level[]
}

interface Level {
    id: number;
    name: string;
    courseId: string;
}

interface Specialty {
    id: number;
    name: string;
    skillList: Skill[]
}

const levelBasicJava: Level = {
    id: 1,
    name: "Java basic",
    courseId: "1"
}

const levelAdvanceJava: Level = {
    id: 1,
    name: "Java Advance",
    courseId: "2"
}

const java: Skill = {
    id: 1,
    name: "Java",
    levelList: [levelBasicJava, levelAdvanceJava]
}

const levelBasicSQL: Level = {
    id: 1,
    name: "SQL basic",
    courseId: "1"
}

const levelAdvanceSQL: Level = {
    id: 1,
    name: "SQL Advance",
    courseId: "2"
}

const sql: Skill = {
    id: 1,
    name: "SQL",
    levelList: [levelBasicSQL, levelAdvanceSQL]
}

export const backendDeveloper: Specialty = {
    id: 1,
    name: "Backend Developer",
    skillList: [java, sql]
}

interface Certificate {
    id: number,
    name: string,
    link: string,
    issuedTime: Date
}

interface Experience {
    id: number,
    name: string,
    description: string,
    from: Date,
    to: Date
}


// const specialty1: Specialty = {
//     id: 1,
//     name: "Backend Developer",
//     skillList : {
//         skill1: {
//             name: "Java",
//             levelList: {
//                 levelBasic: {
//                     name: "Java basic",
//                     courseId: "asdasdsa",
//                     status: "Done"
//                 },
//                 levelAdvanced: {
//                     name: "Java advanced",
//                     courseId: "asdasdsa",
//                     status: "Not yet"
//                 },
//             }
//         },
//         skill2: {
//             name: "Python",
//         },
//     }
// }