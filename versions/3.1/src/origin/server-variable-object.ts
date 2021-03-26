/**
 * An object representing a Server Variable for server URL template substitution.
 * 
 * This object MAY be extended with [Specification Extensions][1].
 * 
 * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#specificationExtensions
 */
export interface ServerVariableObject {
  /**
   * An enumeration of string values to be used if the substitution options are from a limited set.
   * The array MUST NOT be empty.
   */
  enum?: string[];
  /**
   * The default value to use for substitution, which SHALL be sent if an alternate value
   * is _not_ supplied. Note this behavior is different than the [Schema Object's][1]
   * treatment of default values, because in those cases parameter values are optional.
   * If the [`enum`][2] is defined, the value MUST exist in the enum's values.
   * 
   * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#schemaObject
   * [2]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#serverVariableEnum
   */
  default: string;
  /**
   * An optional description for the server variable.
   * [CommonMark syntax][1] MAY be used for rich text representation.
   * 
   * [1]: https://spec.commonmark.org/
   */
  description?: string;
}