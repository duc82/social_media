import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FilesService } from "./files.service";
import { FilesInterceptor } from "@nestjs/platform-express";

@Controller("api/files")
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Post("upload")
  @UseInterceptors(
    FilesInterceptor("files", 10, {
      limits: {
        fileSize: 1024 * 1024 * 10, // 10MB,
      },
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
          return cb(
            new BadRequestException("Only image files are allowed!"),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  uploadFile(
    @UploadedFiles()
    files: Array<Express.Multer.File>,
  ) {
    return this.filesService.upload(files);
  }

  @Delete("delete/:path")
  deleteFile(@Param("path") path: string) {
    return this.filesService.delete(path);
  }
}
