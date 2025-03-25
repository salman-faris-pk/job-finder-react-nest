import { FieldErrors } from "react-hook-form";


export type FooterLink = {
    id: string;
    title: string;
    links: string[];
  };

  export type User = {
    id:string;
    name?: string;  
    firstName?: string;  
    lastName?: string; 
    location?: string;
    jobTitle: string;
    email: string;
    contact: string;
    about: string;
    profileUrl: string;
    githubUrl: string; 
    jobPosts?: string[]; 
    portfolioUrl: string;
    accountType?: "seeker" | "employer"; 
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
    requirements: string;
  };
  
   export type Job = {
    id: string;
    companyId: string;
    company: Company;
    jobTitle: string;
    location: string;
    experience: number;
    jobType: "Full-Time" | "Part-Time" | "Contract";
    salary: number | string;
    detail: JobDetail[];
    application: JobApplication[];
    vacancies: number;
    createdAt: Date;
  };

  export type Companies = {
    id: string;
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

  export enum ApplicationStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
  }
  
  export interface JobApplication {
    id: string;
    userId: string;
    jobId: string;
    CvUrl: string;
    whyHire?: string;
    applicationStatus: ApplicationStatus;
    appliedAt: Date;
    
    user: User;
    job: Job;
  }
  
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
  jType?: string | string[];
  exp?: number | string | string[];
};

export interface HeaderProps {
  title: string;
  type?: string | boolean;
  handleClick: (e: React.FormEvent<HTMLFormElement>) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
}

export interface SearchInputProps {
  placeholder: string;
  icon: React.ReactNode;
  value: string;
  setValue: (value: string) => void;
  styles?: string;
}

export interface Updateduser {
  firstName?: string;
  lastName?: string;
  email?: string;
  contact?: string;
  location?: string;
  githubUrl?: string;
  profileUrl?: string | File;
  portfolioUrl?: string;
  jobTitle?: string;
  about?: string;
}


export type applydataitems={
   userId: string;
   JobId: string;
   CvUrl: File;
   whyHire?: string;
};
