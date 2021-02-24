FROM node:14
WORKDIR /wulei-express

COPY ["package.json", "package-lock.json", "./"]
RUN npm ci --production=false
COPY ./ ./
RUN npm run deploy

EXPOSE 443

CMD ["npm", "start"]