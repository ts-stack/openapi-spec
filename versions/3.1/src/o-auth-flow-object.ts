/**
 * Configuration details for a supported OAuth Flow.
 * 
 * ### OAuth Flow Object Examples
 * 
 * 
```JSON
{
  "type": "oauth2",
  "flows": {
    "implicit": {
      "authorizationUrl": "https://example.com/api/oauth/dialog",
      "scopes": {
        "write:pets": "modify pets in your account",
        "read:pets": "read your pets"
      }
    },
    "authorizationCode": {
      "authorizationUrl": "https://example.com/api/oauth/dialog",
      "tokenUrl": "https://example.com/api/oauth/token",
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
  authorizationCode:
    authorizationUrl: https://example.com/api/oauth/dialog
    tokenUrl: https://example.com/api/oauth/token
    scopes:
      write:pets: modify pets in your account
      read:pets: read your pets 
```
 *
 * This object MAY be extended with [Specification Extensions][1].
 * 
 * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#specificationExtensions
 */
export interface OAuthFlowObject {
  /**
   * Applies To `oauth2` (`"implicit"`, `"authorizationCode"`).
   *
   * The authorization URL to be used for this flow. This MUST be in the form of a URL.
   * The OAuth2 standard requires the use of TLS.
   */
  authorizationUrl: string;
  /**
   * Applies To `oauth2` (`"password"`, `"clientCredentials"`, `"authorizationCode"`).
   *
   * The token URL to be used for this flow. This MUST be in the form of a URL.
   * The OAuth2 standard requires the use of TLS.
   */
  tokenUrl: string;
  /**
   * Applies To `oauth2`.
   * 
   * The URL to be used for obtaining refresh tokens. This MUST be in the form of a URL.
   * The OAuth2 standard requires the use of TLS.
   */
  refreshUrl?: string;
  /**
   * Applies To `oauth2`.
   *
   * The available scopes for the OAuth2 security scheme. A map between the scope name
   * and a short description for it. The map MAY be empty.
   */
  scopes: { [scopeName: string]: string };
}
