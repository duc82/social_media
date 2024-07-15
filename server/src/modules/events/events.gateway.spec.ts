import { Test, TestingModule } from "@nestjs/testing";
import { EventsGateway } from "./events.gateway";
import { AppModule } from "src/app.module";

describe("EventsGateway", () => {
  let gateway: EventsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    gateway = module.get<EventsGateway>(EventsGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
