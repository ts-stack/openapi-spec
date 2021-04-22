import { DiscriminatorObject } from '../origin/discriminator-object';
import { SpecExtFieldPattern, SpecificationExtension } from '../origin/specification-extension';

/**
 * When request bodies or response payloads may be one of a number of different schemas,
 * a `discriminator` object can be used to aid in serialization, deserialization, and validation.
 * The discriminator is a specific object in a schema which is used to inform the consumer of
 * the document of an alternative schema based on the value associated with it.
 * 
 * When using the discriminator, _inline_ schemas will not be considered.
 * 
 * The discriminator object is legal only when using one of the composite keywords `oneOf`,
 * `anyOf`, `allOf`.
 * 
 * In OAS 3.0, a response payload MAY be described to be exactly one of any number of types:
 * 
```yaml
MyResponseType:
  oneOf:
  - $ref: '#/components/schemas/Cat'
  - $ref: '#/components/schemas/Dog'
  - $ref: '#/components/schemas/Lizard'
```
 * 
 * which means the payload _MUST_, by validation, match exactly one of the schemas described by
 * `Cat`, `Dog`, or `Lizard`.  In this case, a discriminator MAY act as a "hint" to shortcut
 * validation and selection of the matching schema which may be a costly operation, depending on
 * the complexity of the schema. We can then describe exactly which field tells us which schema to use:
 * 
```yaml
MyResponseType:
  oneOf:
  - $ref: '#/components/schemas/Cat'
  - $ref: '#/components/schemas/Dog'
  - $ref: '#/components/schemas/Lizard'
  discriminator:
    propertyName: petType
```
 * 
 * The expectation now is that a property with name `petType` _MUST_ be present in the response
 * payload, and the value will correspond to the name of a schema defined in the OAS document.
 * Thus the response payload:
 * 
```json
{
  "id": 12345,
  "petType": "Cat"
}
```
 * 
 * Will indicate that the `Cat` schema be used in conjunction with this payload.
 * 
 * In scenarios where the value of the discriminator field does not match the schema name or
 * implicit mapping is not possible, an optional `mapping` definition MAY be used:
 * 
```yaml
MyResponseType:
  oneOf:
  - $ref: '#/components/schemas/Cat'
  - $ref: '#/components/schemas/Dog'
  - $ref: '#/components/schemas/Lizard'
  - $ref: 'https://gigantic-server.com/schemas/Monster/schema.json'
  discriminator:
    propertyName: petType
    mapping:
      dog: '#/components/schemas/Dog'
      monster: 'https://gigantic-server.com/schemas/Monster/schema.json'
```
 * 
 * Here the discriminator _value_ of `dog` will map to the schema `#/components/schemas/Dog`,
 * rather than the default (implicit) value of `Dog`.  If the discriminator _value_ does not match
 * an implicit or explicit mapping, no schema can be determined and validation SHOULD fail. Mapping
 * keys MUST be string values, but tooling MAY convert response values to strings for comparison.
 * 
 * When used in conjunction with the `anyOf` construct, the use of the discriminator can avoid
 * ambiguity where multiple schemas may satisfy a single payload.
 * 
 * In both the `oneOf` and `anyOf` use cases, all possible schemas MUST be listed explicitly.
 * To avoid redundancy, the discriminator MAY be added to a parent schema definition, and all
 * schemas comprising the parent schema in an `allOf` construct may be used as an alternate schema.
 * 
 * For example:
 * 
```yaml
components:
  schemas:
    Pet:
      type: object
      required:
      - petType
      properties:
        petType:
          type: string
      discriminator:
        propertyName: petType
        mapping:
          dog: Dog
    Cat:
      allOf:
      - $ref: '#/components/schemas/Pet'
      - type: object
        # all other properties specific to a `Cat`
        properties:
          name:
            type: string
    Dog:
      allOf:
      - $ref: '#/components/schemas/Pet'
      - type: object
        # all other properties specific to a `Dog`
        properties:
          bark:
            type: string
    Lizard:
      allOf:
      - $ref: '#/components/schemas/Pet'
      - type: object
        # all other properties specific to a `Lizard`
        properties:
          lovesRocks:
            type: boolean
```
 * 
 * a payload like this:
 * 
```json
{
  "petType": "Cat",
  "name": "misty"
}
```
 * 
 * will indicate that the `Cat` schema be used.  Likewise this schema:
 * 
```json
{
  "petType": "dog",
  "bark": "soft"
}
```
 * 
 * will map to `Dog` because of the definition in the `mapping` element.
 * 
 * This object MAY be extended with [Specification Extensions][1].
 * 
 * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#specificationExtensions
 */
export type XDiscriminatorObject<T extends SpecExtFieldPattern = any> = SpecificationExtension<T> & DiscriminatorObject;
