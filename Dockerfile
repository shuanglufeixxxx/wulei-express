FROM node:14
ENV NODE_ENV=production
WORKDIR /wulei-express

COPY ["package.json", "package-lock.json", "./"]
RUN npm ci --production && npm run build
COPY ..

EXPOSE 443

CMD ["node", "app.js"]