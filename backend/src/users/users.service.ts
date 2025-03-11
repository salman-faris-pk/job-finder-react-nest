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
            where:{id:userId}
        });
        if(!user){
            throw new NotFoundException('User Not Found');
        };

        const { password: password_, hashedRefreshToken: token_, ...userDatas } = user;

        return {
            success: true,
            user:userDatas,
        };
    };


    async UpdateTheUser(userId:string, updateUserDto: Partial<UpdateUserDto>){

        
        const existingUser = await this.prisma.user.findUnique({ where: { id: userId } });

        if (!existingUser) {
          throw new NotFoundException(`No user found with id: ${userId}`);
        };

        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: updateUserDto,
          });

          return {
            success: true,
            message: "User updated successfully",
            user: updatedUser,
          };

    };


}
