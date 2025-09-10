# github-identicon
GitHub's [identicon](https://github.blog/news-insights/company-news/identicons/) algorithm written in JS, crudely ported from https://github.com/dgraham/identicon

<img width="420" height="420" alt="identicon" src="https://github.com/user-attachments/assets/81523432-0891-4b3e-89f6-2d0eb7baea31" />

## Install
```
npm install github-identicon
```

## Usage
```js
import { writeFileSync } from "node:fs";
import identicon from "github-identicon";

let id = Math.floor(Math.random() * 221110555);

const icon = identicon(id, 500);
writeFileSync(`${id}.png`, icon);
```

## Notes
GitHub's identicons are taken from the ID of the account, not the username of it. Technically you 