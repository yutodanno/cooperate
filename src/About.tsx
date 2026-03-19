import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "./usePageMeta.ts";

function useRevealAll() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll(".page-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("page-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);
  return ref;
}

const rows = [
  { label: "会社名", value: "株式会社団野ソフトウェア" },
  { label: "代表", value: "団野 優人" },
  { label: "設立", value: "2024年" },
  { label: "事業内容", value: "クラウド公開・セキュリティ支援 / 生成AI導入・業務自動化 / 社内IT・クラウド運用代行 / 技術顧問" },
  { label: "所在地", value: "大阪府大阪市北区梅田１丁目２番２号 大阪駅前第２ビル１２－１２" },
  { label: "法人番号", value: "6120001264667" },
];

function About() {
  usePageMeta(
    "会社概要",
    "株式会社団野ソフトウェアの会社概要。代表 団野優人。クラウド公開・セキュリティ支援、生成AI導入・業務自動化、社内IT・クラウド運用代行、技術顧問。",
    "/about"
  );

  const wrapperRef = useRevealAll();

  return (
    <div ref={wrapperRef}>
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="page-hero-label">About</span>
          <div className="page-hero-line" />
          <h1>会社概要</h1>
        </div>
      </section>

      <section className="abt-message">
        <div className="abt-message-inner page-reveal">
          <h2>代表メッセージ</h2>
          <div className="abt-message-body">
            <p>
              「アプリは作れたのに、公開の仕方がわからない」「ITを任せられる人がいない」。
              中小企業やスタートアップの現場には、そんな「技術の手が足りない」場面が数多くあります。
              株式会社団野ソフトウェアは、その課題に応えるために立ち上げた会社です。
            </p>
            <p>
              当社は、クラウドの構築・運用と生成AIの業務活用を専門とする会社です。
              ご相談から設計・構築・運用まで、エンジニアである代表が一貫して担当します。
              営業担当を挟まないので、話が早く、認識のずれが起きにくくなります。
            </p>
            <p>
              専門用語をできるだけ使わず、わかりやすい言葉でご説明することを大切にしています。
              お客様のチームの一員のような距離感で、技術の困りごとを解決します。
            </p>
          </div>
        </div>
      </section>

      <section className="abt-career">
        <div className="abt-career-inner">
          <h2 className="page-reveal">経歴</h2>
          <div className="abt-career-timeline">
            {[
              {
                period: "2018 — 2020",
                title: "オンプレミス基盤の設計・構築",
                desc: "SIerにてサーバー・ストレージ・バックアップ環境の提案から移行まで一貫して担当。",
              },
              {
                period: "2020 — 2022",
                title: "クラウド移行・分析基盤構築",
                desc: "AWS・GCPでIoT / データ分析基盤を設計・構築。TerraformによるIaC・CI/CD導入を推進。",
              },
              {
                period: "2022 — 2024",
                title: "マルチクラウド環境の設計・運用",
                desc: "AWS・Azure・GCPを横断する複数プロジェクトを並行担当。IaC化・ネットワーク設計・コスト最適化まで幅広く対応。",
              },
              {
                period: "2024 —",
                title: "株式会社団野ソフトウェア設立",
                desc: "クラウドと生成AI活用の技術支援を専門とする会社を設立。",
              },
            ].map((item, i) => (
              <div className="abt-career-item page-reveal" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="abt-career-period">{item.period}</span>
                <div className="abt-career-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="abt-detail">
        <div className="abt-detail-inner">
          <dl className="abt-list">
            {rows.map((row, i) => (
              <div className="abt-row page-reveal" key={row.label} style={{ animationDelay: `${i * 0.08}s` }}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="page-cta">
        <div className="page-cta-inner page-reveal">
          <p className="page-cta-lead">まずはお気軽にご相談ください。</p>
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
    </div>
  );
}

export default About;
