import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

@Injectable()
export class GroupsService {
  constructor(private dataSource: DataSource) {}

  async create() {}
}
