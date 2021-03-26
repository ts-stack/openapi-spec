import { ExampleObject } from './example-object';
import { MediaTypeObject } from './media-type-object';
import { ReferenceObject } from './reference-object';
import { SchemaObject } from './schema-object';
import { OasStyle } from './oas-style';

export class BaseParameterObject {
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
   * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#parameterIn
   */
  required?: boolean;
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
   * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#parameterStyle
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
   * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#parameterStyle
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
  content?: { [mediaTypeName: string]: MediaTypeObject };
}
