# 株式会社団野ソフトウェア コーポレートサイト

Vite + React + TypeScript で構築。Vercel でホスティング。

## セットアップ

```bash
npm install
npm run dev
```

### 機密値の自動検出（gitleaks）

このリポジトリはパブリックのため、コミット前に [gitleaks](https://github.com/gitleaks/gitleaks) で機密値を自動検出する pre-commit フックを使用しています。

初回のみ以下を実行してください:

```bash
# 1. gitleaks をインストール
brew install gitleaks

# 2. pre-commit フックを配置
cp hooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

## コマンド

| コマンド | 説明 |
|---|---|
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | プロダクションビルド |
| `npm run lint` | ESLint |
