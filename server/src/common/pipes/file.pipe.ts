import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "video/mp4",
  "video/avi",
  "video/webm",
];

@Injectable()
export class FileMimeTypeValidationPipe implements PipeTransform {
  transform(file: Express.Multer.File) {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid file type: ${file.originalname}. Only images and videos are allowed.`,
      );
    }

    return file;
  }
}

@Injectable()
export class FilesArrayMimeTypeValidationPipe implements PipeTransform {
  transform(files: Express.Multer.File[]) {
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
