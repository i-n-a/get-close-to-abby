// option to show or not profile in nav

import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function getCloseToAbby() {
    return (
      <>
        <Header/>
        <main>
          <Outlet /> {/* this renders the route inside */}
        </main>
        <Footer />
      </>
    );
}
