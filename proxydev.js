const httpProxy = require("./node_modules/http-proxy");

httpProxy
    .createProxyServer({
        target: "http://localhost:1443",
        xfwd: true,
    })
    .listen(443);
