FROM node:16

WORKDIR /back-end-express

COPY package*.json /back-end-express/

RUN npm install --force

COPY . ./back-end-express

EXPOSE 8000

ENV PORT=8000

USER node

# RUN npm run migrate

CMD ["npm", "run", "dev"]