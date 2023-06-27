import { Http } from "./adapter/http";
import { Storage } from "./adapter/storage";
import { TokenStorage, ITokenStorage } from "./adapter/storage/token";

interface IStorage {
  local: Storage;
  token: ITokenStorage;
}

export interface IInfrastructures {
  http: Http;
  storage: IStorage;
}

const storage = {
  local: new Storage(localStorage),
} as IStorage;
storage.token = new TokenStorage(storage.local);

export function BaseInfrastructure(): IInfrastructures {
  return {
    http: new Http(),
    storage: storage as IInfrastructures["storage"],
  };
}
