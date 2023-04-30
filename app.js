// 設定伺服器
const express = require("express");
const app = express();
const port = 3000;

// require handlebars in the project
const exphbs = require("express-handlebars");

//抓取JSON資料
const restaurantList = require("./restaurant.json");

//設定handlebars路由
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//呼叫靜態檔案
app.use(express.static("public"));

// routes setting
//首頁畫面
app.get("/", (req, res) => {
  res.render("index", { restaurants: restaurantList.results });
});
//分頁-餐廳細節
app.get("/restaurants/:restaurant_id", (req, res) => {
  const restaurant = restaurantList.results.find((restaurant) => {
    return restaurant.id.toString() === req.params.restaurant_id;
  });
  res.render("show", { restaurant: restaurant });
});
// 分頁-search
app.get("/search", (req, res) => {
  const keyword = req.query.restaurant_keyword;
  if (keyword.trim().length === 0) {
    res.render("index", { restaurants: restaurantList.results });
  } else {
    //name search
    const res_arr1 = restaurantList.results.filter((restaurant) => {
      return restaurant.name.toLowerCase().includes(keyword.toLowerCase());
    });
    //category search
    const res_arr2 = restaurantList.results.filter((restaurant) => {
      return restaurant.category.toLowerCase().includes(keyword.toLowerCase());
    });
    const restaurants = res_arr1.concat(res_arr2);
    console.log(restaurants);
    res.render("index", { restaurants: restaurants, keyword: keyword });
  }
});
// start and listen on the Express server
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
