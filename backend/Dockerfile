FROM node:18
WORKDIR /home/backend

COPY . ./

RUN npm install
RUN npm run build
RUN npm run migration:run

EXPOSE 3001

CMD ["npm", "run", "start"]