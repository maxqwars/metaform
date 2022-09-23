import { MetaModule } from "../core";
import { UrlTools } from "../utils";
import { MetaModuleOptions, MetaModuleResponse } from "../types";
import { API_METHOD, MOD_ERR } from "../enums";

export class MetaUser extends MetaModule {
  private _loginUrl: string;
  private _logoutUrl: string;

  constructor(options?: MetaModuleOptions) {
    if (options) super(options);
    super();
    const rootDomain = UrlTools.extractRootDomain(this._urlBuilder.host);
    this._loginUrl = `https://${rootDomain}/public/login.php`;
    this._logoutUrl = `https://${rootDomain}/public/logout.php`;
  }

  async login(
    email: string,
    password: string
  ): Promise<MetaModuleResponse<string | null>> {
    const sessionRe = new RegExp(/PHPSESSID=\w*/gm);

    try {
      const res = await this._fetchWithTimeout(this._loginUrl, {
        timeout: 6000,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: this._encodeLoginData(email, password),
      });

      const setCookieHead = res.headers.get("set-cookie");

      // Incorrect user data
      if (!setCookieHead) {
        const body = await res.json();
        const MODULE_ERR: MOD_ERR =
          body.key === "invalidUser"
            ? MOD_ERR.INVALID_USER
            : MOD_ERR.WRONG_PASSWD;
        return this._makeResponse(true, null, MODULE_ERR);
      }

      const sessionId = setCookieHead.match(sessionRe);
      if (!sessionId)
        return this._makeResponse(true, null, MOD_ERR.UNKNOWN_ERROR);

      const sessionKey = sessionId[0].split("=")[1];

      return this._makeResponse<string | null>(false, sessionKey, undefined);
    } catch (e) {
      return this._makeResponse<null>(true, null, MOD_ERR.NET_ERROR);
    }
  }

  private _encodeLoginData(email: string, password: string): string {
    const keys = [
      `${encodeURIComponent("mail")}=${encodeURIComponent(email)}`,
      `${encodeURIComponent("passwd")}=${encodeURIComponent(password)}`,
    ];

    return keys.join("&");
  }

  async logout(sessionId: string) {
    try {
      const req = await this._fetchWithTimeout(this._logoutUrl, {
        headers: {
          Cookie: `PHPSESSID=${sessionId}`,
        },
      });
      console.log(req.headers.get("set-cookie"));
    } catch (e) {
      console.log(e);
    }
  }

  addFavorites() {
    throw Error("Not implemented");
  }

  delFavorites() {
    throw Error("Not implemented");
  }

  async getFavorites(sessionId: string) {
    // Configure url builder
    const reqUrl = this._urlBuilder
      .useMethod(API_METHOD.GET_FAVORITES) // Set used API method
      .useQuery(`session=${sessionId}`) // TODO: Implement `GetFavoritesQuery`
      .build();

    try {
      const response = await this._fetchWithTimeout(reqUrl, {});
      return await response.json();
    } catch (e) {
      console.log(e);
    }
  }

  sessionIsActive() {
    throw Error("Not implemented");
  }
}
