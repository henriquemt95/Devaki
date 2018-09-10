import * as firebase from 'firebase'
import * as firebaseui from 'firebaseui'
import configFirebase from './config';

var config = {
  apiKey: configFirebase.apiKey,
  authDomain: configFirebase.authDomain,
  databaseURL: configFirebase.databaseURL,
  storageBucket: configFirebase.storageBucket,
};
const admin = firebase.initializeApp(config);



export default admin;