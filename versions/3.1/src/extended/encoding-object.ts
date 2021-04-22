import { XHeaderObject } from './header-object';
import { OasStyle } from '../origin/oas-style';
import { ReferenceObject } from '../origin/reference-object';
import { SpecExtFieldPattern, SpecificationExtension } from '../origin/specification-extension';
import { EncodingObject } from '../origin/encoding-object';

/**
 * A single encoding definition applied to a single schema property.
 * 
 * ### Encoding Object Example
 * 
```yaml
requestBody:
  content:
    multipart/form-data:
      schema:
        type: object
        properties:
          id:
            # default is text/plain
            type: string
            format: uuid
          address:
            # default is application/json
            type: object
            properties: {}
          historyMetadata:
            # need to declare XML format!
            description: metadata in XML format
            type: object
            properties: {}
          profileImage: {}
      encoding:
        historyMetadata:
          # require XML Content-Type in utf-8 encoding
          contentType: application/xml; charset=utf-8
        profileImage:
          # only accept png/jpeg
          contentType: image/png, image/jpeg
          headers:
            X-Rate-Limit-Limit:
              description: The number of allowed requests in the current period
              schema:
                type: integer
```
 * 
 * This object MAY be extended with [Specification Extensions][1].
 * 
 * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#specificationExtensions
 */
export type XEncodingObject<T extends SpecExtFieldPattern = any> = SpecificationExtension<T> & IEncodingObjectBasic;

interface IEncodingObjectBasic extends EncodingObject {
  headers?: { [headerName: string]: XHeaderObject | ReferenceObject };
}
