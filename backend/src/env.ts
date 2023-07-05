export function setEnvironment() {
  switch (process.env.NODE_ENV) {
    case "test":
      return [".env.test", "envfile"];
    case "stage":
      return [".env.stage", "envfile"];
    case "development":
      return [".env.development", "envfile"];
    case "production":
    default:
      return "envfile";
  }
}
