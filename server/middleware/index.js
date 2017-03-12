/**
 * Created by Uncle Charlie, 2017/03/01
 */

import bodyParser from 'body-parser';
import passport from 'passport';
import express from 'express';
import session from 'express-session';
import apiRoutes from '../controllers';
import frontendRoutes from '../routes/frontend';


export default function setupMiddleware(apiApp, adminApp) {

  // apiApp.set('view engine', 'ejs');

  apiApp.use(bodyParser.json())
  apiApp.use(bodyParser.urlencoded({
    extended: true
  }));

  apiApp.use(session({
    secret: 'a4f8071f-4447-c873-8ee2',
    saveUninitialized: true,
    resave: true
  }));

  apiApp.use(apiRoutes.apiBaseUri, apiRoutes.api({}));

  // TODO: add adminApp's middlewares later
  if (!adminApp) {
    console.log('admin app is not ready for config middleware')
    return
  }

  adminApp.use('/', frontendRoutes());

  apiApp.use('/admin', adminApp);
}