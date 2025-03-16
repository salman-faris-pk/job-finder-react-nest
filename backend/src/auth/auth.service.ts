import { BadRequestException, Inject, Injectable,NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from "@nestjs/jwt"
import { RegisterInputs } from "./dto/register.inputs"
import { CompanyRegisterDto } from "./dto/company.register"
import { LoginInputs } from "./dto/login.inputs"
import * as bcrypt from 'bcryptjs';
import * as argon2 from 'argon2';
import { AuthJwtpayload,User } from './types/auth-jwtPayload';
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
       if (!user) throw new NotFoundException('User not found!');
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
        const {firstName,lastName,email,password,profileUrl}=registerDto;

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
                profileUrl,
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
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              profileUrl: user.profileUrl,
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
                profileUrl: user.profileUrl,
                accountType: user.accountType,
            },
        };
    };


    async updateHashedRefreshTokenInCompanyReg(compId:string,hashedrefreshtoken:string){
        return this.prisma.companies.update({
            where:{ id: compId },
            data:{ hashedRefreshToken: hashedrefreshtoken }
        });
    };

    async refreshingToken(userId: string) {
        const { accessToken, refreshToken } = await this.generatetoken(userId);
        const hashedrefreshToken = await argon2.hash(refreshToken);
    
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
            
        if (user) {
            const updatedUser = await this.updateHashedRefreshToken(userId, hashedrefreshToken);
            if (updatedUser && updatedUser.hashedRefreshToken) {
                return {
                    id: userId,
                    accessToken,
                    refreshToken,
                };
            }
        } else {
            const company = await this.prisma.companies.findUnique({
                where: { id: userId },
            });                
            if (company) {
                const updatedCompany = await this.updateHashedRefreshTokenInCompanyReg(userId, hashedrefreshToken);
                if (updatedCompany && updatedCompany.hashedRefreshToken) {
                    return {
                        id: userId,
                        accessToken,
                        refreshToken,
                    };
                }
            }
        }
    
        throw new NotFoundException('Failed to update refresh token: User or Company not found');
    }


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



    async Logoutuser(userId: string) {
                
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (user) {
            await this.updateHashedRefreshToken(userId, "");
            return { success: true, message: 'User logout successful', clearCookie: true };
        }
    
        const company = await this.prisma.companies.findUnique({ where: { id: userId } });
        if (company) {
            await this.updateHashedRefreshTokenInCompanyReg(userId, "");
            return { success: true, message: 'Company logout successful', clearCookie: true };
        }
    
        throw new NotFoundException('User or Company not found');
    };


    async validateJwtUser(userId:string){
        
        const User = await this.prisma.user.findUnique({ where: { id: userId } }) 
             || await this.prisma.companies.findUnique({ where: { id: userId } });
      
             if (!User) throw new UnauthorizedException('User not found!');

             const user={ id: User.id };
             return user;
   };


   async validateRefreshToken(userId:string,OldrefreshToken:string){
    
    const user = await this.prisma.user.findUnique({
        where: { id: userId }
    });

    if (user && user.hashedRefreshToken) {
        const refreshTokenMatche = await argon2.verify(user.hashedRefreshToken, OldrefreshToken);
        if (!refreshTokenMatche) {
            throw new UnauthorizedException('Invalid Refresh Token');
        }
        return { id: userId }; 
    }

    const company = await this.prisma.companies.findUnique({
        where: { id: userId }
    });

    if (company && company.hashedRefreshToken) {
        const refreshTokenMatches = await argon2.verify(company.hashedRefreshToken, OldrefreshToken);
        
        if (!refreshTokenMatches) {
            throw new UnauthorizedException('Invalid Refresh Token');
        }
        return { id: userId};
    }

    throw new UnauthorizedException('Invalid Refresh Token');

   };
  

   async validateGoogleUser(googleUser:RegisterInputs){
    const { email }=googleUser;

    const user=await this.findByEmail(email);
    if(user) return user;    
    
     const regUser=await this.registerUser(googleUser);
     if(regUser) return regUser.user;
    
   };

    
};
