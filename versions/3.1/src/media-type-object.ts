import { EncodingObject } from './encoding-object';
import { ExampleObject } from './example-object';
import { ReferenceObject } from './reference-object';
import { SchemaObject } from './schema-object';

/**
 * Each Media Type Object provides schema and examples for the media type identified by its key.
 * 
 * ### Media Type Examples
 * 
 * - Example with JSON
 * 
```json
{
  "application/json": {
    "schema": {
         "$ref": "#/components/schemas/Pet"
    },
    "examples": {
      "cat" : {
        "summary": "An example of a cat",
        "value": 
          {
            "name": "Fluffy",
            "petType": "Cat",
            "color": "White",
            "gender": "male",
            "breed": "Persian"
          }
      },
      "dog": {
        "summary": "An example of a dog with a cat's name",
        "value" :  { 
          "name": "Puma",
          "petType": "Dog",
          "color": "Black",
          "gender": "Female",
          "breed": "Mixed"
        },
      "frog": {
          "$ref": "#/components/examples/frog-example"
        }
      }
    }
  }
}
```
 * 
 * - Example with YAML
 * 
```yaml
application/json: 
  schema:
    $ref: "#/components/schemas/Pet"
  examples:
    cat:
      summary: An example of a cat
      value:
        name: Fluffy
        petType: Cat
        color: White
        gender: male
        breed: Persian
    dog:
      summary: An example of a dog with a cat's name
      value:
        name: Puma
        petType: Dog
        color: Black
        gender: Female
        breed: Mixed
    frog:
      $ref: "#/components/examples/frog-example"
```
 * 
 * ### Considerations for File Uploads
 * In contrast with the 2.0 specification, `file` input/output content in OpenAPI is described
 * with the same semantics as any other schema type.  In contrast with the 3.0 specification,
 * such schemas use the `contentEncoding` JSON Schema keyword rather than the `format` keyword.
 * This keyword supports all encodings defined in [RFC4648][2],
 * including "base64" and "base64url", as well as "quoted-printable" from [RFC2045][3].
 * 
 * JSON Schema also offers a `contentMediaType` keyword.  However, when the media type is already
 * specified by the Media Type Object's key, or by the `contentType` field of
 * an [Encoding Object][4], the `contentMediaType` keyword SHALL be ignored if present.
 * 
 * Examples:
 * 
 * Content transferred in binary (octet-stream) SHOULD omit `schema`, as no JSON Schema type
 * is suitable:
 * 
 * 
```yaml
# a PNG image as a binary file:
content:
    image/png: {}
```
 * 
 * 
```yaml
# an arbitrary binary file:
content:
    application/octet-stream: {}
```
 * 
 * Binary content transferred with base64 encoding:
 * 
```yaml
content:
    image/png:
        schema:
            type: string
            contentEncoding: base64
```
 * 
 * These examples apply to either input payloads of file uploads or response payloads.
 * 
 * A `requestBody` for submitting a file in a `POST` operation may look like the following example:
 * 
```yaml
requestBody:
  content:
    application/octet-stream: {}
```
 * 
 * In addition, specific media types MAY be specified:
 * 
```yaml
# multiple, specific media types may be specified:
requestBody:
  content:
    # a binary file of type png or jpeg
    image/jpeg: {}
    image/png: {}
```
 * 
 * To upload multiple files, a `multipart` media type MUST be used:
 * 
```yaml
requestBody:
  content:
    multipart/form-data:
      schema:
        properties:
          # The property name 'file' will be used for all files.
          file:
            type: array
            items:
              contentMediaType: application/octet-stream
```
 * 
 * ### Support for x-www-form-urlencoded Request Bodies
 * 
 * To submit content using form url encoding via [RFC1866][5], the following
 * definition may be used:
 * 
```yaml
requestBody:
  content:
    application/x-www-form-urlencoded:
      schema:
        type: object
        properties:
          id:
            type: string
            format: uuid
          address:
            # complex types are stringified to support RFC 1866
            type: object
            properties: {}
```
 * 
 * In this example, the contents in the `requestBody` MUST be stringified per [RFC1866][5] when
 * passed to the server. In addition, the `address` field complex object will be stringified.
 * 
 * When passing complex objects in the `application/x-www-form-urlencoded` content type, the
 * default serialization strategy of such properties is described in the [`Encoding Object`][4]'s
 * [`style`][6] property as `form`.
 * 
 * ### Special Considerations for `multipart` Content
 * 
 * It is common to use `multipart/form-data` as a `Content-Type` when transferring request bodies
 * to operations.  In contrast to 2.0, a `schema` is REQUIRED to define the input parameters to
 * the operation when using `multipart` content.  This supports complex structures as well as
 * supporting mechanisms for multiple file uploads.
 * 
 * In a `multipart/form-data` request body, each schema property, or each element of a schema
 * array property, takes a section in the payload with an internal header as defined by
 * [RFC 7578][7]. The serialization strategy for each property of a `multipart/form-data` request
 * body can be specified in an associated [`Encoding Object`][4].
 * 
 * When passing in `multipart` types, boundaries MAY be used to separate sections of the content
 * being transferred — thus, the following default `Content-Type`s are defined for `multipart`:
 * 
 * - If the property is a primitive, or an array of primitive values, the default Content-Type is
 * `text/plain`
 * - If the property is complex, or an array of complex values, the default Content-Type is
 * `application/json`
 * - If the property is a `type: string` with a `contentEncoding`, the default Content-Type is
 * `application/octet-stream`
 * - If the JSON Schema keyword `contentMediaType` is used and no Encoding Object is present,
 * then the Content-Type is that which is specified by `contentMediaType`, however if an Encoding
 * Object is present, then `contentMediaType` SHALL be ignored
 * 
 * As with non-multipart request or response bodies, when using `contentMediaType` to specify
 * a binary Content-Type without also using `contentEncoding`, the JSON Schema `type` keyword
 * is omitted.
 * 
 * Examples:
 * 
```yaml
requestBody:
  content:
    multipart/form-data:
      schema:
        type: object
        properties:
          id:
            type: string
            format: uuid
          address:
            # default Content-Type for objects is `application/json`
            type: object
            properties: {}
          profileImage:
            # Content-Type with contentMediaType is the contentMediaType (image/png here)
            contentMediaType: image/png
          children:
            # default Content-Type for arrays is based on the `inner` type (text/plain here)
            type: array
            items:
              type: string
          addresses:
            # default Content-Type for arrays is based on the `inner` type (object shown, so `application/json` in this example)
            type: array
            items:
              type: object
              $ref: '#/components/schemas/Address'
```

An `encoding` attribute is introduced to give you control over the serialization of parts of `multipart` request bodies.  This attribute is _only_ applicable to `multipart` and `application/x-www-form-urlencoded` request bodies.
 * 
 * This object MAY be extended with [Specification Extensions][1].
 * 
 * [1]: https://swagger.io/specification/#specificationExtensions
 * [2]: https://tools.ietf.org/html/rfc4648
 * [3]: https://tools.ietf.org/html/rfc2045#section-6.7
 * [4]: https://swagger.io/specification/#encodingObject
 * [5]: https://tools.ietf.org/html/rfc1866
 * [6]: https://swagger.io/specification/#encodingStyle
 * [7]: https://tools.ietf.org/html/rfc7578
 */
export class MediaTypeObject {
  /**
   * The schema defining the content of the request, response, or parameter.
   */
  schema?: SchemaObject;
  /**
   * Example of the media type.  The example object SHOULD be in the correct format as specified
   * by the media type.  The `example` field is mutually exclusive of the `examples` field.
   * Furthermore, if referencing a `schema` which contains an example, the `example` value
   * SHALL _override_ the example provided by the schema.
   */
  example?: any;
  /**
   * Examples of the media type.  Each example object SHOULD  match the media type and specified
   * schema if present.  The `examples` field is mutually exclusive of the `example` field.
   * Furthermore, if referencing a `schema` which contains an example, the `examples` value
   * SHALL _override_ the example provided by the schema.
   */
  examples?: { [exampleName: string]: ExampleObject | ReferenceObject };
  /**
   * A map between a property name and its encoding information. The key, being the property name,
   * MUST exist in the schema as a property. The encoding object SHALL only apply to `requestBody`
   * objects when the media type is `multipart` or `application/x-www-form-urlencoded`.
   */
  encoding?: { [encodingName: string]: EncodingObject };
}