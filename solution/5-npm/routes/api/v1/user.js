const express = require('express')
const fs = require('fs')
const router = express.Router()
const dbPath = '../../../db/users.json'
const dbRealPath = './db/users.json'
const users = require(dbPath)

const response = ({res, data, error}) => {
  if (!error) {
    return res.status(200).json({data})
  } else {
    return res.status(500).json({error})
  }
}

const saveToDatabase = (users) => {
  const data = JSON.stringify(users)
  return fs.writeFileSync(dbRealPath, data, 'utf8')
}

router.get('/', (req, res) => {
  if (users) {
    return response({res, data: users})
  } else {
    return response({res, error: "Users DB not found."})
  }
})
router.post('/', (req,res) => {
  const { firstname, lastname, email } = req.body
  if(firstname && lastname && email) {
    const lastUser = users.sort((a,b) => a.id - b.id).slice(-1)[0]
    const id = Number(lastUser.id) + 1
    const newUser = {id, firstname, lastname, email}
    const newUsers = [...users, newUser]
    try {
      saveToDatabase(newUsers)
      response({res, data: newUser})
    } catch(error) {
      return response({res, error})
    }
  } else {
    return response({res, error: "Firstname, lastname, and email must be contained on the body."})
  }
})
router.get('/:userId', (req,res) => {
  const { userId } = req.params
  const user = users.find(user => user.id === Number(userId) )
  if (user) {
    return response({res, data: user})
  } else {
    return response({res, error: `User with id ${userId} not found.`})
  }
})
router.patch('/:userId', (req,res) => {
  const { userId } = req.params
  const { firstname, lastname, email } = req.body
  const selectedUser = users.find(user => user.id === Number(userId) )
  const indexSelectedUser = users.indexOf(selectedUser)
  if (selectedUser) {
    try {
      Object.keys({firstname, lastname, email}).forEach(key => {
        if(req.body[key]) {
          selectedUser[key] = req.body[key]
        }
      })
      users[indexSelectedUser] = selectedUser
      saveToDatabase(users)
      return response({res, data: selectedUser})
    } catch(error) {
      return response({res, error})
    }
  }
  return response({res, error: `User with id ${userId} not found.`})
})
router.delete('/:userId', (req, res) => {
  const { userId } = req.params
  const filteredUsers = users.filter(user => user.id !== Number(userId))
  if(users.find(user => user.id === Number(userId))) {
    try {
      saveToDatabase(filteredUsers)
      response({res, data: {}})
    } catch (error) {
      response({res, error})
    }
  } else {
    response({res, error: `User with id ${userId} not found.`})
  }
})

module.exports = router