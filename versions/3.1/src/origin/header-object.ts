import { BaseParameterObject } from './base-parameter-object';

/**
 * The Header Object follows the structure of the [Parameter Object][1] with the following changes:
 * 
 * 1. `name` MUST NOT be specified, it is given in the corresponding `headers` map.
 * 1. `in` MUST NOT be specified, it is implicitly in `header`.
 * 1. All traits that are affected by the location MUST be applicable to a location of `header`
 * (for example, [`style`][2]).
 * 
 * ### Header Object Example
 * 
 * A simple header of type `integer`:
 * 
 * - example with JSON
 * 
```json
{
  "description": "The number of allowed requests in the current period",
  "schema": {
    "type": "integer"
  }
}
```
 * 
 * - example with YAML
 * 
```yaml
description: The number of allowed requests in the current period
schema:
  type: integer
```
 * 
 * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#parameter-object
 * [2]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#parameterStyle
 */
export interface HeaderObject extends BaseParameterObject {
  /**
   * MUST NOT be specified, it is given in the corresponding `headers` map.
   */
  name?: never;
  /**
   * MUST NOT be specified, it is implicitly in `header`.
   */
  in?: never;
}
