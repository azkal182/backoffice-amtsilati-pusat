FROM node:18-alpine

WORKDIR /app
COPY package*.json prisma/schema.prisma /
RUN npm install

COPY . .
EXPOSE 3000

RUN npx prisma generate

CMD [ "npm", "run", "dev" ]
