import { XComponentsObject } from './components-object';
import { XExternalDocumentationObject } from './external-documentation-object';
import { XInfoObject } from './info-object';
import { XPathItemObject } from './path-item-object';
import { XPathsObject } from './paths-object';
import { XReferenceObject } from './reference-object';
import { XSecurityRequirementObject } from './security-requirement-object';
import { XServerObject } from './server-object';
import { XTagObject } from './tag-object';

/**
 * This is the root document object of the OpenAPI document.
 *
 * This object MAY be extended with [Specification Extensions][1].
   * 
   * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#specificationExtensions
 */
export interface XOasObject {
  /**
   * This string MUST be the [version number][1] of the [OpenAPI Specification version][1]
   * that the OpenAPI document uses. The `openapi` field SHOULD be used by tooling specifications and
   * clients to interpret the OpenAPI document. This is _not_ related to the API [info.version][3]
   * string.
   * 
   * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#versions
   * [3]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#info-version
   */
  openapi: string;
  /**
   * Provides metadata about the API. The metadata MAY be used by tooling as required.
   */
  info: XInfoObject;
  /**
   * An array of Server Objects, which provide connectivity information to a target server. If
   * the `servers` property is not provided, or is an empty array, the default value would be
   * a [Server Object][1] with a [url][2] value of `/`.
   * 
   * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#serverObject
   * [2]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#serverUrl
   */
  servers?: XServerObject[];
  /**
   * The available paths and operations for the API.
   */
  paths?: XPathsObject;
  /**
   * The incoming webhooks that MAY be received as part of this API and that the API consumer MAY
   * choose to implement. Closely related to the `callbacks` feature, this section describes
   * requests initiated other than by an API call, for example by an out of band registration.
   * The key name is a unique string to refer to each webhook, while the (optionally referenced)
   * Path Item Object describes a request that may be initiated by the API provider and the
   * expected responses. An [example][1] is available.
   * 
   * [1]: ../examples/v3.1/webhook-example.yaml
   */
  webhooks?: { [webhookName: string]: XPathItemObject | XReferenceObject };
  /**
   * An element to hold various schemas for the document.
   */
  components?: XComponentsObject;
  /**
   * A declaration of which security mechanisms can be used across the API. The list of values
   * includes alternative security requirement objects that can be used. Only one of the security
   * requirement objects need to be satisfied to authorize a request. Individual operations can
   * override this definition. To make security optional, an empty security requirement (`{}`)
   * can be included in the array.
   */
  security?: XSecurityRequirementObject[];
  /**
   * A list of tags used by the document with additional metadata. The order of the tags can be
   * used to reflect on their order by the parsing tools. Not all tags that are used by the
   * [Operation Object][1] must be declared. The tags that are not declared MAY
   * be organized randomly or based on the tools' logic. Each tag name in the list MUST be unique.
   * 
   * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#operationObject
   */
  tags?: XTagObject[];
  externalDocs?: XExternalDocumentationObject;
}
