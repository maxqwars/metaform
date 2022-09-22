import { MetaModule } from "../core";
import { UrlTools } from "../utils";
import { MetaModuleOptions } from "../types";
import { API_METHOD } from "../enums";

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

  async login(email: string, passwd: string) {
    const regex = new RegExp(/PHPSESSID=\w*/gm);

    try {
      const response = await fetch(this._loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: this._encodeLoginData(email, passwd),
      });

      const setPhpSessions = response.headers.get("set-cookie")?.match(regex);

      if (!setPhpSessions) {
        throw Error("Not Working");
      }

      console.log(setPhpSessions[0].split("=")[1]);

      return setPhpSessions[0].split("=")[1];
    } catch (e) {
      console.log(e);
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
