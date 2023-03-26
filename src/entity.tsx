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

interface PostEntity {
    id: number;
    //vị trí tuyển dụng
    position: string;
    title: string;
    specialtyList: List;
    skillList: List;
    //description, requirements, benefits (textarea)
    description: string;
    requirements: string;
    benefits: string;
    //Fulltime hoặc part-time
    workForm: string;
    quanity: number;
    //Ngày post hết hạn
    exprid: Date;
    experience: string;
    salary: string;
    status: boolean;
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
    skillList : [java, sql]
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