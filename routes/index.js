var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'To do List' });
});

/* Router for Tasks */
const taskController = require('../controllers').task;
router.get('/api/task/randomTasks', taskController.generateRandomTasks);
router.get('/api/task/:status', taskController.listByStatus);
router.put('/api/task/changeStatus', taskController.changeStatus);
router.post('/api/task', taskController.add);

module.exports = router;
