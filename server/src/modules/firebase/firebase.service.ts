import { Bucket } from "@google-cloud/storage";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { cert, initializeApp, ServiceAccount } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import { Auth, getAuth } from "firebase-admin/auth";
import { FileType } from "src/enums/file.enum";

@Injectable()
export class FirebaseService {
  public readonly bucket: Bucket;
  private readonly serviceAccount = {
    type: this.configService.getOrThrow<string>("FIREBASE_TYPE"),
    project_id: this.configService.getOrThrow<string>("FIREBASE_PROJECT_ID"),
    private_key_id: this.configService.getOrThrow<string>(
      "FIREBASE_PRIVATE_KEY_ID",
    ),
    private_key: this.configService.getOrThrow<string>("FIREBASE_PRIVATE_KEY"),
    client_email: this.configService.getOrThrow<string>(
      "FIREBASE_CLIENT_EMAIL",
    ),
    client_id: this.configService.getOrThrow<string>("FIREBASE_CLIENT_ID"),
    auth_uri: this.configService.getOrThrow<string>("FIREBASE_AUTH_URI"),
    token_uri: this.configService.getOrThrow<string>("FIREBASE_TOKEN_URI"),
    auth_provider_x509_cert_url: this.configService.getOrThrow<string>(
      "FIREBASE_AUTH_PROVIDER_X509_CERT_URL",
    ),
    client_x509_cert_url: this.configService.getOrThrow<string>(
      "FIREBASE_CLIENT_X509_CERT_URL",
    ),
    universe_domain: this.configService.getOrThrow<string>(
      "FIREBASE_UNIVERSE_DOMAIN",
    ),
  } as ServiceAccount;
  public readonly auth: Auth;

  constructor(private configService: ConfigService) {
    const app = initializeApp({
      credential: cert(this.serviceAccount),
      storageBucket: configService.getOrThrow<string>(
        "FIREBASE_STORAGE_BUCKET",
      ),
    });
    const storage = getStorage(app);
    const auth = getAuth(app);
    this.bucket = storage.bucket();
    this.auth = auth;
  }

  async uploadFile(file: Express.Multer.File, path: string) {
    const fileRef = this.bucket.file(path);

    await fileRef.save(file.buffer, {
      metadata: {
        contentType: file.mimetype,
      },
    });

    await fileRef.makePublic();
    const url = decodeURIComponent(fileRef.publicUrl());
    return `${url}?time=${Date.now()}`;
  }

  async uploadFileFromBuffer(buffer: Buffer, path: string) {
    const fileRef = this.bucket.file(path);

    await fileRef.save(buffer, {
      metadata: {
        contentType: "image/png",
      },
    });

    await fileRef.makePublic();
    return fileRef.publicUrl();
  }

  async uploadFiles(files: Array<Express.Multer.File>, folder: string) {
    return await Promise.all(
      files.map(async (file) => {
        const path = `${folder}/${file.originalname}`;
        const url = await this.uploadFile(file, path);
        const type = file.mimetype.split("/")[0] as FileType;
        return { path, url, type };
      }),
    );
  }

  async deleteFile(path: string) {
    const file = this.bucket.file(path);
    await file.delete();
  }
}
