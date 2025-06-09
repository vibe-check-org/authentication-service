# 🔐 Omnixys Authentication Service

Der **Omnixys Authentication Service** ist der zentrale Authentifizierungsdienst innerhalb der [OmnixysSphere](https://github.com/omnixys) Microservice-Plattform. Er ist verantwortlich für sichere Benutzeranmeldung, Token-Management, Single Sign-On (SSO) und rollenbasierte Zugriffskontrolle über Keycloak.

> *Teil von **OmnixysOS** – The Fabric of Modular Innovation.*

---

## 🧹 Funktionen

* Benutzer- und Rollenverwaltung via Keycloak
* Unterstützung für OAuth2 / OpenID Connect
* JWT-Generierung und Validierung
* Token-Refresh, Logout und SSO
* GraphQL-API für Login und Token-Abruf
* Integriertes Tracing und Logging (OpenTelemetry, Kafka, Loki)
* Sicherheitskonformes Logging mit LoggerPlus

---

## ⚙️ Tech Stack

| Komponente        | Technologie                          |
| ----------------- | ------------------------------------ |
| Sprache           | TypeScript                           |
| Framework         | [NestJS](https://nestjs.com)         |
| Auth              | [Keycloak](https://www.keycloak.org) |
| Kommunikation     | GraphQL (Apollo)                     |
| Logging & Tracing | LoggerPlus, OpenTelemetry, Kafka     |
| Deployment        | Docker, GitHub Actions               |
| Port              | `7501` (fest vergeben)               |

---

## 🚀 Schnellstart

```bash
git clone https://github.com/omnixys/omnixys-authentication-service.git
cd omnixys-authentication-service
npm install
docker-compose up
```

Die Anwendung ist unter [http://localhost:7501/graphql](http://localhost:7501/graphql) erreichbar.

---

## 🔐 Sicherheitshinweis

Falls du eine Sicherheitslücke entdeckst, melde diese bitte **nicht öffentlich**, sondern schreibe an:
📧 [security@omnixys.com](mailto:security@omnixys.com)

Siehe [SECURITY.md](./SECURITY.md) für Details.

---

## 🧪 Tests

```bash
npm run test
```

> Mindestabdeckung: **80 %**, überprüft via Jest + SonarCloud.

---

## 🤝 Mitwirken

Wir freuen uns über Beiträge! Bitte beachte dazu die [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## 📜 Lizenz

Veröffentlicht unter der [GNU GPLv3](./LICENSE.md) –
© 2025 [Omnixys – Modular Thinking. Infinite Possibilities.](https://omnixys.com)

---
