###On the server

ssh root@47.101.168.147
cd /root/leadership-factory
set -a
source /root/leadership-factory/secrets.env
set +a
npx prisma studio --config prisma.config.ts --port 5555 --browser none


###On your PC (new terminal)

ssh -L 5555:127.0.0.1:5555 root@47.101.168.147
Open in your browser

http://localhost:5555
Keep both terminals open.
Close them to stop Studio.