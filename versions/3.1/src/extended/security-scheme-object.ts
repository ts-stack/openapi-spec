import { SecuritySchemeObjectBasic } from '../origin/security-scheme-object';
import { SpecExtFieldPattern, SpecificationExtension } from '../origin/specification-extension';
import { XOAuthFlowsObject } from './o-auth-flows-object';

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
export type XSecuritySchemeObject<T extends SpecExtFieldPattern = any> = SpecificationExtension<T> &
  (
    | XSecuritySchemeObjectApiKey
    | XSecuritySchemeObjectHttp
    | XSecuritySchemeObjectMutualTLS
    | XSecuritySchemeObjectOauth2
    | XSecuritySchemeObjectOpenIdConnect
  );

interface XSecuritySchemeObjectBasic extends SecuritySchemeObjectBasic {
  flows?: XOAuthFlowsObject;
}

export interface XSecuritySchemeObjectApiKey extends XSecuritySchemeObjectBasic {
  type: 'apiKey';
  name: string;
  in: 'query' | 'header' | 'cookie';
  scheme?: never;
  bearerFormat?: never;
  flows?: never;
  openIdConnectUrl?: never;
}

export interface XSecuritySchemeObjectHttp extends XSecuritySchemeObjectBasic {
  type: 'http';
  name?: never;
  in?: never;
  scheme: string;
  bearerFormat?: string;
  flows?: never;
  openIdConnectUrl?: never;
}

export interface XSecuritySchemeObjectMutualTLS extends XSecuritySchemeObjectBasic {
  type: 'mutualTLS';
  name?: never;
  in?: never;
  scheme?: never;
  bearerFormat?: never;
  flows?: never;
  openIdConnectUrl?: never;
}

export interface XSecuritySchemeObjectOauth2 extends XSecuritySchemeObjectBasic {
  type: 'oauth2';
  name?: never;
  in?: never;
  scheme?: never;
  bearerFormat?: never;
  flows: XOAuthFlowsObject;
  openIdConnectUrl?: never;
}

export interface XSecuritySchemeObjectOpenIdConnect extends XSecuritySchemeObjectBasic {
  type: 'openIdConnect';
  name?: never;
  in?: never;
  scheme?: never;
  bearerFormat?: never;
  flows?: never;
  openIdConnectUrl: string;
}
