# Guerrillamail Node Api
A nodejs api to interact with guerrilamail api.


## Installing

### Package manager

Using npm:

```bash
$ npm install guerrillamail-node-api
```
Using yarn:

```bash
$ yarn add guerrillamail-node-api
```

Once the package is installed, you can import the library:
```js
import Gmapi from 'guerrillamail-node-api';
```


## Example

> **Note** CommonJS usage
> In order to gain the TypeScript typings (for intellisense / autocomplete) while using CommonJS imports with `require()`, use the following approach:

```js
import Gmapi from 'guerrillamail-node-api';

const tempMail = new Gmapi();

await tempMail.get_email_list();                       // Provides a temporary email.
await tempMail.set_email_user();                       // Change the username of an email. If the name is the same gives extra 60 minutes. 'Revive' a deleted email.
await tempMail.check_email();                          // Verify new emails on inbox.
await tempMail.get_email_list();                       // List new emails on inbox.
await tempMail.fetch_email(tempMail.inbox[0].mail_id); // Shows one specific email.
await tempMail.forget_me();                            // Delete the temporary email.
await tempMail.del_email(tempMail.inbox[0].mail_id);   // Delete one email on inbox.
await tempMail.del_email();                            // List mail inbox in descending order
const remainingTime = await tempMail.remaining_time(); // Shows how much time the temporary email has left

```

## Technologies
<ul>
  <li>axios: 0.27.2</li>
</ul>

## Infos
<p>Author: <a href="https://github.com/ravinmor">Ravin Mor</a></p>
<p>Email contact: ravinmmor@gmail.com or ravinmenezes@outlook.com</p>
