import { Injectable } from "@nestjs/common";
import { UploadApiOptions, v2 as cloudinary } from "cloudinary";
import { CloudinaryResponse } from "./cloudinary.interface";

@Injectable()
export class CloudinaryService {
  async uploadFile(
    file: Express.Multer.File,
    options?: UploadApiOptions,
  ): Promise<CloudinaryResponse> {
    const cloudinaryResponse = await cloudinary.uploader.upload(file.path, {
      folder: "social_media",
      ...options,
    });
    return cloudinaryResponse;
  }

  uploadFileFromBuffer(
    buffer: Buffer,
    options?: UploadApiOptions,
  ): Promise<CloudinaryResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "social_media", ...options },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        )
        .end(buffer);
    });
  }
}
