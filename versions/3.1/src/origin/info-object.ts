import { ContactObject } from './contact-object';
import { LicenseObject } from './license-object';

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
export interface InfoObject {
  /**
   * The title of the API.
   */
  title: string;
  /**
   * A short summary of the API.
   */
  summary?: string;
  /**
   * A description of the API. [CommonMark syntax][1] MAY be used for rich text
   * representation.
   *
   * [1]: https://spec.commonmark.org/
   */
  description?: string;
  /**
   * A URL to the Terms of Service for the API. This MUST be in the form of a URL.
   */
  termsOfService?: string;
  /**
   * The contact information for the exposed API.
   */
  contact?: ContactObject;
  /**
   * The license information for the exposed API.
   */
  license?: LicenseObject;
  /**
   * The version of the OpenAPI document (which is distinct from the
   * [OpenAPI Specification version][1] or the API implementation version).
   * 
   * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#oasVersion
   */
  version: string;
}