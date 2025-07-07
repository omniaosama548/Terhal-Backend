import mongoose from "mongoose";
const EventSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: String,
        location: {
            type:String,
            required:true
        },
        address: {
            type:String,
            required:true
        },
        category: {
            type:String,
            required:true
        },
        coordinates: {
            type:String,
            required:true
        },
        startTime:{
            type:String,
            required:true
        },
        endTime:{
            type:String,
            required:true
        }
    }, {
    timestamps: true
}
);

const Event = mongoose.model("Event", EventSchema);
export default Event;