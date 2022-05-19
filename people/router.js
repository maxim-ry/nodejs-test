

const controllerAndService = require( './controllerAndService')
const {Router} = require('express');

const router = Router();

router.get('/:id', controllerAndService.getById)
router.get('/', controllerAndService.getPeople)

module.exports = router;