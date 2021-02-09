/**
 * Lists the required security schemes to execute this operation.
 * The name used for each property MUST correspond to a security scheme declared in the
 * [Security Schemes][1] under the [Components Object][2].
 * 
 * Security Requirement Objects that contain multiple schemes require that all schemes MUST be
 * satisfied for a request to be authorized. This enables support for scenarios where multiple
 * query parameters or HTTP headers are required to convey security information.
 * 
 * When a list of Security Requirement Objects is defined on the [OpenAPI Object][3] or
 * [Operation Object][4], only one of the Security Requirement Objects in the list needs to be
 * satisfied to authorize the request.
 * 
 * ### Security Requirement Object Examples
 * 
 * #### Non-OAuth2 Security Requirement
 * 
```json
{
  "api_key": []
}
```
 * 
 * 
```yaml
api_key: []
```
 * 
 * #### OAuth2 Security Requirement
 * 
```json
{
  "petstore_auth": [
    "write:pets",
    "read:pets"
  ]
}
```
 * 
 * 
```yaml
petstore_auth:
- write:pets
- read:pets
```
 * 
 * #### Optional OAuth2 Security
 * Optional OAuth2 security as would be defined in an
 * <a href="#openapi-object">OpenAPI Object</a> or
 * an <a href="#operation-object">Operation Object</a>:
 * 
```json
{
  "security": [
    {},
    {
      "petstore_auth": [
        "write:pets",
        "read:pets"
      ]
    }
  ]
}
```
 * 
 * 
```yaml
security:
  - {}
  - petstore_auth:
    - write:pets
    - read:pets
```
 * 
 * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#componentsSecuritySchemes
 * [2]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#componentsObject
 * [3]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#oasObject
 * [4]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#operationObject
 */
export class SecurityRequirementObject {
  /**
   * Each name MUST correspond to a security scheme which is declared in the [Security Schemes][1]
   * under the [Components Object][2]. If the security scheme is of type `"oauth2"` or
   * `"openIdConnect"`, then the value is a list of scope names required for the execution, and the
   * list MAY be empty if authorization does not require a specified scope. For other security
   * scheme types, the array MAY contain a list of role names which are required for the execution,
   * but are not otherwise defined or exchanged in-band.
   * 
   * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#componentsSecuritySchemes
   * [2]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#componentsObject
   */
  [name: string]: string[];
}