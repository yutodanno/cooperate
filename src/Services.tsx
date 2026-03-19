import { useEffect, useRef, useState } from "react";
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

const faqs = [
  { q: "初回の相談に費用はかかりますか？", a: "いいえ。初回のヒアリング・ご相談は無料です。課題やご要望をお聞かせいただいたうえで、お見積もりをご提示します。" },
  { q: "リモートでの対応は可能ですか？", a: "はい。基本的にオンラインで対応しています。オンラインミーティング・チャットツール等、お客様の環境に合わせて柔軟に対応します。" },
  { q: "NDAの締結は可能ですか？", a: "はい、可能です。ご要望に応じて業務開始前にNDAを締結します。" },
  { q: "最低契約期間はありますか？", a: "ありません。スポットでの技術相談から継続支援まで、期間の縛りなくご利用いただけます。" },
  { q: "どのくらいの規模の案件から対応できますか？", a: "規模は問いません。「ちょっと聞きたい」レベルのスポット相談から、数ヶ月のプロジェクトまで対応しています。" },
  { q: "すぐに稼働を開始できますか？", a: "状況によりますが、最短で翌営業日から着手可能です。まずはお気軽にご相談ください。" },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? " faq-item--open" : ""}`}>
      <button type="button" className="faq-question" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <svg className="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
      <div className="faq-answer">
        <p>{a}</p>
      </div>
    </div>
  );
}

const SERVICE_SCHEMAS = [
  {
    name: "クラウド公開・セキュリティ支援",
    description: "開発したアプリケーションを AWS / GCP / Azure へ安全に公開。デプロイ環境の構築からネットワーク・セキュリティ設計まで支援します。",
    serviceType: "クラウドインフラ構築",
  },
  {
    name: "生成AI導入・業務自動化",
    description: "Claude 等の生成AIを活用したバックオフィス自動化・Slack業務フロー構築。PoCから社内導入まで伴走支援します。",
    serviceType: "生成AI導入支援",
  },
  {
    name: "社内IT・クラウド運用代行",
    description: "情シス不在の企業のIT担当として、クラウド運用・監視・セキュリティ・属人化解消を継続的に支援します。",
    serviceType: "IT運用支援",
  },
  {
    name: "技術顧問",
    description: "技術選定やアーキテクチャの意思決定を、特定製品に偏らず実務経験に基づいて支援します。",
    serviceType: "技術コンサルティング",
  },
];

function Services() {
  usePageMeta(
    "事業内容",
    "クラウド公開・セキュリティ支援、生成AI導入・業務自動化、社内IT・クラウド運用代行、技術顧問。株式会社団野ソフトウェア。",
    "/services"
  );

  const wrapperRef = useRevealAll();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...SERVICE_SCHEMAS.map((s) => ({
        "@type": "Service",
        "name": s.name,
        "description": s.description,
        "serviceType": s.serviceType,
        "provider": {
          "@type": "Organization",
          "name": "株式会社団野ソフトウェア",
          "url": "https://danno-software.com",
        },
        "areaServed": "JP",
      })),
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
      },
    ],
  };

  return (
    <div ref={wrapperRef}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="srv-hero">
        <div className="srv-hero-inner">
          <span className="srv-hero-label">Services</span>
          <div className="srv-hero-line" />
          <h1>事業内容</h1>
          <p className="srv-hero-sub">
            アプリのクラウド公開から、生成AIによる業務自動化、社内ITの整備まで。<br />
            中小企業・スタートアップの「技術の手が足りない」を、一貫して支援します。
          </p>
        </div>
      </section>

      <section className="srv-target">
        <div className="srv-target-inner">
          <h2 className="page-reveal">こんな課題はありませんか？</h2>
          <div className="srv-target-grid">
            {[
              "アプリは作れたが、AWS 等への公開・運用の仕方がわからない",
              "社内アプリを作りたいが、安心してWebに公開できるか不安",
              "生成AIを導入したいが、社内の反発や不安が大きく進められない",
              "担当者が辞めてしまい、業務のシステム化・自動化が急務になっている",
              "Slack を使った業務フローの自動化・効率化をしたい",
              "社内ITやネットワーク・セキュリティの整備まで手が回らない",
            ].map((text, i) => (
              <div className="srv-target-item page-reveal" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
                <svg className="srv-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="srv-detail">
        <div className="srv-detail-inner">
          {[
            {
              num: "01", title: "クラウド公開・セキュリティ支援",
              desc: "「アプリは作れたが、公開の仕方がわからない」を解決します。AWS / GCP / Azure への安全なデプロイ環境を構築し、ネットワーク・セキュリティ設計まで対応。作って終わりではなく、安心して運用できる状態で納品します。",
              tagLabel: "対応技術", tags: ["AWS", "Google Cloud", "Azure", "Terraform", "CI/CD"],
              scope: ["開発済みアプリのクラウド公開（デプロイ環境構築）", "ネットワーク・セキュリティ設計（アクセス制御・WAF・認証）", "社内向けアプリの安全な公開（閉域・IP制限・SSO）", "CI/CD パイプライン構築（自動デプロイ）", "Terraform 等によるIaC化・引き継ぎドキュメント整備"],
              price: "個別見積もり",
            },
            {
              num: "02", title: "生成AI導入・業務自動化",
              desc: "Claude 等の生成AIを活用して、バックオフィス業務を自動化します。「導入したいが社内の反発が大きい」という場合も、小さなPoCから一緒に始めて、効果を見せながら導入を進めます。",
              tagLabel: "対応技術", tags: ["Claude", "Amazon Bedrock", "Azure OpenAI", "Slack", "Dify"],
              scope: ["生成AIを使ったバックオフィス業務の自動化", "Slack と連携した業務フロー構築・定型業務の自動化", "PoC（小さな実証実験）による社内導入の伴走支援", "退職・人手不足に伴う業務のシステム化・自動化", "安全に使うためのガイドライン・環境整備"],
              price: "個別見積もり（小さなPoCから開始可能）",
            },
            {
              num: "03", title: "社内IT・クラウド運用代行",
              desc: "情シス担当がいなくても回る体制をつくります。御社のIT担当として、クラウド運用・監視・セキュリティ・社内ITの困りごとを月額制で継続支援します。",
              tagLabel: "対応技術", tags: ["AWS", "Google Cloud", "Azure", "CloudWatch", "Google Workspace"],
              scope: ["クラウドインフラの運用・保守・障害対応", "監視・アラート基盤の設計と運用", "社内ネットワーク・セキュリティの整備", "属人化した運用のドキュメント化・自動化", "コスト監視・継続的な最適化", "セキュリティパッチ・アップデート管理"],
              price: "20万円〜 / 月（月20〜80時間）",
            },
            {
              num: "04", title: "技術顧問",
              desc: "技術選定やアーキテクチャの意思決定を、第三者の視点から支援します。スポットの壁打ちから月額の定例レビューまで。",
              tagLabel: "対応領域", tags: ["クラウドアーキテクチャ", "技術選定", "セキュリティ", "DevOps"],
              scope: ["既存アーキテクチャのレビュー・改善提案", "技術選定・ツール選定の支援", "チームへのナレッジ共有・ハンズオン支援", "セキュリティ観点でのレビュー・助言"],
              price: "2万円〜 / 回 または 10万円〜 / 月",
            },
          ].map((svc) => (
            <article className="srv-card page-reveal" key={svc.num}>
              <div className="srv-card-header">
                <span className="srv-card-num">{svc.num}</span>
                <h2>{svc.title}</h2>
              </div>
              <div className="srv-card-body">
                <p className="srv-card-desc">{svc.desc}</p>
                <div className="srv-card-tags">
                  <h3>{svc.tagLabel}</h3>
                  <ul>{svc.tags.map((t) => (<li key={t}>{t}</li>))}</ul>
                </div>
                <div className="srv-card-scope">
                  <h3>支援内容</h3>
                  <ul>{svc.scope.map((s) => (<li key={s}>{s}</li>))}</ul>
                </div>
                <div className="srv-card-price">
                  <span>{svc.price}</span>
                </div>
                <Link to="/contact" className="srv-card-cta">
                  このサービスを無料で相談する
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="srv-strength">
        <div className="srv-strength-inner">
          <h2 className="page-reveal">私たちの強み</h2>
          <div className="srv-strength-grid">
            {[
              { title: "伝言ゲームなし", desc: "代表が直接対応。要件の認識ずれが起きにくくなります。" },
              { title: "意思決定が速い", desc: "相談から見積もり・着手まで最短で対応します。" },
              { title: "柔軟な関わり方", desc: "スポットの技術相談から継続的な運用代行まで、規模を問わず対応できます。" },
            ].map((item, i) => (
              <div className="srv-strength-item page-reveal" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="srv-strength-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="srv-flow">
        <div className="srv-flow-inner">
          <h2 className="page-reveal">ご依頼の流れ</h2>
          <div className="srv-flow-steps">
            {[
              { step: "01", title: "ヒアリング", desc: "現状の課題やご要望をお聞かせください。" },
              { step: "02", title: "ご提案", desc: "最適なサービス・進め方・お見積もりをご提示します。" },
              { step: "03", title: "実施", desc: "合意いただいた内容で作業を進めます。" },
              { step: "04", title: "納品・振り返り", desc: "成果物の確認と、今後の改善点を共有します。" },
            ].map((item, i) => (
              <div className="srv-flow-step page-reveal" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="srv-flow-num">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="srv-cases">
        <div className="srv-cases-inner">
          <h2 className="page-reveal">対応事例</h2>
          <p className="srv-cases-note page-reveal">
            以下は対応事例の一部です。記載以外の領域もお気軽にご相談ください。
          </p>
          <div className="srv-cases-grid">
            {[
              {
                tag: "業務自動化",
                title: "Slack × 生成AIによる業務アシスタント構築",
                challenge: "定型的な問い合わせ対応や調査・ドキュメント作成などの業務が特定の担当者に集中していた。",
                approach: "Slack 上でチャット感覚で生成AIに仕事を依頼できる仕組みを構築し、日常の業務フローに組み込み。バックオフィス業務の自動化を段階的に拡大。",
                result: "Slack 上で完結する業務アシスタントとして運用中。定型業務の対応時間を削減。",
              },
              {
                tag: "コスト最適化",
                title: "クラウド利用料の分析と削減",
                challenge: "クラウドの月額費用が増加傾向にあり、最適化の余地が見えていなかった。",
                approach: "利用状況の分析、未使用リソースの整理、ストレージタイプの見直し、検証環境の自動停止/起動を導入。",
                result: "月額コストを大幅に削減。",
              },
              {
                tag: "IaC",
                title: "クラウド環境の IaC 化",
                challenge: "クラウドリソースがすべて手動構築で、環境差異や属人化が発生していた。",
                approach: "Terraform / Bicep によるコード管理を導入し、CI/CD パイプラインと連携。環境ごとにパラメータを切り替える構成に整備。",
                result: "環境構築の再現性を確保し、変更がコードレビュー可能な運用に移行。",
              },
              {
                tag: "デプロイ",
                title: "ゼロダウンタイムデプロイの実現",
                challenge: "アプリケーション更新のたびにサービス停止が発生し、営業時間中のリリースが困難だった。",
                approach: "ステージングスロットを活用したスワップ方式を導入し、デプロイパイプラインを自動化。",
                result: "営業時間中でもリリース可能になり、リリース頻度が向上。問題時は即座に切り戻し可能に。",
              },
              {
                tag: "ネットワーク",
                title: "VPC / VNet のサブネット分離設計",
                challenge: "ネットワークがフラットな構成で、リソース間のアクセス制御が不十分だった。",
                approach: "用途別の多層サブネット設計、セキュリティグループ / NSG の整備、PaaS 接続のプライベート化を実施。",
                result: "セキュリティ基準を満たすネットワーク構成を実現。",
              },
              {
                tag: "CI/CD",
                title: "CI/CD パイプラインの刷新",
                challenge: "既存の CI/CD が複数リポジトリに分散し、管理コストが増大していた。",
                approach: "GitHub Actions への統合移行を実施し、OIDC 認証によるセキュアなデプロイを設計。",
                result: "シークレット管理の簡素化とデプロイの統一管理を実現。",
              },
              {
                tag: "認証基盤",
                title: "BaaS 環境のセキュリティ改善と運用整備",
                challenge: "複数アプリケーションが同一 BaaS 基盤を共有しており、アプリ間の認可制御が不十分だった。",
                approach: "アクセス制御ロジックの設計・実装、DB マイグレーションの GitHub Actions による自動化、運用フローの整備。",
                result: "認可の脆弱性を解消し、DB 変更を安全にデプロイできる体制を確立。",
              },
            ].map((c, i) => (
              <article className="srv-case-card page-reveal" key={i} style={{ animationDelay: `${i * 0.06}s` }}>
                <span className="srv-case-tag">{c.tag}</span>
                <h3>{c.title}</h3>
                <dl className="srv-case-dl">
                  <div className="srv-case-row">
                    <dt>課題</dt>
                    <dd>{c.challenge}</dd>
                  </div>
                  <div className="srv-case-row">
                    <dt>対応</dt>
                    <dd>{c.approach}</dd>
                  </div>
                  <div className="srv-case-row">
                    <dt>成果</dt>
                    <dd>{c.result}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="srv-faq">
        <div className="srv-faq-inner">
          <h2 className="page-reveal">よくある質問</h2>
          <div className="faq-list page-reveal">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
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

export default Services;
