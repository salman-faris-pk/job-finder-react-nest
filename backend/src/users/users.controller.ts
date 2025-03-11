import { Body, Controller, Get,Put,Req, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserIdRequest } from 'src/auth/types/auth-jwtPayload';
import { FileInterceptor } from "@nestjs/platform-express"
import { memoryStorage } from 'multer';
import { CloudinaryInterceptor } from './interceptor/cloudinary.interceptor';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

   
  @Get('get-user')
  @UseGuards(JwtAuthGuard)
  async GetUser(@Req() req:UserIdRequest){
    return this.usersService.getUser(req.user.id)
  }


  @Put('update-user')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseInterceptors(
    FileInterceptor("profileUrl", { storage: memoryStorage() }),
    CloudinaryInterceptor
  )
  async UpdateUser(@Body() updatedUserdto:UpdateUserDto,@Req() req:UserIdRequest,@UploadedFile() file: Express.Multer.File){

    if (file && req.body.profileUrl) {
      updatedUserdto.profileUrl = req.body.profileUrl;
    };

    return this.usersService.UpdateTheUser(req.user.id,updatedUserdto)
  }


}
