import admin from 'firebase-admin';
import { sessionLoginRateLimit, resetSessionLoginLimit } from './ratelimit.js';

export async function validateToken(req, res, next){

const sessionCookie = req.cookies.session || "";

if (!sessionCookie) {
    console.log("no session cookie")
    return res.status(401).json({
      
        error: "Action not permitted, please log in",
        status: 401
      
    })
  }

    try {
        await admin.auth().verifySessionCookie(sessionCookie, true);
        next();
    } catch (error) {
        console.error("Invalid token", error);
        console.log("invalid token")
        return res.status(401).json({
      
        error: "Action not permitted, please log in",
        status: 401
      
    });
    }
};

export const authRateLimit = sessionLoginRateLimit;
export const resetAuthAttempts = resetSessionLoginLimit;
