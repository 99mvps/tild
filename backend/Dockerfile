FROM node:18 AS builder
WORKDIR /home/backend

COPY . ./


ENV NODE_ENV=development
ENV DATABASE_TYPE=postgres
ENV DATABASE_USERNAME=postgres
ENV DATABASE_PASSWORD=Postgres@2023!
ENV DATABASE_HOST=postgres-db
ENV DATABASE_PORT=5432
ENV DATABASE_DB=tild
ENV JWT_SECRET=db26c857-48d5-4e13-bca9-f299a35c89f3

RUN npm install
RUN npm run build
RUN npm run migration:run


# Second Stage : Setup command to run your app using lightweight node image
FROM node:18-alpine
WORKDIR /home/backend
COPY --from=builder /home/backend ./
EXPOSE 3001

CMD ["npm", "run", "start"]