import { ExampleObject } from './example-object';
import { MediaTypeObject } from './media-type-object';
import { ReferenceObject } from './reference-object';
import { SchemaObject } from './schema-object';
import { OasStyle } from './oas-style';

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
 * [1]: https://swagger.io/specification/#parameterName
 * [2]: https://swagger.io/specification/#parameterIn
 * [3]: https://swagger.io/specification/#pathTemplating
 * [4]: https://tools.ietf.org/html/rfc7230#page-22
 * [5]: https://swagger.io/specification/#parameterSchema
 * [6]: https://swagger.io/specification/#parameterStyle
 * [7]: https://swagger.io/specification/#parameterContent
 * [8]: https://swagger.io/specification/#specificationExtensions
 */
export class ParameterObject {
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
   * [1]: https://swagger.io/specification/#parameterIn
   * [2]: https://swagger.io/specification/#pathsPath
   * [3]: https://swagger.io/specification/#pathsObject
   * [4]: https://swagger.io/specification/#pathTemplating
   */
  name: string;
  /**
   * The location of the parameter. Possible values are `"query"`, `"header"`, `"path"`
   * or `"cookie"`.
   */
  in: string;
  /**
   * A brief description of the parameter. This could contain examples of use.
   * [CommonMark syntax][1] MAY be used for rich text representation.
   * 
   * [1]: https://spec.commonmark.org/
   */
  description?: string;
  /**
   * Determines whether this parameter is mandatory. If the [parameter location][1]
   * is `"path"`, this property is **REQUIRED** and its value MUST be `true`. Otherwise,
   * the property MAY be included and its default value is `false`.
   * 
   * [1]: https://swagger.io/specification/#parameterIn
   */
  required?: string;
  /**
   * Specifies that a parameter is deprecated and SHOULD be transitioned out of usage.
   * Default value is `false`.
   */
  deprecated?: boolean;
  /**
   * Sets the ability to pass empty-valued parameters. This is valid only for `query` parameters
   * and allows sending a parameter with an empty value. Default value is `false`.
   * If [`style`][1] is used, and if behavior is `n/a` (cannot be serialized),
   * the value of `allowEmptyValue` SHALL be ignored. Use of this property is NOT RECOMMENDED,
   * as it is likely to be removed in a later revision.
   * 
   * [1]: https://swagger.io/specification/#parameterStyle
   */
  allowEmptyValue?: boolean;
  /**
   * Describes how the parameter value will be serialized depending on the type of the parameter
   * value. Default values (based on value of `in`):
   * - for `query` - `form`;
   * - for `path` - `simple`;
   * - for `header` - `simple`;
   * - for `cookie` - `form`.
   */
  style?: OasStyle;
  /**
   * When this is true, parameter values of type `array` or `object` generate separate parameters
   * for each value of the array or key-value pair of the map. For other types of parameters this
   * property has no effect. When [`style`][1] is `form`, the default value is
   * `true`. For all other styles, the default value is `false`.
   * 
   * [1]: https://swagger.io/specification/#parameterStyle
   */
  explode?: boolean;
  /**
   * Determines whether the parameter value SHOULD allow reserved characters, as defined by
   * [RFC3986][1] `:/?#[]@!$&'()*+,;=` to be included
   * without percent-encoding. This property only applies to parameters with an `in` value
   * of `query`. The default value is `false`.
   * 
   * [1]: https://tools.ietf.org/html/rfc3986#section-2.2
   */
  allowReserved?: boolean;
  /**
   * The schema defining the type used for the parameter.
   */
  schema?: SchemaObject;
  /**
   * Example of the parameter's potential value. The example SHOULD match the specified schema
   * and encoding properties if present. The `example` field is mutually exclusive of the
   * `examples` field. Furthermore, if referencing a `schema` that contains an example, the
   * `example` value SHALL _override_ the example provided by the schema. To represent examples
   * of media types that cannot naturally be represented in JSON or YAML, a string value can
   * contain the example with escaping where necessary.
   */
  example?: any;
  /**
   * Examples of the parameter's potential value. Each example SHOULD contain a value in the
   * correct format as specified in the parameter encoding. The `examples` field is mutually
   * exclusive of the `example` field. Furthermore, if referencing a `schema` that contains
   * an example, the `examples` value SHALL _override_ the example provided by the schema.
   */
  examples?: { [exampleName: string]: ExampleObject | ReferenceObject };
  /**
   * A map containing the representations for the parameter. The key is the media type and
   * the value describes it. The map MUST only contain one entry.
   */
  content?: { [contentName: string]: MediaTypeObject };
}
