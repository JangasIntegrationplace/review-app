docker-compose down

git pull origin master

docker-compose build build-react
docker-compose up --build -d django
