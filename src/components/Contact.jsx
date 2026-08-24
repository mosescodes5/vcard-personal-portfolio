import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ fullname: "", email: "", message: "" });
  const [valid, setValid] = useState(false);

  const handleChange = (e) => {
    const next = { ...form, [e.target.name]: e.target.value };
    setForm(next);
    setValid(next.fullname.trim() && next.email.trim() && next.message.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!valid) return;
    window.location.href = `mailto:mosesoluwa2005@gmail.com?subject=Portfolio contact from ${encodeURIComponent(
      form.fullname
    )}&body=${encodeURIComponent(form.message)} (Reply to: ${form.email})`;
  };

  return (
    <article className="contact active">
      <header>
        <p className="eyebrow">// contact</p>
        <h2 className="h2 article-title">Contact</h2>
      </header>

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
            <span>Send Message</span>
          </button>
        </form>
      </section>
    </article>
  );
}
