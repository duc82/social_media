import { Bucket } from "@google-cloud/storage";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { cert, initializeApp, ServiceAccount } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import { Auth, getAuth } from "firebase-admin/auth";
import { FileType } from "src/enums/file.enum";
import serviceAccount from "src/configs/firebase_service_account.json";

@Injectable()
export class FirebaseService {
  public readonly bucket: Bucket;

  public readonly auth: Auth;

  constructor(private configService: ConfigService) {
    const app = initializeApp({
      credential: cert(serviceAccount as ServiceAccount),
      storageBucket: configService.getOrThrow<string>(
        "FIREBASE_STORAGE_BUCKET",
      ),
    });
    const storage = getStorage(app);
    const auth = getAuth(app);
    this.bucket = storage.bucket();
    this.auth = auth;
  }

  async uploadFile(file: Express.Multer.File | Buffer, path: string) {
    try {
      const fileRef = this.bucket.file(path);

      await fileRef.save(file instanceof Buffer ? file : file.buffer, {
        metadata: {
          contentType: file instanceof Buffer ? "image/png" : file.mimetype,
        },
      });

      await fileRef.makePublic();
      const url = fileRef.publicUrl();
      return url;
    } catch (error) {
      console.log(error);
      throw error;
    }
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
