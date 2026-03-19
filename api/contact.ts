import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const raw = req.body ?? {};

  // honeypot: 隠しフィールドに値があればボット。送信成功を装ってサイレント破棄
  if (raw.website) {
    return res.status(200).json({ ok: true });
  }

  const name    = typeof raw.name    === "string" ? raw.name.replace(/[\r\n]/g, " ").trim().slice(0, 100)  : "";
  const email   = typeof raw.email   === "string" ? raw.email.trim().slice(0, 254)                          : "";
  const company = typeof raw.company === "string" ? raw.company.replace(/[\r\n]/g, " ").trim().slice(0, 100) : "";
  const message = typeof raw.message === "string" ? raw.message.trim().slice(0, 5000)                       : "";

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  const RESEND_APIKEY = process.env.RESEND_APIKEY;

  if (!RESEND_APIKEY) {
    return res.status(500).json({ error: "Server configuration error" });
  }

  const resend = new Resend(RESEND_APIKEY);

  const CONTACT_TO = process.env.CONTACT_TO;
  if (!CONTACT_TO) {
    return res.status(500).json({ error: "Server configuration error" });
  }

  const companyLine = company ? `会社名: ${company}\n` : "";

  try {
    // 管理者への通知メール
    await resend.emails.send({
      from: "株式会社団野ソフトウェア <noreply@danno-software.com>",
      to: [CONTACT_TO],
      replyTo: email,
      subject: `【お問い合わせ】${name}様より`,
      text: `お名前: ${name}\n${companyLine}メールアドレス: ${email}\n\nお問い合わせ内容:\n${message}`,
    });

    // お客様への確認メール（失敗しても管理者宛は届いているため200を返す）
    try {
      await resend.emails.send({
        from: "株式会社団野ソフトウェア <noreply@danno-software.com>",
        to: [email],
        subject: "【団野ソフトウェア】お問い合わせありがとうございます",
        text: `${name} 様\n\nこの度はお問い合わせいただき、誠にありがとうございます。\n以下の内容で承りました。\n\n─────────────────────\nお名前: ${name}\n${companyLine}メールアドレス: ${email}\n\nお問い合わせ内容:\n${message}\n─────────────────────\n\n担当者より2営業日以内にご連絡いたします。\nしばらくお待ちくださいますようお願いいたします。\n\n──\n株式会社団野ソフトウェア\nhttps://danno-software.com\n`,
      });
    } catch {
      // 確認メール失敗は無視（管理者宛は送信済み）
    }

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(500).json({ error: "Failed to send email" });
  }
}
