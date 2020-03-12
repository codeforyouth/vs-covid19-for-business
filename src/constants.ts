export const SHEET_KEY =
  '2PACX-1vSFMNp5HcRNOF5MrAujEUWR1dIoX2mncMEWTbPlVAaJqKWiq831-6gnCyI7n_G8YfPqNQXrfwyVjyHL';

export const PROXY_HOST = 'https://app.sabae.cc/proxy';

export const getCSVUrl = (key: string): string =>
  `https://docs.google.com/spreadsheets/d/e/${key}/pub?gid=0&single=true&output=csv`;
