# member-manager

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Start Vue Project
```
vue ui
```


## [새로운 View 추가](https://router.vuejs.org/guide/essentials/named-views.html)
### NewView.vue
```html
<template>
  <div class="newView">
    <h1>This is an newView page</h1>
  </div>
</template>
```

### index.js
```js
const routes = [
  /* ... */
  {
    path: '/newView',
    name: 'NewView',
    component: () => import(/* webpackChunkName: "newView" */ '../views/newView.vue'),
  },
];
```

### Some.vue
```html
<!-- go to newView from other view -->
<router-link to="/error">Error</router-link>
```
