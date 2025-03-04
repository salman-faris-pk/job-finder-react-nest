

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
    profileUrl: string; // Change to JSX.Element if using react-icons
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