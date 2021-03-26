/**
 * In order to support common ways of serializing simple parameters,
 * a set of `style` values are defined.
 */
export const StyleValue = {
  path: {
    /**
     * Path-style parameters defined by [RFC6570][1].
     *
     * This type can be in `path` location and can have next types:
     * - primitive
     * - array
     * - object
     *
     * [1]: https://tools.ietf.org/html/rfc6570#section-3.2.7
     */
    matrix: 'matrix',
    /**
     * Label style parameters defined by [RFC6570][1].
     *
     * This type can be in `path` location and can have next types:
     * - primitive
     * - array
     * - object
     *
     * [1]: https://tools.ietf.org/html/rfc6570#section-3.2.5
     */
    label: 'label',
    /**
     * Simple style parameters defined by [RFC6570][1].
     * This option replaces `collectionFormat` with a `csv` value from OpenAPI 2.0.
     *
     * This type can be in `path` or `header` location and can have `array` type.
     *
     * [1]: https://tools.ietf.org/html/rfc6570#section-3.2.2
     */
    simple: 'simple',
  },
  query: {
    /**
     * Form style parameters defined by [RFC6570][1].
     * This option replaces `collectionFormat` with a `csv` (when `explode` is false)
     * or `multi` (when `explode` is true) value from OpenAPI 2.0.
     *
     * This type can be in `query` or `cookie` location and can have next types:
     * - primitive
     * - array
     * - object
     *
     * [1]: https://tools.ietf.org/html/rfc6570#section-3.2.8
     */
    form: 'form',
    /**
     * Space separated array or object values. This option replaces
     * `collectionFormat` equal to `ssv` from OpenAPI 2.0.
     *
     * This type can be in `query` location and can have `array` or `object` type.
     */
    spaceDelimited: 'spaceDelimited',
    /**
     * Pipe separated array or object values. This option replaces
     * `collectionFormat` equal to `pipes` from OpenAPI 2.0.
     *
     * This type can be in `query` location and can have `array` or `object` type.
     */
    pipeDelimited: 'pipeDelimited',
    /**
     * Provides a simple way of rendering nested objects using form parameters.
     *
     * This type can be in `query` location and can have `object` type.
     */
    deepObject: 'deepObject',
  },
  cookie: {
    /**
     * Form style parameters defined by [RFC6570][1].
     * This option replaces `collectionFormat` with a `csv` (when `explode` is false)
     * or `multi` (when `explode` is true) value from OpenAPI 2.0.
     *
     * This type can be in `query` or `cookie` location and can have next types:
     * - primitive
     * - array
     * - object
     *
     * [1]: https://tools.ietf.org/html/rfc6570#section-3.2.8
     */
    form: 'form',
  },
  header: {
    /**
     * Simple style parameters defined by [RFC6570][1].
     * This option replaces `collectionFormat` with a `csv` value from OpenAPI 2.0.
     *
     * This type can be in `path` or `header` location and can have `array` type.
     *
     * [1]: https://tools.ietf.org/html/rfc6570#section-3.2.2
     */
    simple: 'simple',
  },
} as const;

export type OasStyle = 'matrix' | 'label' | 'form' | 'simple' | 'spaceDelimited' | 'pipeDelimited' | 'deepObject';
