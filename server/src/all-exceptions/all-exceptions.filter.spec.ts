import { HttpAdapterHost } from "@nestjs/core";
import { AllExceptionsFilter } from "./all-exceptions.filter";

describe("AllExceptionsFilter", () => {
  it("should be defined", () => {
    // Arrange
    const httpAdapterHost = new HttpAdapterHost();

    expect(new AllExceptionsFilter(httpAdapterHost)).toBeDefined();
  });
});
