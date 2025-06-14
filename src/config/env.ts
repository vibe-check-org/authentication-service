import dotenv from 'dotenv';
import process from 'node:process';

// Laden der Umgebungsvariablen aus einer .env-Datei
dotenv.config();

const { NODE_ENV, KC_SERVICE_SECRET, LOG_DEFAULT, START_DB_SERVER } =
  process.env;

/* eslint-disable @typescript-eslint/naming-convention */
/**
 * Umgebungsvariable zur Konfiguration
 */
export const env = {
  // Umgebungsvariable `NODE_ENV` als gleichnamige Konstante, die i.a. einen der
  // folgenden Werte enthält:
  // - `production`, z.B. in einer Cloud,
  // - `development` oder
  // - `test`
  NODE_ENV,
  KC_SERVICE_SECRET,
  LOG_DEFAULT,
  START_DB_SERVER,
} as const;
/* eslint-enable @typescript-eslint/naming-convention */

console.debug('NODE_ENV = %s', NODE_ENV);
console.debug('NODE_ENV = %s', LOG_DEFAULT);
