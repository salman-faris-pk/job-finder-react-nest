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
    _id: number;
    name: string;
    location: string;
    email: string;
    contact: string;
    about: string;
    profileUrl: string; 
    jobPosts: string[]; 
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