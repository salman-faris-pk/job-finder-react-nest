import { Injectable, NotFoundException } from '@nestjs/common';
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


}
