import { NgModule } from '@angular/core';
import Amplify, { Auth } from 'aws-amplify';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import * as localForage from 'localforage';
import config from './aws-exports';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';

Amplify.configure(config);
Auth.configure(config);

export const AppSyncClient = new AWSAppSyncClient({
  url: config.aws_appsync_graphqlEndpoint,
  region: config.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () =>
      (await Auth.currentSession()).getIdToken().getJwtToken()
  },
  complexObjectsCredentials: () => Auth.currentCredentials(),
  cacheOptions: { addTypename: true },
  offlineConfig: { storage: localForage }
});

@NgModule({
  exports: [AmplifyUIAngularModule]
})
export class AppsyncModule {}