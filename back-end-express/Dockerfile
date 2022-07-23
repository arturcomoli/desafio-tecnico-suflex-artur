FROM node:16

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

ENV PORT=8000

USER node

# RUN npm run migrate

CMD ["npm", "run", "dev"]