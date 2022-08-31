FROM node:16-alpine

WORKDIR /bot

COPY . .

RUN npm install --only=production

CMD [ "npm", "run", "dev" ]
