const Task = require('../models').Task;
const fetch = require('node-fetch')
module.exports = {
    listByStatus(req, res) {
      return Task
        .findAll({ 
          where: { 
            status: req.params.status
          },
          order: [
            ['timesCompleted', 'ASC'],
            ['createdAt', 'DESC'],
          ],
        })
        .then((tasks) => res.status(200).send(tasks))
        .catch((error) => { res.status(400).send(error); });
    },

    changeStatus(req, res) {
      return Task
        .findByPk(req.body.id)
        .then(task => {
          if (!task) {
            return res.status(404).send({
              message: 'Task Not Found',
            });
          }

          if(task.timesCompleted + 1 > 3) {
            return res.status(400).send({
              message: 'Overlimit completed status change',
            });
          }
          return task
            .update({
                status: req.body.newStatus,
                timesCompleted : req.body.newStatus == 1 ? task.timesCompleted + 1 : task.timesCompleted
            })
            .then(() => res.status(200).send(task))
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
    },

    async generateRandomTasks(req, res) {
      try {
        const apiResponse = await fetch(
          'https://cat-fact.herokuapp.com/facts/'
        )
        const apiResponseJson = await apiResponse.json()

        var i = 0;

        for(let dataApi of apiResponseJson){
          if(i < 3) {
            await Task.create({
              description: dataApi.text,
              responsible: "Eu",
              email: "eu@me.com",
              status: 0,
              timesCompleted: 0
            })
          }
          i++;
        }

        res.status(200).send(apiResponseJson)
      } catch (err) {
        console.log(err)
        res.status(500).send('Something went wrong')
      }
    },
  
    getById(req, res) {
      return Task
        .findByPk(req.params.id)
        .then((task) => {
          if (!task) {
            return res.status(404).send({
              message: 'Task Not Found',
            });
          }
          return res.status(200).send(task);
        })
        .catch((error) => {
          console.log(error);
          res.status(400).send(error);
        });
    },
  
    async add(req, res) {

      try {
        const apiResponse = await fetch(
          'https://apilayer.net/api/check?access_key=f20f7ae318c34b92ee6a685fac758feb&email=' + req.body.email
        )
        const apiResponseJson = await apiResponse.json()

        if(apiResponseJson.format_valid && apiResponseJson.mx_found) {
          return Task
            .create(
              req.body
            )
            .then((task) => res.status(201).send(task))
            .catch((error) => res.status(400).send(error))
        } else if(apiResponseJson.did_you_mean) {
          res.status(400).send({did_you_mean: apiResponseJson.did_you_mean})
        } else {
          res.status(500).send("Email Validation Error")
        }

      } catch (err) {
        console.log(err)
        res.status(500).send('Something went wrong')
      }


      
    },
  
    delete(req, res) {
      return Task
        .findByPk(req.params.id)
        .then(task => {
          if (!task) {
            return res.status(400).send({
              message: 'Task Not Found',
            });
          }
          return task
            .destroy()
            .then(() => res.status(204).send())
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
    },
  };