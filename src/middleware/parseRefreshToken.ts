import { expressjwt } from 'express-jwt';
import { Request } from 'express';
import { configENV } from '../config/config';
import { AuthCookies } from '../Types';

export default expressjwt({
  secret: configENV.refreshTokenSecret,
  algorithms: ['HS256'],
  // get refresh token
  getToken(req: Request) {
    const { refreshToken } = req.cookies as AuthCookies;

    return refreshToken;
  },
});
