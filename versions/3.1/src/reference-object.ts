/**
 * A simple object to allow referencing other objects in the OpenAPI document, internally and
 * externally. Targets of a reference do not need to be contained in a components section and
 * for external references, targets MAY exist within any compatible resource. Targets are subject
 * to the same constraints as inline objects.
 * 
 * This object cannot be extended with additional properties and any properties added SHALL be
 * ignored.
 * 
 * Note that this restriction on additional properties is a difference between Reference Objects
 * and [`Schema Objects`][1] that contain a `$ref` keyword.
 * 
 * ### Reference Object Example
 * 
```json
{
	"$ref": "#/components/schemas/Pet"
}
```
 * 
 * 
```yaml
$ref: '#/components/schemas/Pet'
```
 * 
 * ### Relative Schema Document Example
 * 
```json
{
  "$ref": "Pet.json"
}
```
 * 
 * 
```yaml
$ref: Pet.yaml
```
 * 
 * ### Relative Documents With Embedded Schema Example
 * 
```json
{
  "$ref": "definitions.json#/Pet"
}
```
 * 
 * 
```yaml
$ref: definitions.yaml#/Pet
```
 * 
 * [1]: https://swagger.io/specification/#schemaObject
 */
export class ReferenceObject {
  /**
   * The reference string.
   */
  $ref: string;
  /**
   * A short summary which by default SHOULD override that of the referenced component. If the
   * referenced object-type does not define a `summary` field, then this field has no effect.
   */
  summary?: string;
  /**
   * A description which by default SHOULD override that of the referenced component.
   * [CommonMark syntax][1] MAY be used for rich text representation. If the referenced object-type
   * does not define a `description` field, then this field has no effect.
   * 
   * [1]: https://spec.commonmark.org/
   */
  description?: string;
}