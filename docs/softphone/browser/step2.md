# 2. Initialize SDK

## Import API client library
You can make the JS API directly available to your Javascript using a script tag in your HTML, which will make the API available under a global jabra reference.

```html
<script type="text/javascript" src="jabra.browser.integration-2.0.js"></script>
```
Alternatively, you can import/require our npm package within your javascript or typescript (requires a transpiler like Webpack or Browserify etc).

```ts
import * as jabra from '@gnaudio/jabra-browser-integration';
```

## Initialize API from your application

Once you have loaded/imported/required the JS API, you can initialize it as follows.

```js
    return jabra.init().then(() => {
        // Add Your code to execute when initialized here.
        console.log("SUCCESS")
    }).catch(e => {
        // Add custom error handling code here.
        console.error(e);
    });
```

<Jabra-Init>
</Jabra-Init>

::: tip
You will get an error if you try to initialize the API more than once. You must either keep track of when you have initialized OR call ``` jabra.shutdown() ``` before a 2nd ```init()``` call.
:::



