# VS COVID-19 事業者向け政府情報ナビ
[![](./src/assets/images/vscovid19.png)](./src/assets/images/vscovid19.png)

## このリポジトリについて
新型コロナウイルス感染症対策に関する事業者向け政府支援制度情報の提供情報をまとめたサイトの開発リポジトリです。[行政の支援制度データ(スプレッドシート)](https://docs.google.com/spreadsheets/d/1R1tS27iOfJe0fryN6mc_0Sz6lkE3846_jWEeVlz9cpc/edit?usp=sharing) のデータも統合されたAPI https://jirei-seido-api.mirasapo-plus.go.jp/ を利用し、より簡単に必要な支援情報が見つけられることを目的にし独自に制作された検索サイトです。データについての詳細はこちらの[プレスリリース](https://www.soumu.go.jp/menu_news/s-news/01ryutsu06_02000243.html)を参照してください。

### 開発環境のつくりかた
```
$ yarn
$ yarn dev
```

### 使用技術
- フレームワーク: Preact X
- ホスティング/デプロイ: Now.sh
- モジュールバンドラー: Parcel
- 言語: TypeScript

### デプロイに関して
#### 本番環境
- masterに変更がある度にNow.shが自動デプロイをしてくれる

#### ステージング環境のつくりかた
- 1. masterへのPRを送る
- 2. プッシュする度に確認できるデプロイプレビューURLが生成される

## 貢献者
- App:
  - [@yokinist](https://twitter.com/yokinist)
- Design:
  - [@yokinist](https://twitter.com/yokinist)