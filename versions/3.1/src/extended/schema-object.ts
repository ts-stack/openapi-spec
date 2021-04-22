import { XDiscriminatorObject } from './discriminator-object';
import { XExternalDocumentationObject } from './external-documentation-object';
import { XXmlObject } from './xml-object';
import { SpecExtFieldPattern, SpecificationExtension } from '../origin/specification-extension';
import { SchemaObject } from '../origin/schema-object';

export type SchemaObjectType = 'null' | 'boolean' | 'object' | 'array' | 'number' | 'string' | 'integer';

/**
 * The Schema Object allows the definition of input and output data types. These types can be
 * objects, but also primitives and arrays. This object is a superset of the
 * [JSON Schema Specification Draft 2020-12][1].
 * 
 * For more information about the properties, see [JSON Schema Core][1] and
 * [JSON Schema Validation][3].
 * 
 * Unless stated otherwise, the property definitions follow those of JSON Schema and do not add any
 * additional semantics. Where JSON Schema indicates that behavior is defined by the application
 * (e.g. for annotations), OAS also defers the definition of semantics to the application consuming
 * the OpenAPI document.
 * 
 * ### Properties
 * 
 * The OpenAPI Schema Object [dialect][2] is defined as requiring the [OAS base vocabulary][10],
 * in addition to the vocabularies as specified in the JSON Schema draft 2020-12
 * [general purposemeta-schema][11].
 * 
 * The OpenAPI Schema Object dialect for this version of the specification is identified by the URI
 * `https://spec.openapis.org/oas/3.1/dialect/base` (the "OAS dialect schema id").
 * 
 * The following properties are taken from the JSON Schema specification but their definitions have
 * been extended by the OAS:
 * 
 * - description - [CommonMark syntax][4] MAY be used for rich text representation.
 * - format - See [Data Type Formats][5] for further details. While relying on JSON Schema's
 * defined formats, the OAS offers a few additional predefined formats.
 * 
 * In addition to the JSON Schema properties comprising the OAS dialect, the Schema Object supports
 * keywords from any other vocabularies, or entirely arbitrary properties.
 * 
 * The OpenAPI Specification's base vocabulary is comprised of the following keywords:
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
 * ### <a name="schemaComposition"></a>Composition and Inheritance (Polymorphism)
 * 
 * The OpenAPI Specification allows combining and extending model definitions using the `allOf`
 * property of JSON Schema, in effect offering model composition. `allOf` takes an array of object
 * definitions that are validated *independently* but together compose a single object.
 * 
 * While composition offers model extensibility, it does not imply a hierarchy between the models.
 * To support polymorphism, the OpenAPI Specification adds the `discriminator` field. When used,
 * the `discriminator` will be the name of the property that decides which schema definition
 * validates the structure of the model. As such, the `discriminator` field MUST be a required
 * field. There are two ways to define the value of a discriminator for an inheriting instance.
 * 
 * - Use the schema name.
 * - Override the schema name by overriding the property with a new value. If a new value exists,
 * this takes precedence over the schema name. As such, inline schema definitions, which do not
 * have a given id, *cannot* be used in polymorphism.
 * 
 * ### XML Modeling
 * 
 * The [xml][9] property allows extra definitions when translating the JSON definition to XML.
 * The [XML Object][7] contains additional information about the available options.
 * 
 * ### Specifying Schema Dialects
 * 
 * It is important for tooling to be able to determine which dialect or meta-schema any given
 * resource wishes to be processed with: JSON Schema Core, JSON Schema Validation, OpenAPI Schema
 * dialect, or some custom meta-schema.
 * 
 * The `$schema` keyword MAY be present in any root Schema Object, and if present MUST be used to
 * determine which dialect should be used when processing the schema. This allows use of Schema
 * Objects which comply with other drafts of JSON Schema than the default Draft 2020-12 support.
 * Tooling MUST support the <a href="#dialectSchemaId">OAS dialect schema id</a>, and MAY support
 * additional values of `$schema`.
 * 
 * To allow use of a different default `$schema` value for all Schema Objects contained within an
 * OAS document, a `jsonSchemaDialect` value may be set within the
 * [OpenAPI Object][12]. If this default is not set, then the OAS dialect schema id MUST be used
 * for these Schema Objects. The value of `$schema` within a Schema Object always overrides any
 * default.
 * 
 * When a Schema Object is referenced from an external resource which is not an OAS document
 * (e.g. a bare JSON Schema resource), then the value of the `$schema` keyword for schemas within
 * that resource MUST follow [JSON Schema rules][13].
 * 
 * ### Schema Object Examples
 * 
 * #### Primitive Sample
 * 
```json
{
  "type": "string",
  "format": "email"
}
```

```yaml
type: string
format: email
```

#### Simple Model

```json
{
  "type": "object",
  "required": [
    "name"
  ],
  "properties": {
    "name": {
      "type": "string"
    },
    "address": {
      "$ref": "#/components/schemas/Address"
    },
    "age": {
      "type": "integer",
      "format": "int32",
      "minimum": 0
    }
  }
}
```

```yaml
type: object
required:
- name
properties:
  name:
    type: string
  address:
    $ref: '#/components/schemas/Address'
  age:
    type: integer
    format: int32
    minimum: 0
```

#### Model with Map/Dictionary Properties

For a simple string to string mapping:

```json
{
  "type": "object",
  "additionalProperties": {
    "type": "string"
  }
}
```

```yaml
type: object
additionalProperties:
  type: string
```

For a string to model mapping:

```json
{
  "type": "object",
  "additionalProperties": {
    "$ref": "#/components/schemas/ComplexModel"
  }
}
```

```yaml
type: object
additionalProperties:
  $ref: '#/components/schemas/ComplexModel'
```

#### Model with Example

```json
{
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64"
    },
    "name": {
      "type": "string"
    }
  },
  "required": [
    "name"
  ],
  "example": {
    "name": "Puma",
    "id": 1
  }
}
```

```yaml
type: object
properties:
  id:
    type: integer
    format: int64
  name:
    type: string
required:
- name
example:
  name: Puma
  id: 1
```

#### Models with Composition

```json
{
  "components": {
    "schemas": {
      "ErrorModel": {
        "type": "object",
        "required": [
          "message",
          "code"
        ],
        "properties": {
          "message": {
            "type": "string"
          },
          "code": {
            "type": "integer",
            "minimum": 100,
            "maximum": 600
          }
        }
      },
      "ExtendedErrorModel": {
        "allOf": [
          {
            "$ref": "#/components/schemas/ErrorModel"
          },
          {
            "type": "object",
            "required": [
              "rootCause"
            ],
            "properties": {
              "rootCause": {
                "type": "string"
              }
            }
          }
        ]
      }
    }
  }
}
```

```yaml
components:
  schemas:
    ErrorModel:
      type: object
      required:
      - message
      - code
      properties:
        message:
          type: string
        code:
          type: integer
          minimum: 100
          maximum: 600
    ExtendedErrorModel:
      allOf:
      - $ref: '#/components/schemas/ErrorModel'
      - type: object
        required:
        - rootCause
        properties:
          rootCause:
            type: string
```

#### Models with Polymorphism Support

```json
{
  "components": {
    "schemas": {
      "Pet": {
        "type": "object",
        "discriminator": {
          "propertyName": "petType"
        },
        "properties": {
          "name": {
            "type": "string"
          },
          "petType": {
            "type": "string"
          }
        },
        "required": [
          "name",
          "petType"
        ]
      },
      "Cat": {
        "description": "A representation of a cat. Note that `Cat` will be used as the discriminator value.",
        "allOf": [
          {
            "$ref": "#/components/schemas/Pet"
          },
          {
            "type": "object",
            "properties": {
              "huntingSkill": {
                "type": "string",
                "description": "The measured skill for hunting",
                "default": "lazy",
                "enum": [
                  "clueless",
                  "lazy",
                  "adventurous",
                  "aggressive"
                ]
              }
            },
            "required": [
              "huntingSkill"
            ]
          }
        ]
      },
      "Dog": {
        "description": "A representation of a dog. Note that `Dog` will be used as the discriminator value.",
        "allOf": [
          {
            "$ref": "#/components/schemas/Pet"
          },
          {
            "type": "object",
            "properties": {
              "packSize": {
                "type": "integer",
                "format": "int32",
                "description": "the size of the pack the dog is from",
                "default": 0,
                "minimum": 0
              }
            },
            "required": [
              "packSize"
            ]
          }
        ]
      }
    }
  }
}
```

```yaml
components:
  schemas:
    Pet:
      type: object
      discriminator:
        propertyName: petType
      properties:
        name:
          type: string
        petType:
          type: string
      required:
      - name
      - petType
    Cat:  ## "Cat" will be used as the discriminator value
      description: A representation of a cat
      allOf:
      - $ref: '#/components/schemas/Pet'
      - type: object
        properties:
          huntingSkill:
            type: string
            description: The measured skill for hunting
            enum:
            - clueless
            - lazy
            - adventurous
            - aggressive
        required:
        - huntingSkill
    Dog:  ## "Dog" will be used as the discriminator value
      description: A representation of a dog
      allOf:
      - $ref: '#/components/schemas/Pet'
      - type: object
        properties:
          packSize:
            type: integer
            format: int32
            description: the size of the pack the dog is from
            default: 0
            minimum: 0
        required:
        - packSize
```
 * 
 * This object MAY be extended with [Specification Extensions][1], though as noted, additional
 * properties MAY omit the `x-` prefix within this object.
 * 
 * [1]: https://tools.ietf.org/html/draft-bhutton-json-schema-00
 * [2]: https://tools.ietf.org/html/draft-bhutton-json-schema-00#section-4.3.3
 * [3]: https://tools.ietf.org/html/draft-bhutton-json-schema-validation-00
 * [4]: https://spec.commonmark.org/
 * [5]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#dataTypeFormat
 * [6]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#discriminatorObject
 * [7]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#xmlObject
 * [8]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#externalDocumentationObject
 * [9]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#schemaXml
 * [10]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#baseVocabulary
 * [11]: https://tools.ietf.org/html/draft-bhutton-json-schema-00#section-8
 * [12]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#oasObject
 * [13]: https://tools.ietf.org/html/draft-bhutton-json-schema-00#section-8.1.1
 */
export type XSchemaObject<T extends SpecExtFieldPattern = any> = SpecificationExtension<T> & XSchemaObjectBasic;

interface XSchemaObjectBasic extends SchemaObject {
  allOf?: [XSchemaObject, ...XSchemaObject[]];
  anyOf?: [XSchemaObject, ...XSchemaObject[]];
  oneOf?: [XSchemaObject, ...XSchemaObject[]];
  not?: XSchemaObject;
  if?: XSchemaObject;
  then?: XSchemaObject;
  else?: XSchemaObject;
  dependentSchemas?: { [dependentSchema: string]: XSchemaObject };
  items?: XSchemaObject | { [item: string]: XSchemaObject };
  additionalItems?: XSchemaObject;
  unevaluatedItems?: XSchemaObject;
  contains?: XSchemaObject;
  properties?: { [propertyName: string]: XSchemaObject };
  patternProperties?: { [pattern: string]: XSchemaObject };
  additionalProperties?: XSchemaObject;
  unevaluatedProperties?: XSchemaObject;
  discriminator?: XDiscriminatorObject;
  xml?: XXmlObject;
  externalDocs?: XExternalDocumentationObject;
}
