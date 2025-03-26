import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsersService {

    constructor(
        private readonly prisma:PrismaService,
    ){}


    async getUser(userId:string){

        const user=await this.prisma.user.findUnique({
            where:{id:userId},
            omit:{
                password: true,
                hashedRefreshToken: true
            }
        });
        if(!user){
            throw new NotFoundException('User Not Found');
        };


        return {
            success: true,
            user,
        };
    };


    async UpdateTheUser(userId:string, updateUserDto: Partial<UpdateUserDto>){

        const User = await this.prisma.user.findUnique({ where: { id: userId } });

        if (!User) {
          throw new NotFoundException(`No user found with id: ${userId}`);
        };

        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: updateUserDto,
            omit:{
                password:true,
                hashedRefreshToken:true,
            }
          });

          return {
            success: true,
            message: "User updated successfully",
            user: updatedUser,
          };

    };


    async AuthorisedUser(userId:string){

        const user=await this.prisma.user.findUnique({
            where:{id: userId},
            omit:{
                password:true,
                hashedRefreshToken:true
            }
        });

      
        const company=await this.prisma.companies.findUnique({
            where:{id: userId},
            omit:{
                password:true,
                hashedRefreshToken:true,
            }
        });

        
        if (!user && !company) {
            return null;
        }
    
        return user ? { user } : { company };

    };

    async MyApplications(userId:string){

        const JobAplication=await this.prisma.jobApplication.findMany({
            where:{userId: userId},
            include: {
                job: {
                  select: {
                    id: true,
                    jobTitle: true,
                    company: {
                        select: {
                            profileUrl: true,
                            name: true,
                        }
                    },
                    detail: {
                        select:{
                            desc: true
                        }
                    },
                    location: true,
                    salary: true,
                    jobType: true,
                  }
                }
              },
              orderBy: {
                appliedAt: 'desc'
              }
        });

        return {
            success: true,
            applications: JobAplication.map(app => ({
                id: app.id,
                applicationStatus: app.applicationStatus,
                appliedAt: app.appliedAt,
                job: {
                    ...app.job,
                    company: {
                        logo: app.job.company?.profileUrl,
                        name: app.job.company?.name,
                    }
                }
            }))
        }

    };



    async withdrawApplication(applicationId:string,userId:string){

        const application = await this.prisma.jobApplication.findUnique({
            where: { id: applicationId },
            select: { userId: true }
          });
        
          if (!application) {
            throw new NotFoundException('Application not found');
          }
        
          if (application.userId !== userId) {
            throw new ForbiddenException('You can only withdraw your own applications');
          }
        
          await this.prisma.jobApplication.delete({
            where: { id: applicationId }
          });
        
          return { success: true ,message:"Application Deleted succesfully.."};

    }



}
