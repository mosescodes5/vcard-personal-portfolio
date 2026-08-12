import { useState } from "react";
import avatar from "../assets/images/my-avatar.png";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside className={`sidebar ${expanded ? "active" : ""}`} data-sidebar>
      <div className="sidebar-info">
        <figure className="avatar-box">
          <img src={avatar} alt="Kouakanou Moses Oluwasekan" width="80" />
        </figure>

        <div className="info-content">
          <h1 className="name" title="Kouakanou Moses Oluwasekan">
            Kouakanou Moses Oluwasekan
          </h1>
          <p className="title">Software Engineer · React &amp; Next.js Specialist</p>
        </div>

        <button
          className="info_more-btn"
          onClick={() => setExpanded((v) => !v)}
        >
          <span>Show Contacts</span>
          <ion-icon name="chevron-down"></ion-icon>
        </button>
      </div>

      <div className="sidebar-info_more">
        <div className="separator"></div>

        <ul className="contacts-list">
          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="mail-outline"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">Email</p>
              <a href="mailto:mosesoluwa2005@gmail.com" className="contact-link">
                mosesoluwa2005@gmail.com
              </a>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="phone-portrait-outline"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">Phone</p>
              <a href="tel:+2348109176764" className="contact-link">
                +234 810 917 6764
              </a>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="location-outline"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">Location</p>
              <address>Olowora, Berger, Lagos State, Nigeria</address>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="logo-linkedin"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">LinkedIn</p>
              <a
                href="https://www.linkedin.com/in/moses-kouakanou-b7995b385/"
                className="contact-link"
                target="_blank"
                rel="noreferrer"
              >
                linkedin.com/in/moses-kouakanou
              </a>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="logo-github"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">GitHub</p>
              <a
                href="https://github.com/mosescodes5"
                className="contact-link"
                target="_blank"
                rel="noreferrer"
              >
                github.com/mosescodes5
              </a>
            </div>
          </li>
        </ul>

        <div className="separator"></div>

        <ul className="social-list">
          <li className="social-item">
            <a
              href="https://www.linkedin.com/in/moses-kouakanou-b7995b385/"
              className="social-link"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <ion-icon name="logo-linkedin"></ion-icon>
            </a>
          </li>
          <li className="social-item">
            <a
              href="https://github.com/mosescodes5"
              className="social-link"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <ion-icon name="logo-github"></ion-icon>
            </a>
          </li>
          <li className="social-item">
            <a
              href="https://wa.me/2349036897962?text=Hello%20mosescodes"
              className="social-link"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
            >
              <ion-icon name="logo-whatsapp"></ion-icon>
            </a>
          </li>
          <li className="social-item">
            <a
              href="https://www.tiktok.com/@mosescodes"
              className="social-link"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
            >
              <ion-icon name="logo-tiktok"></ion-icon>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}
