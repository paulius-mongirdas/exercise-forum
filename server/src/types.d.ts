import * as express from 'express';
import { Request, Response } from 'express';

declare global {
  namespace Express {
    interface Request {
      userId?: number;
      userRole?: string;
    }
  }
}