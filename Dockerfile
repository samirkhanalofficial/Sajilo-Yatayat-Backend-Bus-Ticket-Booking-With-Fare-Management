FROM node:21.6.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3001

EXPOSE 3001
RUN cp .env.example .env
RUN npm run build


CMD ["npm","start"]