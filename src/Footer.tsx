import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">株式会社団野ソフトウェア</Link>
          <p className="footer-desc">
            小さなチームの、技術パートナー。
          </p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <p className="footer-col-title">サービス</p>
            <nav className="footer-nav">
              <Link to="/services">事業内容</Link>
            </nav>
          </div>
          <div className="footer-col">
            <p className="footer-col-title">会社情報</p>
            <nav className="footer-nav">
              <Link to="/about">会社概要</Link>
              <Link to="/privacy">プライバシーポリシー</Link>
            </nav>
          </div>
          <div className="footer-col">
            <p className="footer-col-title">お問い合わせ</p>
            <div className="footer-nav">
              <Link to="/contact">お問い合わせフォーム</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Danno Software</p>
      </div>
    </footer>
  );
}

export default Footer;
