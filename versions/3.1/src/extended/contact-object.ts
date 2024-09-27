import { ContactObject } from '../origin/contact-object';
import { SpecExtFieldPattern, SpecificationExtension } from '../origin/specification-extension';

/**
 * Contact information for the exposed API.
 * 
 * This object MAY be extended with [Specification Extensions][1].
 * 
 * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#specification-extensions
 * 
 * ### Example with JSON
 * 
```json
{
  "name": "API Support",
  "url": "https://www.example.com/support",
  "email": "support@example.com"
}
```
 * 
 * ### Example with YAML
 * 
```yaml
name: API Support
url: https://www.example.com/support
email: support@example.com
```
 */
export type XContactObject<T extends SpecExtFieldPattern = any> = SpecificationExtension<T> & ContactObject;
