FROM node:18 AS build

WORKDIR /app

COPY . .


RUN npm install
ENV MIDWAY_SERVER_ENV prod
RUN npm run build

FROM node:18-alpine

WORKDIR /app

# Copy the source code and the error can be reported to the right line
COPY --from=build /app/src ./src
COPY --from=build /app/dist ./dist
COPY --from=build /app/bootstrap.js ./
COPY --from=build /app/package.json ./
COPY --from=build /app/public ./dist/public
RUN apk add --no-cache tzdata

ENV TZ="Asia/Shanghai"

RUN npm install --omit=dev
RUN npm i -g pm2
# If the port is changed, this side can be updated
EXPOSE 8080
ENV MIDWAY_SERVER_ENV prod
CMD [ "pm2-runtime", "npm", "--", "start" ]

