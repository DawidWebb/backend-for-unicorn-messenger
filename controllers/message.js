const Message = require("../models/message");

// get all orders from DB
exports.getMessages = (request, response, next) => {
  try {
    const findMessages = Message.find();
    findMessages.exec((err, data) => {
      response.status(200).json(data);
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie GET w endpointcie /messages",
    });
  }
};

// get one order from DB by search
exports.getMessage = (request, response, next) => {
  try {
    const value = request.params.value;

    const findMessage = Message.find({
      messageNo: new RegExp(value, "i"),
    });
    findMessage.exec((err, data) => {
      if (data.length === 0 || data === null) {
        response.status(404).json({
          message: "Nie ma takiej wiadomości",
        });
        return;
      }
      response.status(200).json(data);
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie GET w endpointcie /message/search",
    });
  }
};

// // add client to DB from addClientFrom
exports.postMessage = (request, response, next) => {
  try {
    const body = request.body;

    const newMessage = new Message(body);

    newMessage.save((err, data) => {
      if (err) {
        console.log(body, err);
        return;
      }
      response.status(201).json(data);
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie POST w endpointcie /message/add",
    });
  }
};

// edit and change data of order
exports.putMessage = (request, response, next) => {
  try {
    const { exchange, invoice, client, invoiceNo, id } = request.body;

    const update = {
      invoiceNo,
      exchange,
      invoice,
      client,
    };
    const filter = id;

    Message.findByIdAndUpdate(filter, update, { new: true }, (err, data) => {
      if (err) {
        response.status(404).json({
          message: "coś poszło nie tak przy Message Update",
        });
        return;
      }
      response.status(202).json({
        data,
      });
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie PUT w endpointcie / message",
    });
  }
};

// delete one order by _id
exports.deleteMessage = (request, response, next) => {
  try {
    Message.findByIdAndDelete(request.params.id, (err) => {
      if (err) {
        response.status(404).json({
          message: "Nie znaleziono wiadomości",
        });
        return;
      }
      response.status(200).end();
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie DELETE w endpointcie /message/:id",
    });
  }
};
