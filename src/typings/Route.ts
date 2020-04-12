import { Params } from '../typings';

export type RouteProps = {
  matches: { [key in keyof Params]: string };
  url: string;
  path: string;
};
