/**
 * @author Jacob Yousif
 * A router for the edit form.
 */
'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/editController')
const csrf = require('csurf')
const proc = csrf()
router.use(proc)

/**
 * The routes for the edit form.
 */
router
  .get('/edit/:id', controller.get)
  .post('/edit/:id', controller.post)

module.exports = router
