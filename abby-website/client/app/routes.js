import { index, route, layout } from "@react-router/dev/routes";

export default [
  // Main website
  layout("layouts/get-close-to-abby.jsx", [
      //get close to abby
      index("routes/get-close-to-abby/open-call.jsx"),
      route("open-call/get-close-to-abby", "routes/get-close-to-abby/get-close-to-abby.jsx"),
      route("open-call/get-close-to-abby/ticket", "routes/get-close-to-abby/ticket-page.jsx"),
      // become part of abby
      route("open-call/get-close-to-abby/become-part-of-abby", "routes/become-part-of-abby/become-part-of-abby.jsx"),
      route("open-call/get-close-to-abby/become-part-of-abby/private-invitation", "routes/become-part-of-abby/private-invitation.jsx"),
      route("open-call/get-close-to-abby/become-part-of-abby/private-invitation/confirmation", "routes/become-part-of-abby/private-confirmation.jsx"),
      route("open-call/get-close-to-abby/become-part-of-abby/open-invitation", "routes/become-part-of-abby/open-invitation.jsx"),
      route("open-call/get-close-to-abby/become-part-of-abby/open-invitation/confirmation", "routes/become-part-of-abby/open-confirmation.jsx"),
      //answer open invitation
      route("open-call/get-close-to-abby/become-part-of-abby/open-invitation/:openInvitationToken", "routes/answer-open/open-page.jsx"),
      route("open-call/get-close-to-abby/become-part-of-abby/open-invitation/:openInvitationToken/registered/:profileId", "routes/answer-open/open-registered.jsx"),
      route("open-call/get-close-to-abby/become-part-of-abby/open-invitation/goodbye", "routes/answer-open/goodbye.jsx"),
      //submit close-up
      route("open-call/get-close-to-abby/become-part-of-abby/found-it", "routes/submit-closeup/found-it.jsx"),
      route("open-call/get-close-to-abby/become-part-of-abby/submit-confirmed", "routes/submit-closeup/submit-confirmed.jsx"),
  ]),
];
