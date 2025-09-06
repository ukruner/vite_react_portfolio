import admin from 'firebase-admin';

export async function validateToken(req, res, next){

const token = req.headers.authorization?.split("Bearer ")[1];

    try {
        await admin.auth().verifyIdToken(token);
        next();
    } catch (error) {
        console.error("Invalid token", error);
        return res.status(401).send("Unauthorized");
    }
}