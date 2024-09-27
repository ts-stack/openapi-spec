import { SpecExtFieldPattern, SpecificationExtension } from '../origin/specification-extension';
import { XCallbackObject } from './callback-object';
import { XExampleObject } from './example-object';
import { XHeaderObject } from './header-object';
import { XLinkObject } from './link-object';
import { XParameterObject } from './parameter-object';
import { XPathItemObject } from './path-item-object';
import { ReferenceObject } from '../origin/reference-object';
import { XRequestBodyObject } from './request-body-object';
import { XResponseObject } from './response-object';
import { XSchemaObject } from './schema-object';
import { XSecuritySchemeObject } from './security-scheme-object';

/**
 * Holds a set of reusable objects for different aspects of the OAS.
 * All objects defined within the components object will have no effect on the API
 * unless they are explicitly referenced from properties outside the components object.
 * 
 * All the fixed fields declared in this interface are objects that MUST use keys
 * that match the regular expression: `^[a-zA-Z0-9\.\-_]+$`.
 * 
 * Field Name Examples:
 * 
 ```
 User
 User_1
 User_Name
 user-name
 my.org.User
 ```
 * ### Components Object Example
 * 
 * - Example with JSON
 * 
```json
"components": {
  "schemas": {
    "GeneralError": {
      "type": "object",
      "properties": {
        "code": {
          "type": "integer",
          "format": "int32"
        },
        "message": {
          "type": "string"
        }
      }
    },
    "Category": {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64"
        },
        "name": {
          "type": "string"
        }
      }
    },
    "Tag": {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64"
        },
        "name": {
          "type": "string"
        }
      }
    }
  },
  "parameters": {
    "skipParam": {
      "name": "skip",
      "in": "query",
      "description": "number of items to skip",
      "required": true,
      "schema": {
        "type": "integer",
        "format": "int32"
      }
    },
    "limitParam": {
      "name": "limit",
      "in": "query",
      "description": "max records to return",
      "required": true,
      "schema" : {
        "type": "integer",
        "format": "int32"
      }
    }
  },
  "responses": {
    "NotFound": {
      "description": "Entity not found."
    },
    "IllegalInput": {
      "description": "Illegal input for operation."
    },
    "GeneralError": {
      "description": "General Error",
      "content": {
        "application/json": {
          "schema": {
            "$ref": "#/components/schemas/GeneralError"
          }
        }
      }
    }
  },
  "securitySchemes": {
    "api_key": {
      "type": "apiKey",
      "name": "api_key",
      "in": "header"
    },
    "petstore_auth": {
      "type": "oauth2",
      "flows": {
        "implicit": {
          "authorizationUrl": "https://example.org/api/oauth/dialog",
          "scopes": {
            "write:pets": "modify pets in your account",
            "read:pets": "read your pets"
          }
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
components:
  schemas:
    GeneralError:
      type: object
      properties:
        code:
          type: integer
          format: int32
        message:
          type: string
    Category:
      type: object
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
    Tag:
      type: object
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
  parameters:
    skipParam:
      name: skip
      in: query
      description: number of items to skip
      required: true
      schema:
        type: integer
        format: int32
    limitParam:
      name: limit
      in: query
      description: max records to return
      required: true
      schema:
        type: integer
        format: int32
  responses:
    NotFound:
      description: Entity not found.
    IllegalInput:
      description: Illegal input for operation.
    GeneralError:
      description: General Error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/GeneralError'
  securitySchemes:
    api_key:
      type: apiKey
      name: api_key
      in: header
    petstore_auth:
      type: oauth2
      flows: 
        implicit:
          authorizationUrl: https://example.org/api/oauth/dialog
          scopes:
            write:pets: modify pets in your account
            read:pets: read your pets
```
 * 
 * This object MAY be extended with [Specification Extensions][1].
 * 
 * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#specification-extensions
 */
export type XComponentsObject<T extends SpecExtFieldPattern = any> = SpecificationExtension<T> & {
  /**
   * An object to hold reusable [Schema Objects][1].
   * 
   * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#schema-object
   */
  schemas?: { [schemaName: string]: XSchemaObject };
  /**
   * An object to hold reusable [Response Objects][1].
   * 
   * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#response-object
   */
  responses?: { [responseName: string]: XResponseObject | ReferenceObject };
  /**
   * An object to hold reusable [Parameter Objects][1].
   * 
   * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#parameter-object
   */
  parameters?: { [parameterName: string]: XParameterObject | ReferenceObject };
  /**
   * An object to hold reusable [Example Objects][1].
   * 
   * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#example-object
   */
  examples?: { [exampleName: string]: XExampleObject | ReferenceObject };
  /**
   * An object to hold reusable [Request Body Objects][1].
   * 
   * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#request-body-object
   */
  requestBodies?: { [requestBodyName: string]: XRequestBodyObject | ReferenceObject };
  /**
   * An object to hold reusable [Header Objects][1].
   * 
   * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#header-object
   */
  headers?: { [headerBodyName: string]: XHeaderObject | ReferenceObject };
  /**
   * An object to hold reusable [Security Scheme Objects][1].
   * 
   * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#security-scheme-object
   */
  securitySchemes?: { [securitySchemeName: string]: XSecuritySchemeObject | ReferenceObject };
  /**
   * An object to hold reusable [Link Objects][1].
   * 
   * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#link-object
   */
  links?: { [linkName: string]: XLinkObject | ReferenceObject };
  /**
   * An object to hold reusable [Callback Objects][1].
   * 
   * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#callback-object
   */
  callbacks?: { [callbackName: string]: XCallbackObject | ReferenceObject };
  /**
   * An object to hold reusable [Path Item Object][1].
   * 
   * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#path-item-object
   */
  pathItems?: { [pathItemName: string]: XPathItemObject | ReferenceObject };
}
