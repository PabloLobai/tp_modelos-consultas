const db = require('../database/models')

module.exports = {
    list : (req,res) => {
        db.Pelicula.findAll()
            .then(movies => {
                res.render("moviesList",{movies})
            })
            .catch(error => console.log(error))
    },

    nueva: (req,res) => {
        db.Pelicula.findAll({
            order: [['release_date', 'DESC']],
            limit: 5
        })
        .then(movies => {
            res.render("newestMovies",{movies})
        })
        .catch(error => console.log(error))

    },
    recommended: (req,res) => {
        db.Pelicula.findAll({
            where: {
                release_date: {[db.Sequelize.Op.gte] : 2008} 
            },
            order: [['rating', 'DESC']],
            limit: 5
        })
        .then(movies => {
            res.render("recommendedMovies",{movies})
        })
        .catch(error => console.log(error))

    },
    detail: (req,res) => {
        db.Pelicula.findByPk(req.params.id).then(movie =>{
            res.render('moviesDetail', {
                movie
            } )
          })
          .catch(error => console.log(error))
    },//Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: function (req, res) {
        res.render('moviesAdd') 
    },
    create: function (req, res) {
       const {title,rating,awards,release_date,length} = req.body;

       db.Pelicula.create({
           title,
           rating,
           awards,
           release_date,
           length
       })
       res.redirect('/movies')
       .catch(error => console.log(error))
        
    },
    edit: function(req, res) {
        db.Pelicula.findByPk(req.params.id).then(movie =>{
            res.render('moviesEdit', {
                movie
            
            } )
          })
          .catch(error => console.log(error))
        
    },
    update: function (req,res) {
        const {title,rating,awards,release_date,length} = req.body;

       db.Pelicula.update({
           title,
           rating,
           awards,
           release_date,
           length
       },{
           where:{
               id: req.params.id
           }
       })
       res.redirect('/movies')
       .catch(error => console.log(error))
    },
    erase: function (req, res) {
        db.Pelicula.findByPk(req.params.id).then(movie =>{
            res.render('moviesDelete', {
                movie
            
            } )
          })
          .catch(error => console.log(error))
    
    },
    remove: function (req, res) {
       db.Pelicula.destroy({
           where: {
              id: req.params.id
           }
       })
       res.redirect('/movies')
       .catch(error => console.log(error))

    },

}