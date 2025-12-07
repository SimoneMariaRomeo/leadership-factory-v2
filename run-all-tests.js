// This simple script runs every test suite one after another and stops if any fail.
const { spawnSync } = require("child_process");

const commands = [
  "npm run test:schema-and-seed",
  "npm run test:public-funnel",
  "npm run test:step4-create-learning-goal",
  "npm run test:goal-commit",
  "npm run test:need-analysis-chat",
];

for (const command of commands) {
  console.log(`\n[run-all-tests] Running: ${command}`);
  const [cmd, ...args] = command.split(" ");
  const result = spawnSync(cmd, args, { stdio: "inherit", shell: true });
  if (result.status !== 0) {
    console.error(`[run-all-tests] Failed on: ${command}`);
    process.exit(result.status || 1);
  }
}

console.log("\n[run-all-tests] All tests completed successfully.");
