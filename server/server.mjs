import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'

const app = express();

app.use(cors());

app.get('/posts', async (req, res) => {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(data => data.json())
    .then(response => {
      return res.json(response)
    })
    .catch(err => {
      return res.status(400).send(err)
    })
})

app.get('/posts/:id', async (req, res) => {
  const id = req.params.id
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(data => data.json())
    .then(response => {
      return res.json(response)
    })
    .catch(err => {
      return res.status(400).send(err)
    })
})

app.get('/posts/:id/comments', async (req, res) => {
  const id = req.params.id
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    .then(data => data.json())
    .then(response => {
      return res.json(response)
    })
    .catch(err => {
      return res.status(400).send(err)
    })
})


app.get('/*', (req, res) => {
  res.send('Route Not Found')
})



app.listen(3000, () => {
  console.log('Server connected!')
})