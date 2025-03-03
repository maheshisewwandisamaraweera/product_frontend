import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // Get the authorization header from the request
  const authHeader = req.headers.authorization;

  // If no authorization header or the header doesn't start with "Bearer ", return 401
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Not authorized' });
    return;
  }

  // Extract the token from the "Bearer <token>" format
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    // Optionally, you can attach the decoded token data to the request object for use in route handlers
    // req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If the token is invalid or expired, return a 401 Unauthorized error
    res.status(401).json({ message: 'Token not valid' });
  }
};