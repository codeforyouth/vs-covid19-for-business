import { Support } from '../typings';

export default (csv: string[][]): Support[] => {
  const res = [];
  const head = csv[0];
  for (let i = 1; i < csv.length; i++) {
    const d: Support | undefined | null = {};
    for (let j = 0; j < head.length; j++) {
      d[head[j] as keyof Support] = csv[i][j];
    }
    res.push(d);
  }
  return res;
};
