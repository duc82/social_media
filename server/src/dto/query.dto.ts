import { IntersectionType } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsOptional, IsString } from "class-validator";

export class SearchDto {
  @IsOptional()
  @IsString()
  search: string = "";
}

export class PaginationLimitDto {
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  page: number = 1;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  limit: number = 10;
}

export class QueryDto extends IntersectionType(SearchDto, PaginationLimitDto) {}
