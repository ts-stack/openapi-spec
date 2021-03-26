import { SpecExtFieldPattern, SpecificationExtension } from '../origin/specification-extension';
import { XExternalDocumentationObject } from './external-documentation-object';

/**
 * Adds metadata to a single tag that is used by the [Operation Object][1].
 * It is not mandatory to have a Tag Object per tag defined in the Operation Object instances.
 * 
 * ### Tag Object Example
 * 
```json
{
	"name": "pet",
	"description": "Pets operations"
}
```
 * 
 * 
```yaml
name: pet
description: Pets operations
```
 * 
 * This object MAY be extended with [Specification Extensions][2].
 * 
 * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#operationObject
 * [2]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#specificationExtensions
 */
export type XTagObject<T extends SpecExtFieldPattern = any> = SpecificationExtension<T> & {
  /**
   * The name of the tag.
   */
  name: string;
  /**
   * A description for the tag. [CommonMark syntax][1] MAY be used for rich text representation.
   * 
   * [1]: https://spec.commonmark.org/
   */
  description?: string;
  /**
   * Additional external documentation for this tag.
   */
  externalDocs?: XExternalDocumentationObject;
}
