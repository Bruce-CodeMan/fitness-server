/*
 * @Date: 2023-04-07 13:52:44
 * @Author: Bruce
 * @Description: 
 */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JWT_SECRET } from '@/common/constants/jwt';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_SECRET,
        });
    }

    async validate(user): Promise<any> {
        if(!user.id){
            throw new UnauthorizedException();
        }
        return user;
    }
}

