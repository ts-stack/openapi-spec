import { ReferenceObject } from './reference-object';
import { ResponseObject } from './response-object';
import { HttpStatusCode } from './http-status-code';

/**
 * A container for the expected responses of an operation.
 * The container maps a HTTP response code to the expected response.
 * 
 * The documentation is not necessarily expected to cover all possible HTTP response codes because
 * they may not be known in advance. However, documentation is expected to cover a successful
 * operation response and any known errors.
 * 
 * The `default` MAY be used as a default response object for all HTTP codes that are not covered
 * individually by the `Responses Object`.
 * 
 * The `Responses Object` MUST contain at least one response code, and if only one response code
 * is provided it SHOULD be the response for a successful operation call.
 * 
 * ### Responses Object Example
 * 
 * A 200 response for a successful operation and a default response for others (implying an error):
 * 
 * - example with JSON
 * 
```json
{
  "200": {
    "description": "a pet to be returned",
    "content": {
      "application/json": {
        "schema": {
          "$ref": "#/components/schemas/Pet"
        }
      }
    }
  },
  "default": {
    "description": "Unexpected error",
    "content": {
      "application/json": {
        "schema": {
          "$ref": "#/components/schemas/ErrorModel"
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
'200':
  description: a pet to be returned
  content: 
    application/json:
      schema:
        $ref: '#/components/schemas/Pet'
default:
  description: Unexpected error
  content:
    application/json:
      schema:
        $ref: '#/components/schemas/ErrorModel'
```
 * 
 * This object MAY be extended with [Specification Extensions][1].
 * 
 * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#specificationExtensions
 */
export type ResponsesObject = HttpStatusCodesObject & {
  /**
   * The documentation of responses other than the ones declared for specific HTTP response codes.
   * Use this field to cover undeclared responses. A [Reference Object][1] can link to a response
   * that the [OpenAPI Object's components/responses][2] section defines.
   * 
   * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#referenceObject
   * [2]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#componentsResponses
   */
  default?: ResponseObject | ReferenceObject;
};

export type HttpStatusCodesObject = {
  /**
   * Any [HTTP status code][1] can be used as the property name, but only one property per code,
   * to describe the expected response for that HTTP status code. A [Reference Object][2] can link
   * to a response that is defined in the [OpenAPI Object's components/responses][3] section.
   * This field MUST be enclosed in quotation marks (for example, "200") for compatibility between
   * JSON and YAML. To define a range of response codes, this field MAY contain the uppercase
   * wildcard character `X`. For example, `2XX` represents all response codes between `[200-299]`.
   * Only the following range definitions are allowed: `1XX`, `2XX`, `3XX`, `4XX`, and `5XX`. If
   * a response is defined using an explicit code, the explicit code definition takes precedence
   * over the range definition for that code.
   * 
   * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#httpCodes
   * [2]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#referenceObject
   * [3]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#componentsResponses
   */
  [P in HttpStatusCode]?: ResponseObject | ReferenceObject;
};
