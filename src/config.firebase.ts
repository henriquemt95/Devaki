import * as admin from 'firebase-admin'
import serviceAccount from './config';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://devaki-wallet.firebaseio.com"
});

export default admin;