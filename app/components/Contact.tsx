"use client";

import { useState } from "react";

export default function Contact() {
  const askTitle = "Open to new opportunities?";
  const askSub = "Let's discuss an exciting project or collaboration.";
  const [dodgeX, setDodgeX] = useState(0);
  const [dodgeY, setDodgeY] = useState(0);
  const [dodgeR, setDodgeR] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitLabel, setSubmitLabel] = useState("Send message");

  const dodge = () => {
    setDodgeX(Math.random() * 200 - 100);
    setDodgeY(Math.random() * 200 - 100);
    setDodgeR(Math.random() * 360);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLabel("Sending...");
    // Simulate sending
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitLabel("Message sent! 🎉");
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitLabel("Send message"), 3000);
  };

  return (
    <section id="contact" style={{ maxWidth: "1220px", margin: "0 auto", padding: "20px 24px 120px", position: "relative", zIndex: 1 }}>
      <div className="rv padbox" style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: "26px", padding: "46px", marginBottom: "22px", position: "relative", overflow: "hidden", textAlign: "center" }}>
        <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, color: "var(--head)", margin: "0 0 10px", letterSpacing: "-0.03em" }}>
          {askTitle}
        </h3>
        <p style={{ fontSize: "14.5px", color: "var(--muted)", margin: "0 0 26px", minHeight: "22px" }}>
          {askSub}
        </p>
        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", minHeight: "54px", alignItems: "center" }}>
          <a
            href="mailto:rahulcompani7@gmail.com?subject=Let%27s%20talk"
            className="btn"
            style={{ background: "var(--acc)", color: "#04120a", padding: "15px 30px", borderRadius: "12px", fontWeight: 700, fontSize: "15px", display: "inline-block" }}
          >
            Yes — let&apos;s talk
          </a>
          <button
            onMouseEnter={dodge}
            onClick={dodge}
            style={{
              border: "1px solid var(--line2)",
              padding: "15px 30px",
              borderRadius: "12px",
              fontWeight: 700,
              fontSize: "15px",
              color: "var(--muted)",
              background: "var(--soft)",
              fontFamily: "inherit",
              cursor: "pointer",
              transform: `translate(${dodgeX}px, ${dodgeY}px) rotate(${dodgeR}deg)`,
              transition: "transform .3s cubic-bezier(.2,.8,.2,1)",
            }}
          >
            Maybe later
          </button>
        </div>
      </div>

      <div className="contact-grid padbox" style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: "26px", padding: "50px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", position: "relative", overflow: "hidden" }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11.5px", fontWeight: 600, letterSpacing: "0.16em", color: "var(--acc)", textTransform: "uppercase", marginBottom: "16px" }}>
            07 — Contact
          </div>
          <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(27px, 3.6vw, 42px)", fontWeight: 800, letterSpacing: "-0.035em", margin: "0 0 18px", color: "var(--head)", lineHeight: 1.05 }}>
            Let&apos;s build something worth shipping.
          </h2>
          <p style={{ fontSize: "15px", lineHeight: 1.75, color: "var(--muted)", margin: "0 0 30px" }}>
            Open to full-stack, backend and cloud engineering roles, plus select freelance work. I usually reply within a day.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px", fontSize: "14.5px" }}>
            <a href="mailto:rahulcompani7@gmail.com" className="navlink" style={{ color: "var(--text)", display: "inline-flex", alignItems: "center", gap: "12px", width: "fit-content" }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="var(--acc)" style={{ flex: "none" }} aria-hidden="true">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.9.732-1.636 1.636-1.636h.82L12 10.9l9.544-7.08h.82c.904 0 1.636.732 1.636 1.636Z" />
              </svg>
              rahulcompani7@gmail.com
            </a>
            <a href="tel:+917981036928" className="navlink" style={{ color: "var(--text)", display: "inline-flex", alignItems: "center", gap: "12px", width: "fit-content" }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="var(--acc)" style={{ flex: "none" }} aria-hidden="true">
                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
              </svg>
              +91 79810 36928
            </a>
            <a href="https://linkedin.com/in/rahul-compani" target="_blank" className="navlink" style={{ color: "var(--text)", display: "inline-flex", alignItems: "center", gap: "12px", width: "fit-content" }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="var(--acc)" style={{ flex: "none" }} aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              linkedin.com/in/rahul-compani
            </a>
            <a href="https://github.com/RahulCompani7" target="_blank" className="navlink" style={{ color: "var(--text)", display: "inline-flex", alignItems: "center", gap: "12px", width: "fit-content" }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="var(--acc)" style={{ flex: "none" }} aria-hidden="true">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              github.com/RahulCompani7
            </a>
          </div>
        </div>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "13px" }}>
          <input
            name="name"
            placeholder="Your name"
            required
            value={formData.name}
            onChange={handleInputChange}
            style={{ background: "var(--bg)", border: "1px solid var(--line2)", borderRadius: "11px", padding: "15px 17px", color: "var(--text)", fontSize: "14px", fontFamily: "inherit" }}
          />
          <input
            name="email"
            type="email"
            placeholder="Your email"
            required
            value={formData.email}
            onChange={handleInputChange}
            style={{ background: "var(--bg)", border: "1px solid var(--line2)", borderRadius: "11px", padding: "15px 17px", color: "var(--text)", fontSize: "14px", fontFamily: "inherit" }}
          />
          <textarea
            name="message"
            rows={5}
            placeholder="What are you building?"
            required
            value={formData.message}
            onChange={handleInputChange}
            style={{ background: "var(--bg)", border: "1px solid var(--line2)", borderRadius: "11px", padding: "15px 17px", color: "var(--text)", fontSize: "14px", fontFamily: "inherit", resize: "vertical" }}
          />
          <button
            type="submit"
            className="btn"
            style={{ background: "var(--acc)", color: "#04120a", border: "none", padding: "16px", borderRadius: "11px", fontWeight: 700, fontSize: "14.5px", fontFamily: "inherit", cursor: "pointer" }}
          >
            {submitLabel}
          </button>
        </form>
      </div>
    </section>
  );
}