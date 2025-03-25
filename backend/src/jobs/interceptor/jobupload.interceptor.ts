import { CallHandler, ExecutionContext, Injectable, NestInterceptor, BadRequestException } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CloudinaryService } from "../../cloudinary/cloudinary.service";

@Injectable()
export class CvUploadInterceptor implements NestInterceptor {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    if (!request.file) {
      throw new BadRequestException("CV file is required");
    }

    try {
      const uploadResult = await this.cloudinaryService.uploadJobFile(request.file);
      request.body.CvUrl = uploadResult.secure_url; 
    } catch (error) {
      throw new BadRequestException("Failed to upload CV to Cloudinary");
    }

    return next.handle().pipe(map((data) => data));
  }
}
