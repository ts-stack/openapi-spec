import { XServerObject } from './server-object';

/**
 * The `Link object` represents a possible design-time link for a response.
 * The presence of a link does not guarantee the caller's ability to successfully invoke it, rather
 * it provides a known relationship and traversal mechanism between responses and other operations.
 * 
 * Unlike _dynamic_ links (i.e. links provided **in** the response payload), the OAS linking
 * mechanism does not require link information in the runtime response.
 * 
 * For computing links, and providing instructions to execute them, a [runtime expression][2] is
 * used for accessing values in an operation and using them as parameters while invoking the linked
 * operation.
 * 
 * A linked operation MUST be identified using either an `operationRef` or `operationId`.
 * In the case of an `operationId`, it MUST be unique and resolved in the scope of the OAS
 * document. Because of the potential for name clashes, the `operationRef` syntax is preferred
 * for OpenAPI documents with external references.
 * 
 * ### Examples
 * 
 * Computing a link from a request operation where the `$request.path.id` is used to pass a request
 * parameter to the linked operation.
 * 
```yaml
paths:
  /users/{id}:
    parameters:
    - name: id
      in: path
      required: true
      description: the user identifier, as userId 
      schema:
        type: string
    get:
      responses:
        '200':
          description: the user being returned
          content:
            application/json:
              schema:
                type: object
                properties:
                  uuid: # the unique user id
                    type: string
                    format: uuid
          links:
            address:
              # the target link operationId
              operationId: getUserAddress
              parameters:
                # get the `id` field from the request path parameter named `id`
                userId: $request.path.id
  # the path item of the linked operation
  /users/{userid}/address:
    parameters:
    - name: userid
      in: path
      required: true
      description: the user identifier, as userId 
      schema:
        type: string
    # linked operation
    get:
      operationId: getUserAddress
      responses:
        '200':
          description: the user's address
```
 * 
 * When a runtime expression fails to evaluate, no parameter value is passed to the target
 * operation.
 * 
 * Values from the response body can be used to drive a linked operation.
 * 
```yaml
links:
  address:
    operationId: getUserAddressByUUID
    parameters:
      # get the `uuid` field from the `uuid` field in the response body
      userUuid: $response.body#/uuid
```
 * 
 * Clients follow all links at their discretion. Neither permissions, nor the capability to make
 * a successful call to that link, is guaranteed solely by the existence of a relationship.
 * 
 * #### OperationRef Examples
 * 
 * As references to `operationId` MAY NOT be possible (the `operationId` is an optional field in
 * an [Operation Object][3]), references MAY also be made through a relative `operationRef`:
 * 
```yaml
links:
  UserRepositories:
    # returns array of '#/components/schemas/repository'
    operationRef: '#/paths/~12.0~1repositories~1{username}/get'
    parameters:
      username: $response.body#/username
```
 * 
 * or an absolute `operationRef`:
 * 
```yaml
links:
  UserRepositories:
    # returns array of '#/components/schemas/repository'
    operationRef: 'https://na2.gigantic-server.com/#/paths/~12.0~1repositories~1{username}/get'
    parameters:
      username: $response.body#/username
```
 * 
 * Note that in the use of `operationRef`, the _escaped forward-slash_ is necessary when
 * using JSON references.
 * 
 * This object MAY be extended with [Specification Extensions][1].
 * 
 * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#specificationExtensions
 * [2]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#runtimeExpression
 * [3]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#operationObject
 */
export interface XLinkObject {
  /**
   * A relative or absolute URI reference to an OAS operation. This field is mutually exclusive of
   * the `operationId` field, and MUST point to an [Operation Object][1]. Relative
   * `operationRef` values MAY be used to locate an existing [Operation Object][1]
   * in the OpenAPI definition. See the rules for resolving [Relative References][2].
   * 
   * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#operationObject
   * [2]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#relativeReferencesURI
   */
  operationRef?: string;
  /**
   * The name of an _existing_, resolvable OAS operation, as defined with a unique `operationId`.
   * This field is mutually exclusive of the `operationRef` field.
   */
  operationId?: string;
  /**
   * A map representing parameters to pass to an operation as specified with `operationId` or
   * identified via `operationRef`. The key is the parameter name to be used, whereas the value
   * can be a constant or an expression to be evaluated and passed to the linked operation.
   * The parameter name can be qualified using the [parameter location][1] `[{in}.]{name}` for
   * operations that use the same parameter name in different locations (e.g. path.id).
   * 
   * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#parameterIn
   */
  parameters?: { [parameterName: string]: any };
  /**
   * A literal value or [{expression}][1] to use as a request body when calling the target
   * operation.
   * 
   * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#runtimeExpression
   */
  requestBody?: { [parameterName: string]: any };
  /**
   * A description of the link. [CommonMark syntax][1] MAY be used for rich text representation.
   * 
   * [1]: https://spec.commonmark.org/
   */
  description?: string;
  /**
   * A server object to be used by the target operation.
   */
  server?: XServerObject;
}