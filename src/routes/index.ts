import { apiv1, apiv1Prefix } from "./api-v1";
import {
    authorProfile,
    authorProfilePrefix,
} from "./author-profile";

export const pathRouterArray = [
    {
        path: apiv1Prefix,
        router: apiv1,
    },
    {
        path: authorProfilePrefix,
        router: authorProfile,
    },
];
