import footerKortrijkA from "../assets/images/awif/logo-kortrijk.avif";
import footerKortrijk from "../assets/images/svg/logo-kortrijk.svg";

import footerVlaanderenA from "../assets/images/awif/logo-vlaanderen.avif";
import footerVlaanderen from "../assets/images/svg/logo-vlaanderen.svg";

import footerInterregA from "../assets/images/awif/logo-creativ-up.avif";
import footerInterreg from "../assets/images/png/logo-creativ-up.png";

import footerUnescoA from "../assets/images/awif/logo-unesco.avif";
import footerUnesco from "../assets/images/png/logo-unesco.png";

import footerLogoAvif from "../assets/images/awif/abby-logo-simple.avif";
import footerLogoPng from "../assets/images/png/abby-logo-simple.png";

export default function Footer() {
  return (
    <>
      {/* Footer */}
      <footer className=" mt-8 text-sm text-black px-4 py-6 space-y-4 border-t">
        <div className="footer__main-content side-margins">
          <div>
            <p className="font-semibold bodyL footer__titles">Contact</p>
            <div className="footer__section-items">
              <p> Begijnhofpark</p>
              <p> 8500 Kortrijk</p>
              <p> +32 (0)56 27 74 60</p>
              <p> abby@kortrijk.be</p>
            </div>
          </div>

          <div>
            <p className="font-semibold bodyL footer__titles">Opening hours</p>
            <div className="footer__section-items">
              <p>Open from 10AM to 10PM</p>
              <p>Exhibition halls 10 AM - 6 PM</p>
              <p> Last tickets: 5 PM</p>
              <p>Closed on Mondays</p>
            </div>
          </div>

          {/* Newsletter */}
          <div className="newsletter__section">
            <p className="font-semibold bodyL footer__titles">Stay informed</p>
            <form className="flex gap-2 mt-1">
              <input
                type="email"
                placeholder="Your email address"
                className="border-b border-black w-full py-1 outline-none bg-transparent newsletter__input"
              />
              <button type="submit" className="text-xl font-bold">
                ➤
              </button>
            </form>
            <label className="text-sm mt-2 block newsletter__checkbox-section bodyM">
              <input type="checkbox" className="mr-1 newsletter__checkbox" /> I
              agree with the{" "}
              <a href="#" className="underline blue-font">
                privacy policy
              </a>
              .
            </label>
          </div>
        </div>

        {/* Logos */}
        <div className="flex flex-wrap gap-4 mt-4 footer__logos-section side-margins">
          <picture>
            <source srcSet={footerKortrijkA} type="image/avif" />
            <img src={footerKortrijk} alt="kortrijk" />
          </picture>
          <picture>
            <source srcSet={footerVlaanderenA} type="image/avif" />
            <img src={footerVlaanderen} alt="Vlaanderen" />
          </picture>
          <picture>
            <source srcSet={footerInterregA} type="image/avif" />
            <img src={footerInterreg} alt="Interreg" />
          </picture>
          <picture>
            <source srcSet={footerUnescoA} type="image/avif" />
            <img src={footerUnesco} alt="UNESCO" />
          </picture>
        </div>

        {/* Bottom */}

        <div className=" text-gray-600  border-t  footer__bottom-section">
          <div className="side-margins">
            <div className="footer__bottom-layout-desktop">
              <div className="footer__logo">
                <picture>
                  <source srcSet={footerLogoAvif} type="image/avif" />
                  <img src={footerLogoPng} alt="The abby logo" />
                </picture>
              </div>
              <p className="footer__bottom-year">© 2025 Abby</p>
              <p className="footer__bottom-links labelL">
                <a href="#">Algemene voorwaarden</a>
                <a href="#">Privacy policy</a>
                <a href="#">UITPAS-partner</a>
              </p>
              <p className="footer__bottom-authors">
                Website by Brandberries X Devine
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
