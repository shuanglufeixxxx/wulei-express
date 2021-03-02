FROM node:14
WORKDIR /wulei-express

COPY ./ ./
RUN npm run build

EXPOSE 443

CMD ["npm", "start"]