import { Link } from "react-router";
import "./open-call.css";

import wallWebp from "../../assets/images/webp/open-call-wall-img.webp";
import wallPng from "../../assets/images/png/open-call-wall-img.png";
import foodWebp from "../../assets/images/webp/open-call-food-img.webp";
import foodPng from "../../assets/images/png/open-call-food-img.png";
import getCloseWebp from "../../assets/images/webp/open-call-get-close-img.webp";
import getClosePng from "../../assets/images/png/open-call-get-close-img.png";
import girlWebp from "../../assets/images/webp/open-call-girl-img.webp";
import girlPng from "../../assets/images/png/open-call-girl-img.png";

export default function openCall() {
  return (
    <section>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li><Link to="#">Home</Link></li>
          <li aria-current="page"><span>Open Call</span></li>
        </ol>
      </nav>
      <h1 className="open-call-header">Open Call</h1>
      <nav
        style={{
          marginTop: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      ></nav>
      <section className="open-call-cards-grid tablet-side-margin">
        <article
          className="open-call-card"
          style={{
            paddingBlockEnd: "var(--fluid-space-xl)",
            paddingBlockStart: "var(--fluid-space-m)",
          }}
        >
          <div className="phone-side-margin">
            <div className="open-call-card-layout">
              <h2 className="card-header">Affordable Art Wall</h2>
              <div className="open-call-img-wrapper">
                <picture>
                  <source srcSet={wallWebp} type="image/webp" />
                  <img
                    src={wallPng}
                    alt="Green vector shape of a smiley face on a yellow background"
                    className="card-img"
                  />
                </picture>
              </div>

              <div className="card-text bodyM">
                <p style={{ paddingBlockEnd: "var(--fluid-space-xl)" }}>
                  Do you want to join the Gallery of abby? Every three months,
                  the work of a different artist is featured on{" "}
                  <span className="bold">Abby&rsquo;s Affordable Art Wall</span>
                  .
                </p>
                <Link to="/" className="button--m button--green">
                  More info
                </Link>
              </div>
            </div>
          </div>
        </article>
        <article
          className="open-call-card"
          style={{
            paddingBlockEnd: "var(--fluid-space-xl)",
            paddingBlockStart: "var(--fluid-space-m)",
          }}
        >
          <div className="phone-side-margin">
            <div className="open-call-card-layout">
              <h2 className="card-header">Table Stories</h2>
              <div className="open-call-img-wrapper">
                <picture>
                  <source srcSet={foodWebp} type="image/webp" />
                  <img
                    src={foodPng}
                    alt="Vector yellow shapes of a fork, plate and a knife on a green background."
                    className="card-img"
                  />
                </picture>
              </div>

              <div className="card-text bodyM">
                <p style={{ paddingBlockEnd: "var(--fluid-space-xl)" }}>
                  Abby Café is looking for{" "}
                  <span className="bold">unique (family) recipes</span> that
                  deserve a special spot on our menu.
                </p>
                <Link to="/" className="button--m button--green">
                  More info
                </Link>
              </div>
            </div>
          </div>
        </article>
        <article
          className="open-call-card"
          style={{
            paddingBlockEnd: "var(--fluid-space-xl)",
            paddingBlockStart: "var(--fluid-space-m)",
          }}
        >
          <div className="phone-side-margin">
            <div className="open-call-card-layout">
              <h2 className="card-header">Get Close to Abby</h2>
              <div className="open-call-img-wrapper">
                <picture>
                  <source srcSet={getCloseWebp} type="image/webp" />
                  <img
                    src={getClosePng}
                    alt="Green vector shape of an Abby Close-up Ticket on a yellow background"
                    className="card-img"
                  />
                </picture>
              </div>

              <div className="card-text bodyM">
                <p style={{ paddingBlockEnd: "var(--fluid-space-xl)" }}>
                  Get your Close-up Ticket,{" "}
                  <span className="bold">explore the rooms</span> through hidden
                  details, and invite others to join the story.
                </p>
                <Link
                  to="/open-call/get-close-to-abby"
                  className="button--m button--green"
                >
                  More info
                </Link>
              </div>
            </div>
          </div>
        </article>
        <section className="photo-card-wrapper">
          <picture>
            <source srcSet={girlWebp} type="image/webp" />
            <img
              src={girlPng}
              alt="An image of a girl smiling and holding a lot of paint brushes. The image is inside an abby icon with two triangles"
              className="card-img"
            />
          </picture>
        </section>
      </section>
    </section>
  );
}
