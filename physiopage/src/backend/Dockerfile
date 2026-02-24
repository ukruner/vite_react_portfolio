# build stage
FROM node:20-alpine3.20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .

# runtime stage (distroless)
FROM gcr.io/distroless/nodejs20-debian12
WORKDIR /app
COPY --from=build /app /app
ENV NODE_ENV=production
EXPOSE 5000
CMD ["server.js"]
