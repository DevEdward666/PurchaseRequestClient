import {
  SET_INCHARGE,
  SET_LOGO,
  SET_NAME,
  SET_USER_INFO,
  SET_MOP,
  GET_SUPPLIERS,
  GET_DEFAULTS,
  SIGNALR_CONNECT_NOTIFY,
  SET_SNACKBAR,
  SET_GLOBAL_SNACKBAR,
  GET_NOTIFICATION_LIST,
  GET_NOTIFICATION_LIST_BYDEPT,
  SET_USER_PERMISSION,
  SET_PERMISSIONS,
  SET_USER_PERMISSION_CANCEL,
} from "../Types/Default_Types";
import * as signalR from "@microsoft/signalr";
const auth = window.localStorage.getItem("tokenizer");
const bearer_token = auth;
const bearer = "Bearer " + bearer_token;
export const action_GET_defaultname = () => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/company/company-name`;
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: SET_NAME,
        payload: res.data,
      });
    });
};
export const action_GET_defaultlogo = () => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/company/company-logo`;
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: SET_LOGO,
        payload: res.data,
      });
    });
};
export const action_GET_getuserinfo = (username) => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/user/getUserInfo`;
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: SET_USER_INFO,
        payload: res.data,
      });
    });
};
export const action_GET_getUserPermission = (username) => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/user/getUserPerrmission`;
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: SET_USER_PERMISSION,
        payload: res.data,
      });
    });
};
export const action_GET_getUserPermission_Cancel =
  (username) => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/user/getUserPerrmissionCancel`;
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: SET_USER_PERMISSION_CANCEL,
          payload: res.data,
        });
      });
  };

export const action_GET_incharge = () => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/default/getincharge`;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: SET_INCHARGE,
        payload: res.data,
      });
    });
};
export const action_GET_mop = () => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/default/getmop`;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: SET_MOP,
        payload: res.data,
      });
    });
};

export const action_GET_suppliers = () => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/default/getsuppliers`;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: GET_SUPPLIERS,
        payload: res.data,
      });
    });
};

export const action_GET_GetDefaults = () => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/company/GetDefaults`;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: GET_DEFAULTS,
        payload: res.data,
      });
    });
};
export const action_GET_noticationsby_dept =
  (dept, offset) => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/default/getnotications`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dept: dept,
        offset: offset,
      }),
    })
      .then((response) => response.json())
      .then(async (res) => {
        dispatch({
          type: GET_NOTIFICATION_LIST_BYDEPT,
          payload: { data: res.data, loading: res.success },
        });
      });
  };
export const action_GET_notications =
  (title, prio, offset) => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/default/getnoticationsAdmin`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        priority: prio,
        offset: offset,
      }),
    })
      .then((response) => response.json())
      .then(async (res) => {
        dispatch({
          type: GET_NOTIFICATION_LIST,
          payload: { data: res.data, loading: res.success },
        });
      });
  };
export const action_INSERT_notications =
  (title, body, priority, audience, created_by) => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/default/insertNotifications`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        body: body,
        priority: priority,
        audience: audience,
        created_by: created_by,
      }),
    })
      .then((response) => response.json())
      .then((res) => {});
  };

export const signalr_connection_notify = () => async (dispatch) => {
  const hubConnect = new signalR.HubConnectionBuilder()
    .withUrl(`${process.env.REACT_APP_BASE_URL}api/notif/notify`, {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets,
    })

    .build();
  hubConnect.start();
  dispatch({ type: SIGNALR_CONNECT_NOTIFY, payload: hubConnect });
};

export const set_global_sncakbar =
  (open, message, type) => async (dispatch) => {
    dispatch({
      type: SET_GLOBAL_SNACKBAR,
      payload: { open: open, message: message, type: type },
    });
  };

export const set_sncakbar = (open, message, type) => async (dispatch) => {
  dispatch({
    type: SET_SNACKBAR,
    payload: { open: open, message: message, type: type },
  });
};

export const set_permissions = (approve, cancel) => async (dispatch) => {
  dispatch({
    type: SET_PERMISSIONS,
    payload: { approve: approve, cancel: cancel },
  });
};
