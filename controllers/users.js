const Login = require("../models/login");

// Dodanie do bazy - opcjonalne
// const login = "bb";
// const password = "2";
// new Login({ login, password }).save();

let usersData;

const getData = (req, res, next) => {
  Login.find({}, (err, data) => {
    usersData = data;
  });
};
getData();

exports.postUser = (request, response, next) => {
  const { login, password } = request.body;
  try {
    const user = usersData.find((user) => user.login === login);
    if (!user) {
      response.status(404).json({
        message: "Użytkownik o podanym loginie nie istnieje",
      });

      return;
    }

    const pass = usersData.find((pass) => pass.password === password);
    if (!pass) {
      response.status(401).json({
        message: "Hasło lub login się nie zgadza",
      });

      return;
    }

    response.status(200).json({
      user,
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie POST w endpointcie /users",
    });
  }
};
