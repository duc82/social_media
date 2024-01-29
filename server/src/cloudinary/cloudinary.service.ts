import { Injectable } from "@nestjs/common";
import { UploadApiOptions, v2 as cloudinary } from "cloudinary";
import { CloudinaryResponse } from "./cloudinary.interface";

@Injectable()
export class CloudinaryService {
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
