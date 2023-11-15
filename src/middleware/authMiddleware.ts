import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: {
    username: string;
    roles: string[];
  };
}

const authMiddleware = (role: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    const secretKey = process.env.SECRET_KEY as Secret;

    if (!secretKey) {
      return res.status(500).json({ message: 'Internal Server Error. JWT secret key is not defined.' });
    }

    try {
      const decoded = jwt.verify(token, secretKey) as { username: string; roles: string[] };
      // console.log('Decoded Token:', decoded);
      const userRoles = decoded.roles || [];

      if (!userRoles.includes(role)) {
        return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      }

      req.user = decoded;
      next();
    } catch (ex) {
      res.status(400).json({ message: 'Invalid token.' });
    }
  };
};

export default authMiddleware;
