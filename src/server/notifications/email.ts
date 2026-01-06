// This helper sends the simple emails for goal commits and can be swapped out in tests.
import nodemailer from "nodemailer";

type GoalCommitEmailInput = {
  user: { id: string; email: string | null; name: string | null };
  learningGoal: string;
  journey: { id: string; personalizedForUserId?: string | null };
};

type JourneyActivatedEmailInput = {
  user: { id: string; email: string | null; name: string | null };
  journey: { id: string; slug: string | null };
};

type MailOptions = {
  to: string;
  subject: string;
  html: string;
};

let transportPromise: Promise<nodemailer.Transporter> | null = null;
let testSender: ((options: MailOptions) => Promise<void>) | null = null;

// This reads the website URL so email links point to the right place.
function getProductionUrl() {
  const configured = (process.env.PRODUCTION_URL || "").trim();
  const base = configured || "http://localhost:3000";
  return base.endsWith("/") ? base.slice(0, -1) : base;
}

// This lets tests provide a fake sender.
export function setTestEmailSender(sender: ((options: MailOptions) => Promise<void>) | null) {
  testSender = sender;
}

// This loads the SMTP settings and builds the transporter once.
async function getTransporter() {
  if (transportPromise) return transportPromise;

  const host = process.env.NOTIFICATION_EMAIL_SMTP_HOST;
  const port = Number(process.env.NOTIFICATION_EMAIL_SMTP_PORT || 587);
  const secure = String(process.env.NOTIFICATION_EMAIL_SMTP_SECURE || "").toLowerCase() === "true";
  const user = process.env.NOTIFICATION_EMAIL_SMTP_USER;
  const pass = process.env.NOTIFICATION_EMAIL_SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("Missing SMTP configuration for notifications.");
  }

  transportPromise = Promise.resolve(
    nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    })
  );

  return transportPromise;
}

// This small helper sends a single email, real or mocked.
async function sendMail(options: MailOptions) {
  const from = process.env.NOTIFICATION_EMAIL_FROM || process.env.NOTIFICATION_EMAIL_SMTP_USER || "";

  if (testSender) {
    await testSender({ ...options, html: options.html });
    return;
  }

  const transporter = await getTransporter();
  await transporter.sendMail({ ...options, from });
}

// This sends both the user and admin emails for a goal commit.
export async function sendGoalCommitEmails({ user, learningGoal, journey }: GoalCommitEmailInput) {
  const userEmail = user.email;
  const adminEmail = process.env.NOTIFICATION_EMAIL_TO;
  const baseUrl = getProductionUrl();
  const profileLink = `${baseUrl}/my-profile`;
  const adminLink = `${baseUrl}/admin/journeys/${journey.id}`;

  if (userEmail) {
    await sendMail({
      to: userEmail,
      subject: "You’ve committed. Now let’s build around you",
      html: `
        <p>Hi${user.name ? ` ${user.name}` : ""},</p>

        <p>You just did something many people put off: you made a conscious choice about how you want to develop.</p>

        <p><strong style="color:#c79d2d;">Your goal:</strong><br/>
        <strong style="color:#c79d2d;">${learningGoal}</strong></p>

        <p>
        From here, We’ll start shaping a personalized learning journey <em>with you</em>: grounded in your context, your constraints, and what will actually help you push your growth boundaries.
        </p>

        <p>
        <strong>You don’t need to do anything right now. We’ll email you when the first step is ready (usually within a few days).</strong>
        </p>

        <p>
        Talk soon,<br/>
        Simone<br/>
        Leadership Factory
        </p>
      `.trim(),
    });
  }

  if (adminEmail) {
    await sendMail({
      to: adminEmail,
      subject: `New learning goal from ${userEmail || "unknown user"}`,
      html: `
        <p>User email: ${userEmail || "unknown"}</p>
        <p>Learning goal:</p>
        <p><strong>${learningGoal}</strong></p>
        <p>Journey id: ${journey.id}</p>
        <p>Review link: <a href="${adminLink}">${adminLink}</a></p>
      `.trim(),
    });
  }
}

// This tells a user when their personalized journey is ready to start.
export async function sendJourneyActivatedEmail({ user, journey }: JourneyActivatedEmailInput) {
  const userEmail = user.email;
  if (!userEmail) return;

  const baseUrl = getProductionUrl();
  const journeySlugOrId = journey.slug || journey.id;
  const journeyLink = `${baseUrl}/journeys/${journeySlugOrId}?userId=${encodeURIComponent(user.id)}`;

  await sendMail({
    to: userEmail,
    subject: "Begin before you feel ready",
    html: `
      <p>Hi${user.name ? ` ${user.name}` : ""},</p>
  
      <p>You trusted us with your goal and we designed a learning journey just <strong>for you.</strong></p>
  
      <p>It’s ready now and it starts here:</p>
  
      <p><a href="${journeyLink}">Open your journey</a></p>
  
      <p>Do the smallest “brave” action you can take today — the one you’d usually postpone.</p>
  
      <p>Simone<br/>
      Leadership Factory</p>
    `.trim(),
  });
}
