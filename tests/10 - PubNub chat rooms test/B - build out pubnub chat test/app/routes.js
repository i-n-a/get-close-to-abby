import { index, route } from "@react-router/dev/routes";

export default [
    //answer open invitation
    index("routes/home.jsx"),
    route("open-call/get-close-to-abby/become-part-of-abby/open-invitation/:openId", "routes/answer-open/open-page.jsx"),
    route("open-call/get-close-to-abby/become-part-of-abby/open-invitation/:openId/registered", "routes/answer-open/open-registered.jsx"),
];
