/**
 * This string is the [version number][1] of the [OpenAPI Specification version][1]
 * that the OpenAPI document uses. The `openapi` field SHOULD be used by tooling specifications and
 * clients to interpret the OpenAPI document. This is _not_ related to the API [info.version][3]
 * string.
 *
 * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#versions
 * [3]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#infoVersion
 */
export const openapi = '3.1.0';
export * from './origin/base-parameter-object';
export * from './origin/callback-object';
export * from './origin/components-object';
export * from './origin/contact-object';
export * from './origin/discriminator-object';
export * from './origin/encoding-object';
export * from './origin/example-object';
export * from './origin/external-documentation-object';
export * from './origin/header-object';
export * from './origin/http-status-code';
export * from './origin/info-object';
export * from './origin/license-object';
export * from './origin/link-object';
export * from './origin/media-type-object';
export * from './origin/o-auth-flow-object';
export * from './origin/o-auth-flows-object';
export * from './origin/oas-explode';
export * from './origin/oas-object';
export * from './origin/oas-style';
export * from './origin/operation-object';
export * from './origin/parameter-object';
export * from './origin/path-item-object';
export * from './origin/paths-object';
export * from './origin/reference-object';
export * from './origin/request-body-object';
export * from './origin/response-object';
export * from './origin/responses-object';
export * from './origin/schema-object';
export * from './origin/security-requirement-object';
export * from './origin/security-scheme-object';
export * from './origin/server-object';
export * from './origin/server-variable-object';
export * from './origin/specification-extension';
export * from './origin/tag-object';
export * from './origin/xml-object';

export * from './extended/callback-object';
export * from './extended/components-object';
export * from './extended/discriminator-object';
export * from './extended/encoding-object';
export * from './extended/example-object';
export * from './extended/external-documentation-object';
export * from './extended/header-object';
export * from './extended/info-object';
export * from './extended/link-object';
export * from './extended/media-type-object';
export * from './extended/o-auth-flow-object';
export * from './extended/o-auth-flows-object';
export * from './extended/oas-object';
export * from './extended/operation-object';
export * from './extended/parameter-object';
export * from './extended/path-item-object';
export * from './extended/request-body-object';
export * from './extended/response-object';
export * from './extended/responses-object';
export * from './extended/security-requirement-object';
export * from './extended/security-scheme-object';
export * from './extended/server-object';
export * from './extended/server-variable-object';
export * from './extended/tag-object';
export * from './extended/contact-object';
export * from './extended/license-object';
export * from './extended/xml-object';
export { XSchemaObject } from './extended/schema-object';
export { XPathsObject } from './extended/paths-object';
