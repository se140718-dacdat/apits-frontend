import { List } from "reselect/es/types";
import { CourseEntity, SkillEntity, SpecialtyEntity } from "./model";
import { PostResponse as PostModal } from "./Models";

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
    createAt: Date;
    cv: string;
    description: string;
    dob: Date;
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

export interface CandidateEntity {
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
    description: string,
    requirement: string,
    workLocation: string,
    salaryDetail: number,
    hrName: string,
    hrPhone: string,
    hrEmail: string,
    skillId: 0,
    levelId: 0,
    enterpriseId: number,
    skillLevelRequests: SkillRequire[],
    specialtyId: number;
    experienceId: number;
}

export interface SkillRequire {
    skillId: number,
    levelName: number
}

export interface SkillSelect {
    skillId: number;
    skillName: string;
    levelName: number;
}

export interface SkillShow {
    id: number;
    name: string;
    image: string;
    levels: LevelShow[];
}

export interface LevelShow {
    id: number;
    name: string;
    status: string;
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
    salaryDetail: number,
    description: string,
    requirement: string,
    workLocation: string,
    hrName: string,
    hrPhone: string,
    hrEmail: string,
    enterpriseId: number,
    skills: SkillSelect[],
    specialty: SpecialtyOnly,
    experienceSpecialty: Experience,
    createAt: string,
    creator: CreatorEntity
}

export interface SkillResponse {
    id: number;
    name: string;
}

export interface SpecialtyResponse {
    id: number;
    name: string;
}

export interface AssignResponse {
    id: number;
    date: string;
    status: string;
    recruitmentRequest: PostModal;
    assigner: EmployeeEntity
}

export interface CandidateAssignRow {
    id: string;
    recruitment: string;
    // specialty: string;
    salaryDetail: string;
    enterpriseName: string;
    deadline: string;
    recruitmentId: number;
    expired: number;
}


export interface ConfirmedEntity {
    assignId: number;
    candidateResponse: CandidateConfirmed;
}

export interface ApprovedEntity {
    assignId: number;
    candidateResponse: CandidateConfirmed;
    recruitmentRequest: PostResponse;
}

export interface CandidateConfirmed {
    id: number
    name: string;
    email: string;
    image: string;
    phone: string;
    gender: string;
    dob: string;
    address: string;
    cv: string;
    payment: string;
    status: string;
    createAt: string;
    description: string;
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

interface PostAssign {
    benefits: string,
    createAt: string,
    creator: CreatorEntity,
    description: string,
    experience: string,
    expiryDate: string,
    hrName: string,
    hrPhone: string,
    hrEmail: string,
    id: number,
    name: string,
    quantity: number,
    requirement: string,
    salaryDetail: number,
    status: string
    title: string,
    typeOfWork: string,
    workLocation: string
}


export interface EmployeeEntity {
    id: number;
    name: string;
    employeeCode: string;
    phone: string;
    gender: string;
    address: string;
    image: string;
    dob: string;
    status: string;
    position: Position
}

interface Position {
    id: number;
    name: string;
    status: string;
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

// interface Experience {
//     id: number,
//     name: string,
//     description: string,
//     from: Date,
//     to: Date
// }


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

export interface contractLaborSupply {
    name: String;
    address: String;
    phone: String,
    taxcode: String,
    representative: String,
    accountBankId: String,
    bankName: String,
    accountBankName: String,
    position: String,
    fromTo: Date,
    endTo: Date,
    numOfEmployee: number;
    createId: number;
    signerId: number;
    status: string;
}

export interface contractAgreement {
    dateSigned: Date;
    address: String;
    nameEmployee: String;
    addressEmployee: String;
    missionEmployee: String;
    salary: number;
    benefits: String;
    nameHiring: String;
    signatureHiring: String;
    signatureEmployee: String;
    dateEmployeeSigned: Date;
    createId: number;
    signerId: number;
    status: string;
}

export interface NewUserInterview {
    id: number;
    candidate: NewUser;
    specialty: SpecialtyOnly;
    status: string;
}

export interface NewUser {
    id: number;
    name: string;
    phone: string;
    candidateCode: string;
    image: string;
    gender: string;
    createAt: string;
    dob: string;
    email: string;
    address: string;
    payment: string;
    description: string;
    experience: string;
    personalCertificate: string;
    cv: string;
    status: string;
}

interface SpecialtyOnly {
    id: number;
    name: string;
    status: string;
}

export interface CandidateCourseProcessing {
    id: number;
    candidate: NewUser;
    course: CourseEntity
}

export interface Professor {
    id: number;
    name: string;
}


export interface InterviewCreate {
    purpose: string;
    date: string;
    slot: string;
    linkMeeting: string;
    type: string;
    managerId: number;
    description: string;
    candidateId: number;
    hostId: number;
    tmpId: number
}

export interface Duration {
    name: string;
    value: number;
}


export interface InterviewResponse {
    id: number;
    purpose: string;
    date: string;
    slot: string;
    linkMeeting: string;
    type: string;
    managerId: number;
    description: string;
    candidateId: number;
    hostId: number;
    tempId: number
    status: string;
    candidateName: string;
}

export interface InterviewDetail {
    result: string;
    description: string;
    interviewID: number;
}

export interface interviewDetailResponse {
    id: number;
    startAt: string;
    result: string;
    recordMeeting: string;
    description: string;
    interview: InterviewForContract;
    status: string;
}

export interface InterviewForContract {
    id: number;
    purpose: string;
    date: string;
    link: string;
    type: string;
    description: string;
    status: string;
    duration: number;
    manager: string;
    note: number;
    assign: AssignForContract
}

export interface AssignForContract {
    id: number;
    createAt: string;
    status: string;
    recruitmentRequest: PostResponse;
    assigner: EmployeeEntity;
    candidate: CandidateEntity;
}

export interface ContractLaborSupply {
    name: string;
    address: string;
    phone: string;
    taxCode: string;
    representative: string;
    accountBankId: string;
    bankName: string;
    accountBankName: string;
    position: string;
    fromTo: string;
    endTo: string;
    description: string;
    numOfEmployee: number;
    createId: number;
    signerId: number;
    salary: number;
    interviewDetailId: number;
    dateSigned: Date;
}

export interface ContractAgreement {
    dateSigned: Date;
    address: string;
    description: string;
    nameEmployee: string;
    addressEmployee: string;
    missionEmployee: string;
    salary: number;
    benefits: string;
    nameHiring: string;
    signatureHiring: string;
    signatureEmployee: string;
    dateEmployeeSigned: string;
    createId: number;
    signerId: number;
    interviewDetailId: number;
}

export interface ContractAgreementResponse {
    id: number;
    dateSigned: Date;
    address: string;
    nameEmployee: string;
    addressEmployee: string;
    missionEmployee: string;
    salary: number;
    benefits: string;
    nameHiring: string;
    signatureHiring: string;
    signatureEmployee: string;
    dateEmployeeSigned: string;
    dateCandidateSigned: Date;
    employeeId: number;
    status: string;
}

export interface ContractLarborSupplyResponse {
    id: number;
    name: string;
    address: string;
    phone: string;
    taxCode: string;
    description: string;
    representative: string;
    accountBankId: string;
    bankName: string;
    accountBankName: string;
    position: string;
    fromTo: string;
    endTo: string;
    numOfEmployee: number;
    employeeId: number;
    status: string;
    salary: number;
    dateSigned: Date;
    dateEnterpriseSigned: Date;
}


export interface SpecialtyExpResponse {
    id: number;
    name: string;
    experience: number;
    status: string;
}

export interface SpecialtyExpDetail {
    id: number;
    name: string;
    experiences: ExperienceSpecialy[];
}

export interface ExperienceSpecialy {
    id: number;
    name: string;
    skills: SkillEntity[]
}

export interface Contract {
    id: number;
    dateCreated: Date;
    candidateSignDate: Date;
    enterpriseSignDate: Date;
    completePaymentDate: Date;
    salary: number;
    creatorId: number;
    enterpriseId: number;
    candidateId: number;
    interviewDetail: interviewDetailResponse;
    status: string;
    commissionFee: number;
}

export interface ContractCreate {
    dateCreated: Date,
    salary: number,
    creatorId: number,
    enterpriseId: number,
    candidateId: number,
    interviewDetailId: number,
    commissionFee: number
}