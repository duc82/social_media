import { ButtonHTMLAttributes } from "react";

export interface FilePreview extends File {
  preview: string;
}

export interface PaginationLimit {
  page: number;
  limit: number;
}

export interface Filter {
  search?: string;
  userId?: string;
}

export interface Options extends PaginationLimit, Filter {
  tags?: string[];
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
