import {
    AuthServiceConfig,
    GoogleLoginProvider,
    FacebookLoginProvider
} from 'angularx-social-login';


let config = new AuthServiceConfig([
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("189931351381-tgc64ldgqtla91ih0gac6b5rb94c1i1e.apps.googleusercontent.com")
      },
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("236468527448875")
      }
]);
export function provideConfig() {
    return config;
}