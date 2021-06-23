import { SET_DATA } from "../Types/Login_Types";

export const action_Login_user = (username, password) => async () => {
  var url = `${process.env.REACT_APP_BASE_URL}api/user/login`;
  const fetchdata = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: new URLSearchParams({
      // grant_type: "password",
      username: username,
      password: password,
    }),
  });
  const parseData = await fetchdata.json();
  if (parseData.success !== false) {
    localStorage.setItem("username", username);
    localStorage.setItem("inventory_token", parseData.access_token);
    localStorage.setItem("refreshtoken", parseData.refresh_token);
    window.location.href = "/Dashboard";
    console.log(parseData);
  } else {
    alert("Wrong Username/Password");
  }
};
