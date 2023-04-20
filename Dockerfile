FROM node:13 as builder

USER node

WORKDIR /home/node/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run","start" ]

# RUN npm run build

# FROM nginx

# COPY --from=builder /home/node/app/build /usr/share/nginx/html

