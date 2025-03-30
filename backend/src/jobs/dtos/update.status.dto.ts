

export interface UpdateJobStatusDTO {
    jobId: string;
    userId: string;
    newStatus: "PENDING" | "ACCEPTED" | "REJECTED"; 
  }

  export interface DeleteAppliacntDTO {
    jobId: string;
    userId: string;
  }