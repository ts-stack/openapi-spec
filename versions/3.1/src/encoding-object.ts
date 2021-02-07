import { HeaderObject } from './header-object';
import { OasStyle } from './oas-style';
import { ReferenceObject } from './reference-object';

/**
 * A single encoding definition applied to a single schema property.
 * 
 * ### Encoding Object Example
 * 
```yaml
requestBody:
  content:
    multipart/mixed:
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
          profileImage:
            type: string
            contentMediaType: image/jpeg
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
 * [1]: https://swagger.io/specification/#specificationExtensions
 */
export class EncodingObject {
  /**
   * The `Content-Type` for encoding a specific property. Default value depends on the property
   * type:
   * 
   * - when `type` is absent and `contentMediaType` is present - the value of
   * `contentMediaType`;
   * - when both `type` and `contentMediaType` are absent - `application/octet-stream`;
   * - for `string` with a `contentEncoding` - `application/octet-string`;
   * - for other primitive types – `text/plain`; for `object` - `application/json`;
   * - for `array` – the default is defined based on the inner type.
   * 
   * The value can be a specific media type (e.g. `application/json`), a wildcard media type
   * (e.g. `image/*`), or a comma-separated list of the two types.
   */
  contentType?: string;
  /**
   * A map allowing additional information to be provided as headers, for example
   * `Content-Disposition`.  `Content-Type` is described separately and SHALL be ignored in this
   * section. This property SHALL be ignored if the request body media type is not a `multipart`.
   */
  headers?: { [headerName: string]: HeaderObject | ReferenceObject };
  /**
   * Describes how a specific property value will be serialized depending on its type.
   * See [Parameter Object][1] for details on the [`style`][2] property. The behavior follows the
   * same values as `query` parameters, including default values. This property SHALL be ignored
   * if the request body media type is not `application/x-www-form-urlencoded` or
   * `multipart/form-data`. If a value is explicitly defined, then the value of [`contentType`][3]
   * (implicit or explicit) SHALL be ignored.
   * 
   * [1]: https://swagger.io/specification/#parameterObject
   * [2]: https://swagger.io/specification/#parameterStyle
   * [3]: https://swagger.io/specification/#encodingContentType
   */
  style?: OasStyle;
  /**
   * When this is true, property values of type `array` or `object` generate separate parameters
   * for each value of the array, or key-value-pair of the map.  For other types of properties this
   * property has no effect. When [`style`][1] is `form`, the default value is `true`.
   * For all other styles, the default value is `false`. This property SHALL be ignored if the
   * request body media type is not `application/x-www-form-urlencoded` or `multipart/form-data`.
   * If a value is explicitly defined, then the value of [`contentType`][2] (implicit or explicit)
   * SHALL be ignored.
   * 
   * [1]: https://swagger.io/specification/#encodingStyle
   * [2]: https://swagger.io/specification/#encodingContentType
   */
  explode?: boolean;
  /**
   * Determines whether the parameter value SHOULD allow reserved characters, as defined by
   * [RFC3986][1] `:/?#[]@!$&'()*+,;=` to be included without percent-encoding. The default
   * value is `false`. This property SHALL be ignored if the request body media type is not
   * `application/x-www-form-urlencoded` or `multipart/form-data`. If a value is explicitly
   * defined, then the value of [`contentType`][2] (implicit or explicit)
   * SHALL be ignored.
   * 
   * [1]: https://tools.ietf.org/html/rfc3986#section-2.2
   * [2]: https://swagger.io/specification/#encodingContentType
   */
  allowReserved?: boolean;
}