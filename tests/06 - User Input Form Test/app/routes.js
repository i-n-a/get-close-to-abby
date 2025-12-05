import { index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.jsx"),
    route("/submit-closeup", "routes/submit-closeup.jsx"),
    route("/submit-closeup/confirmation", "routes/confirmation.jsx"),
];
