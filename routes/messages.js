var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')

var Message = require('../models/message');
var User = require('../models/user')


router.get('/', function (req, res, next) {
    Message.find()
        .populate('user', 'firstName')
        .exec(function (err, messages) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: "Success",
                obj: messages
            });
        });
});

// use this route for route protection by verifying the token
router.use('/', function (req, res, next){
    jwt.verify(req.query.token, 'secret', function(err, recievedToken){
        if(err){
            return res.status(401).json({
                title:'Not Authenticated',
                error:err
            });
        }
        next();
    });
});

router.post('/', function (req, res, next) {
    var userFromToken = jwt.decode(req.query.token);
    User.findById(userFromToken.user._id, function(err, user){
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        var message = new Message({
            content: req.body.content,
            user: user._id
        });
        message.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            user.messages.push(result);
            user.save();
            res.status(201).json({
                message: 'Saved Data!', //try changing to title to see what happens
                obj: result
            });
        });
    });

});

//Update the message
router.patch('/:id', function (req, res, next) {
    var userFromToken = jwt.decode(req.query.token);
    Message.findById(req.params.id, function (err, message) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!message) {
            return res.status(500).json({
                title: 'No Message Found',
                error: {
                    message: "Message not found in the body"
                }
            });
        }
        //check if user is loggedin or not
        if(message.user!=userFromToken.user._id){
            return res.status(401).json({
                title: 'An error occurred',
                error: {message:'User not allowed'}
        })
    }
        message.content = req.body.content;
        message.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated Message!', //try changing to title to see what happens
                obj: result
            });
        });

    });
});

router.delete('/:id', function(req, res, next){
    var userFromToken = jwt.decode(req.query.token);
    Message.findById(req.params.id, function (err, message) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!message) {
            return res.status(500).json({
                title: 'No Message Found',
                error: {
                    message: "Message not found in the body"
                }
            });
        }
        if(message.user!=userFromToken.user._id){
            return res.status(401).json({
                title: 'An error occurred',
                error: {message:'User not allowed'}
        })
    }
        message.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted Message!', //try changing to title to see what happens
                obj: result
            });
        });

    });
});

module.exports = router;