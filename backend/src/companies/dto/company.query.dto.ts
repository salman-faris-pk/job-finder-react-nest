
export class CompanyJobQueryDto {
  search?: string;
  sort?: string;
  location?: string;
  page?:number;
  limit?:number;
}

export class CompanyJobListBodyDto {
  user: {
    userId: string;
  };
}