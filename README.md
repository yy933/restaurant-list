# 餐廳清單 Restaurant List
---
這是一個使用Node.js與Express所建立的餐廳資訊網站，使用者亦可以透過關鍵字搜尋餐廳。
## 功能 Features
1. 使用者點擊餐廳，可以查看餐廳詳細資訊(包含店名、類型、地址、電話等)
2. 使用者可利用關鍵字搜尋功能進行搜尋
## 工具 Tools
1. [Node.js](https://nodejs.org/en/)(v14.16.0) - JavaScript執行環境
2. [Express](https://expressjs.com/)(v4.18.2) -網路框架(web framework)
3. [Express-handlebars](https://www.npmjs.com/package/express-handlebars)(v6.0.6) - 模板引擎
## 安裝指南 Installation Guide
1. 打開終端機，複製此專案至本機
```
git clone https://github.com/yy933/restaurant-list.git
```
2. 進入此專案資料夾
```
cd restaurant-list
```
3. 安裝npm套件 (Express及Handlebars)

```
npm install
```
```
npm install express@4.18.2
```
```
npm install express-handlebars@6.0.6
```
4. 啟動伺服器
```
npm run dev
```
5. 當終端機顯示 `Express is running on http://localhost:3000` ，代表已成功啟動伺服器並執行app.js檔案，至瀏覽器輸入 http://localhost:3000 即可使用本網站
