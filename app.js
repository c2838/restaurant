// 載入express
const express = require('express')
// 載入template engine
const { engine } = require('express-handlebars')
// 調用express
const app = express()
// 設定阜號
const port = 3000
// 取出餐廳物件陣列
const restaurants = require('./public/jsons/restaurants.json').results


// 使用express function 使用 tempalte engine
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');
// 使用public內的靜態資料
app.use(express.static('public'))

// 重新導向至/restaurants介面
app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

// 渲染restaurants list
app.get('/restaurants', (req, res) => {
  // 渲染出index.hbs介面，導入restaurants陣列
  res.render('index', { restaurants })
})

app.get('/restaurant/:id', (req, res) => {
  // 取得:id參數
  const id = req.params.id
  // 比對id，得到正確的餐廳物件
  const restaurant = restaurants.find(restaurant => restaurant.id.toString() === id)
  // 渲染出detail.hbs介面，導入restaurants陣列
  res.render('detail', { restaurant }) 
})

// 監聽瀏覽器呼叫
app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})