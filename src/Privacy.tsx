import { Link } from "react-router-dom";
import { usePageMeta } from "./usePageMeta.ts";

const sections = [
  {
    title: "1. 個人情報の取得",
    body: "当社は、お問い合わせフォームの送信時に、氏名、メールアドレス、会社名、お問い合わせ内容を取得します。",
  },
  {
    title: "2. 利用目的",
    body: "取得した個人情報は、お問い合わせへの回答、ご相談内容の確認、およびサービスのご提案・ご連絡のために利用し、これらの目的以外には利用しません。",
  },
  {
    title: "3. 業務委託先への提供",
    body: "当社は、お問い合わせフォームから送信された情報を、メール配信サービス「Resend」（Resend Inc.）に委託して処理します。委託先には必要な範囲で個人情報を提供しますが、目的外の利用を禁じる契約を締結しています。法令に基づく場合を除き、上記以外の第三者に個人情報を提供しません。",
  },
  {
    title: "4. アクセス解析ツール",
    body: "当サイトでは、サービス向上のため Google Analytics を利用しています。Google Analytics はCookieを使用し、個人を特定しない形でアクセス情報を収集します。収集を望まない場合は、ブラウザの設定でCookieを無効にすることができます。詳しくは https://policies.google.com/technologies/partner-sites をご覧ください。",
  },
  {
    title: "5. 安全管理",
    body: "当社は、個人情報の漏えい、滅失または毀損の防止のため、必要かつ適切な安全管理措置を講じます。",
  },
  {
    title: "6. 開示・訂正・削除",
    body: "ご本人からの個人情報の開示・訂正・削除のご請求には、ご本人であることを確認のうえ、速やかに対応します。お問い合わせフォームよりご連絡ください。",
  },
  {
    title: "7. 改定",
    body: "本ポリシーの内容は、法令の変更や運用の見直しに応じて改定することがあります。改定後の内容は当ページに掲載した時点で効力を生じます。",
  },
];

function Privacy() {
  usePageMeta(
    "プライバシーポリシー",
    "株式会社団野ソフトウェアのプライバシーポリシー。個人情報の取得・利用目的・安全管理について。",
    "/privacy"
  );

  return (
    <div>
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="page-hero-label">Privacy Policy</span>
          <div className="page-hero-line" />
          <h1>プライバシーポリシー</h1>
        </div>
      </section>

      <section className="privacy-body">
        <div className="privacy-inner">
          <p className="privacy-lead">
            株式会社団野ソフトウェア（以下「当社」）は、個人情報の重要性を認識し、個人情報の保護に関する法律および関連法令を遵守して、個人情報を適切に取り扱います。なお、当社の会社名・代表者名・所在地等の基本情報は<Link to="/about">会社概要ページ</Link>に記載しています。
          </p>
          {sections.map((s) => (
            <div className="privacy-section" key={s.title}>
              <h2>{s.title}</h2>
              <p>{s.body}</p>
            </div>
          ))}
          <p className="privacy-date">制定日: 2026年7月5日</p>
        </div>
      </section>

      <section className="page-cta">
        <div className="page-cta-inner">
          <p className="page-cta-lead">個人情報の取り扱いに関するお問い合わせはこちら。</p>
          <Link to="/contact" className="contact-button">
            <span>お問い合わせ</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Privacy;
