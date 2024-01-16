// 載入express
const express = require('express')
// 載入template engine
const { engine } = require('express-handlebars')
const app = express()
const port = 3000

// 使用express function 使用 tempalte engine
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

app.get('/restaurants', (req, res) => {
  res.render('index')
})

app.get('/restaurant/:id', (req, res) => {
  const id = res.parmas.id
  res.send(`read restaurant: ${id}`) 
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})