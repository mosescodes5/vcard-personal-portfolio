import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ fullname: "", email: "", message: "" });
  const [valid, setValid] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const next = { ...form, [e.target.name]: e.target.value };
    setForm(next);
    setValid(next.fullname.trim() && next.email.trim() && next.message.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!valid) return;
    // No backend wired up — mailto fallback opens the user's email client.
    window.location.href = `mailto:mosesoluwa2005@gmail.com?subject=Portfolio contact from ${encodeURIComponent(
      form.fullname
    )}&body=${encodeURIComponent(form.message)} (Reply to: ${form.email})`;
    setSent(true);
  };

  return (
    <article className="contact active">
      <header>
        <h2 className="h2 article-title">Contact</h2>
      </header>

      <section className="mapbox" data-mapbox>
        <iframe
          title="Lagos, Nigeria map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31727.03428061287!2d3.339!3d6.601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!5e0!3m2!1sen!2sng!4v1600000000000"
          width="400"
          height="300"
          loading="lazy"
        ></iframe>
      </section>

      <section className="contact-form">
        <h3 className="h3 form-title">Contact Form</h3>

        <form className="form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <input
              type="text"
              name="fullname"
              className="form-input"
              placeholder="Full name"
              required
              value={form.fullname}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Email address"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <textarea
            name="message"
            className="form-input"
            placeholder="Your Message"
            required
            value={form.message}
            onChange={handleChange}
          ></textarea>

          <button className="form-btn" type="submit" disabled={!valid}>
            <ion-icon name="paper-plane"></ion-icon>
            <span>{sent ? "Opened your email app" : "Send Message"}</span>
          </button>
        </form>
      </section>
    </article>
  );
}
