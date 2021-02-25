FROM node:14
WORKDIR /wulei-express

COPY ["package.json", "package-lock.json", "./"]
COPY ./ ./
RUN npm run build

EXPOSE 443

CMD ["npm", "start"]