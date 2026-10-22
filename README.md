# MARKS INTERIOR — demo-architecture1

株式会社マークスインテリアの非公式デザイン検証用サイト。承認された画像をもとに、横に探索する住宅内装のインターフェースを実装しています。

## ローカル実行

Node.js 18以上で `npm start` → http://localhost:3000 。依存パッケージ・ビルド工程はありません。`npm run check` でJavaScript構文を確認できます。

## 操作とレスポンシブ

- 900px以上: 横スクロール、ホイール、ドラッグ、6つのタブ、スライダー、次へボタン。
- 899px以下: 縦スワイプとスナップ。下部タブは横にスクロールできます。
- コンテンツにフォーカスして左右キー（モバイルは上下キー）、Home / Endで移動。
- ホットスポットとサービス詳細、会社情報をダイアログで表示。Escapeで閉じます。
- `prefers-reduced-motion`、フォーカス表示、キーボード操作に対応。

## 公開

Public repository: https://github.com/OneBe-inc/demo-architecture1

GitHub Pages: Settings → Pages → Deploy from a branch → `main` / `/ (root)` を保存してください。ビルド不要です。公開される場合のURLは `https://onebe-inc.github.io/demo-architecture1/` です。コードの存在だけではPagesの有効化を意味しません。

## デザイン・素材

- 指定タブ: 軽天工事 / 天井内装仕上げ / 壁張り工事 / 間仕切り工事 / 防音工事 / 畳・ふすまの工事。
- 住宅内装画像は生成画像で、実際の施工事例ではありません。分解表現は使用していません。
- 素材と和室の抽象ビジュアルはCSSで描画しています。
- Anton / Noto Sans JPフォントはSIL Open Font License。ライセンスは `assets/OFL-Anton.txt` と `assets/OFL-NotoSansJP.txt`。
- 会社情報の参照元: https://www.kensetumap.com/company/79193/
- 相談画面は情報表示のみ。フォーム送信、個人情報収集、アクセス解析はありません。
- 検証用として検索エンジン向けに `noindex,nofollow` を指定しています。

元画像の構成・色・比率を参照しながら実装し、小さい画面は読みやすさと操作性に合わせて再構成しています。

## 確認記録

- デスクトップ1363×936、モバイル390×844・320×568で表示を確認。320pxでページの横あふれなし。
- タブ移動、進捗スライダーのHome操作、コンテンツの矢印キー移動、サービス詳細と相談ダイアログ、Escapeによる閉じる操作をブラウザーで確認。
- モバイルの末尾サービスへの移動とナビゲーションの追従を確認。
- `npm run check` による構文確認。
- 実機のタッチジェスチャー、Safariでの確認は未実施。
