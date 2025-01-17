import { Test, TestingModule } from "@nestjs/testing";
import { StoriesService } from "./stories.service";
import { DataSource } from "typeorm";
import { UsersModule } from "../users/users.module";
import { FirebaseModule } from "../firebase/firebase.module";

describe("StoriesService", () => {
  let service: StoriesService;

  const mockRepository = {
    findOne: jest.fn(),
  };

  const mockDataSource = {
    getRepository: jest.fn().mockReturnValue(mockRepository),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, FirebaseModule],
      providers: [
        StoriesService,
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
      ],
    }).compile();

    service = module.get<StoriesService>(StoriesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
