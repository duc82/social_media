import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as admin from "firebase-admin";
import serviceAccountKey from "./serviceAccountKey.json";

@Injectable()
export class FirebaseService {
  constructor(private configService: ConfigService) {
    admin.initializeApp({
      credential: admin.credential.cert(
        serviceAccountKey as admin.ServiceAccount,
      ),
      storageBucket: this.configService.get<string>("FIREBASE_STORAGE_BUCKET"),
    });
  }
}
