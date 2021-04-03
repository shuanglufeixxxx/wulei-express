import { logIp } from "../handler/logIp";
import { initLogPathHandler } from "../handler/logPath";
import { authorProfile } from "./init-author-profile";

const apiPrefix = "/borischen_profile";

const profileUrl = process.env.BC_PROFILE || "";

authorProfile.get("", logIp, initLogPathHandler(apiPrefix), (req, res) => {
    res.redirect(profileUrl);
});

export { authorProfile, apiPrefix as authorProfilePrefix };
