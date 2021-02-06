/**
 * Contact information for the exposed API.
 * 
 * This object MAY be extended with [Specification Extensions][1].
 * 
 * [1]: https://swagger.io/specification/#specificationExtensions
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
export class ContactObject {
  /**
   * The identifying name of the contact person/organization.
   */
  name?: string;
  /**
   * The URL pointing to the contact information. MUST be in the format of a URL.
   */
  url?: string;
  /**
   * The email address of the contact person/organization.
   * MUST be in the format of an email address.
   */
  email?: string;
}