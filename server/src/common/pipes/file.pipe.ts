import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class FilesArrayMimeTypeValidationPipe implements PipeTransform {
  transform(files: Express.Multer.File[]) {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "video/mp4",
      "video/avi",
      "video/webm",
    ];

    files.forEach((file) => {
      if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new BadRequestException(
          `Invalid file type: ${file.originalname}. Only images and videos are allowed.`,
        );
      }
    });

    return files;
  }
}
