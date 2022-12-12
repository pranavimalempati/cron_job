const controller = require("../controller/controller");
const router = require("express").Router();

router.post('/add',controller.add)
router.get('/update',controller.update)
router.delete('/delete',controller.remove)



module.exports = router