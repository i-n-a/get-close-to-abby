import {Link} from "react-router";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="home">
      <h1>Welcome to the PubNub Chat Rooms</h1>
      <p>
        This is a simple chat application built with PubNub. You can create or join chat rooms and start messaging with others.
      </p>
      <p>
        Use the navigation links to explore different chat rooms or create a new one.
      </p>
      <Link to="/open-call/get-close-to-abby/become-part-of-abby/open-invitation/1" className="button">
        Go to Open Invitation
      </Link>
    </div>
  );
};


    // Developer Notes:
    // ==================

    // Can we use PubNub for our MVP to make a abby open invitation web page where you participate in an open event and chat with others?
    // Specifically, can we use PubNub with our own custom chat room component?

    // Learnings:
    // - PubNub used to work with specific made React chat components (like PubNubProvider), but from jan 2025 they will no longer support these components. (https://www.pubnub.com/docs/general/resources/migration-guides/react-components-chat-sdk)
    // - PubNub moves to a chat SDK that is not tied to React, so you can use it with any framework or library.
    // - PubNub chat SDK is a low-level SDK that allows you to build your own chat components.
    
    // Solution:
    // - Quick prototype of chat page wireframe.
    // - Implement chat room with chatscope.io first to focus on rapid prototyping + PubNub integration. (commented out code in ChatBox.jsx )
    // - Use PubNub together with build out first chat room component to test if we can 2 test users chat with each other with their avatar and name send as well.

    // ‼️ Limitations:
    // - the test chat code is not fully functional yet. The test code is set up that by loading into the page 1 out of 2 test users is created and can start chatting. Then you need to open another tab to get the second test user to chat with the first one. The user is chosen by randomly selecting a user from the list of test users.
    // - if we want we can integrate Supabase to store the chat messages and users, but for now we just use PubNub to send the messages in real-time. The file ChatBox copy (Supabase setup - still to be tested).jsx is a copy of the ChatBox component but with Supabase setup. Still need to be tested.
