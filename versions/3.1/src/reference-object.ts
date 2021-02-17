/**
 * A simple object to allow referencing other components in the OpenAPI document, internally and
 * externally.
 * 
 * The `$ref` string value contains a URI [RFC3986][2], which identifies the location of the value
 * being referenced.
 * 
 * See the rules for resolving [Relative References][3].
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
 * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#schemaObject
 * [2]: https://tools.ietf.org/html/rfc3986
 * [3]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#relativeReferencesURI
 */
export class ReferenceObject {
  /**
   * The reference identifier. This MUST be in the form of a URI.
   */
  $ref: string;
  /**
   * A short summary which by default SHOULD override that of the referenced component. If the
   * referenced object-type does not allow a `summary` field, then this field has no effect.
   */
  summary?: string;
  /**
   * A description which by default SHOULD override that of the referenced component.
   * [CommonMark syntax][1] MAY be used for rich text representation. If the referenced object-type
   * does not allow a `description` field, then this field has no effect.
   * 
   * [1]: https://spec.commonmark.org/
   */
  description?: string;
}