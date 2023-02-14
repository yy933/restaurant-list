# Foodie's Diary
---
這是一個使用Node.js與Express所建立的餐廳資訊網站，使用者註冊帳號並登入後，可以透過關鍵字搜尋餐廳，也可以新增、編輯自己喜愛的餐廳清單。
<p align="center">
  <h3>登入頁面</h3>
  <img src="readme_images\Foodies-diary_login page.jpg" width="100%" alt="Foodie-Diary_login">
  <h3>註冊頁面</h3>
  <img src="readme_images\Foodies-diary_register page.jpg" width="100%" alt="Foodie-Diary_register">
    <h3>登入後可製作個人餐廳清單</h3>
  <img src="readme_images\Foodies-diary_main.jpg" width="100%" alt="Foodie-Diary_main">
</p>

## 功能 Features
1. 使用者必須註冊帳號(亦可使用Facebook帳號登入)，並登入使用本網站的功能，管理屬於自己的餐廳清單
2. 使用者點擊餐廳，可以查看餐廳詳細資訊(包含店名、類型、地址、電話等)
3. 使用者可利用關鍵字搜尋功能進行搜尋
4. 使用者可以排序餐廳
5. 使用者可以新增一家餐廳
6. 使用者可以瀏覽一家餐廳的詳細資訊
7. 使用者可以瀏覽全部所有餐廳
8. 使用者可以修改一家餐廳的資訊
9. 使用者可以刪除一家餐廳
## 主要工具 Tools
1. [Node.js](https://nodejs.org/en/)(v14.16.0) - JavaScript執行環境
2. [Express](https://expressjs.com/)(v4.18.2) -網路框架(web framework)
3. [Express-handlebars](https://www.npmjs.com/package/express-handlebars)(v4.0.6) - 模板引擎
4. [Bootstrap](https://getbootstrap.com/)(v5.1.1) - 前端開發工具
5. [MongoDB](https://www.mongodb.com/) - 非關聯式資料庫（NoSQL）
6. [Mongoose](https://mongoosejs.com/)(v5.9.7) - MongoDB ODM
7. [passport](https://www.passportjs.org/)(v0.4.1) -  驗證機制
8. [express-session](https://www.npmjs.com/package/express-session)(v1.17.1) - 在Express上進行cookie+session認證
9. [bcryptjs](https://www.npmjs.com/package/bcryptjs)(v2.4.3) - 處理密碼
10. [connect-flash-plus](https://www.npmjs.com/package/connect-flash-plus)(v0.2.1) - 建立提示訊息
11. [Font Awesome](https://fontawesome.com/)(v6.2.1) - 圖形與字型設計套件
12. [Visual Studio Code](https://code.visualstudio.com/) - 程式碼編輯器
## 安裝指南 Installation Guide
1. 打開終端機，複製此專案至本機
```
git clone https://github.com/yy933/restaurant-list.git
```
2. 進入此專案資料夾
```
cd restaurant-list
```
3. 安裝npm套件 

```
npm install
```
```
npm install <package name>@<version>
```
4. 匯入種子資料
```
npm run seed
```
當終端機顯示 `mongodb connected!` 及 `restaurantSeeder done!`表示已成功匯入種子資料，按 ctrl + c 結束執行

5. 啟動伺服器
```
npm run start
```
6. 當終端機顯示 `Express is running on http://localhost:3000` ，代表已成功啟動伺服器並執行app.js檔案，至瀏覽器輸入 http://localhost:3000 即可使用本網站

## 測試 Test
匯入種子資料後，可利用以下兩組帳號進行測試：

* User 1:
email: user1@example.com
password: 12345678
* User 2:
email: user2@example.com
password: 12345678




