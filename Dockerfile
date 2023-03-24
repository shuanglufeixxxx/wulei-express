FROM node:14-alpine
WORKDIR /wulei-express

COPY ./ ./
RUN npm run build

EXPOSE 443

CMD ["npm", "start"]