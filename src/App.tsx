import { useEffect, useRef, type RefObject } from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "./usePageMeta.ts";

function useReveal<T extends HTMLElement>(): RefObject<T | null> {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function ContactSection({ ref }: { ref: RefObject<HTMLElement | null> }) {
  return (
    <section id="contact" className="section" ref={ref}>
      <div className="contact-inner">
        <span className="section-label-en">Contact</span>
        <h2>お問い合わせ</h2>
        <p className="contact-text">
          初回のご相談は無料です。お気軽にお問い合わせください。
        </p>
        <Link to="/contact" className="contact-button">
          <span>無料で相談する</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
        <div className="trust-badges">
          <span className="trust-badge">初回相談無料</span>
          <span className="trust-badge">NDA対応可</span>
          <span className="trust-badge">リモート対応</span>
        </div>
      </div>
    </section>
  );
}

function App() {
  usePageMeta("", "株式会社団野ソフトウェア — 小さなチームの、技術パートナー。クラウド公開・セキュリティ支援、生成AI導入・業務自動化、社内IT・クラウド運用代行、技術顧問。", "/");

  const aboutRef = useReveal<HTMLElement>();
  const servicesRef = useReveal<HTMLElement>();
  const contactRef = useReveal<HTMLElement>();

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="hero-label">Danno Software</p>
          <h1>
            <span className="hero-line">小さなチームの、</span>
            <span className="hero-line hero-line--delayed">技術パートナー。</span>
          </h1>
          <div className="hero-rule" />
          <p className="hero-sub">
            作ったアプリを安全にWebへ。生成AIで業務を自動化。
            <br />
            中小企業・スタートアップの「技術の手が足りない」を支援します。
          </p>
          <Link to="/contact" className="hero-cta">
            無料で相談する
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <p className="hero-trust">初回相談無料 / NDA対応可 / リモート対応</p>
        </div>
      </section>

      <section id="about" className="section" ref={aboutRef}>
        <div className="section-layout">
          <div className="section-label">
            <span className="section-label-en">About</span>
            <h2>会社概要</h2>
          </div>
          <div className="section-body">
            <dl className="about-list">
              <div className="about-row">
                <dt>会社名</dt>
                <dd>株式会社団野ソフトウェア</dd>
              </div>
              <div className="about-row">
                <dt>代表</dt>
                <dd>団野 優人</dd>
              </div>
              <div className="about-row">
                <dt>設立</dt>
                <dd>2024年</dd>
              </div>
              <div className="about-row">
                <dt>事業内容</dt>
                <dd>クラウド公開・セキュリティ支援 / 生成AI導入・業務自動化 / 社内IT・クラウド運用代行 / 技術顧問</dd>
              </div>
            </dl>
            <Link to="/about" className="services-more" style={{ marginTop: 32 }}>
              <span>詳しく見る</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section id="services" className="section" ref={servicesRef}>
        <div className="section-layout">
          <div className="section-label">
            <span className="section-label-en">Services</span>
            <h2>事業内容</h2>
          </div>
          <div className="section-body">
            <div className="services-pillars">
              <article className="service-pillar service-pillar--accent">
                <span className="service-pillar-label">プロジェクト型</span>
                <h3>クラウド公開・セキュリティ支援</h3>
                <p>作ったアプリを安全にWebへ。AWS / GCP / Azure へのデプロイとセキュリティ設計。</p>
                <span className="service-pillar-price">個別見積もり</span>
                <Link to="/services" className="service-pillar-cta">
                  <span>詳しく見る</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
              </article>
              <article className="service-pillar">
                <span className="service-pillar-label">PoC伴走型</span>
                <h3>生成AI導入・業務自動化</h3>
                <p>生成AIで日々の事務作業・定型業務を自動化。小さな実証実験（PoC）から導入まで伴走。</p>
                <span className="service-pillar-price">個別見積もり</span>
                <Link to="/services" className="service-pillar-cta">
                  <span>詳しく見る</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
              </article>
              <article className="service-pillar">
                <span className="service-pillar-label">月額制</span>
                <h3>社内IT・クラウド運用代行</h3>
                <p>情シス不在でも回る体制へ。御社のIT担当として運用・監視・改善を継続支援。</p>
                <span className="service-pillar-price">20万円〜 / 月</span>
                <Link to="/services" className="service-pillar-cta">
                  <span>詳しく見る</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
              </article>
              <article className="service-pillar">
                <span className="service-pillar-label">スポット / 月額制</span>
                <h3>技術顧問</h3>
                <p>アーキテクチャレビュー、技術選定、意思決定の壁打ち相手に。</p>
                <span className="service-pillar-price">2万円〜 / 回 または 10万円〜 / 月</span>
                <Link to="/services" className="service-pillar-cta">
                  <span>詳しく見る</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
              </article>
            </div>
          </div>
        </div>
      </section>

      <ContactSection ref={contactRef} />
    </>
  );
}

export default App;
