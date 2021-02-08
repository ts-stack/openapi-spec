import { DiscriminatorObject } from './discriminator-object';
import { ExternalDocumentationObject } from './external-documentation-object';
import { XmlObject } from './xml-object';

export type SchemaObjectType = 'null' | 'boolean' | 'object' | 'array' | 'number' | 'string' | 'integer';

/**
 * The Schema Object allows the definition of input and output data types. These types can be
 * objects, but also primitives and arrays. This object is a superset of the
 * [JSON Schema Specification Draft 2019-09][1].
 * 
 * For more information about the properties, see [JSON Schema Core][2] and
 * [JSON Schema Validation][3].
 * 
 * Unless stated otherwise, the property definitions follow the JSON Schema.
 * 
 * ### Properties
 * 
 * The OpenAPI Schema Object is a JSON Schema vocabulary which extends JSON Schema Core and
 * Validation vocabularies. As such any keyword available for those vocabularies is by definition
 * available in OpenAPI, and will work the exact same way.
 * 
 * The following properties are taken from the JSON Schema definition but their definitions were
 * adjusted to the OpenAPI Specification.
 * 
 * - description - [CommonMark syntax][4] MAY be used for rich text
 * representation.
 * - format - See [Data Type Formats][5] for further details. While relying on JSON Schema's
 * defined formats, the OAS offers a few additional predefined formats.
 * 
 * In addition to the JSON Schema properties defined in the vocabularies defined in the JSON Schema
 * Core and JSON Schema Validation specifications, any properties can be used from any
 * vocabularies, or entirely arbitrary keywords. The OpenAPI Specification defines an additional
 * vocabulary of keywords which MAY be used along with the JSON Schema vocabulary keywords for
 * further schema description:
 * 
 * ### Fixed Fields
 * 
Field Name | Type | Description
---|:---:|---
<a name="schemaDiscriminator"></a>discriminator | [Discriminator Object][6] | Adds support for polymorphism. The discriminator is an object name that is used to differentiate between other schemas which may satisfy the payload description. See [Composition and Inheritance](#schemaComposition) for more details.
<a name="schemaXml"></a>xml | [XML Object][7] | This MAY be used only on properties schemas. It has no effect on root schemas. Adds additional metadata to describe the XML representation of this property.
<a name="schemaExternalDocs"></a>externalDocs | [External Documentation Object][8] | Additional external documentation for this schema.
<a name="schemaExample"></a>example | Any | A free-form property to include an example of an instance for this schema. To represent examples that cannot be naturally represented in JSON or YAML, a string value can be used to contain the example with escaping where necessary.<br><br>**Deprecated:** The `example` property has been deprecated in favor of the JSON Schema `examples` keyword. Use of `example` is discouraged, and later versions of this specification may remove it.
 * 
 * 
 * This object MAY be extended with [Specification Extensions][1].
 * 
 * [1]: http://json-schema.org/
 * [2]: https://json-schema.org/draft/2019-09/json-schema-core.html
 * [3]: https://json-schema.org/draft/2019-09/json-schema-validation.html
 * [4]: http://spec.commonmark.org/
 * [5]: https://swagger.io/specification/#dataTypeFormat
 * [6]: https://swagger.io/specification/#discriminatorObject
 * [7]: https://swagger.io/specification/#xmlObject
 * [8]: https://swagger.io/specification/#externalDocumentationObject
 */
export class SchemaObject {
  /**
   * The value of this keyword MUST be either a string or an array. If it
   * is an array, elements of the array MUST be strings and MUST be
   * unique.
   * 
   * String values MUST be one of the six primitive types ("null",
   * "boolean", "object", "array", "number", or "string"), or "integer"
   * which matches any number with a zero fractional part.
   * 
   * An instance validates if and only if the instance is in any of the
   * sets listed for this keyword.
   */
  type?: SchemaObjectType | SchemaObjectType[];
  /**
   * The value of this keyword MUST be an array. This array SHOULD have
   * at least one element. Elements in the array SHOULD be unique.
   * 
   * An instance validates successfully against this keyword if its value
   * is equal to one of the elements in this keyword's array value.
   * 
   * Elements in the array might be of any type, including null.
   */
  enum?: [any, ...any[]];
  /**
   * The value of this keyword MAY be of any type, including null.
   * 
   * Use of this keyword is functionally equivalent to an "enum"
   * (Section 6.1.2) with a single value.
   * 
   * An instance validates successfully against this keyword if its value
   * is equal to the value of the keyword.
   */
  const?: any;
  /**
   * The value of "multipleOf" MUST be a number, strictly greater than 0.
   *
   * A numeric instance is only valid if division by this keyword's value results in an integer.
   */
  multipleOf?: number;
  /**
   * The value of "maximum" MUST be a number, representing an upper limit for a numeric instance.
   *
   * If the instance is a number, then this keyword validates if
   * "exclusiveMaximum" is true and instance is less than the provided
   * value, or else if the instance is less than or exactly equal to the
   * provided value.
   */
  maximum?: number;
  /**
   * The value of "exclusiveMaximum" MUST be a boolean, representing
   * whether the limit in "maximum" is exclusive or not. An undefined
   * value is the same as false.
   *
   * If "exclusiveMaximum" is true, then a numeric instance SHOULD NOT be
   * equal to the value specified in "maximum". If "exclusiveMaximum" is
   * false (or not specified), then a numeric instance MAY be equal to the
   * value of "maximum".
   */
  exclusiveMaximum?: boolean;
  /**
   * The value of "minimum" MUST be a number, representing a lower limit
   * for a numeric instance.
   *
   * If the instance is a number, then this keyword validates if
   * "exclusiveMinimum" is true and instance is greater than the provided
   * value, or else if the instance is greater than or exactly equal to
   * the provided value.
   */
  minimum?: number;
  /**
   * The value of "exclusiveMinimum" MUST be a boolean, representing
   * whether the limit in "minimum" is exclusive or not. An undefined
   * value is the same as false.
   *
   * If "exclusiveMinimum" is true, then a numeric instance SHOULD NOT be
   * equal to the value specified in "minimum". If "exclusiveMinimum" is
   * false (or not specified), then a numeric instance MAY be equal to the
   * value of "minimum".
   */
  exclusiveMinimum?: boolean;
  /**
   * The value of this keyword MUST be a non-negative integer.
   *
   * The value of this keyword MUST be an integer. This integer MUST be
   * greater than, or equal to, 0.
   *
   * A string instance is valid against this keyword if its length is less
   * than, or equal to, the value of this keyword.
   *
   * The length of a string instance is defined as the number of its
   * characters as defined by RFC 7159 [RFC7159].
   */
  maxLength?: number;
  /**
   * A string instance is valid against this keyword if its length is
   * greater than, or equal to, the value of this keyword.
   *
   * The length of a string instance is defined as the number of its
   * characters as defined by RFC 7159 [RFC7159].
   *
   * The value of this keyword MUST be an integer. This integer MUST be
   * greater than, or equal to, 0.
   *
   * "minLength", if absent, may be considered as being present with
   * integer value 0.
   */
  minLength?: number;
  /**
   * The value of this keyword MUST be a string. This string SHOULD be a
   * valid regular expression, according to the ECMA 262 regular
   * expression dialect.
   *
   * A string instance is considered valid if the regular expression
   * matches the instance successfully. Recall: regular expressions are
   * not implicitly anchored.
   */
  pattern?: string;
  /**
   * The value of this keyword MUST be an integer. This integer MUST be
   * greater than, or equal to, 0.
   *
   * An array instance is valid against "maxItems" if its size is less
   * than, or equal to, the value of this keyword.
   */
  maxItems?: number;
  /**
   * The value of this keyword MUST be an integer. This integer MUST be
   * greater than, or equal to, 0.
   *
   * An array instance is valid against "minItems" if its size is greater
   * than, or equal to, the value of this keyword.
   *
   * If this keyword is not present, it may be considered present with a
   * value of 0.
   */
  minItems?: number;
  /**
   * The value of this keyword MUST be a boolean.
   *
   * If this keyword has boolean value false, the instance validates
   * successfully. If it has boolean value true, the instance validates
   * successfully if all of its elements are unique.
   *
   * If not present, this keyword may be considered present with boolean
   * value false.
   */
  uniqueItems?: boolean;
  /**
   * The value of this keyword MUST be a non-negative integer.
   * 
   * An array instance is valid against "maxContains" if the number of
   * elements that are valid against the schema for "contains"
   * [json-schema][1] is less than, or equal to, the value of this keyword.
   * 
   * If "contains" is not present within the same schema object, then this
   * keyword has no effect.
   * 
   * [1]: https://tools.ietf.org/html/draft-handrews-json-schema-validation-02#ref-json-schema
   */
  maxContains?: number;
  /**
   * The value of this keyword MUST be a non-negative integer.
   * 
   * An array instance is valid against "minContains" if the number of
   * elements that are valid against the schema for "contains"
   * [json-schema] is greater than, or equal to, the value of this
   * keyword.
   * 
   * A value of 0 is allowed, but is only useful for setting a range of
   * occurrences from 0 to the value of "maxContains". A value of 0 with
   * no "maxContains" causes "contains" to always pass validation.
   * 
   * If "contains" is not present within the same schema object, then this
   * keyword has no effect.
   * 
   * Omitting this keyword has the same behavior as a value of 1.
   */
  minContains?: number;
  /**
   * The value of this keyword MUST be an integer. This integer MUST be
   * greater than, or equal to, 0.
   *
   * An object instance is valid against "maxProperties" if its number of
   * properties is less than, or equal to, the value of this keyword.
   */
  maxProperties?: number;
  /**
   * The value of this keyword MUST be an integer. This integer MUST be
   * greater than, or equal to, 0.
   *
   * An object instance is valid against "minProperties" if its number of
   * properties is greater than, or equal to, the value of this keyword.
   *
   * If this keyword is not present, it may be considered present with a
   * value of 0.
   */
  minProperties?: number;
  /**
   * The value of this keyword MUST be an array. This array MUST have at
   * least one element. Elements of this array MUST be strings, and MUST
   * be unique.
   *
   * An object instance is valid against this keyword if its property set
   * contains all elements in this keyword's array value.
   */
  required?: [string, ...string[]];
  /**
   * The value of this keyword MUST be an object. Properties in this
   * object, if any, MUST be arrays. Elements in each array, if any, MUST
   * be strings, and MUST be unique.
   * 
   * This keyword specifies properties that are required if a specific
   * other property is present. Their requirement is dependent on the
   * presence of the other property.
   * 
   * Validation succeeds if, for each name that appears in both the
   * instance and as a name within this keyword's value, every item in the
   * corresponding array is also the name of a property in the instance.
   * 
   * Omitting this keyword has the same behavior as an empty object.
   */
  dependentRequired?: { [propName: string]: string[] };


  /**
   * The value of "title" and "description" keywords MUST be a string.
   *
   * Both of these keywords can be used to decorate a user interface with
   * information about the data produced by this user interface. A title
   * will preferably be short, whereas a description will provide
   * explanation about the purpose of the instance described by this
   * schema.
   */
  title?: string;
  /**
   * The value of "title" and "description" keywords MUST be a string.
   *
   * Both of these keywords can be used to decorate a user interface with
   * information about the data produced by this user interface. A title
   * will preferably be short, whereas a description will provide
   * explanation about the purpose of the instance described by this
   * schema.
   * 
   * [CommonMark syntax][1] MAY be used for rich text representation.
   * 
   * [1]: http://spec.commonmark.org/
   */
  description?: string;
  /**
   * There are no restrictions placed on the value of this keyword. When
   * multiple occurrences of this keyword are applicable to a single
   * sub-instance, implementations SHOULD remove duplicates.
   * 
   * This keyword can be used to supply a default JSON value associated
   * with a particular schema. It is RECOMMENDED that a default value be
   * valid against the associated schema.
   */
  default?: any;
  /**
   * The value of this keyword MUST be a boolean. When multiple
   * occurrences of this keyword are applicable to a single sub-instance,
   * applications SHOULD consider the instance location to be deprecated
   * if any occurrence specifies a true value.
   * 
   * If "deprecated" has a value of boolean true, it indicates that
   * applications SHOULD refrain from usage of the declared property. It
   * MAY mean the property is going to be removed in the future.
   * 
   * A root schema containing "deprecated" with a value of true indicates
   * that the entire resource being described MAY be removed in the
   * future.
   * 
   * When the "deprecated" keyword is applied to an item in an array by
   * means of "items", if "items" is a single schema, the deprecation
   * relates to the whole array, while if "items" is an array of schemas,
   * the deprecation relates to the corrosponding item according to the
   * subschemas position.
   * 
   * Omitting this keyword has the same behavior as a value of false.
   */
  deprecated?: boolean;
  /**
   * The value of "readOnly" and "writeOnly" MUST be a boolean. When multiple
   * occurrences of these keywords are applicable to a single
   * sub-instance, the resulting behavior SHOULD be as for a true value if any
   * occurrence specifies a true value, and SHOULD be as for a false value
   * otherwise.
   * 
   * If "readOnly" has a value of boolean true, it indicates that the
   * value of the instance is managed exclusively by the owning authority,
   * and attempts by an application to modify the value of this property
   * are expected to be ignored or rejected by that owning authority.
   * 
   * An instance document that is marked as "readOnly for the entire
   * document MAY be ignored if sent to the owning authority, or MAY
   * result in an error, at the authority's discretion.
   * 
   * If "writeOnly" has a value of boolean true, it indicates that the
   * value is never present when the instance is retrieved from the owning
   * authority. It can be present when sent to the owning authority to
   * update or create the document (or the resource it represents), but it
   * will not be included in any updated or newly created version of the
   * instance.
   * 
   * An instance document that is marked as "writeOnly" for the entire
   * document MAY be returned as a blank document of some sort, or MAY
   * produce an error upon retrieval, or have the retrieval request
   * ignored, at the authority's discretion.
   * 
   * For example, "readOnly" would be used to mark a database-generated
   * serial number as read-only, while "writeOnly" would be used to mark a
   * password input field.
   * 
   * These keywords can be used to assist in user interface instance
   * generation. In particular, an application MAY choose to use a widget
   * that hides input values as they are typed for write-only fields.
   * 
   * Omitting these keywords has the same behavior as values of false.
   */
  readOnly?: boolean;
  /**
   * The value of "readOnly" and "writeOnly" MUST be a boolean. When multiple
   * occurrences of these keywords are applicable to a single
   * sub-instance, the resulting behavior SHOULD be as for a true value if any
   * occurrence specifies a true value, and SHOULD be as for a false value
   * otherwise.
   * 
   * If "readOnly" has a value of boolean true, it indicates that the
   * value of the instance is managed exclusively by the owning authority,
   * and attempts by an application to modify the value of this property
   * are expected to be ignored or rejected by that owning authority.
   * 
   * An instance document that is marked as "readOnly for the entire
   * document MAY be ignored if sent to the owning authority, or MAY
   * result in an error, at the authority's discretion.
   * 
   * If "writeOnly" has a value of boolean true, it indicates that the
   * value is never present when the instance is retrieved from the owning
   * authority. It can be present when sent to the owning authority to
   * update or create the document (or the resource it represents), but it
   * will not be included in any updated or newly created version of the
   * instance.
   * 
   * An instance document that is marked as "writeOnly" for the entire
   * document MAY be returned as a blank document of some sort, or MAY
   * produce an error upon retrieval, or have the retrieval request
   * ignored, at the authority's discretion.
   * 
   * For example, "readOnly" would be used to mark a database-generated
   * serial number as read-only, while "writeOnly" would be used to mark a
   * password input field.
   * 
   * These keywords can be used to assist in user interface instance
   * generation. In particular, an application MAY choose to use a widget
   * that hides input values as they are typed for write-only fields.
   * 
   * Omitting these keywords has the same behavior as values of false.
   */
  writeOnly?: boolean;
  /**
   * The value of this keyword MUST be an array. There are no
   * restrictions placed on the values within the array. When multiple
   * occurrences of this keyword are applicable to a single sub-instance,
   * implementations MUST provide a flat array of all values rather than
   * an array of arrays.
   * 
   * This keyword can be used to provide sample JSON values associated
   * with a particular schema, for the purpose of illustrating usage. It
   * is RECOMMENDED that these values be valid against the associated
   * schema.
   * 
   * Implementations MAY use the value(s) of "default", if present, as an
   * additional example. If "examples" is absent, "default" MAY still be
   * used in this manner.
   */
  examples?: any[];
  /**
   * This keyword's value MUST be a non-empty array. Each item of the
   * array MUST be a valid JSON Schema.
   * 
   * An instance validates successfully against this keyword if it
   * validates successfully against all schemas defined by this keyword's
   * value.
   */
  allOf?: [this, ...this[]];
  /**
   * This keyword's value MUST be a non-empty array.  Each item of the
   * array MUST be a valid JSON Schema.
   * 
   * An instance validates successfully against this keyword if it
   * validates successfully against at least one schema defined by this
   * keyword's value.  Note that when annotations are being collected, all
   * subschemas MUST be examined so that annotations are collected from
   * each subschema that validates successfully.
   */
  anyOf?: [this, ...this[]];
  /**
   * This keyword's value MUST be a non-empty array.  Each item of the
   * array MUST be a valid JSON Schema.
   * 
   * An instance validates successfully against this keyword if it
   * validates successfully against exactly one schema defined by this
   * keyword's value.
   */
  oneOf?: [this, ...this[]];
  /**
   * This keyword's value MUST be a valid JSON Schema.
   * 
   * An instance is valid against this keyword if it fails to validate
   * successfully against the schema defined by this keyword.
   */
  not?: this;
  /**
   * This keyword's value MUST be a valid JSON Schema.
   * 
   * This validation outcome of this keyword's subschema has no direct
   * effect on the overall validation result.  Rather, it controls which
   * of the "then" or "else" keywords are evaluated.
   * 
   * Instances that successfully validate against this keyword's subschema
   * MUST also be valid against the subschema value of the "then" keyword,
   * if present.
   * 
   * Instances that fail to validate against this keyword's subschema MUST
   * also be valid against the subschema value of the "else" keyword, if
   * present.
   * 
   * If annotations (Section 7.7) are being collected, they are collected
   * from this keyword's subschema in the usual way, including when the
   * keyword is present without either "then" or "else".
   */
  if?: this;
  /**
   * This keyword's value MUST be a valid JSON Schema.
   * 
   * When "if" is present, and the instance successfully validates against
   * its subschema, then validation succeeds against this keyword if the
   * instance also successfully validates against this keyword's
   * subschema.
   * 
   * This keyword has no effect when "if" is absent, or when the instance
   * fails to validate against its subschema.  Implementations MUST NOT
   * evaluate the instance against this keyword, for either validation or
   * annotation collection purposes, in such cases.
   */
  then?: this;
  /**
   * This keyword's value MUST be a valid JSON Schema.
   * 
   * When "if" is present, and the instance fails to validate against its
   * subschema, then validation succeeds against this keyword if the
   * instance successfully validates against this keyword's subschema.
   * 
   * This keyword has no effect when "if" is absent, or when the instance
   * successfully validates against its subschema.  Implementations MUST
   * NOT evaluate the instance against this keyword, for either validation
   * or annotation collection purposes, in such cases.
   */
  else?: this;
  /**
   * This keyword specifies subschemas that are evaluated if the instance
   * is an object and contains a certain property.
   * 
   * This keyword's value MUST be an object.  Each value in the object
   * MUST be a valid JSON Schema.
   * 
   * If the object key is a property in the instance, the entire instance
   * must validate against the subschema.  Its use is dependent on the
   * presence of the property.
   * 
   * Omitting this keyword has the same behavior as an empty object.
   */
  dependentSchemas?: { [dependentSchema: string]: SchemaObject };
  /**
   * The value of "items" MUST be either a valid JSON Schema or an array
   * of valid JSON Schemas.
   * 
   * If "items" is a schema, validation succeeds if all elements in the
   * array successfully validate against that schema.
   * 
   * If "items" is an array of schemas, validation succeeds if each
   * element of the instance validates against the schema at the same
   * position, if any.
   * 
   * This keyword produces an annotation value which is the largest index
   * to which this keyword applied a subschema.  The value MAY be a
   * boolean true if a subschema was applied to every index of the
   * instance, such as when "items" is a schema.
   * 
   * Annotation results for "items" keywords from multiple schemas applied
   * to the same instance location are combined by setting the combined
   * result to true if any of the values are true, and otherwise retaining
   * the largest numerical value.
   * 
   * Omitting this keyword has the same assertion behavior as an empty
   * schema.
   */
  items?: this | { [item: string]: SchemaObject };
  /**
   * The value of "additionalItems" MUST be a valid JSON Schema.
   * 
   * The behavior of this keyword depends on the presence and annotation
   * result of "items" within the same schema object.  If "items" is
   * present, and its annotation result is a number, validation succeeds
   * if every instance element at an index greater than that number
   * validates against "additionalItems".
   * 
   * Otherwise, if "items" is absent or its annotation result is the
   * boolean true, "additionalItems" MUST be ignored.
   * 
   * If the "additionalItems" subschema is applied to any positions within
   * the instance array, it produces an annotation result of boolean true,
   * analogous to the single schema behavior of "items".  If any
   * "additionalItems" keyword from any subschema applied to the same
   * instance location produces an annotation value of true, then the
   * combined result from these keywords is also true.
   * 
   * Omitting this keyword has the same assertion behavior as an empty
   * schema.
   * 
   * Implementations MAY choose to implement or optimize this keyword in
   * another way that produces the same effect, such as by directly
   * checking for the presence and size of an "items" array.
   * Implementations that do not support annotation collection MUST do so.
   */
  additionalItems?: this;
  /**
   * The value of "unevaluatedItems" MUST be a valid JSON Schema.
   * 
   * The behavior of this keyword depends on the annotation results of
   * adjacent keywords that apply to the instance location being
   * validated.  Specifically, the annotations from "items" and
   * "additionalItems", which can come from those keywords when they are
   * adjacent to the "unevaluatedItems" keyword.  Those two annotations,
   * as well as "unevaluatedItems", can also result from any and all
   * adjacent in-place applicator (Section 9.2) keywords.  This includes
   * but is not limited to the in-place applicators defined in this
   * document.
   * 
   * If an "items" annotation is present, and its annotation result is a
   * number, and no "additionalItems" or "unevaluatedItems" annotation is
   * present, then validation succeeds if every instance element at an
   * index greater than the "items" annotation validates against
   * "unevaluatedItems".
   * 
   * Otherwise, if any "items", "additionalItems", or "unevaluatedItems"
   * annotations are present with a value of boolean true, then
   * "unevaluatedItems" MUST be ignored.  However, if none of these
   * annotations are present, "unevaluatedItems" MUST be applied to all
   * locations in the array.
   * 
   * This means that "items", "additionalItems", and all in-place
   * applicators MUST be evaluated before this keyword can be evaluated.
   * Authors of extension keywords MUST NOT define an in-place applicator
   * that would need to be evaluated before this keyword.
   * 
   * If the "unevaluatedItems" subschema is applied to any positions
   * within the instance array, it produces an annotation result of
   * boolean true, analogous to the single schema behavior of "items".  If
   * any "unevaluatedItems" keyword from any subschema applied to the same
   * instance location produces an annotation value of true, then the
   * combined result from these keywords is also true.
   * 
   * Omitting this keyword has the same assertion behavior as an empty
   * schema.
   * 
   * Implementations that do not collect annotations MUST raise an error
   * upon encountering this keyword.
   */
  unevaluatedItems?: this;
  /**
   * The value of this keyword MUST be a valid JSON Schema.
   * 
   * An array instance is valid against "contains" if at least one of its
   * elements is valid against the given schema.  Note that when
   * collecting annotations, the subschema MUST be applied to every array
   * element even after the first match has been found.  This is to ensure
   * that all possible annotations are collected.
   */
  contains?: this;
  /**
   * The value of "properties" MUST be an object.  Each value of this
   * object MUST be a valid JSON Schema.
   * 
   * Validation succeeds if, for each name that appears in both the
   * instance and as a name within this keyword's value, the child
   * instance for that name successfully validates against the
   * corresponding schema.
   * 
   * The annotation result of this keyword is the set of instance property
   * names matched by this keyword.  Annotation results for "properties"
   * keywords from multiple schemas applied to the same instance location
   * are combined by taking the union of the sets.
   * 
   * Omitting this keyword has the same assertion behavior as an empty
   * object.
   */
  properties?: { [propertyName: string]: SchemaObject };
  /**
   * The value of "patternProperties" MUST be an object.  Each property
   * name of this object SHOULD be a valid regular expression, according
   * to the ECMA 262 regular expression dialect.  Each property value of
   * this object MUST be a valid JSON Schema.
   * 
   * Validation succeeds if, for each instance name that matches any
   * regular expressions that appear as a property name in this keyword's
   * value, the child instance for that name successfully validates
   * against each schema that corresponds to a matching regular
   * expression.
   * 
   * The annotation result of this keyword is the set of instance property
   * names matched by this keyword.  Annotation results for
   * "patternProperties" keywords from multiple schemas applied to the
   * same instance location are combined by taking the union of the sets.
   * 
   * Omitting this keyword has the same assertion behavior as an empty
   * object.
   */
  patternProperties?: { [pattern: string]: SchemaObject };
  /**
   * The value of "additionalProperties" MUST be a valid JSON Schema.
   * 
   * The behavior of this keyword depends on the presence and annotation
   * results of "properties" and "patternProperties" within the same
   * schema object.  Validation with "additionalProperties" applies only
   * to the child values of instance names that do not appear in the
   * annotation results of either "properties" or "patternProperties".
   * 
   * For all such properties, validation succeeds if the child instance
   * validates against the "additionalProperties" schema.
   * 
   * The annotation result of this keyword is the set of instance property
   * names validated by this keyword's subschema.  Annotation results for
   * "additionalProperties" keywords from multiple schemas applied to the
   * same instance location are combined by taking the union of the sets.
   * 
   * Omitting this keyword has the same assertion behavior as an empty
   * schema.
   * 
   * Implementations MAY choose to implement or optimize this keyword in
   * another way that produces the same effect, such as by directly
   * checking the names in "properties" and the patterns in
   * "patternProperties" against the instance property set.
   * Implementations that do not support annotation collection MUST do so.
   */
  additionalProperties?: this;
  /**
   * The value of "unevaluatedProperties" MUST be a valid JSON Schema.
   * 
   * The behavior of this keyword depends on the annotation results of
   * adjacent keywords that apply to the instance location being
   * validated.  Specifically, the annotations from "properties",
   * "patternProperties", and "additionalProperties", which can come from
   * those keywords when they are adjacent to the "unevaluatedProperties"
   * keyword.  Those three annotations, as well as
   * "unevaluatedProperties", can also result from any and all adjacent
   * in-place applicator (Section 9.2) keywords.  This includes but is not
   * limited to the in-place applicators defined in this document.
   * 
   * Validation with "unevaluatedProperties" applies only to the child
   * values of instance names that do not appear in the "properties",
   * "patternProperties", "additionalProperties", or
   * "unevaluatedProperties" annotation results that apply to the instance
   * location being validated.
   * 
   * For all such properties, validation succeeds if the child instance
   * validates against the "unevaluatedProperties" schema.
   * 
   * This means that "properties", "patternProperties",
   * "additionalProperties", and all in-place applicators MUST be
   * evaluated before this keyword can be evaluated.  Authors of extension
   * keywords MUST NOT define an in-place applicator that would need to be
   * evaluated before this keyword.
   * 
   * The annotation result of this keyword is the set of instance property
   * names validated by this keyword's subschema.  Annotation results for
   * "unevaluatedProperties" keywords from multiple schemas applied to the
   * same instance location are combined by taking the union of the sets.
   * 
   * Omitting this keyword has the same assertion behavior as an empty
   * schema.
   * 
   * Implementations that do not collect annotations MUST raise an error
   * upon encountering this keyword.
   */
  unevaluatedProperties?: this;
  /**
   * The value of "propertyNames" MUST be a valid JSON Schema.
   * 
   * If the instance is an object, this keyword validates if every
   * property name in the instance validates against the provided schema.
   * Note the property name that the schema is testing will always be a
   * string.
   * 
   * Omitting this keyword has the same behavior as an empty schema.
   */
  propertyNames?: unknown;
  /**
   * See [Data Type Formats][1] for further details. While relying on JSON Schema's defined formats,
   * the OAS offers a few additional predefined formats.
   * 
   * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#dataTypeFormat
   */
  format?: string;
  /**
   * Adds support for polymorphism. The discriminator is an object name that is used to
   * differentiate between other schemas which may satisfy the payload description. See
   * [Composition and Inheritance][1] for more details.
   * 
   * [1]: https://swagger.io/specification/#schemaComposition
   */
  discriminator?: DiscriminatorObject;
  /**
   * This MAY be used only on properties schemas. It has no effect on root schemas. Adds additional
   * metadata to describe the XML representation of this property.
   */
  xml?: XmlObject;
  /**
   * Additional external documentation for this schema.
   */
  externalDocs?: ExternalDocumentationObject;
  /**
   * A free-form property to include an example of an instance for this schema. To represent
   * examples that cannot be naturally represented in JSON or YAML, a string value can be used
   * to contain the example with escaping where necessary.<br><br>**Deprecated:** The `example`
   * property has been deprecated in favor of the JSON Schema `examples` keyword. Use of `example`
   * is discouraged, and later versions of this specification may remove it.
   * 
   * @deprecated
   */
  example?: any;
}
