import { XHeaderObject } from './header-object';
import { XLinkObject } from './link-object';
import { XMediaTypeObject } from './media-type-object';
import { ReferenceObject } from '../origin/reference-object';
import { SpecExtFieldPattern, SpecificationExtension } from '../origin/specification-extension';

/**
 * Describes a single response from an API Operation, including design-time, static 
 * `links` to operations based on the response.
 * 
 * ### Response Object Examples
 * 
 * Response of an array of a complex type:
 * 
 * - example with JSON
 * 
```json
{
  "description": "A complex object array response",
  "content": {
    "application/json": {
      "schema": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/VeryComplexType"
        }
      }
    }
  }
}
```
 * 
 * - example with YAML
 * 
```yaml
description: A complex object array response
content: 
  application/json:
    schema: 
      type: array
      items:
        $ref: '#/components/schemas/VeryComplexType'
```
 * 
 * Response with a string type:
 * 
 * - example with JSON
 * 
```json
{
  "description": "A simple string response",
  "content": {
    "text/plain": {
      "schema": {
        "type": "string"
      }
    }
  }

}
```
 * 
 * - example with YAML
 * 
```yaml
description: A simple string response
content:
  text/plain:
    schema:
      type: string
```
 * 
 * Plain text response with headers:
 * 
 * - example with JSON
 * 
```json
{
  "description": "A simple string response",
  "content": {
    "text/plain": {
      "schema": {
        "type": "string",
        "example": "whoa!"
      }
    }
  },
  "headers": {
    "X-Rate-Limit-Limit": {
      "description": "The number of allowed requests in the current period",
      "schema": {
        "type": "integer"
      }
    },
    "X-Rate-Limit-Remaining": {
      "description": "The number of remaining requests in the current period",
      "schema": {
        "type": "integer"
      }
    },
    "X-Rate-Limit-Reset": {
      "description": "The number of seconds left in the current period",
      "schema": {
        "type": "integer"
      }
    }
  }
}
```
 * 
 * - example with YAML
 * 
```yaml
description: A simple string response
content:
  text/plain:
    schema:
      type: string
    example: 'whoa!'
headers:
  X-Rate-Limit-Limit:
    description: The number of allowed requests in the current period
    schema:
      type: integer
  X-Rate-Limit-Remaining:
    description: The number of remaining requests in the current period
    schema:
      type: integer
  X-Rate-Limit-Reset:
    description: The number of seconds left in the current period
    schema:
      type: integer
```
 * 
 * Response with no return value:
 * 
 * - example with JSON
 *
```json
{
  "description": "object created"
}
```
 * 
 * - example with YAML
 * 
```yaml
description: object created
```
 * 
 * This object MAY be extended with [Specification Extensions][1].
 * 
 * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#specificationExtensions
 */
export type XResponseObject<T extends SpecExtFieldPattern = any> = SpecificationExtension<T> & {
  /**
   * A description of the response. [CommonMark syntax][1] MAY be used for rich text representation.
   * 
   * [1]: https://spec.commonmark.org/
   */
  description: string;
  /**
   * Maps a header name to its definition. [RFC7230][1] states header names are case insensitive.
   * If a response header is defined with the name `"Content-Type"`, it SHALL be ignored.
   * 
   * [1]: https://tools.ietf.org/html/rfc7230#page-22
   */
  headers?: { [headerName: string]: XHeaderObject | ReferenceObject };
  /**
   * A map containing descriptions of potential response payloads. The key is a media type or
   * [media type range][1] and the value describes it.  For responses that match multiple keys,
   * only the most specific key is applicable. e.g. `text/plain` overrides `text/*`.
   * 
   * [1]: https://tools.ietf.org/html/rfc7231#appendix-D
   */
  content?: { [mediaTypeName: string]: XMediaTypeObject };
  /**
   * A map of operations links that can be followed from the response. The key of the map is
   * a short name for the link, following the naming constraints of the names for
   * [Component Objects][1].
   * 
   * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#componentsObject
   */
  links?: { [linkName: string]: XLinkObject | ReferenceObject };
}
