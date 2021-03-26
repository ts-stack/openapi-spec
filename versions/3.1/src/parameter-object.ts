import { BaseParameterObject } from './base-parameter-object';

/**
 * Describes a single operation parameter.
 *
 * A unique parameter is defined by a combination of a [name][1] and [location][2].
 * 
 * ### Parameter Locations
 * 
 * There are four possible parameter locations specified by the `in` field:
 * - path - Used together with [Path Templating][3], where the parameter value is
 * actually part of the operation's URL. This does not include the host or base path of the API.
 * For example, in `/items/{itemId}`, the path parameter is `itemId`.
 * - query - Parameters that are appended to the URL. For example, in `/items?id=###`, the query
 * parameter is `id`.
 * - header - Custom headers that are expected as part of the request. Note that [RFC7230][4]
 * states header names are case insensitive.
 * - cookie - Used to pass a specific cookie value to the API.
 * 
 * The rules for serialization of the parameter are specified in one of two ways.
 * For simpler scenarios, a [`schema`][5] and [`style`][6] can
 * describe the structure and syntax of the parameter.
 * 
 * For more complex scenarios, the [`content`][7] property can define the media
 * type and schema of the parameter. A parameter MUST contain either a `schema` property, or a
 * `content` property, but not both. When `example` or `examples` are provided in conjunction
 * with the `schema` object, the example MUST follow the prescribed serialization strategy for
 * the parameter.
 * 
 * ### Parameter Object Examples
 * 
 * A header parameter with an array of 64 bit integer numbers:
 * 
 * - example with JSON
 * 
```json
{
  "name": "token",
  "in": "header",
  "description": "token to be passed as a header",
  "required": true,
  "schema": {
    "type": "array",
    "items": {
      "type": "integer",
      "format": "int64"
    }
  },
  "style": "simple"
}
```
 * 
 * - example with YAML
 * 
```yaml
name: token
in: header
description: token to be passed as a header
required: true
schema:
  type: array
  items:
    type: integer
    format: int64
style: simple
```
 * 
 * A path parameter of a string value:
 * 
 * - example with JSON
 * 
```json
{
  "name": "username",
  "in": "path",
  "description": "username to fetch",
  "required": true,
  "schema": {
    "type": "string"
  }
}
```
 * 
 * - example with YAML
 * 
```yaml
name: username
in: path
description: username to fetch
required: true
schema:
  type: string
```
 * 
 * An optional query parameter of a string value, allowing multiple values by repeating the query parameter:
 * 
 * - example with JSON
 * 
```json
{
  "name": "id",
  "in": "query",
  "description": "ID of the object to fetch",
  "required": false,
  "schema": {
    "type": "array",
    "items": {
      "type": "string"
    }
  },
  "style": "form",
  "explode": true
}
```
 * 
 * - example with YAML
 * 
```yaml
name: id
in: query
description: ID of the object to fetch
required: false
schema:
  type: array
  items:
    type: string
style: form
explode: true
```
 * 
 * A free-form query parameter, allowing undefined parameters of a specific type:
 * 
 * - example with JSON
 * 
```json
{
  "in": "query",
  "name": "freeForm",
  "schema": {
    "type": "object",
    "additionalProperties": {
      "type": "integer"
    },
  },
  "style": "form"
}
```
 * 
 * - example with YAML
 * 
```yaml
in: query
name: freeForm
schema:
  type: object
  additionalProperties:
    type: integer
style: form
```
 * 
 * A complex parameter using `content` to define serialization:
 * 
 * - example with JSON
 * 
```json
{
  "in": "query",
  "name": "coordinates",
  "content": {
    "application/json": {
      "schema": {
        "type": "object",
        "required": [
          "lat",
          "long"
        ],
        "properties": {
          "lat": {
            "type": "number"
          },
          "long": {
            "type": "number"
          }
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
in: query
name: coordinates
content:
  application/json:
    schema:
      type: object
      required:
        - lat
        - long
      properties:
        lat:
          type: number
        long:
          type: number
```
 * 
 * This object MAY be extended with [Specification Extensions][8].
 * 
 * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#parameterName
 * [2]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#parameterIn
 * [3]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#pathTemplating
 * [4]: https://tools.ietf.org/html/rfc7230#page-22
 * [5]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#parameterSchema
 * [6]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#parameterStyle
 * [7]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#parameterContent
 * [8]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#specificationExtensions
 */
export interface ParameterObject extends BaseParameterObject {
  /**
   * The name of the parameter. Parameter names are *case sensitive*.
   * - If [`in`][1] is `"path"`, the `name` field MUST correspond to a template expression
   * occurring within the [path][2] field in the [Paths Object][3]. See [Path Templating][4]
   * for further information.
   * - If [`in`][1] is `"header"` and the `name` field is `"Accept"`, `"Content-Type"` or
   * `"Authorization"`, the parameter definition SHALL be ignored.
   * - For all other cases, the `name` corresponds to the parameter name used by the [`in`][1]
   * property.
   * 
   * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#parameterIn
   * [2]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#pathsPath
   * [3]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#pathsObject
   * [4]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#pathTemplating
   */
  name: string;
  /**
   * The location of the parameter. Possible values are `"query"`, `"header"`, `"path"`
   * or `"cookie"`.
   */
  in: 'query' | 'header' | 'path' | 'cookie';
}
