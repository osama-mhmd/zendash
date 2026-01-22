import { render } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Zendash } from "../src";

const options = {
  apiKey: process.env.APIKEY!,
  origin: process.env.BACKEND_URL!,
};

describe("Zendash Component", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should catch global window errors", () => {
    render(<Zendash options={options} />);

    const errorEvent = new ErrorEvent("error", {
      message: "Test error",
    });
    window.dispatchEvent(errorEvent);

    expect(console.log).toHaveBeenCalledWith("Error caught");
  });
});
