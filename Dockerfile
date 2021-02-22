FROM node:14
WORKDIR /boriseng/wulei-express

COPY ["package.json", "package-lock.json", "./"]
RUN npm ci --no-cache
COPY ./ ./
RUN npm run deploy

ENV NODE_ENV=production

EXPOSE 443

CMD ["npm", "start"]