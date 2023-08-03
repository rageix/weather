const appIdKey = 'appId';

export class ApiKeyStore {
  _apiKey: string;

  constructor() {
    try {
      const params = new URLSearchParams(document.location.search);
      const appId = params.get('apiKey');

      if (appId) {
        this._apiKey = appId;
      } else {
        this._apiKey = localStorage.getItem(appIdKey);
      }
    } catch (e) {
      throw 'No appId is found!';
    }
  }

  get apiKey() {
    return this._apiKey;
  }

  set apiKey(appId: string) {
    localStorage.setItem(appIdKey, appId);
    this._apiKey = appId;
  }
}

const self = new ApiKeyStore();
export default self;
