export const SHEET_URL =
  'https://jirei-seido-api.mirasapo-plus.go.jp/supports?keywords=%E6%96%B0%E5%9E%8B%E3%82%B3%E3%83%AD%E3%83%8A%E3%82%A6%E3%82%A4%E3%83%AB%E3%82%B9%E6%84%9F%E6%9F%93%E7%97%87%E9%96%A2%E9%80%A3';

export const LAYOUT_WIDTH = 920;

type keys = 'development' | 'production';
export const BASE_URL = {
  development: 'http://localhost:1234',
  production: 'https://covid19-support.info',
}[(process.env.NODE_ENV as keys) || 'development'];

export const Meta = {
  title: 'VS COVID-19 #民間支援情報ナビ',
  description: '企業等による新型コロナウイルス感染症対策支援サービスまとめ',
};
