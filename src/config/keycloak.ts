import { config } from './app.js';
import { env } from './env.js';
import {
  type KeycloakConnectConfig,
  PolicyEnforcementMode,
  TokenValidation,
} from 'nest-keycloak-connect';

const { keycloak } = config;
const authServerUrl =
  (keycloak?.authServerUrl as string | undefined) ?? 'http://localhost:8080';
const realm = (keycloak?.realm as string | undefined) ?? 'gentleBank';
const clientId = keycloak?.clientId as string | undefined;
const tokenValidation =
  (keycloak?.tokenValidation as TokenValidation | undefined) ??
  (TokenValidation.ONLINE as TokenValidation);

const { KC_SERVICE_SECRET, NODE_ENV } = env;
export const keycloakConnectOptions: KeycloakConnectConfig = {
  authServerUrl,
  realm,
  clientId,
  secret:
    KC_SERVICE_SECRET ??
    'ERROR: Umgebungsvariable KC_SERVICE_SECRET nicht gesetzt!',
  policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
  tokenValidation,
};
if (NODE_ENV === 'development') {
  console.debug('keycloakConnectOptions = %o', keycloakConnectOptions);
}

export const paths = {
  accessToken: `realms/${realm}/protocol/openid-connect/token`,
  userInfo: `realms/${realm}/protocol/openid-connect/userinfo`,
  introspect: `realms/${realm}/protocol/openid-connect/token/introspect`,
};
