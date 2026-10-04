const { spawnSync } = require("node:child_process");
const { rmSync } = require("node:fs");

// Compile the pricing code fresh every run: a stale build in work/ must never
// let a test pass against code that no longer exists.
const out = "work/pricing-tests";
rmSync(out, { recursive: true, force: true });

for (const args of [
  [
    "node_modules/typescript/bin/tsc",
    "src/lib/experience/pricing.ts",
    "src/lib/experience/types.ts",
    "--outDir",
    out,
    // Keep src/ paths in the output (lib/experience/pricing.js, …).
    "--rootDir",
    "src",
    "--module",
    "commonjs",
    "--target",
    "ES2020",
    "--skipLibCheck",
    "--esModuleInterop",
  ],
  [
    "--test",
    "tests/pricing.test.cjs",
    "tests/components.test.cjs",
    "tests/requests.test.cjs",
  ],
]) {
  const run = spawnSync(process.execPath, args, { stdio: "inherit" });
  if (run.status !== 0) process.exit(run.status || 1);
}
