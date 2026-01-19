import { render } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Zendash } from "../dist";

describe("Zendash Component", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should catch global window errors", () => {
    render(<Zendash />);

    const errorEvent = new ErrorEvent("error", {
      message: "Test error",
    });
    window.dispatchEvent(errorEvent);

    expect(console.log).toHaveBeenCalledWith("Error caught");
  });
});
