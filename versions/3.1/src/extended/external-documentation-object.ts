import { ExternalDocumentationObject } from '../origin/external-documentation-object';
import { SpecExtFieldPattern, SpecificationExtension } from '../origin/specification-extension';

/**
 * Allows referencing an external resource for extended documentation.
 * 
 * ### External Documentation Object Example
 * 
 * - Example with JSON
```json
{
  "description": "Find more info here",
  "url": "https://example.com"
}
```
 * 
 * - Example with YAML
```yaml
description: Find more info here
url: https://example.com
```
 * 
 * This object MAY be extended with [Specification Extensions][1].
 * 
 * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#specification-extensions
 */
export type XExternalDocumentationObject<T extends SpecExtFieldPattern = any> = SpecificationExtension<T> &
  ExternalDocumentationObject;
