import { logIp } from "../handlers/logIp";
import { initLogPathHandler } from "../handlers/logPath";
import { authorProfile } from "./init-author-profile";

const apiPrefix = "/borischen_profile";

const profileUrl = process.env.WE_BC_PROFILE || "";
const coverLetterUrl = process.env.WE_BC_COVER_LETTER || "";

authorProfile.get("", logIp, initLogPathHandler(apiPrefix), (req, res) => {
    if (req.query.from === 'indeed.com') {
        res.redirect(coverLetterUrl);
    }
    res.redirect(profileUrl);
});

export { authorProfile, apiPrefix as authorProfilePrefix };
