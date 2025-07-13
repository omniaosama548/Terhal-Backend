import express from 'express';
import { getAllEvents,getEventById,createEvent,updateEvent,deleteEvent, getLimitEarlyActiveEvents } from '../controllers/EventController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { createEventValidation, updateEventValidation } from '../validations/eventValidation.js';
import { validateInput } from '../middlewares/validateInput.js';
import { isAdmin } from '../middlewares/isAdmin.js';
const eventRouter=express.Router();

eventRouter.get('/eventsinHome', getLimitEarlyActiveEvents); // non logedin
eventRouter.use(authMiddleware);
eventRouter.get('/',getAllEvents);  
eventRouter.get('/:id',getEventById);
//admin routs user not allowed here will be updated
eventRouter.post('/',createEventValidation,validateInput,isAdmin,createEvent);
eventRouter.put('/:id',updateEventValidation,validateInput,isAdmin,updateEvent);
eventRouter.delete('/:id',isAdmin,deleteEvent);
export default eventRouter;