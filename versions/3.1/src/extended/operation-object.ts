import { SpecExtFieldPattern, SpecificationExtension } from '../origin/specification-extension';
import { XCallbackObject } from './callback-object';
import { XExternalDocumentationObject } from './external-documentation-object';
import { XParameterObject } from './parameter-object';
import { ReferenceObject } from '../origin/reference-object';
import { XRequestBodyObject } from './request-body-object';
import { XResponsesObject } from './responses-object';
import { XSecurityRequirementObject } from './security-requirement-object';
import { XServerObject } from './server-object';
import { OperationObject } from '../origin/operation-object';

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
 * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#specification-extensions
 */
export type XOperationObject<T extends SpecExtFieldPattern = any> = SpecificationExtension<T> & XOperationObjectBasic;

interface XOperationObjectBasic extends OperationObject {
  externalDocs?: XExternalDocumentationObject;
  parameters?: (XParameterObject | ReferenceObject)[];
  requestBody?: XRequestBodyObject | ReferenceObject;
  responses?: XResponsesObject;
  callbacks?: { [callbackName: string]: XCallbackObject | ReferenceObject };
  security?: XSecurityRequirementObject[];
  servers?: XServerObject[];
}
