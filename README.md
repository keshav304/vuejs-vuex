# user-list-vuejs
## Parent to child communication: 
```
The parent component passes data to the child component using props. Props are simply attributes that are passed to the child component. The child component can then access these props in its template and code.
```
## Child to parent communication: 
```
Child components can also communicate with their parent components by emitting events. Events are simply notifications that are sent from a child component to its parent. The parent component can then listen for these events and take action when they are emitted.
```
## Sibling communication: 
```
Sibling components can communicate with each other using a global event bus. The event bus is a central location where events can be emitted and listened for.
```
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

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

