import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from "@nestjs/jwt"
import { RegisterInputs } from "./dto/register.inputs"
import { CompanyRegisterDto } from "./dto/company.register"
import { LoginInputs } from "./dto/login.inputs"
import * as bcrypt from 'bcryptjs';
import { AuthJwtpayload } from './types/auth-jwtPayload';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {

    constructor(
        private readonly prisma:PrismaService,
        private readonly jwtService:JwtService,
        private readonly configService: ConfigService
    ){}


    async generatetoken(userId:string){
        const payload: AuthJwtpayload={ sub: userId};
        const accessToken= await this.jwtService.signAsync(payload,{
            expiresIn: this.configService.get<string>('JWT_EXPIRES_IN') || '2d',
        });
        return { accessToken }
    };


    async registerUser(registerDto: RegisterInputs) {
       
        const {firstName,lastName,email,password}=registerDto;

        const userexists= await this.prisma.user.findUnique({
            where:{email}
        });

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

        const { accessToken }=await this.generatetoken(user.id);
       
        return {
            success: true,
            message: 'Account created successfully',
            accessToken,  // Interceptor will store this in cookies
            user: {
              _id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              accountType: user.accountType,
            },
          };
    };


    async LoginUser(logindto:LoginInputs){
        
        const {email,password}=logindto;

        if (!email || !password) {
            throw new BadRequestException('Please provide user credentials');
        };

        const user= await this.prisma.user.findUnique({
            where:{email}
        });

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        };
      
        const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            throw new UnauthorizedException('Invalid password');
        };

        const { accessToken }=await this.generatetoken(user.id);
      

        return {
            success: true,
            message: 'Login successfully',
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


    async validateJwtUser(userId:string){
       
         const User = await this.prisma.user.findUnique({ where: { id: userId } }) 
              || await this.prisma.companies.findUnique({ where: { id: userId } });
        
              if (!User) throw new UnauthorizedException('User not found!');

              const user={ id: User.id };
              return user;
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

        const { accessToken }=await this.generatetoken(company.id);

        return {
            success: true,
            message: "Company Account Created Successfully",
            accessToken,
            user: {
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

        const { accessToken }=await this.generatetoken(company.id)
        
        const { password: _, ...companyDatas } = company; //removes password 

        return {
            success: true,
            message: "Login SUccessfully",
            accessToken,
            user: companyDatas,
        };

    };

    
};
