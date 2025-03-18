import { FieldErrors } from "react-hook-form";


export type FooterLink = {
    id: string;
    title: string;
    links: string[];
  };

  export type User = {
    name?: string;  
    firstName?: string;  
    lastName?: string; 
    location?: string;
    email: string;
    contact: string;
    about: string;
    profileUrl: string; 
    jobPosts?: string[]; 
    accountType?: "seeker" | "employer"; 
    cvUrl?: string;
    token: string;
  };

  export type Experieces = {
     title:string;
     value:string;
  }

  type Company = {
    name: string;
    location: string;
    email: string;
    contact: string;
    about: string;
    profileUrl: string; 
  };
  
  type JobDetail = {
    desc: string;
    requirement: string;
  };
  
   export type Job = {
    id: string;
    company: Company;
    jobTitle: string;
    location: string;
    jobType: "Full-Time" | "Part-Time" | "Contract";
    salary: string;
    detail: JobDetail[];
    applicants: string[];
    vacancies: number;
    createdAt: Date;
  };

  export type Companies = {
    id: number;
    name: string;
    location: string;
    email: string;
    contact: string;
    about: string;
    profileUrl: string; 
    jobPosts: Job[]; 
  };


 export  type UserFormData = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    cPassword: string;
  };
  
  export type CompanyFormData = {
    email: string;
    name: string;
    password: string;
    cPassword: string;
  };
  
 export  type LoginFormData = {
    email: string;
    password: string;
  };
  
export type UserErrors = FieldErrors<UserFormData>;
export type CompanyErrors = FieldErrors<CompanyFormData>;
export type LoginErrors = FieldErrors<LoginFormData>;

export type Errors = UserErrors | CompanyErrors | LoginErrors;
export type AuthFormData = UserFormData | CompanyFormData | LoginFormData;



export interface CompanyUpdateData {
  name: string;
  location: string;
  about: string;
  contact: string;
  profileUrl?: string | File;
};


export interface JobFormInputs {
  jobTitle: string;
  salary: number;
  vacancies: number;
  experience: number;
  location: string;
  desc: string;
  requirements?: string;
}

export interface JobSubmissionData extends JobFormInputs {
  jobType: string;
}


export type RecentJobsPosts ={
  id: string;
  name: string;
  email: string; 
  logo? : string; 
  jobTitle: string;
  jobType: "Full-Time" | "Part-Time" | "Contract";
  location: string;
  detail: JobDetail[];
  createdAt: Date | string; 
}

export type UpdateURLParams = {
  pageNum?: number;
  query?: string;
  cmpLoc?: string;
  sort?: string;
  navigate?: (path: string, options?: { replace?: boolean }) => void;
  location?: { pathname: string; search: string };
  jType?: string;
  exp?: number;
};