FROM node:current-alpine3.10

WORKDIR /usr/src/app
# ENV ENV_PATH NONE
# ENV ENV_DEFAULT_PATH NONE
# ARG NODE_ENV
# ENV NODE_ENV $NODE_ENV
# ARG PORT
# ENV PORT $PORT
# ARG HOST
# ENV HOST $HOST
# ARG PORT
# ENV PORT $PORT
# ARG DB_CONNECTION
# ENV DB_CONNECTION $DB_CONNECTION
# ARG DB_HOST
# ENV DB_HOST $DB_HOST
# ARG DB_PORT
# ENV DB_PORT $DB_PORT
# ARG DB_USERNAME
# ENV DB_USERNAME $DB_USERNAME
# ARG DB_PASSWORD
# ENV DB_PASSWORD $DB_PASSWORD
# ARG DB_DATABASE
# ENV DB_DATABASE $DB_DATABASE
# ENV ENV 'production'
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/main"]
