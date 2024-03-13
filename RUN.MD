docker compose -d up --build
docker compose down

curl -vk https://localhost:3000


ssh root@5.35.84.143
ssh root@skincareagents.com

docker run --rm  -itd  \
  -v "$(pwd)/out":/acme.sh  \
  --net=host \
  --name=acme.sh \
  neilpang/acme.sh daemon

docker exec acme.sh --register-account -m imran@uziev.com
docker exec acme.sh --issue -d skincareagents.com --standalone
