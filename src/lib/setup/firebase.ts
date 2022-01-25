import * as admin from "firebase-admin";
import {firebaseConfig} from '../../config'
import { v4 } from "uuid";
import { ObjectId } from "mongoose";


const params = {
  type: firebaseConfig.type,
  projectId: firebaseConfig.project_id,
  privateKeyId: firebaseConfig.private_key_id,
  privateKey: firebaseConfig.private_key.replace(/\\n/g, '\n'),
  clientEmail: firebaseConfig.client_email,
  clientId: firebaseConfig.client_id,
  authUri: firebaseConfig.auth_uri,
  tokenUri: firebaseConfig.token_uri,
  authProviderX509CertUrl: firebaseConfig.auth_provider_x509_cert_url,
  clientC509CertUrl: firebaseConfig.client_x509_cert_url
}

admin.initializeApp({
    credential: admin.credential.cert(params),
  });

const db = admin.firestore();
const messaging = admin.messaging();



 export const adminNotification = async (adminId:string, data:any) => {
    const uuid = v4();
  
    const notification = {
      data,
      id: uuid,
      read: false,
      createdAt: Date.now(),
    };
  
    const usersDocRef = db
      .collection("admin")
      .doc(adminId)
      .collection("Notifications")
      .doc(uuid);
  
    return await usersDocRef.set(notification);
  };

  export const adminActivityNotification = async (adminId:string, data:any) => {
    const uuid = v4();
  
    const notification = {
      data,
      id: uuid,
      read: false,
      createdAt: Date.now(),
    };
  
    const usersDocRef =  db
      .collection("admin")
      .doc(adminId)
      .collection("Activity")
      .doc(uuid);
  
    return await usersDocRef.set(notification);
  };

  export const ownerNotification = async (ownerId:string, data:any) => {
    const uuid = v4();
  
    const notification = {
      data,
      id: uuid,
      read: false,
      createdAt: Date.now(),
    };
  
    const usersDocRef = db
      .collection("owner")
      .doc(ownerId)
      .collection("Notifications")
      .doc(uuid);
  
    return await usersDocRef.set(notification);
  };


  export const ownerActivityNotification = async (ownerId:string, data:any) => {
    const uuid = v4();
  
    const notification = {
      data,
      id: uuid,
      read: false,
      createdAt: Date.now(),
    };
  
    const usersDocRef = db
      .collection("owner")
      .doc(ownerId)
      .collection("Activity")
      .doc(uuid);
  
    return await usersDocRef.set(notification);
  };