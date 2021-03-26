import { SpecExtFieldPattern, SpecificationExtension } from '../origin/specification-extension';
import { XServerVariableObject } from './server-variable-object';

/**
 * An object representing a Server.
 * 
 * This object MAY be extended with [Specification Extensions][1].
 * 
 * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#specificationExtensions
 * 
 * A single server would be described as:
 * 
 * - example with JSON
 * 
```json
{
  "url": "https://development.gigantic-server.com/v1",
  "description": "Development server"
}
```
 * 
 * - example with YAML
 * 
 ```yaml
 url: https://development.gigantic-server.com/v1
 description: Development server
 ```
 * 
 * The following shows how multiple servers can be described, for example, at the
 * OpenAPI Object's [`servers`](#oasServers):
 * 
 * - example with JSON
 * 
```json
{
  "servers": [
    {
      "url": "https://development.gigantic-server.com/v1",
      "description": "Development server"
    },
    {
      "url": "https://staging.gigantic-server.com/v1",
      "description": "Staging server"
    },
    {
      "url": "https://api.gigantic-server.com/v1",
      "description": "Production server"
    }
  ]
}
```
 * 
 * - example with YAML
 * 
```yaml
servers:
- url: https://development.gigantic-server.com/v1
  description: Development server
- url: https://staging.gigantic-server.com/v1
  description: Staging server
- url: https://api.gigantic-server.com/v1
  description: Production server
```
 * 
 * The following shows how variables can be used for a server configuration:
 * 
 * - example with JSON
 * 
```json
{
  "servers": [
    {
      "url": "https://{username}.gigantic-server.com:{port}/{basePath}",
      "description": "The production API server",
      "variables": {
        "username": {
          "default": "demo",
          "description": "this value is assigned by the service provider, in this example `gigantic-server.com`"
        },
        "port": {
          "enum": [
            "8443",
            "443"
          ],
          "default": "8443"
        },
        "basePath": {
          "default": "v2"
        }
      }
    }
  ]
}
```
 * 
 * - example with YAML
 * 
```yaml
servers:
- url: https://{username}.gigantic-server.com:{port}/{basePath}
  description: The production API server
  variables:
    username:
      # note! no enum here means it is an open value
      default: demo
      description: this value is assigned by the service provider, in this example `gigantic-server.com`
    port:
      enum:
        - '8443'
        - '443'
      default: '8443'
    basePath:
      # open meaning there is the opportunity to use special base paths as assigned by the provider, default is `v2`
      default: v2
```
 */
export type XServerObject<T extends SpecExtFieldPattern = any> = SpecificationExtension<T> & {
  /**
   * A URL to the target host.  This URL supports Server Variables and MAY be relative,
   * to indicate that the host location is relative to the location where the OpenAPI document
   * is being served. Variable substitutions will be made when a variable is named
   * in `{`brackets`}`.
   */
  url: string;
  /**
   * An optional string describing the host designated by the URL.
   * [CommonMark syntax][1] MAY be used for rich text representation.
   * 
   * [1]: https://spec.commonmark.org/
   */
  description?: string;
  /**
   * A map between a variable name and its value.
   * The value is used for substitution in the server's URL template.
   */
  variables?: { [variableName: string]: XServerVariableObject };
}