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