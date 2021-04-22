import { OAuthFlowsObject } from './o-auth-flows-object';

/**
 * Defines a security scheme that can be used by the operations.
 * 
 * Supported schemes are HTTP authentication, an API key (either as a header, a cookie parameter
 * or as a query parameter), mutual TLS (use of a client certificate), OAuth2's common flows
 * (implicit, password, client credentials and authorization code) as defined in [RFC6749][1], and
 * [OpenID Connect Discovery][2].
 * Please note that as of 2020, the implicit flow is about to be deprecated by
 * [OAuth 2.0 Security Best Current Practice][3]. Recommended for most use case is Authorization
 * Code Grant flow with PKCE.
 * 
 * ### Security Scheme Object Example
 * 
 * #### Basic Authentication Sample
 * 
 * 
```json
{
  "type": "http",
  "scheme": "basic"
}
```
 * 
 * 
```yaml
type: http
scheme: basic
```
 * 
 * #### API Key Sample
 * 
```json
{
  "type": "apiKey",
  "name": "api_key",
  "in": "header"
}
```
 * 
 * 
```yaml
type: apiKey
name: api_key
in: header
```
 * 
 * #### JWT Bearer Sample
 * 
```json
{
  "type": "http",
  "scheme": "bearer",
  "bearerFormat": "JWT",
}
```
 * 
 * 
```yaml
type: http
scheme: bearer
bearerFormat: JWT
```
 * 
 * #### Implicit OAuth2 Sample
 * 
```json
{
  "type": "oauth2",
  "flows": {
    "implicit": {
      "authorizationUrl": "https://example.com/api/oauth/dialog",
      "scopes": {
        "write:pets": "modify pets in your account",
        "read:pets": "read your pets"
      }
    }
  }
}
```
 * 
 * 
```yaml
type: oauth2
flows: 
  implicit:
    authorizationUrl: https://example.com/api/oauth/dialog
    scopes:
      write:pets: modify pets in your account
      read:pets: read your pets
```
 * 
 * This object MAY be extended with [Specification Extensions][4].
 * 
 * [1]: https://tools.ietf.org/html/rfc6749
 * [2]: https://tools.ietf.org/html/draft-ietf-oauth-discovery-06
 * [3]: https://tools.ietf.org/html/draft-ietf-oauth-security-topics
 * [4]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#specificationExtensions
 */
export type SecuritySchemeObject =
  | SecuritySchemeObjectApiKey
  | SecuritySchemeObjectHttp
  | SecuritySchemeObjectMutualTLS
  | SecuritySchemeObjectOauth2
  | SecuritySchemeObjectOpenIdConnect;

export interface SecuritySchemeObjectBasic {
  /**
   * Applies To any.
   *
   * The type of the security scheme. Valid values are `"apiKey"`, `"http"`,
   * `"mutualTLS"`, `"oauth2"`, `"openIdConnect"`.
   */
  type: 'apiKey' | 'http' | 'mutualTLS' | 'oauth2' | 'openIdConnect';
  /**
   * Applies To any.
   *
   * A description for security scheme. [CommonMark syntax][1] MAY be used for rich text
   * representation.
   *
   * [1]: https://spec.commonmark.org/
   */
  description?: string;
  /**
   * Applies To `apiKey`.
   *
   * The name of the header, query or cookie parameter to be used.
   */
  name?: string;
  /**
   * Applies To `apiKey`.
   *
   * The location of the API key. Valid values are `"query"`, `"header"` or `"cookie"`.
   */
  in?: 'query' | 'header' | 'cookie';
  /**
   * Applies To `http`.
   *
   * The name of the HTTP Authorization scheme to be used in the [Authorization header as defined
   * in RFC7235][1]. The values used SHOULD be registered in the [IANA Authentication Scheme registry][2].
   *
   * [1]: https://tools.ietf.org/html/rfc7235#section-5.1
   * [2]: https://www.iana.org/assignments/http-authschemes/http-authschemes.xhtml
   */
  scheme?: string;
  /**
   * Applies To `http` (`"bearer"`).
   *
   * A hint to the client to identify how the bearer token is formatted. Bearer tokens are usually
   * generated by an authorization server, so this information is primarily for
   * documentation purposes.
   */
  bearerFormat?: string;
  /**
   * Applies To `oauth2`.
   *
   * An object containing configuration information for the flow types supported.
   */
  flows?: OAuthFlowsObject;
  /**
   * Applies To `openIdConnect`.
   *
   * OpenId Connect URL to discover OAuth2 configuration values. This MUST be in the form of a URL.
   * The OpenID Connect standard requires the use of TLS.
   */
  openIdConnectUrl?: string;
}

export interface SecuritySchemeObjectApiKey extends SecuritySchemeObjectBasic {
  type: 'apiKey';
  name: string;
  in: 'query' | 'header' | 'cookie';
  scheme?: never;
  bearerFormat?: never;
  flows?: never;
  openIdConnectUrl?: never;
}

export interface SecuritySchemeObjectHttp extends SecuritySchemeObjectBasic {
  type: 'http';
  name?: never;
  in?: never;
  scheme: string;
  bearerFormat?: string;
  flows?: never;
  openIdConnectUrl?: never;
}

export interface SecuritySchemeObjectMutualTLS extends SecuritySchemeObjectBasic {
  type: 'mutualTLS';
  name?: never;
  in?: never;
  scheme?: never;
  bearerFormat?: never;
  flows?: never;
  openIdConnectUrl?: never;
}

export interface SecuritySchemeObjectOauth2 extends SecuritySchemeObjectBasic {
  type: 'oauth2';
  name?: never;
  in?: never;
  scheme?: never;
  bearerFormat?: never;
  flows: OAuthFlowsObject;
  openIdConnectUrl?: never;
}

export interface SecuritySchemeObjectOpenIdConnect extends SecuritySchemeObjectBasic {
  type: 'openIdConnect';
  name?: never;
  in?: never;
  scheme?: never;
  bearerFormat?: never;
  flows?: never;
  openIdConnectUrl: string;
}
