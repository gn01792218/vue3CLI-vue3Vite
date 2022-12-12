# baccarat_master

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
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
### 從CLI到vite的步驟 : 
1.整理 package.json依賴 : 移除cli相關依賴 ； 安裝 vite 相關依賴 <br>

```
//移除CLI相關
"@vue/cli-plugin-babel": "~4.5.0", // remove
"@vue/cli-plugin-eslint": "~4.5.0", // remove
"@vue/cli-plugin-router": "~4.5.0", // remove
"@vue/cli-plugin-vuex": "~4.5.0", // remove
"@vue/cli-service": "~4.5.0", // remove

//移除其他不需要的依賴
"sass-loader": "^8.0.2" // remove
"babel-eslint": "^10.1.0", // remove
"core-js": "^3.6.5", // remove

//安裝vite
"@vitejs/plugin-vue": "^1.6.1",
"vite": "^2.5.4",
```
ps . 如果有使用eslint，要更新
```
//安裝插件
npm install eslint@8 eslint-plugin-vue@8

//更新.eslintrc檔案
//移除以下
parserOptions: {  
    parser: "babel-eslint",
}, 

//更新以下
env: {
    node: true, // 移除
    es2021: true, //更新為2021
}

```
2.撰寫vite.config.js檔案 : 
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const {resolve} = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
})

```
3.更新package.json 腳本
```
"serve": "vue-cli-service serve", // remove
"build": "vue-cli-service build", // remove
"dev": "vite",
"build": "vite build",
"serve": "vite preview",
```

4. 移動和更新index.html <br>
1.位置從public資料夾移到根目錄下 <br>
2.需要載入main.ts
```javascript
<body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
</body>
```
5. 更新獲取.env變數的方式 : 
```javascript
//cli
base: process.env.BASE_URL,

//vite
base: import.meta.env.BASE_URL,
```

6. 更新動態獲取圖片方式 : 
```javascript
//原本要使用request
require(`../assets/${url}`)

//使用import.meta.url
new URL(`../assets/${url}`,import.meta.url).href
```
## 數據分析
```
啟動專案速度 :
vue CLI : 首次 9709 ms ~ 15375 ms
          平均 2729 ms
vite : 首次 866 ms ~ 234 ms
       平均 234 ms
```
