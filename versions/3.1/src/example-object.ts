/**
 * In all cases, the example value is expected to be compatible with the type schema
 * of its associated value.  Tooling implementations MAY choose to validate compatibility
 * automatically, and reject the example value(s) if incompatible.
 * 
 * ### Example Object Examples
 * 
 * In a request body:
 * 
```yaml
requestBody:
  content:
    'application/json':
      schema:
        $ref: '#/components/schemas/Address'
      examples: 
        foo:
          summary: A foo example
          value: {"foo": "bar"}
        bar:
          summary: A bar example
          value: {"bar": "baz"}
    'application/xml':
      examples: 
        xmlExample:
          summary: This is an example in XML
          externalValue: 'https://example.org/examples/address-example.xml'
    'text/plain':
      examples:
        textExample: 
          summary: This is a text example
          externalValue: 'https://foo.bar/examples/address-example.txt'
```
 * 
 * In a parameter:
 * 
```yaml
parameters:
  - name: 'zipCode'
    in: 'query'
    schema:
      type: 'string'
      format: 'zip-code'
    examples:
      zip-example: 
        $ref: '#/components/examples/zip-example'
```
 * 
 * In a response:
 * 
```yaml
responses:
  '200':
    description: your car appointment has been booked
    content: 
      application/json:
        schema:
          $ref: '#/components/schemas/SuccessResponse'
        examples:
          confirmation-success:
            $ref: '#/components/examples/confirmation-success'
```
 * This object MAY be extended with [Specification Extensions][1].
 * 
 * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#specificationExtensions
 */
export class ExampleObject {
  /**
   * Short description for the example.
   */
  summary?: string;
  /**
   * Long description for the example. [CommonMark syntax][1] MAY be used for rich text
   * representation.
   * 
   * [1]: https://spec.commonmark.org/
   */
  description?: string;
  /**
   * Embedded literal example. The `value` field and `externalValue` field are mutually exclusive.
   * To represent examples of media types that cannot naturally represented in JSON or YAML, use
   * a string value to contain the example, escaping where necessary.
   */
  value?: any;
  /**
   * A URI that points to the literal example. This provides the capability to reference examples
   * that cannot easily be included in JSON or YAML documents.  The `value` field and
   * `externalValue` field are mutually exclusive. See the rules for resolving [Relative References][1].
   * 
   * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#relativeReferencesURI
   */
  externalValue?: string;
}