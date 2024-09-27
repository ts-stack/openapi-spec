import { ExampleObject } from '../origin/example-object';
import { SpecExtFieldPattern, SpecificationExtension } from '../origin/specification-extension';

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
 * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#specification-extensions
 */
export type XExampleObject<T extends SpecExtFieldPattern = any> = SpecificationExtension<T> & ExampleObject;
