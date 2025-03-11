import { CallHandler, ExecutionContext, Injectable, NestInterceptor, BadRequestException } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CloudinaryService } from "../../cloudinary/cloudinary.service";


@Injectable()
export class CloudinaryInterceptor implements NestInterceptor {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    

    if (!request.file) {
      return next.handle();
    }

    try {
      const uploadResult = await this.cloudinaryService.uploadImage(request.file);
      // console.log(uploadResult);
      
      request.body.profileUrl = uploadResult.secure_url;
    } catch (error) {
      throw new BadRequestException("Failed to upload image to Cloudinary");
    }

    return next.handle().pipe(map((data) => data));
  }
}
