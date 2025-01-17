import { Injectable } from "@nestjs/common";
import { FirebaseService } from "../firebase/firebase.service";

@Injectable()
export class FilesService {
  constructor(private firebaseService: FirebaseService) {}

  async upload(files: Array<Express.Multer.File>) {
    const data = await this.firebaseService.uploadFiles(files, "images");

    return {
      message: "Files uploaded successfully!",
      data,
    };
  }

  async delete(path: string) {
    await this.firebaseService.deleteFile(path);

    return {
      message: "File deleted successfully!",
    };
  }
}
