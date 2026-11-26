import { describe, expect, it } from "vitest";
import { opt } from "../scripts/lib/cli-opt.mts";

describe("scripts/lib/cli-opt opt()", () => {
  it("returns the value following a matching flag", () => {
    expect(opt(["--source", "met", "--limit", "50"], "source", null)).toBe(
      "met",
    );
    expect(opt(["--source", "met", "--limit", "50"], "limit", 0)).toBe("50");
  });

  it("returns the default when the flag is absent", () => {
    expect(opt(["--commit"], "tier", "display")).toBe("display");
    expect(opt([], "source", null)).toBeNull();
    expect(opt([], "min-bytes", 1048576)).toBe(1048576);
  });

  it("returns the default when a trailing flag has no following value", () => {
    expect(opt(["--limit"], "limit", 0)).toBe(0);
    expect(opt(["--source", "met", "--limit"], "limit", 25)).toBe(25);
    expect(opt(["--tier"], "tier", "display")).toBe("display");
    expect(opt(["--source"], "source", null)).toBeNull();
  });
});
