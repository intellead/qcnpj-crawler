FROM node:8.6.0-alpine

ENV HOME=/home/intellead/qcnpj-crawler

WORKDIR $HOME/app

COPY package.json $HOME/app/

RUN npm install --silent --progress=false --production

COPY app.js $HOME/app/

COPY bin/ $HOME/app/bin

COPY public/stylesheets/ $HOME/app/public/stylesheets

COPY routes/ $HOME/app/routes

COPY src/ $HOME/app/src

COPY views/ $HOME/app/views

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]