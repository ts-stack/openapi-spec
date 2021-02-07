import { ExternalDocumentationObject } from './external-documentation-object';

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
 * [1]: https://swagger.io/specification/#operationObject
 * [2]: https://swagger.io/specification/#specificationExtensions
 */
export class TagObject {
  /**
   * A short description for the tag. 
   */
  name: string;
  /**
   * A short description for the tag. [CommonMark syntax][1] MAY be used for rich text representation.
   * 
   * [1]: https://spec.commonmark.org/
   */
  description?: string;
  /**
   * Additional external documentation for this tag.
   */
  externalDocs?: ExternalDocumentationObject;
}
