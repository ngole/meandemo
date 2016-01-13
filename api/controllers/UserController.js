/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var UserController = {
    index: function(req,res){
        User.find(function(err, users){
            if (err) return res.send(err,500);
            res.view ({
                model:users
            });
        });
    },

    new: function(req, res){
        res.view();
    },

    create: function(req,res,next) {
        User.create(req.params.all(), function userCreated(err, user) {
            if (err){
                console.log(err);
                req.session.flash={
                    err:err
                }


                 return res.redirect('/user/new');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                err:err
            }
             res.redirect('/user/show/'+user.id);
        })
    },


    show: function(req,res,next){
        User.findOne(req.param('id'), function foundUser(err,user){
            if(err) return next(err);
            if(!user) return next();
            res.view({
                user: user
            });
        });
    },

    edit: function(req, res, next){
        User.findOne(req.param('id'), function foundUser(err, user){
            if(err) return next(err);
            if(!user) return next();

            res.view({
                user:user
            });
        });
    },

    update: function(req,res){
        User.update(req.param('id'), req.params.all(), function userUpdated(err){
            if(err){
                console.log(err);
                return res.redirect('/user/edit/'+req.param('id'));
            }

            res.redirect('/user/show/'+req.param('id'));
        });
    },

    destroy: function(req, res, next){
        User.findOne(req.param('id'), function foundUser(err, user){
            if(err) return next(err);

            if(!user) return next('User doesn\'t exist.');

            User.destroy(req.param('id'), function userDestroyed(err){
                if(err) return next(err);
            });

            res.redirect('/user');
        })
    }
};
module.exports = UserController;

