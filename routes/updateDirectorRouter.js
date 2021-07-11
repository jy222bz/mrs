/**
 * A update director Router.
 *
 * @author Jacob Yousif
 * @version 1.0.0
 */

'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/updateDirectorController')

/**
 * The routes update director form.
 */
router
  .get('/directors/:id', controller.update)
  .post('/directors/:id', controller.updateDirector)
  .get('/delete-direcotr/:id', controller.delete)

module.exports = router
