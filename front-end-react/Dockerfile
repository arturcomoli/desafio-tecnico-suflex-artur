FROM node:16

WORKDIR /front-end-react

RUN mkdir -p /front-end-react/node_modules/.vite && chown node:node /front-end-react/node_modules/.vite

COPY package*.json /front-end-react/

# RUN npm config set unsafe-perm true
# RUN npm install --location=global @npm8.1.3

# RUN npm install --location=global vite

COPY . ./front-end-react/

RUN npm cache clean --force

RUN npm install

EXPOSE 3000

USER node

CMD ["npm", "run", "dev"]