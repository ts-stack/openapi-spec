import { SpecExtFieldPattern, SpecificationExtension } from '../origin/specification-extension';
import { XOAuthFlowObject } from './o-auth-flow-object';

/**
 * Allows configuration of the supported OAuth Flows.
 * 
 * This object MAY be extended with [Specification Extensions][1].
 * 
 * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#specification-extensions
 */
export type XOAuthFlowsObject<T extends SpecExtFieldPattern = any> = SpecificationExtension<T> & {
  /**
   * Configuration for the OAuth Implicit flow.
   */
  implicit?: XOAuthFlowObject;
  /**
   * Configuration for the OAuth Resource Owner Password flow.
   */
  password?: XOAuthFlowObject;
  /**
   * Configuration for the OAuth Client Credentials flow.
   * Previously called `application` in OpenAPI 2.0.
   */
  clientCredentials?: XOAuthFlowObject;
  /**
   * Configuration for the OAuth Authorization Code flow.
   * Previously called `accessCode` in OpenAPI 2.0.
   */
  authorizationCode?: XOAuthFlowObject;
}
