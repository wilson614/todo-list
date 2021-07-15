const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const todos = String(req.body.name).split(',').map(todo => ({ name: todo }))
  Todo.insertMany(todos)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
