# posrocket-assessment

## Description
Dynamic Dashboard Builder using VueJs and Typescript.
![Dashboard](./screenshots/screenshot1.png)

## Features
- The drawing of the charts depend on a json which has (title, type, order, priority,style).
- Widget types are:
    - Pie
    - Line
    - Doughnut
    - Numeric
    - Table
- Charts are downloaded depending on priority as shown in the video Below:
[Demo][https://www.awesomescreenshot.com/video/6066076?key=50aa7545896e76a743ac06f1a7be68fc]

## APIs
- https://6192313daeab5c0017105e25.mockapi.io/api/meta
- https://6192313daeab5c0017105e25.mockapi.io/api/chart-data/:id

## Depndencies
- axios
- chart.js
- vuex

## built with
- Vue 3
- Typescript
- SASS
- NPM
- HTML

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

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
