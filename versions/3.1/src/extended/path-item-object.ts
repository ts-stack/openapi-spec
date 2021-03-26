import { SpecExtFieldPattern, SpecificationExtension } from '../origin/specification-extension';
import { XOperationObject } from './operation-object';
import { XParameterObject } from './parameter-object';
import { ReferenceObject } from '../origin/reference-object';
import { XServerObject } from './server-object';

/**
 * Describes the operations available on a single path.
 * A Path Item MAY be empty, due to [ACL constraints][2].
 * The path itself is still exposed to the documentation viewer but they will not
 * know which operations and parameters are available.
 * 
 * ### Path Item Object Example
 * 
 * - Example with JSON
 * 
```json
{
  "get": {
    "description": "Returns pets based on ID",
    "summary": "Find pets by ID",
    "operationId": "getPetsById",
    "responses": {
      "200": {
        "description": "pet response",
        "content": {
          "* /*": {
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/Pet"
              }
            }
          }
        }
      },
      "default": {
        "description": "error payload",
        "content": {
          "text/html": {
            "schema": {
              "$ref": "#/components/schemas/ErrorModel"
            }
          }
        }
      }
    }
  },
  "parameters": [
    {
      "name": "id",
      "in": "path",
      "description": "ID of pet to use",
      "required": true,
      "schema": {
        "type": "array",
        "items": {
          "type": "string"
        }
      },
      "style": "simple"
    }
  ]
}
```
 * 
 * - Example with YAML
 * 
```yaml
get:
  description: Returns pets based on ID
  summary: Find pets by ID
  operationId: getPetsById
  responses:
    '200':
      description: pet response
      content:
        '* /*' :
          schema:
            type: array
            items:
              $ref: '#/components/schemas/Pet'
    default:
      description: error payload
      content:
        'text/html':
          schema:
            $ref: '#/components/schemas/ErrorModel'
parameters:
- name: id
  in: path
  description: ID of pet to use
  required: true
  schema:
    type: array
    items:
      type: string  
  style: simple
```
 * 
 * This object MAY be extended with [Specification Extensions][1].
 * 
 * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#specificationExtensions
 * [2]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#securityFiltering
 */
export type XPathItemObject<T extends SpecExtFieldPattern = any> = SpecificationExtension<T> & {
  /**
   * Allows for a referenced definition of this path item. The referenced structure MUST be
   * in the form of a [Path Item Object][1]. In case a Path Item Object
   * field appears both in the defined object and the referenced object, the behavior is undefined.
   * See the rules for resolving [Relative References][2].
   * 
   * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#pathItemObject
   * [2]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#relativeReferencesURI
   */
  $ref?: string;
  /**
   * An optional, string summary, intended to apply to all operations in this path.
   */
  summary?: string;
  /**
   * An optional, string description, intended to apply to all operations in this path.
   * [CommonMark syntax][1] MAY be used for rich text representation.
   * 
   * [1]: https://spec.commonmark.org/
   */
  description?: string;
  /**
   * A definition of a GET operation on this path.
   */
  get?: XOperationObject;
  /**
   * A definition of a PUT operation on this path.
   */
  put?: XOperationObject;
  /**
   * A definition of a POST operation on this path.
   */
  post?: XOperationObject;
  /**
   * A definition of a DELETE operation on this path.
   */
  delete?: XOperationObject;
  /**
   * A definition of a OPTIONS operation on this path.
   */
  options?: XOperationObject;
  /**
   * A definition of a HEAD operation on this path.
   */
  head?: XOperationObject;
  /**
   * A definition of a PATCH operation on this path.
   */
  patch?: XOperationObject;
  /**
   * A definition of a TRACE operation on this path.
   */
  trace?: XOperationObject;
  /**
   * An alternative `server` array to service all operations in this path.
   */
  servers?: XServerObject[];
  /**
   * A list of parameters that are applicable for all the operations described under this path.
   * These parameters can be overridden at the operation level, but cannot be removed there.
   * The list MUST NOT include duplicated parameters. A unique parameter is defined by a
   * combination of a [name][1] and [location][2]. The list can use the
   * [Reference Object][3] to link to parameters that are defined at the
   * [OpenAPI Object's components/parameters][4].
   * 
   * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#parameterName
   * [2]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#parameterIn
   * [3]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#referenceObject
   * [4]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#componentsParameters
   */
  parameters?: (XParameterObject | ReferenceObject)[];
}
