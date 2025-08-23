import admin from "firebase-admin";
import { createRequire } from "module";
import dotenv from "dotenv";

const require = createRequire(import.meta.url);

dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL
});
const auth = admin.auth();
const db = admin.firestore();
const rtdb = admin.database();

export { db, rtdb, auth };
