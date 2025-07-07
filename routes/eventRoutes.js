import express from 'express';
import { getAllEvents,getEventById,createEvent,updateEvent,deleteEvent } from '../controllers/EventController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { createEventValidation, updateEventValidation } from '../validations/eventValidation.js';
import { validateInput } from '../middlewares/validateInput.js';
const eventRouter=express.Router();

eventRouter.use(authMiddleware);
eventRouter.get('/',getAllEvents);
eventRouter.get('/:id',getEventById);
//admin routs user not allowed here will be updated
eventRouter.post('/',createEventValidation,validateInput,createEvent);
eventRouter.put('/:id',updateEventValidation,validateInput,updateEvent);
eventRouter.delete('/:id',deleteEvent);
export default eventRouter;