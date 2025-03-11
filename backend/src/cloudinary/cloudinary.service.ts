import { Inject, Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';


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
      }
    

}
