# baccarat_master

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

## 遊戲備註
### coin圖檔尺寸 79*65

## 從CLI 遷移到 vite 紀錄
### index.html
1.位置從public資料夾移到根目錄下
2.需要載入main.ts
```javascript
<body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
</body>
```
### 獲取.env檔的方式 : 
```javascript
//cli
base: process.env.BASE_URL,

//vite
base: import.meta.env.BASE_URL,
```

### 動態獲取圖片方式 : 
```javascript
//原本要使用request
require(`../assets/${url}`)

//使用import.meta.url
new URL(`../assets/${url}`,import.meta.url).href
```