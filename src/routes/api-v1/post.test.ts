import axios from "axios"
import { apiv1Prefix } from "./init-apiv1"

const host = 'http://localhost:443'

describe("get request test:", () => {
    const path = `${apiv1Prefix}/featuredPost?classify=activity`;
    it(path, async () => {
        expect.assertions(1);
        const posts = await axios.get(`${host}${path}`);
        return expect(typeof posts).toEqual('object');
    })
})