import { auth } from "./firebaseAdmin.js";


const user = auth.currentUser;

if (user) {
  const idToken = await user.getIdToken(); // this is a JWT
  console.log(idToken);
  // Send this token in the request header
  // e.g., Authorization: Bearer <idToken>
}else{
    console.log('Not Present');

}