import { apiv1, apiV1Prefix } from "./apiv1/set-up-apiv1";
import {
    authorProfile,
    authorProfilePrefix,
} from "./author-profile/author-profile";

export const pathRouterArray = [
    {
        path: apiV1Prefix,
        router: apiv1,
    },
    {
        path: authorProfilePrefix,
        router: authorProfile,
    },
];
