// This test reads the real database and confirms the admin account exists with the admin role.
const path = require("path");
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("../generated/prisma");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

// Simple logger for readability.
function logTest(title, expectation) {
  console.log(`\n[Test] ${title}`);
  console.log(`- Expectation: ${expectation}`);
}

// Basic assertion helper.
function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function main() {
  logTest("Admin is present in the database", "There is a user admin@leadership-factory.cn with role admin.");

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  const admin = await prisma.user.findUnique({
    where: { email: "admin@leadership-factory.cn" },
    select: { id: true, email: true, name: true, role: true },
  });

  assert(admin, "Admin user should exist in the live database.");
  assert(admin.role === "admin", "Admin user should have role admin.");
  console.log("  ok: Admin user exists with role admin.");

  await prisma.$disconnect();
  await pool.end();
}

main().catch((error) => {
  console.error("\nTest run failed:", error);
  process.exit(1);
});
