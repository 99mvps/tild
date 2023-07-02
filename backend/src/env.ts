export function setEnvironment() {
  switch (process.env.NODE_ENV) {
    case "test":
      return [".env.test", "/etc/secrets/.env"];
    case "stage":
      return [".env.stage", "/etc/secrets/.env"];
    case "development":
      return [".env.development", "/etc/secrets/.env"];
    case "production":
    default:
      return "/etc/secrets/.env";
  }
}
