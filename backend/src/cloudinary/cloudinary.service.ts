import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiErrorResponse, UploadApiOptions, UploadApiResponse } from 'cloudinary';


@Injectable()
export class CloudinaryService {

    constructor(
        @Inject('CLOUDINARY') 
        private readonly cloudinaryConfig: typeof cloudinary,
      ) {}

      
      async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
      
        return new Promise((resolve, reject) => {
          const uploadStream = this.cloudinaryConfig.uploader.upload_stream(
            { folder: 'user_profiles' },
            (error, result) => {
              if (error) {
                return reject(new Error(`Failed to upload image to Cloudinary: ${error.message}`));
              }
              if (!result) {
                return reject(new Error('No result returned from Cloudinary'));
              }
              resolve(result);
            },
          );
    
          uploadStream.end(file.buffer);
        });
      };



      async uploadJobFile(file: Express.Multer.File): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
          const options: UploadApiOptions = {
            resource_type: 'raw',
            folder: 'cv_uploads',
            use_filename: true,
            filename_override: file.originalname.replace(/\.[^/.]+$/, ''),
            unique_filename: false,
          };
      
          cloudinary.uploader.upload_stream(
            options,
            (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
              if (error) {
                reject(new BadRequestException('Failed to upload file to Cloudinary'));
                return;
              }
              if (!result) {
                reject(new Error('No result returned from Cloudinary'));
                return;
              }
              resolve(result);
            }
          ).end(file.buffer);
        });
      }
    
    

}
