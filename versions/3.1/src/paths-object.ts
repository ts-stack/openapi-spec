import { PathItemObject } from './path-item-object';

/**
 * Holds the relative paths to the individual endpoints and their operations.
 * The path is appended to the URL from the [`Server Object`][1]
 * in order to construct the full URL. The Paths MAY be empty, due to
 * [Access Control List (ACL) constraints][2].
 * 
 * ### Path Templating Matching
 * 
 * Assuming the following paths, the concrete definition, `/pets/mine`,
 * will be matched first if used:
 *
```
  /pets/{petId}
  /pets/mine
```
 *
 * The following paths are considered identical and invalid:
```
  /pets/{petId}
  /pets/{name}
```
 *
 * The following may lead to ambiguous resolution:
```
  /{entity}/me
  /books/{id}
```
 *
 * ### Paths Object Example
 *
 * - Example with JSON
```json
{
  "/pets": {
    "get": {
      "description": "Returns all pets from the system that the user has access to",
      "responses": {
        "200": {          
          "description": "A list of pets.",
          "content": {
            "application/json": {
              "schema": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/pet"
                }
              }
            }
          }
        }
      }
    }
  }
}
```
 *
 * - Example with YAML
```yaml
/pets:
  get:
    description: Returns all pets from the system that the user has access to
    responses:
      '200':
        description: A list of pets.
        content:
          application/json:
            schema:
              type: array
              items:
                $ref: '#/components/schemas/pet'
```
 * 
 * This object MAY be extended with [Specification Extensions][3].
 * 
 * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#serverObject
 * [2]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#securityFiltering
 * [3]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#specificationExtensions
 */
export type PathsObject = {
  /**
   * A relative path to an individual endpoint. The field name MUST begin with a forward
   * slash (`/`). The path is **appended** (no relative URL resolution) to the expanded URL
   * from the [`Server Object`][1]'s `url` field in order to construct the full URL.
   * [Path templating][2] is allowed. When matching URLs, concrete (non-templated)
   * paths would be matched before their templated counterparts. Templated paths with the same
   * hierarchy but different templated names MUST NOT exist as they are identical. In case of
   * ambiguous matching, it's up to the tooling to decide which one to use.
   * 
   * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#serverObject
   * [2]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#pathTemplating
   */
  [path: string]: PathItemObject;
};

/**
 * @todo Trek github:
 * - https://github.com/microsoft/TypeScript/issues/42192
 * - https://github.com/microsoft/TypeScript/pull/26797
 */
type FieldPattern = `/${any}`;
