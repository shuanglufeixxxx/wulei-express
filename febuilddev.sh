npm run clean && \
cd ../wulei-angular && npm ci production=false && npm run buildDev && rm -rf ../wulei-express/public/** && cp -r ./dist/** ../wulei-express/public && cd ../wulei-express