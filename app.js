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
  // 取出查詢參數，利用trim()忽略空格
  const keywords = req.query.keyword?.trim()
  // 利用filter過濾符合條件的餐廳:Object.values(restaurant)取出物件值回傳陣列，再利用some()遍歷陣列內容值，符合者回傳true，filter彙整符合條件之內容值並回傳陣列給變數；若無符合條件者則回傳restaurants陣列
  const matchedRestaurants = keywords ? restaurants.filter(restaurant => Object.values(restaurant).some(property => {
    console.log(property)
    if (typeof property === 'string') {
      // 若keywords包含在property中則includes()回傳true
      return property.toLowerCase().includes(keywords.toLowerCase())
    }else return false
  })
  ) : restaurants
  // 渲染出index.hbs介面，導入restaurants陣列
  res.render('index', { restaurants: matchedRestaurants, keywords })
})

app.get('/restaurant/:id', (req, res) => {
  // 取得:id參數
  const id = req.params.id
  // 比對id，得到正確的餐廳物件(params取得的id型別是string，故比對時需轉換型別)
  const restaurant = restaurants.find(restaurant => restaurant.id.toString() === id)
  // 渲染出detail.hbs介面，導入restaurants陣列
  res.render('detail', { restaurant }) 
})

// 監聽瀏覽器呼叫
app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})