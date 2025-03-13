
export class CompanyJobListQueryDto {
  search?: string;
  sort?: string;
}

export class CompanyJobListBodyDto {
  user: {
    userId: string;
  };
}