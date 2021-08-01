const bcrypt = require('bcryptjs')

const Todo = require('../todo')
const User = require('../user')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')

const defaultUser = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}

db.once('open', () => {
  User.findOne({ email: defaultUser.email })
    .then(user => {
      if (!user) {
        return bcrypt.genSalt(10)
          .then(salt => bcrypt.hash(defaultUser.password, salt))
          .then(hash => User.create({
            name: defaultUser.name,
            email: defaultUser.email,
            password: hash
          }))
          .then(user => {
            const userId = user._id
            return Promise.all(Array.from(
              { length: 10 },
              (_, i) => Todo.create({ name: `name-${i}`, userId })
            ))
          })
          .then(() => {
            console.log('done!')
            process.exit()
          })
          .catch(error => console.log(error))
      }
      console.log('Default user already exist!')
      process.exit()
    })
    .catch(error => console.log(error))
})
