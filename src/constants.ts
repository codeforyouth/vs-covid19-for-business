export const SHEET_URL =
  'https://app.sabae.cc/api/googlespreadsheet.json?key=2PACX-1vSFMNp5HcRNOF5MrAujEUWR1dIoX2mncMEWTbPlVAaJqKWiq831-6gnCyI7n_G8YfPqNQXrfwyVjyHL';

export const LAYOUT_WIDTH = 920;

type keys = 'development' | 'production';
export const BASE_URL = {
  development: 'http://localhost:1234/',
  production: 'https://vs-covid19.now.sh/',
}[(process.env.NODE_ENV as keys) || 'development'];

export const Meta = {
  title: 'VS COVID-19 #民間支援情報ナビ',
  description: '企業等による新型コロナウイルス感染症対策支援サービスまとめ',
};
