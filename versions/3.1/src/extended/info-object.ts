import { XContactObject } from './contact-object';
import { XLicenseObject } from './license-object';
import { SpecExtFieldPattern, SpecificationExtension } from '../origin/specification-extension';
import { InfoObject } from '../origin/info-object';

/**
 * The object provides metadata about the API.
 * The metadata MAY be used by the clients if needed, and MAY be presented in editing
 * or documentation generation tools for convenience.
 *
 * This object MAY be extended with [Specification Extensions][1].
 * 
 * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#specification-extensions
 * 
 * ### Example with JSON
 * 
```json
{
  "title": "Sample Pet Store App",
  "summary": "A pet store manager.",
  "description": "This is a sample server for a pet store.",
  "termsOfService": "https://example.com/terms/",
  "contact": {
    "name": "API Support",
    "url": "https://www.example.com/support",
    "email": "support@example.com"
  },
  "license": {
    "name": "Apache 2.0",
    "url": "https://www.apache.org/licenses/LICENSE-2.0.html"
  },
  "version": "1.0.1"
}
```
 * 
 * ### Example with YAML
 * 
```yaml
title: Sample Pet Store App
summary: A pet store manager.
description: This is a sample server for a pet store.
termsOfService: https://example.com/terms/
contact:
  name: API Support
  url: https://www.example.com/support
  email: support@example.com
license:
  name: Apache 2.0
  url: https://www.apache.org/licenses/LICENSE-2.0.html
version: 1.0.1
```
 */
export type XInfoObject<T extends SpecExtFieldPattern = any> = SpecificationExtension<T> & XInfoObjectBasic;

interface XInfoObjectBasic extends InfoObject {
  contact?: XContactObject;
  license?: XLicenseObject;
}
