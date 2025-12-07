// This helper sends the simple emails for goal commits and can be swapped out in tests.
import nodemailer from "nodemailer";

type GoalCommitEmailInput = {
  user: { id: string; email: string | null; name: string | null };
  learningGoal: string;
  journey: { id: string; personalizedForUserId?: string | null };
};

type MailOptions = {
  to: string;
  subject: string;
  html: string;
};

let transportPromise: Promise<nodemailer.Transporter> | null = null;
let testSender: ((options: MailOptions) => Promise<void>) | null = null;

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
  const profileLink = "https://www.leadership-factory.cn/my-profile";
  const adminLink = `https://www.leadership-factory.cn/admin/journeys/${journey.id}`;

  if (userEmail) {
    await sendMail({
      to: userEmail,
      subject: "Your new learning goal is confirmed",
      html: `
        <p>Hi${user.name ? ` ${user.name}` : ""},</p>
        <p>Your learning goal is now confirmed:</p>
        <p><strong>${learningGoal}</strong></p>
        <p>We are preparing your personalized journey. You can check in anytime here:</p>
        <p><a href="${profileLink}">${profileLink}</a></p>
        <p>Thank you,</p>
        <p>Leadership Factory</p>
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
