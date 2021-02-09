/**
 * License information for the exposed API.
 * 
 * This object MAY be extended with [Specification Extensions][1].
 * 
 * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#specificationExtensions
 * 
 * ### Example with JSON
 * 
```json
{
  "name": "Apache 2.0",
  "identifier": "Apache-2.0"
}
```
 * 
 * ### Example with YAML
 * 
```yaml
name: Apache 2.0
identifier: Apache-2.0
```
 */
export class LicenseObject {
  /**
   * The license name used for the API.
   */
  name: string;
  /**
   * An [SPDX][1] license expression for the API. The `identifier` field is mutually exclusive
   * of the `url` field.
   *
   * [1]: https://spdx.org/spdx-specification-21-web-version#h.jxpfx0ykyb60
   */
  identifier?: string;
  /**
   * A URL to the license used for the API. MUST be in the format of a URL.
   * The `url` field is mutually exclusive of the `identifier` field.
   */
  url?: string;
}