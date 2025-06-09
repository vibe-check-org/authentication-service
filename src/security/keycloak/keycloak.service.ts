import { keycloakConnectOptions, paths } from '../../config/keycloak.js';
import { getLogger } from '../../logger/logger.js';
import { Injectable } from '@nestjs/common';
import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type RawAxiosRequestHeaders,
} from 'axios';
import {
  type KeycloakConnectOptions,
  type KeycloakConnectOptionsFactory,
} from 'nest-keycloak-connect';

const { authServerUrl, clientId, secret } = keycloakConnectOptions;

interface Login {
  readonly username: string | undefined;
  readonly password: string | undefined;
}

@Injectable()
export class KeycloakService implements KeycloakConnectOptionsFactory {
  readonly #loginHeaders: RawAxiosRequestHeaders;
  readonly #keycloakClient: AxiosInstance;
  readonly #logger = getLogger(KeycloakService.name);

  constructor() {
    const authorization = Buffer.from(`${clientId}:${secret}`, 'utf8').toString(
      'base64',
    );
    this.#loginHeaders = {
      Authorization: `Basic ${authorization}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    this.#keycloakClient = axios.create({
      baseURL: authServerUrl,
    });
    this.#logger.debug('keycloakClient=%o', this.#keycloakClient.defaults);
  }

  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return keycloakConnectOptions;
  }

  async login({ username, password }: Login) {
    this.#logger.debug('login: username=%s', username);
    if (username === undefined || password === undefined) {
      return null;
    }

    const loginBody = `grant_type=password&username=${username}&password=${password}&scope=openid`;
    let response: AxiosResponse<Record<string, number | string>>;
    try {
      response = await this.#keycloakClient.post(paths.accessToken, loginBody, {
        headers: this.#loginHeaders,
      });
    } catch {
      this.#logger.warn('login: Fehler bei %s', paths.accessToken);
      return null;
    }

    this.#logPayload(response);
    this.#logger.debug('login: response.data=%o', response.data);
    return response.data;
  }

  async refresh(refresh_token: string | undefined) {
    this.#logger.debug('refresh: refresh_token=%s', refresh_token);
    if (refresh_token === undefined) {
      return null;
    }

    const refreshBody = `grant_type=refresh_token&refresh_token=${refresh_token}`;
    let response: AxiosResponse<Record<string, number | string>>;
    try {
      response = await this.#keycloakClient.post(
        paths.accessToken,
        refreshBody,
        { headers: this.#loginHeaders },
      );
    } catch {
      this.#logger.warn(
        'refresh: Fehler bei POST-Request: path=%s, body=%o',
        paths.accessToken,
        refreshBody,
      );
      return null;
    }
    this.#logger.debug('refresh: response.data=%o', response.data);
    return response.data;
  }

  #logPayload(response: AxiosResponse<Record<string, string | number>>) {
    const { access_token } = response.data;
    const [, payloadString] = (access_token as string).split('.');

    if (payloadString === undefined) {
      return;
    }
    const payloadDecoded = atob(payloadString);
    const payload = JSON.parse(payloadDecoded);

    const { exp, realm_access } = payload;
    this.#logger.debug('#logPayload: exp=%s', exp);

    const { roles } = realm_access;
    this.#logger.debug('#logPayload: roles=%o', roles);
  }
}
