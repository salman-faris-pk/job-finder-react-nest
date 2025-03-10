import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from "@nestjs/jwt"
import { RegisterInputs } from "./dto/register.inputs"
import { CompanyRegisterDto } from "./dto/company.register"
import { LoginInputs } from "./dto/login.inputs"
import * as bcrypt from 'bcryptjs';
import * as argon2 from 'argon2';
import { AuthJwtpayload, GoogleUser, User } from './types/auth-jwtPayload';
import  refreshJwtConfig from "./config/refresh-jwt.config"
import { ConfigType } from '@nestjs/config';


@Injectable()
export class AuthService {

    constructor(
        private readonly prisma:PrismaService,
        private readonly jwtService:JwtService,
        @Inject(refreshJwtConfig.KEY)
        private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
    ){}


    async validateUser(email:string,password:string){
       const user=await this.findByEmail(email);
       if (!user) throw new UnauthorizedException('User not found!');
       const isPasswordMatch= await bcrypt.compare(password,user.password)
       if (!isPasswordMatch)
        throw new UnauthorizedException('Invalid credentials');

       return user;
    };

    async generatetoken(userId:string){
        const payload: AuthJwtpayload={ sub: userId};
        const [accessToken,refreshToken]= await Promise.all([
            this.jwtService.signAsync(payload),
            this.jwtService.signAsync(payload, this.refreshTokenConfig)
        ]);

        return {
            accessToken,
            refreshToken
        }
    };

    
    async findByEmail(email: string) {
        return await this.prisma.user.findUnique({
            where:{email}
        });
    };

    async registerUser(registerDto: RegisterInputs) {
       
        const {firstName,lastName,email,password}=registerDto;

        const userexists= await this.findByEmail(email);

        if (userexists) {
            throw new BadRequestException('Email Address already exists');
        };

        const hashedpassword=await bcrypt.hash(password,10);
        const user=await this.prisma.user.create({
            data:{
                firstName,
                lastName,
                email,
                password:hashedpassword
            }
        });

        const { accessToken,refreshToken}=await this.generatetoken(user.id);
        const hashedRefreshToken=await argon2.hash(refreshToken);
        await this.updateHashedRefreshToken(user.id,hashedRefreshToken)
        
        return {
            success: true,
            message: 'Account created successfully',
            refreshToken, // Interceptor will store this in cookies
            accessToken,  
            user: {
              _id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              accountType: user.accountType,
            },
          };
    };

    async updateHashedRefreshToken(userId:string,hashedrefreshtoken:string){
        return this.prisma.user.update({
            where:{ id: userId },
            data:{ hashedRefreshToken: hashedrefreshtoken }
        });
    };

    async LoginUser(user:User){
        
        const { accessToken,refreshToken}=await this.generatetoken(user.id);
        const hashedRefreshToken=await argon2.hash(refreshToken);
        await this.updateHashedRefreshToken(user.id,hashedRefreshToken)

        return {
            success: true,
            message: 'Login successfully',
            accessToken,
            refreshToken,
            user: {
                _id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                accountType: user.accountType,
            },
        };
    };

    async refreshingToken(userId:string){
      
        const {accessToken,refreshToken}=await this.generatetoken(userId);
        const hashedrefreshToken= await argon2.hash(refreshToken);
        await this.updateHashedRefreshToken(userId,hashedrefreshToken);
        return {
            id:userId,
            accessToken,
            refreshToken
        };
    };


    async updateHashedRefreshTokenInCompanyReg(compId:string,hashedrefreshtoken:string){
        return this.prisma.companies.update({
            where:{ id: compId },
            data:{ hashedRefreshToken: hashedrefreshtoken }
        });
    };

    async CompanyUserRegistration(compRegisDTO:CompanyRegisterDto){

        const{name,email,password}=compRegisDTO;

        const accountExist=await this.prisma.companies.findUnique({
            where:{email}
        });

        if (accountExist) {
            throw new BadRequestException('Email already exists,please try another email');
        };

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const company=await this.prisma.companies.create({
            data:{
                name,
                email,
                password:hashedPassword
            }
        });

        const { accessToken,refreshToken}=await this.generatetoken(company.id);
        const hashedRefreshToken=await argon2.hash(refreshToken);
        await this.updateHashedRefreshTokenInCompanyReg(company.id,hashedRefreshToken)

        return {
            success: true,
            message: "Company Account Created Successfully",
            accessToken,
            refreshToken,
            company: {
              _id: company.id,
              name: company.name,
              email: company.email,
            },
          };
          
    };

    async CompanySignIn(compLoginDTO:LoginInputs){
        const {email,password}=compLoginDTO;

        if (!email || !password) {
            throw new BadRequestException('Please provide user credentials');
        };

        const company=await this.prisma.companies.findUnique({
            where:{email}
        });

        if (!company) {
            throw new UnauthorizedException('Invalid email or password');
        };
      
        const isMatch = await bcrypt.compare(password, company.password);
          if (!isMatch) {
            throw new UnauthorizedException('Invalid password');
        };

        const { accessToken,refreshToken}=await this.generatetoken(company.id)
        const hashedRefreshToken=await argon2.hash(refreshToken);
        await this.updateHashedRefreshTokenInCompanyReg(company.id,hashedRefreshToken)

        const { password: _, ...companyDatas } = company; //removes password 

        return {
            success: true,
            message: "comapny Login SUccessfully",
            accessToken,
            refreshToken,
            company: companyDatas,
        };

    };



    async Logoutuser(){
      return {
        success: true,
        message: 'Logout successful',
        clearCookie: true,
    };

    }


    async validateJwtUser(userId:string){
       
        const User = await this.prisma.user.findUnique({ where: { id: userId } }) 
             || await this.prisma.companies.findUnique({ where: { id: userId } });
       
             if (!User) throw new UnauthorizedException('User not found!');

             const user={ id: User.id };
             return user;
   };

   async validateRefreshToken(userId:string,OldrefreshToken:string){
         const user=await this.prisma.user.findUnique({
            where:{id:userId}
         });

         if (!user || !user.hashedRefreshToken){
            throw new UnauthorizedException('Invalid Refresh Token');
         };

         const refreshTokenMatches = await argon2.verify(user.hashedRefreshToken, OldrefreshToken);

         if (!refreshTokenMatches) throw new UnauthorizedException('Invalid Refresh Token');

         return { id: userId };
   };
  


   async GoogleAuthentication(user:GoogleUser){

      const existinggUser=await this.prisma.user.findUnique({
        where:{email:user.email}
      });

      let loggedInUser;
      if(existinggUser){
        loggedInUser= existinggUser;

      }else{
         loggedInUser=await this.prisma.user.create({
            data:{
                firstName:user.firstName,
                lastName:user.lastName,
                email:user.email,
                profileUrl: user.profileUrl,
                password:"",
            },
         })
      }
      const accessToken=user.accessToken;

      return {
        success: true,
        message: 'Account logined or created successfully',
        accessToken,
        user: {
          _id: loggedInUser.id,
          firstName: loggedInUser.firstName,
          lastName: loggedInUser.lastName,
          email: loggedInUser.email,
          accountType: loggedInUser.accountType,
        },
      };

   };

   async validateGoogleUser(){
    
   }

    
};
