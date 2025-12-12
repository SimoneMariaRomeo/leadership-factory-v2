// Simple importer: reads Excel files with journeys/outlines and upserts them via Prisma.
// Run with: node scripts/import-learning-data.js (ensure DATABASE_URL is set).
const XLSX = require('xlsx');
const { PrismaClient } = require('../generated/prisma');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is missing');
}

const pool = new Pool({ connectionString });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

async function loadJourneys() {
  const wb = XLSX.readFile('docs/journeys-to-add.xlsx');
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });
  let count = 0;
  for (const row of rows) {
    const slug = String(row.slug || '').trim();
    const title = String(row.title || '').trim();
    if (!slug || !title) continue;
    const intro = String(row.intro || '').trim() || null;
    const objectivesText = String(row.objectives || '').trim();
    const objectives = objectivesText ? objectivesText.split(/\r?\n/).map((l) => l.trim()).filter(Boolean) : [];
    await prisma.learningJourney.upsert({
      where: { slug },
      update: {
        title,
        intro,
        objectives,
        isStandard: true,
        status: 'active',
      },
      create: {
        slug,
        title,
        intro,
        objectives,
        isStandard: true,
        status: 'active',
      },
    });
    count += 1;
  }
  console.log(`Upserted ${count} journeys.`);
}

function buildBotTools() {
  return [
    'TOOLS AND JSON COMMANDS',
    'When the user reaches their aha moment, send exactly this JSON (and nothing else):',
    '{"command":"update_aha","aha":"<one short paragraph recapping the user aha>"}',
    'Rules: only send once, no extra text before or after, keep aha concise.',
    'If the step is clearly finished, you may also send {"command":"mark_step_completed"}.',
  ].join('\n');
}

function defaultFirstUserMessage() {
  return 'To start, what feels most relevant about this topic for you right now?';
}

async function loadOutlines() {
  const wb = XLSX.readFile('docs/outlines-to-add.xlsx');
  const botTools = buildBotTools();
  const firstMsg = defaultFirstUserMessage();
  let total = 0;
  for (const name of wb.SheetNames) {
    const ws = wb.Sheets[name];
    const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });
    let order = 1;
    for (const row of rows) {
      const slug = String(row.slug || '').trim();
      const title = String(row.title || '').trim();
      if (!slug || !title) continue;
      const objective = String(row.objective || '').trim() || null;
      const content = String(row.content || '').trim();
      if (!content) continue;
      await prisma.learningSessionOutline.upsert({
        where: { slug },
        update: {
          title,
          objective,
          content,
          botTools,
          firstUserMessage: firstMsg,
          live: false,
          order,
        },
        create: {
          slug,
          title,
          objective,
          content,
          botTools,
          firstUserMessage: firstMsg,
          live: false,
          order,
          tags: null,
        },
      });
      order += 1;
      total += 1;
    }
  }
  console.log(`Upserted ${total} outlines.`);
}

async function main() {
  await loadJourneys();
  await loadOutlines();
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
