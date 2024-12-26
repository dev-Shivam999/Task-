FROM node:18


WORKDIR /user/app/src


COPY ./packages.json .

RUN npm i 

COPY . .


CMD [ "npm" ,"run","dev" ]