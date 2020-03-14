# VS COVID-19 企業による支援リスト
https://vs-covid19.now.sh/
[![](https://i.gyazo.com/a4e00faf8a6da6ac42073d148efbbd21.png)](https://gyazo.com/a4e00faf8a6da6ac42073d148efbbd21)

DATA: CC0 [企業などによる支援一覧](https://docs.google.com/spreadsheets/d/1IiHUk3D_b6e5BfqFG3ZBxQ8X-QVACdY7CeQeG6C7S1w/)
*※政府の公開する企業等による支援情報のオープンデータに加え、提供されているサービスを公開資料を基に整理したものであり、支援サービスをすべて網羅しているわけではありません。また、空欄は公開情報に明確に情報が記載されていないため空欄にしており、その内容がないというわけではありません。またサービスの問い合わせ等は直接支援企業にお問い合わせ下さい。推奨ブラウザは、Chrome/Safariの最新版です。ブラウザによっては、動作しないことがあります。

- App：CC BY Code for Japan ([@taisukef](https://twitter.com/taisukef)), [@yokinist](https://github.com/yokinist)
- Design: CC BY HOWMORI ([@howmori](https://twitter.com/howmori)), [@yokinist](https://github.com/yokinist)

## 開発環境のつくりかた
```
$ yarn
$ yarn dev
```

### 使用技術
- フレームワーク: Preact
- ホスティング/デプロイ: Now
- モジュールバンドラー: Parcel
- 言語: TypeScript

### デプロイに関して
- masterにプッシュ後Now.shが自動デプロイをしてくれる
- masterへのPRはプッシュする度にデプロイプレビュー用のURLを生成してくれる
