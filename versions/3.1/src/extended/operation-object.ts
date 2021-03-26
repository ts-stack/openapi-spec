import { XCallbackObject } from './callback-object';
import { XExternalDocumentationObject } from './external-documentation-object';
import { XParameterObject } from './parameter-object';
import { XReferenceObject } from './reference-object';
import { XRequestBodyObject } from './request-body-object';
import { XResponsesObject } from './responses-object';
import { XSecurityRequirementObject } from './security-requirement-object';
import { XServerObject } from './server-object';

/**
 * Describes a single API operation on a path.
 * 
 * ### Operation Object Example
 * 
 * - Example with JSON
 * 
```json
{
  "tags": [
    "pet"
  ],
  "summary": "Updates a pet in the store with form data",
  "operationId": "updatePetWithForm",
  "parameters": [
    {
      "name": "petId",
      "in": "path",
      "description": "ID of pet that needs to be updated",
      "required": true,
      "schema": {
        "type": "string"
      }
    }
  ],
  "requestBody": {
    "content": {
      "application/x-www-form-urlencoded": {
        "schema": {
          "type": "object",
          "properties": {
            "name": { 
              "description": "Updated name of the pet",
              "type": "string"
            },
            "status": {
              "description": "Updated status of the pet",
              "type": "string"
            }
          },
          "required": ["status"] 
        }
      }
    }
  },
  "responses": {
    "200": {
      "description": "Pet updated.",
      "content": {
        "application/json": {},
        "application/xml": {}
      }
    },
    "405": {
      "description": "Method Not Allowed",
      "content": {
        "application/json": {},
        "application/xml": {}
      }
    }
  },
  "security": [
    {
      "petstore_auth": [
        "write:pets",
        "read:pets"
      ]
    }
  ]
}
```
 * 
 * - Example with YAML
 *
```yaml
tags:
- pet
summary: Updates a pet in the store with form data
operationId: updatePetWithForm
parameters:
- name: petId
  in: path
  description: ID of pet that needs to be updated
  required: true
  schema:
    type: string
requestBody:
  content:
    'application/x-www-form-urlencoded':
      schema:
       type: object
       properties:
          name: 
            description: Updated name of the pet
            type: string
          status:
            description: Updated status of the pet
            type: string
       required:
         - status
responses:
  '200':
    description: Pet updated.
    content: 
      'application/json': {}
      'application/xml': {}
  '405':
    description: Method Not Allowed
    content: 
      'application/json': {}
      'application/xml': {}
security:
- petstore_auth:
  - write:pets
  - read:pets
```
 * 
 * This object MAY be extended with [Specification Extensions][1].
 * 
 * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#specificationExtensions
 */
export interface XOperationObject {
  /**
   * A list of tags for API documentation control. Tags can be used for logical grouping of
   * operations by resources or any other qualifier.
   */
  tags?: string[];
  /**
   * A short summary of what the operation does.
   */
  summary?: string;
  /**
   * A verbose explanation of the operation behavior.
   * [CommonMark syntax][1] MAY be used for rich text representation.
   * 
   * [1]: https://spec.commonmark.org/
   */
  description?: string;
  /**
   * Additional external documentation for this operation.
   */
  externalDocs?: XExternalDocumentationObject;
  /**
   * Unique string used to identify the operation. The id MUST be unique among all operations
   * described in the API. The operationId value is **case-sensitive**. Tools and libraries MAY
   * use the operationId to uniquely identify an operation, therefore, it is RECOMMENDED
   * to follow common programming naming conventions.
   */
  operationId?: string;
  /**
   * A list of parameters that are applicable for this operation. If a parameter is already defined
   * at the [Path Item][1], the new definition will override it but can never remove it. The list
   * MUST NOT include duplicated parameters. A unique parameter is defined by a combination of
   * a [name][2] and [location][3]. The list can use the [Reference Object][4] to link to
   * parameters that are defined at the [OpenAPI Object's components/parameters][5].
   * 
   * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#pathItemParameters
   * [2]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#parameterName
   * [3]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#parameterIn
   * [4]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#referenceObject
   * [5]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#componentsParameters
   */
  parameters?: (XParameterObject | XReferenceObject)[];
  /**
   * The request body applicable for this operation.  The `requestBody` is fully supported in HTTP
   * methods where the HTTP 1.1 specification [RFC7231][1] has explicitly defined semantics for
   * request bodies.  In other cases where the HTTP spec is vague (such as [GET][1], [HEAD][2]
   * and [DELETE][3]), `requestBody` is permitted but does not have well-defined semantics
   * and SHOULD be avoided if possible.
   * 
   * [1]: https://tools.ietf.org/html/rfc7231#section-4.3.1
   * [2]: https://tools.ietf.org/html/rfc7231#section-4.3.2
   * [3]: https://tools.ietf.org/html/rfc7231#section-4.3.5
   */
  requestBody?: XRequestBodyObject | XReferenceObject;
  /**
   * The list of possible responses as they are returned from executing this operation.
   */
  responses?: XResponsesObject;
  /**
   * A map of possible out-of band callbacks related to the parent operation. The key is a unique
   * identifier for the Callback Object. Each value in the map is a [Callback Object][1]
   * that describes a request that may be initiated by the API provider and the expected responses.
   * 
   * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#callbackObject
   */
  callbacks?: { [callbackName: string]: XCallbackObject | XReferenceObject };
  /**
   * Declares this operation to be deprecated. Consumers SHOULD refrain from usage of the declared
   * operation. Default value is `false`.
   */
  deprecated?: boolean;
  /**
   * A declaration of which security mechanisms can be used for this operation. The list of values
   * includes alternative security requirement objects that can be used. Only one of the security
   * requirement objects need to be satisfied to authorize a request. To make security optional,
   * an empty security requirement (`{}`) can be included in the array. This definition overrides
   * any declared top-level [`security`][1]. To remove a top-level security declaration,
   * an empty array can be used.
   * 
   * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#oasSecurity
   */
  security?: XSecurityRequirementObject[];
  /**
   * An alternative `server` array to service this operation. If an alternative `server` object is
   * specified at the Path Item Object or Root level, it will be overridden by this value.
   */
  servers?: XServerObject[];
}
