import { LicenseObject } from '../origin/license-object';
import { SpecExtFieldPattern, SpecificationExtension } from '../origin/specification-extension';

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
export type XLicenseObject<T extends SpecExtFieldPattern = any> = SpecificationExtension<T> & LicenseObject;
