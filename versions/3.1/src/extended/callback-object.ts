import { SpecExtFieldPattern, SpecificationExtension } from '../origin/specification-extension';
import { XPathItemObject } from './path-item-object';
import { ReferenceObject } from '../origin/reference-object';

/**
 * A map of possible out-of band callbacks related to the parent operation.
 * Each value in the map is a [Path Item Object][2] that describes a set of requests that may be
 * initiated by the API provider and the expected responses. The key value used to identify
 * the path item object is an expression, evaluated at runtime, that identifies a URL to use for
 * the callback operation.
 * 
 * To describe incoming requests from the API provider independent from another API call,
 * use the [`webhooks`][3] field.
 * 
 * ### Key Expression
 * 
 * The key that identifies the [Path Item Object][2] is a [runtime expression][4] that can be
 * evaluated in the context of a runtime HTTP request/response to identify the URL to be used
 * for the callback request. A simple example might be `$request.body#/url`. However, using
 * a [runtime expression][4] the complete HTTP message can be accessed.
 * This includes accessing any part of a body that a JSON Pointer [RFC6901][5] can reference.
 * 
 * For example, given the following HTTP request:
 * 
```http
POST /subscribe/myevent?queryUrl=https://clientdomain.com/stillrunning HTTP/1.1
Host: example.org
Content-Type: application/json
Content-Length: 187

{
  "failedUrl" : "https://clientdomain.com/failed",
  "successUrls" : [
    "https://clientdomain.com/fast",
    "https://clientdomain.com/medium",
    "https://clientdomain.com/slow"
  ] 
}

201 Created
Location: https://example.org/subscription/1
```
 * 
 * The following examples show how the various expressions evaluate, assuming the callback
 * operation has a path parameter named `eventType` and a query parameter named `queryUrl`.
 * 
 * 
Expression | Value 
---|:---
$url | https://example.org/subscribe/myevent?queryUrl=https://clientdomain.com/stillrunning
$method | POST
$request.path.eventType | myevent
$request.query.queryUrl | https://clientdomain.com/stillrunning
$request.header.content-Type | application/json
$request.body#/failedUrl | https://clientdomain.com/failed
$request.body#/successUrls/2 | https://clientdomain.com/medium
$response.header.Location | https://example.org/subscription/1
 * 
 * ### Callback Object Examples
 * 
 * The following example uses the user provided `queryUrl` query string parameter to define the
 * callback URL. This is an example of how to use a callback object to describe a WebHook callback
 * that goes with the subscription operation to enable registering for the WebHook.
 * 
```yaml
myCallback:
  '{$request.query.queryUrl}':
    post:
      requestBody:
        description: Callback payload
        content:
          'application/json':
            schema:
              $ref: '#/components/schemas/SomePayload'
      responses:
        '200':
          description: callback successfully processed
```
 * 
 * The following example shows a callback where the server is hard-coded, but the query string
 * parameters are populated from the `id` and `email` property in the request body.
 * 
```yaml
transactionCallback:
  'http://notificationServer.com?transactionId={$request.body#/id}&email={$request.body#/email}':
    post:
      requestBody:
        description: Callback payload
        content:
          'application/json':
            schema:
              $ref: '#/components/schemas/SomePayload'
      responses:
        '200':
          description: callback successfully processed
```
 * 
 * This object MAY be extended with [Specification Extensions][1].
 * 
 * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#specification-extensions
 * [2]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#path-item-object
 * [3]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#oasWebhooks
 * [4]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#runtime-expressions
 * [5]: https://tools.ietf.org/html/rfc6901
 */
export type XCallbackObject<T extends SpecExtFieldPattern = any> = SpecificationExtension<T> & {
  /**
   * A Path Item Object, or a reference to one, used to define a callback request and expected
   * responses. A [complete example][1] is available.
   *
   * [1]: ../examples/v3.0/callback-example.yaml
   */
  [expression: string]: XPathItemObject | ReferenceObject;
};
