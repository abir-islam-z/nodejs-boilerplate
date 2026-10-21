import type { DecodedJWTPayload } from './jwtdecoded.ts';

declare global {
  namespace Express {
    interface Request {
      user: DecodedJWTPayload;
    }
  }
}
