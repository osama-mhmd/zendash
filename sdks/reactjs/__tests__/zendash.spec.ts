import { expect, vi, test } from "vitest";
import { Zendash } from "../src";

// @ts-expect-error
const dns = process.env.APIKEY!;

test("should capture uncaught exceptions after init", async () => {
  const mockSend = vi.spyOn(Zendash, "send");

  Zendash.init({ dns });

  const error = new Error("Test Error");
  window.dispatchEvent(new ErrorEvent("error", { error }));

  expect(mockSend).toHaveBeenCalled();
});
