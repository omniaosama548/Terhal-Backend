import { getEarlyEvents, getEvent, addEvent, editEvent, removeEvent, getEarlyActiveEvents } from "../services/eventService.js";
export const getLimitEarlyActiveEvents = async (req, res) => {
    //no need for login
    try {
        const events = await getEarlyActiveEvents(req.query);
        res.status(200).json(events);
    } catch (error) {
        res.status(400).json({ "message": error.message });
    }
}
export const getAllEvents = async (req, res) => {
    try {
        // if the user is logedin
        const userId = req.user.id;
        console.log("im in the controller");

        const events = userId ? await getEarlyEvents(req.query) : { "message": "You need to login first" };
        res.status(200).json(events);
    } catch (error) {
        res.status(400).json({ "message": error.message });
    }
}

export const getEventById = async (req, res) => {
    try {
        const userId = req.user?.id;
        const eventId = req.params.id;

        if (!userId) {
            return res.status(401).json({ message: "You need to login first" });
        }

        if (!eventId) {
            return res.status(400).json({ message: "Event ID is required" });
        }

        const event = await getEvent(eventId);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createEvent = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "You need to login first" });
        }

        const eventData = req.body;
        const event = await addEvent({ ...eventData, createdBy: userId }); // add createdBy if needed

        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateEvent = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "You need to login first" });
        }

        const eventId = req.params.id;
        const updatedData = req.body;
        // console.log("im in controller" ,updatedData);

        const updatedEvent = await editEvent(eventId, updatedData);
        console.log("updatedEvent");

        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "You need to login first" });
        }

        const eventId = req.params.id;
        const deletedEvent = await removeEvent(eventId);

        if (!deletedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json({ message: "Event deleted successfully", event: deletedEvent });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};