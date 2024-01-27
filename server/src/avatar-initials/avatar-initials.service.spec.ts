import { Test, TestingModule } from '@nestjs/testing';
import { AvatarInitialsService } from './avatar-initials.service';

describe('AvatarInitialsService', () => {
  let service: AvatarInitialsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AvatarInitialsService],
    }).compile();

    service = module.get<AvatarInitialsService>(AvatarInitialsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
