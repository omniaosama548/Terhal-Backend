
import Event from "../models/Event.js";
export const getEarlyActiveEvents = async () => {
  try {
    const events = await Event.find({
      status: { $in: ['active', 'upcoming'] },
    })
      .sort({ createdAt: -1 }) ; // the newly added  first

    const total = await Event.countDocuments({
      status: { $in: ['active', 'upcoming'] },
    });

    return  events;
  } catch (error) {
    return { message: error.message };
  }
};
export const getEarlyEvents = async (query) => {
    try {
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 3;
        const skip = (page - 1) * limit;

        const events = await Event.find()
            .sort({ createdAt: -1 }) // earliest events first
            .skip(skip)
            .limit(limit);

        const total = await Event.countDocuments();

        return ({
            page,
            totalPages: Math.ceil(total / limit),
            totalEvents: total,
            events
        });
    } catch (error) {
        return ({ "message": error.message });
    }
}

export const getEvent = async (id) => {
    try {
        if (!id) {
            return { message: "Invalid event ID" };
        }

        const event = await Event.findOne({ _id: id });

        return event;
    } catch (error) {
        return { message: error.message };
    }
};

export const addEvent = async (eventData) => {
    try {
        const event = new Event(eventData);
        await event.save();
        return event;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const editEvent = async (id, updatedData) => {
    try {
        console.log("im in service");

        const event = await Event.findByIdAndUpdate(id, updatedData, { new: true });
        console.log(event, "from service");

        return event;
    } catch (error) {
        throw new Error(error.message);
    }
};


export const removeEvent = async (id) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(id);
        return deletedEvent;
    } catch (error) {
        throw new Error(error.message);
    }
};