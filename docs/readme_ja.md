# NODE CLOUDFLARE TUNNEL
## 言語
- [英語](./docs/readme_en.md)
- [日本語](./docs/readme_ja.md)

## このリポジトリおよびパッケージについて
このリポジトリ(パッケージ)は、非公式のCloudflare Tunnelのラッパーです。我々はセキュリティに十分に対策をしていますが、使用する際は自己責任でご利用ください。

## 対応プラットフォーム

- Windows, macOS, Linux (Node.js が動作する環境)

## 概要
このパッケージは、Cloudflare Tunnel（cloudflared や Cloudflare Zero Trust を利用するトンネル）をNode.js環境から使いやすくするための軽量ラッパーです。主に以下を目的としています。

- 簡単な起動・停止インターフェース
- 設定ファイル／環境変数での柔軟な設定
- 自動再接続やログ出力の管理

なお、このリポジトリでは Quick Tunnel のみを使用します。Quick Tunnel はドメイン不要で利用できますが、Named Tunnel はドメインが必要になるため対象外です。

使用時は必ず公式ドキュメントと利用規約を確認してください。本パッケージは非公式の実装であり、利用は自己責任でお願いします。

## インストール
npm または yarn でインストールします。

```bash
npm install node-cloudflare-tunnel
# または
yarn add node-cloudflare-tunnel
```

## 使い方（基本）
最小限の例（Node.js）:

```js
/*
const Tunnel = require('node-cloudflare-tunnel');

const tunnel = new Tunnel({
	hostname: 'example.com',
	port: 8080,
	token: process.env.CLOUDFLARE_TUNNEL_TOKEN,
});

tunnel.start()
	.then(() => console.log('Tunnel started'))
	.catch(err => console.error('Failed to start tunnel', err));

// 終了
 await tunnel.stop();
 */
```

※こちらの例は、実装前に作成したテスト段階のコードです。参考にしないでください。実装後にコード例を変更する予定です。

## 設定例
設定はオブジェクト、設定ファイル（JSON/YAML）、または環境変数で行えます。環境変数の例:

- ENV EXAMPLE

## コマンドライン（もし同梱されている場合）
簡単なCLIが含まれていれば、以下のように使えます。

```bash
# 起動
npx node-cloudflare-tunnel start --config ./tunnel.config.json

# 停止
npx node-cloudflare-tunnel stop
```

## セキュリティと注意事項

- トークンやシークレットは環境変数で管理し、リポジトリにコミットしないでください。
- 公開するホスト名やポートのアクセス制御は十分に行ってください。
- 外部APIのレスポンスやクラウドサービスの挙動は変わる可能性があるため、エラーハンドリングとリトライを実装してください。

## 貢献・報告
バグ報告や機能提案は Issues で受け付けています。プルリク歓迎です。README やコードのスタイルは既存のスタイルに合わせてください。

## ライセンス
このプロジェクトのライセンス情報はリポジトリルートの `package.json` を参照してください。

## 連絡先
問題や質問がある場合は Issue を立てるか、README の連絡方法に従ってください。
