import { MediaTypeObject } from './media-type-object';

/**
 * Describes a single request body.
 * 
 * ### Request Body Examples
 * 
 * A request body with a referenced model definition.
 * 
 * - Example with JSON
 * 
```json
{
  "description": "user to add to the system",
  "content": {
    "application/json": {
      "schema": {
        "$ref": "#/components/schemas/User"
      },
      "examples": {
          "user" : {
            "summary": "User Example", 
            "externalValue": "https://foo.bar/examples/user-example.json"
          } 
        }
    },
    "application/xml": {
      "schema": {
        "$ref": "#/components/schemas/User"
      },
      "examples": {
          "user" : {
            "summary": "User example in XML",
            "externalValue": "https://foo.bar/examples/user-example.xml"
          }
        }
    },
    "text/plain": {
      "examples": {
        "user" : {
            "summary": "User example in Plain text",
            "externalValue": "https://foo.bar/examples/user-example.txt" 
        }
      } 
    },
    "* /*": {
      "examples": {
        "user" : {
            "summary": "User example in other format",
            "externalValue": "https://foo.bar/examples/user-example.whatever"
        }
      }
    }
  }
}
```
 * 
 * - Example with YAML
 * 
```yaml
description: user to add to the system
content: 
  'application/json':
    schema:
      $ref: '#/components/schemas/User'
    examples:
      user:
        summary: User Example
        externalValue: 'https://foo.bar/examples/user-example.json'
  'application/xml':
    schema:
      $ref: '#/components/schemas/User'
    examples:
      user:
        summary: User example in XML
        externalValue: 'https://foo.bar/examples/user-example.xml'
  'text/plain':
    examples:
      user:
        summary: User example in Plain text
        externalValue: 'https://foo.bar/examples/user-example.txt'
  '* /*':
    examples:
      user: 
        summary: User example in other format
        externalValue: 'https://foo.bar/examples/user-example.whatever'
```
 * 
 * A body parameter that is an array of string values:
 * 
 * - example with JSON
 * 
```json
{
  "description": "user to add to the system",
  "required": true,
  "content": {
    "text/plain": {
      "schema": {
        "type": "array",
        "items": {
          "type": "string"
        }
      }
    }
  }
}
```
 * 
 * - Example with YAML
 * 
```yaml
description: user to add to the system
required: true
content:
  text/plain:
    schema:
      type: array
      items:
        type: string
```
 * 
 * This object MAY be extended with [Specification Extensions][1].
 * 
 * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#specificationExtensions
 */
export interface RequestBodyObject {
  /**
   * A brief description of the request body. This could contain examples of use.
   * [CommonMark syntax][1] MAY be used for rich text representation.
   * 
   * [1]: https://spec.commonmark.org/
   */
  description?: string;
  /**
   * The content of the request body. The key is a media type or
   * [media type range][1] and the value describes it.
   * For requests that match multiple keys, only the most specific key is applicable. e.g. `text/plain` overrides `text/*`
   * 
   * [1]: https://tools.ietf.org/html/rfc7231#appendix-D
   */
  content: { [mediaTypeName: string]: MediaTypeObject };
  /**
   * Determines if the request body is required in the request. Defaults to `false`.
   */
  required?: boolean;
}