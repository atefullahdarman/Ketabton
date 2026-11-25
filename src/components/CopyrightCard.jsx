import "./CopyrightCard.css";

export default function CopyrightCard() {
  return (
    <section className="copyright-card" aria-labelledby="copyright-title">

      <div className="copyright-header">
        <div className="copyright-icon" aria-hidden="true">©</div>

        <div>
          <h2 id="copyright-title">Copyright & Disclaimer</h2>
          <span>Intellectual Property & Legal Notice</span>
        </div>
      </div>

      <p>
        Our digital library aims to promote education and
        free access to knowledge. All books remain the
        intellectual property of their respective rights holders.
      </p>

      <p>
        We respect copyright laws and intend to provide access
        only to legally available, public domain, or
        appropriately licensed materials.
      </p>

      <p>
        If you believe any content infringes your copyright,
        please contact us for review and appropriate removal.
      </p>

      <div className="copyright-footer">
        Respecting Copyright · Promoting Education
      </div>

    </section>
  );
}