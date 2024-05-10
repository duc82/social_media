interface FilePreview extends File {
  preview: string;
}

interface PaginationLimit {
  page: number;
  limit: number;
}

interface Filter {
  search?: string;
  userId?: string;
}

type Options = PaginationLimit & Filter;

export type { FilePreview, PaginationLimit, Filter, Options };
