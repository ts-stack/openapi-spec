/**
 * A metadata object that allows for more fine-tuned XML model definitions.
 * 
 * When using arrays, XML element names are *not* inferred (for singular/plural forms) and the
 * `name` property SHOULD be used to add that information. See examples for expected behavior.
 * 
 * ### XML Object Examples
 * 
 * The examples of the XML object definitions are included inside a property definition of
 * a [Schema Object][2] with a sample of the XML representation of it.
 * 
 * ### No XML Element
 * 
 * Basic string property:
 * 
```json
{
    "animals": {
        "type": "string"
    }
}
```
 * 
 * 
```yaml
animals:
  type: string
```
 * 
 * 
```xml
<animals>...</animals>
```
 * 
 * Basic string array property ([`wrapped`][3] is `false` by default):
 * 
```json
{
    "animals": {
        "type": "array",
        "items": {
            "type": "string"
        }
    }
}
```
 * 
 * 
```yaml
animals:
  type: array
  items:
    type: string
```
 * 
 * 
```xml
<animals>...</animals>
<animals>...</animals>
<animals>...</animals>
```
 * 
 * ### XML Name Replacement
 * 
```json
{
  "animals": {
    "type": "string",
    "xml": {
      "name": "animal"
    }
  }
}
```
 * 
 * 
```yaml
animals:
  type: string
  xml:
    name: animal
```
 * 
 * 
```xml
<animal>...</animal>
```
 * 
 * ### XML Attribute, Prefix and Namespace
 * 
 * In this example, a full model definition is shown.
 * 
```json
{
  "Person": {
    "type": "object",
    "properties": {
      "id": {
        "type": "integer",
        "format": "int32",
        "xml": {
          "attribute": true
        }
      },
      "name": {
        "type": "string",
        "xml": {
          "namespace": "https://example.com/schema/sample",
          "prefix": "sample"
        }
      }
    }
  }
}
```
 * 
 * 
```yaml
Person:
  type: object
  properties:
    id:
      type: integer
      format: int32
      xml:
        attribute: true
    name:
      type: string
      xml:
        namespace: https://example.com/schema/sample
        prefix: sample
```
 * 
 * 
```xml
<Person id="123">
    <sample:name xmlns:sample="https://example.com/schema/sample">example</sample:name>
</Person>
```
 * 
 * ### XML Arrays
 * 
 * Changing the element names:
 * 
```json
{
  "animals": {
    "type": "array",
    "items": {
      "type": "string",
      "xml": {
        "name": "animal"
      }
    }
  }
}
```
 * 
 * 
```yaml
animals:
  type: array
  items:
    type: string
    xml:
      name: animal
```
 * 
 * 
```xml
<animal>value</animal>
<animal>value</animal>
```
 * 
 * The external `name` property has no effect on the XML:
 * 
```json
{
  "animals": {
    "type": "array",
    "items": {
      "type": "string",
      "xml": {
        "name": "animal"
      }
    },
    "xml": {
      "name": "aliens"
    }
  }
}
```
 * 
 * 
```yaml
animals:
  type: array
  items:
    type: string
    xml:
      name: animal
  xml:
    name: aliens
```
 * 
 * 
```xml
<animal>value</animal>
<animal>value</animal>
```
 * 
 * Even when the array is wrapped, if a name is not explicitly defined, the same name will be used
 * both internally and externally:
 * 
```json
{
  "animals": {
    "type": "array",
    "items": {
      "type": "string"
    },
    "xml": {
      "wrapped": true
    }
  }
}
```
 * 
 * 
```yaml
animals:
  type: array
  items:
    type: string
  xml:
    wrapped: true
```
 * 
 * 
```xml
<animals>
  <animals>value</animals>
  <animals>value</animals>
</animals>
```
 * 
 * To overcome the naming problem in the example above, the following definition can be used:
 * 
```json
{
  "animals": {
    "type": "array",
    "items": {
      "type": "string",
      "xml": {
        "name": "animal"
      }
    },
    "xml": {
      "wrapped": true
    }
  }
}
```
 * 
 * 
```yaml
animals:
  type: array
  items:
    type: string
    xml:
      name: animal
  xml:
    wrapped: true
```
 * 
 * 
```xml
<animals>
  <animal>value</animal>
  <animal>value</animal>
</animals>
```
 * 
 * Affecting both internal and external names:
 * 
```json
{
  "animals": {
    "type": "array",
    "items": {
      "type": "string",
      "xml": {
        "name": "animal"
      }
    },
    "xml": {
      "name": "aliens",
      "wrapped": true
    }
  }
}
```
 * 
 * 
```yaml
animals:
  type: array
  items:
    type: string
    xml:
      name: animal
  xml:
    name: aliens
    wrapped: true
```
 * 
 * 
```xml
<aliens>
  <animal>value</animal>
  <animal>value</animal>
</aliens>
```
 * 
 * If we change the external element but not the internal ones:
 * 
```json
{
  "animals": {
    "type": "array",
    "items": {
      "type": "string"
    },
    "xml": {
      "name": "aliens",
      "wrapped": true
    }
  }
}
```
 * 
 * 
```yaml
animals:
  type: array
  items:
    type: string
  xml:
    name: aliens
    wrapped: true
```
 * 
 * 
```xml
<aliens>
  <aliens>value</aliens>
  <aliens>value</aliens>
</aliens>
```
 * 
 * This object MAY be extended with [Specification Extensions][1].
 * 
 * [1]: https://swagger.io/specification/#specificationExtensions
 * [2]: https://swagger.io/specification/#schemaObject
 * [3]: https://swagger.io/specification/#xmlWrapped
 */
export class XmlObject {
  /**
   * Replaces the name of the element/attribute used for the described schema property. When
   * defined within `items`, it will affect the name of the individual XML elements within the
   * list. When defined alongside `type` being `array` (outside the `items`), it will affect the
   * wrapping element and only if `wrapped` is `true`. If `wrapped` is `false`, it will be ignored.
   */
  name?: string;
  /**
   * The URI of the namespace definition. Value MUST be in the form of an absolute URI.
   */
  namespace?: string;
  /**
   * The prefix to be used for the [name][1].
   * 
   * [1]: https://swagger.io/specification/#xmlName
   */
  prefix?: string;
  /**
   * Declares whether the property definition translates to an attribute instead of an element.
   * Default value is `false`.
   */
  attribute?: boolean;
  /**
   * MAY be used only for an array definition. Signifies whether the array is wrapped (for example,
   * `<books><book/><book/></books>`) or unwrapped (`<book/><book/>`). Default value is `false`.
   * The definition takes effect only when defined alongside `type` being `array` (outside the
   * `items`).
   */
  wrapped?: boolean;
}
