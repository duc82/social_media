import { Bucket } from "@google-cloud/storage";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { cert, initializeApp, ServiceAccount } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import serviceAccount from "../../../social-media-duc82-firebase-adminsdk.json";
import { FileType } from "src/enums/file.enum";

@Injectable()
export class FirebaseService {
  private readonly bucket: Bucket;

  constructor(private configService: ConfigService) {
    const app = initializeApp({
      credential: cert(serviceAccount as string | ServiceAccount),
      storageBucket: configService.getOrThrow<string>(
        "FIREBASE_STORAGE_BUCKET",
      ),
    });
    const storage = getStorage(app);
    this.bucket = storage.bucket();
  }

  async uploadFile(file: Express.Multer.File | Buffer, path: string) {
    const fileRef = this.bucket.file(path);

    await fileRef.save(file instanceof Buffer ? file : file.buffer, {
      metadata: {
        contentType: file instanceof Buffer ? "image/png" : file.mimetype,
      },
    });

    await fileRef.makePublic();
    const url = fileRef.publicUrl();
    return url;
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