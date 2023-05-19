import { CreatorEntity, SkillSelect } from "./entity";

export interface Specialty {
    id: number;
    name: string;
    status: string;
}

export interface ExperienceOnly {
    id: number;
    name: string;
}

export interface SpecialtyExperience {
    id: number;
    name: string;
    experiences: ExperienceOnly[];
}

export interface SpecialtyExperiencePost {
    id: number;
    specialty: Specialty;
    experience: ExperienceOnly;
    status: string;
}


export interface SpecialtyWithoutExperience {
    id: number;
    name: string;
    skills: Skill[]
}

export interface CandidateCurrentSpecialty {
    id: number;
    name: string;
    experience: string;
    status: string;
}

export interface Course {
    id: number;
    name: string;
    link: string;
    status: string;
    startAt: string;
}

export interface Level {
    level: number;
    courses: Course[]
}

export interface Skill {
    id: number;
    name: string;
    image: string;
    levels: Level[];
}

export interface Experience {
    id: number;
    name: string;
    skills: Skill[]
}

export interface Specialty {
    id: number;
    name: string;
    experiences: Experience[]
}

export interface Candidate {
    id: number;
    name: string;
    phone: string;
    candidateCode: string;
    image: string;
    gender: string;
    createAt: Date;
    dob: Date;
    email: Date;
    address: string;
    payment: string;
    description: string;
    cv: string;
}

export interface Waiting {
    id: number;
    candidate: Candidate;
    specialty: Specialty;
    status: string;
}

export interface EvaluationTestCreate {
    date: string;
    slot: string;
    candidateLevelId: number;

}

export interface CourseProcessing {
    id: number;
    candidate: Candidate;
    course: Course;
}

export interface InterviewTest {
    slot: string;
    date: string;
    professorId: number;
    candidateId: number;
    specialtyId: number;
    linkMeeting: string;
    title: string;
}

export interface InterviewCheck {
    slot: string;
    date: string;
    professorId: number;
    candidateId: number;
    courseId: number;
    linkMeeting: string;
    title: string;
}

export interface RecruitmentRequest {
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
    skillId: number,
    levelId: number,
    specialtyId: number,
    experienceId: number,
    skillLevelRequests: Skilllevel[]
}

export interface Skilllevel {
    skillId: number;
    levelName: number;
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
    createAt: string,
    creator: CreatorEntity,
    specialtyExperience: SpecialtyExperiencePost
}