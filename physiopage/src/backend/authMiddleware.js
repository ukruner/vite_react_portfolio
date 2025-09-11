import admin from 'firebase-admin';

export async function validateToken(req, res, next){

const sessionCookie = req.cookies.session || "";
console.log("middleware trying to execute");

if (!sessionCookie) {
    console.log("no session cookie")
    return res.status(401).send("Unauthorized")
  }

    try {
        await admin.auth().verifySessionCookie(sessionCookie, true);
        next();
    } catch (error) {
        console.error("Invalid token", error);
        console.log("invalid token")
        return res.status(401).send("Unauthorized");
    }
}