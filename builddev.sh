npm run clean && \
npm ci --production=false && docker build -t wulei-express:$WE_TAG .