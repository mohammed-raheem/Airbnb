const URL = "https://airbnb-iq.herokuapp.com/v1";

export const register = (data, callback) => {
  fetch(`${URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then((result) => callback(null, result))
    .catch((err) => callback(err, null));
};
