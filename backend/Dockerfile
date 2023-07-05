FROM node:18

WORKDIR /home/backend

COPY . ./
RUN --mount=type=secret,id=_env,dst=/etc/secrets/.env cat /etc/secrets/.env
RUN --mount=type=secret,id=_env,dst=/etc/secrets/.env cat /etc/secrets/.env >> envfile
RUN ls 

#COPY /etc/secrets/.env .env

RUN npm install
RUN npm run build
RUN npm run migration:run

EXPOSE 3001


CMD ["npm", "run", "start"]