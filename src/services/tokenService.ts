import createHttpError from 'http-errors';
import { JwtPayload, sign } from 'jsonwebtoken';
import { RefreshToken } from '../database/entities/RefreshToken';
import logger from '../config/logger';
import { configENV } from '../config/config';
import { NODE_ENV_VAL } from '../utils/constant';
import { getFileFromS3 } from './s3Service';
import { UserCreateType } from '../Types/auth';
import { getRefreshTokenRepository, isLeapYear } from '../utils/common';

export const generateAccessToken = async (
  payload: JwtPayload,
): Promise<string> => {
  let privateKey: string | undefined;

  console.log('--------nodeEnv', configENV.nodeEnv);

  try {
    if (configENV.nodeEnv !== NODE_ENV_VAL.TEST) {
      // Fetch the private key from S3
      const bucketName = configENV.awsS3BucketName;
      const key = configENV.awsS3URI;

      if (!bucketName || !key) {
        throw createHttpError(500, 'S3 bucket name or key not provided');
      }

      privateKey = await getFileFromS3(bucketName, key);
      logger.info('--- s3 connected successfully!');

      if (!privateKey) {
        throw createHttpError(500, 'Private key not found in S3');
      }
    } else if (configENV.privatekey) {
      // privateKey = configEnv.privatekey.replace(/\\n/g, '\n');
      privateKey = configENV.privatekey;
    } else {
      throw createHttpError(500, 'Private key not found in configuration');
    }
  } catch (err) {
    if (err instanceof Error) {
      throw createHttpError(500, `${err.message}`);
    }
    throw createHttpError(500, 'Error while reading private key');
  }

  try {
    const accessToken = sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '1h',
      issuer: 'Auth-services',
    });
    return accessToken;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    throw createHttpError(500, 'Error generating access token');
  }
};

export const generateRefreshToken = (payload: JwtPayload): string => {
  const refreshToken = sign(payload, configENV.refreshTokenSecret, {
    algorithm: 'HS256',
    expiresIn: '1y',
    issuer: 'Auth-services',
    jwtid: payload.id.toString(), //embed the refresh token id
  });
  return refreshToken;
};

export const persistRefreshToken = async (
  user: UserCreateType,
): Promise<RefreshToken> => {
  const MS_IN_YEAR = isLeapYear(new Date().getFullYear());

  const refreshTokenRepository = await getRefreshTokenRepository();
  const newRefreshToken = await refreshTokenRepository.save({
    user: user,
    expiresAt: new Date(Date.now() + MS_IN_YEAR),
  });
  return newRefreshToken;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const deleteRefreshToken = async (tokenId: number) => {
  const refreshTokenRepository = await getRefreshTokenRepository();
  return refreshTokenRepository.delete({ id: tokenId });
};
