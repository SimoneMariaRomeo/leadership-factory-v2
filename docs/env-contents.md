##.env Contents:
DATABASE_URL="postgresql://postgres:<pw>@127.0.0.1:5432/lf2_local?schema=public"
SHADOW_DATABASE_URL="postgresql://postgres:<pw>@127.0.0.1:5432/lf2_shadow?schema=public"

JWT_SECRET="..."

ALIBABA_CLOUD_API_KEY=sk-...
OPENAI_API_KEY=sk-proj-...

NOTIFICATION_EMAIL_SMTP_HOST=smtp.gmail.com
NOTIFICATION_EMAIL_SMTP_PORT=465
NOTIFICATION_EMAIL_SMTP_SECURE=true
NOTIFICATION_EMAIL_SMTP_USER=...@gmail.com
NOTIFICATION_EMAIL_SMTP_PASS=...
NOTIFICATION_EMAIL_FROM="Leadership Factory <...@gmail.com>"
NOTIFICATION_EMAIL_TO=...@gmail.com

DEFAULT_API="aliyun"   # set to "chatgpt" to switch providers
