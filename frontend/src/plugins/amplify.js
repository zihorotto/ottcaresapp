import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: 'eu-north-1',
    userPoolId: 'eu-north-1_XXXXXXX',
    userPoolWebClientId: 'xxxxxxxxxxxxxxxxxxxxxxxxxx',
  },
});
