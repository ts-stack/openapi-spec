import { ServerVariableObject } from '../origin/server-variable-object';
import { SpecExtFieldPattern, SpecificationExtension } from '../origin/specification-extension';

/**
 * An object representing a Server Variable for server URL template substitution.
 *
 * This object MAY be extended with [Specification Extensions][1].
 *
 * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#specification-extensions
 */
export type XServerVariableObject<T extends SpecExtFieldPattern = any> = SpecificationExtension<T> &
  ServerVariableObject;
