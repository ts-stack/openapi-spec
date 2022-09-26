# About the project

`@ts-stack/openapi-spec` has TypeScript models according to [OpenAPI Specification][1] v3.1.0.
To use it, required TypeScript v4.1+.

Major and minor versions of `@ts-stack/openapi-spec` are the same as [OpenAPI Specification][1],
but the patch version is not the same:

| OpenAPI Specification   | @ts-stack/openapi-spec |
|-------------------------|-------------------------|
| v3.1.0                  | <ul><li>v3.1.0</li><li>v3.1.1</li><li>v3.1.2</li><li>v3.1.3</li><li>v3.1.4</li><li>v3.1.5</li></ul> |


## Introduction

The OpenAPI Specification (OAS) defines a standard, language-agnostic interface to RESTful APIs
which allows both humans and computers to discover and understand the capabilities of the service
without access to source code, documentation, or through network traffic inspection. When properly
defined, a consumer can understand and interact with the remote service with a minimal amount of
implementation logic.

An OpenAPI definition can then be used by documentation generation tools to display the API, code
generation tools to generate servers and clients in various programming languages, testing tools,
and many other use cases.

## Install

```bash
npm i -D @ts-stack/openapi-spec
```

[1]: https://github.com/OAI/OpenAPI-Specification

## openapi version usage

You can use the `openapi` constant that contains the version of the OpenAPI Specification:

```ts
import { openapi } from '@ts-stack/openapi-spec';

console.log(openapi) // 3.1.0
```

## SpecificationExtension Usage

If you want to use already extended interfaces, you need to import interfaces with the `X` prefix:

```ts
import { XOasObject } from '@ts-stack/openapi-spec';

const extendedOasObject: XOasObject<'x-one' | 'x-two'> = {
  info: {title: '', version: ''},
  openapi: '',
  'x-one': '',
  'x-two': '',
};
```

Or, you can extends any of model in this way:

```ts
import { OasObject, SpecificationExtension } from '@ts-stack/openapi-spec';

type ExtendedOasObject = OasObject & SpecificationExtension<'x-one' | 'x-two'>;

const extendedOasObject: ExtendedOasObject = {
  info: {title: '', version: ''},
  openapi: '',
  'x-one': '',
  'x-two': '',
};
```

Same but with an interface to extends properties:

```ts
import { OasObject, SpecificationExtension } from '@ts-stack/openapi-spec';

interface ExtendedProperties {
  'x-one': any,
  'x-two': any
}

type ExtendedOasObject = OasObject & SpecificationExtension<keyof ExtendedProperties>;

const extendedOasObject: ExtendedOasObject = {
  info: {title: '', version: ''},
  openapi: '',
  'x-one': '',
  'x-two': '',
};
```

## PathsObject Usage

```ts
import { PathsObject } from '@ts-stack/openapi-spec';

type Paths = '/one' | '/two';

type StrictDifinedPaths = PathsObject<Paths>;

const paths: StrictDifinedPaths = {
  '/one': {},
  '/two': {},
};
```
