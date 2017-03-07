/**
 * Routes here. 
 * This is where HTTP request and related handler a combined together.
 */

import express from 'express';

import api from './api';

import petController from './pet';
import petApi from './pets';
import userController from './user';
import authController from './auth';
import clientController from './client';
import oauth2Controller from './oauth2';

var apiRoutes = function (middleware) {
    var router = express.Router();

    // router.get('/', function (req, res) {
    //     res.json({'message': '欢迎来到宠物商店'});
    // });

    router.route('/pets')
        .post(authController.isAuthenticated, petController.postPets)
        .get(authController.isAuthenticated, api.http(petApi.browse));

    router.route('/pets/:pet_id')
        .get(authController.isAuthenticated, petController.getPet)
        .put(authController.isAuthenticated, petController.updatePet)
        .delete(authController.isAuthenticated, petController.deletePet);

    router.route('/pets/full/:pet_id')
        .get(authController.isAuthenticated, petController.getFullPets);

    // path: /users, for users
    router.route('/users')
        .post(userController.postUsers)
        .get(authController.isAuthenticated, userController.getUsers);

    // 处理 /clients
    router.route('/clients')
        .post(authController.isAuthenticated, clientController.postClients)
        .get(authController.isAuthenticated, clientController.getClients);

    router.route('/oauth2/authorize')
        .post(authController.isAuthenticated, oauth2Controller.decision)
        .get(authController.isAuthenticated, oauth2Controller.authorization);

    router.route('/oauth2/token')
        .post(authController.isClientAuthenticated, oauth2Controller.token);

    return router;
};

export default {
    apiBaseUri: '/api/v1/',
    api: apiRoutes
};