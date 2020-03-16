const Event = require("../models/Event");

module.exports = {
  async store(req, res) {
    const { title, date, coordinate } = JSON.parse(req.body.information);
    const { filename: imageURL } = req.file;
    const { id: creator } = req.headers;

    if (!title || !date || !imageURL || !coordinate) {
      let message = "";
      if (!title) message = "missing title";
      if (!date) message = "missing date";
      if (!imageURL) message = "imageURL missing";
      if (!coordinate) messsage = "coordinate missing";
      return res.status(400).json({ error: `${message}` });
    }

    try {
      if (await Event.findOne({ title, date })) {
        return res.status(400).json({ error: "Event already exists" });
      }

      const event = await Event.create({
        title,
        date,
        imageURL,
        coordinate,
        creator
      });

      return res.json(event);
    } catch (error) {
      return res.status(400).json({ error: "Event addition failed" });
    }
  },
  async getEvents(req, res) {
    let events;
    if (req.headers.id) {
      const { id: creator } = req.headers;
      events = await Event.find({ creator });
    } else {
      events = await Event.find();
    }
    return res.json(events);
  },
  async updateCoordinate(req, res) {
    const { coordinate } = req.body;
    const { eventId } = req.params;

    const event = await Event.updateOne({ _id: eventId }, { coordinate });

    return res.json(event);
  },
  async deleteEvent(req, res) {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);

    await event.remove();

    return res.json({ ok: true });
  }
};
