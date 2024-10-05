const express = require('express')
const app = express()
const port = 3000

const namegen = require('./src/routes/nameGen.js')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/api/v1/generate', namegen)

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => console.log(`Server up and running on port ${port}`))