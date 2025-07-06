import express from 'express';
import { getAllEvents,getEventById,createEvent,updateEvent,deleteEvent } from '../controllers/EventController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const eventRouter=express.Router();

eventRouter.use(authMiddleware);
eventRouter.get('/',getAllEvents);
eventRouter.get('/:id',getEventById);
eventRouter.post('/',createEvent);
eventRouter.put('/:id',updateEvent);
eventRouter.post('/:id',deleteEvent);
export default eventRouter;