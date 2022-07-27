export class User {
  public email: string | undefined;
  public id: string | undefined;
  private _token: string | undefined;
  private _tokenExpirationDate: Date | undefined;

  constructor() {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
