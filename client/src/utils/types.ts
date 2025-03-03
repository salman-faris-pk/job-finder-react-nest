

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