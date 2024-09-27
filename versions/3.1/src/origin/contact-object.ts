/**
 * Contact information for the exposed API.
 * 
 * This object MAY be extended with [Specification Extensions][1].
 * 
 * [1]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#specification-extensions
 * 
 * ### Example with JSON
 * 
```json
{
  "name": "API Support",
  "url": "https://www.example.com/support",
  "email": "support@example.com"
}
```
 * 
 * ### Example with YAML
 * 
```yaml
name: API Support
url: https://www.example.com/support
email: support@example.com
```
 */
export interface ContactObject {
  /**
   * The identifying name of the contact person/organization.
   */
  name?: string;
  /**
   * The URL pointing to the contact information. This MUST be in the form of a URL.
   */
  url?: string;
  /**
   * The email address of the contact person/organization.
   * This MUST be in the form of an email address.
   */
  email?: string;
}