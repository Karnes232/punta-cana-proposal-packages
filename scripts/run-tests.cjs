const { spawnSync } = require("node:child_process");
for (const args of [
  [
    "node_modules/typescript/bin/tsc",
    "src/lib/experience/pricing.ts",
    "src/lib/experience/types.ts",
    "--outDir",
    "work/pricing-tests",
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
