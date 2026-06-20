import { environment as productionEnvironment } from './environment.production';

export const environment = {
  ...productionEnvironment,
  githubPagesBaseHref: '/skillStart/',
  useHashRouting: true,
};
