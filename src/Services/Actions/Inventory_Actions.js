import { GET_SUPPLIERS, SET_GLOBAL_SNACKBAR } from "../Types/Default_Types";
import {
  SET_INVENTORY_TABLE_BYSTATUS,
  REQUEST_SUCCESS,
  SET_INVENTORY_TABLE,
  GET_INVENTORY_DEPARTMENT,
  SET_OFFICE,
  SET_OPEN_MODAL,
  GET_NON_INVENTORY,
  SET_SELECTED_ITEM,
  SET_OPEN_QTYMODAL,
  SET_OPEN_ADDITEMMODAL,
  SET_REQ_HEADER,
  SET_REQ_DTLS,
  GET_REQUEST_INFO,
  GET_SINGLEREQUEST_HEADER,
  GET_SINGLEREQUEST_DETAILS,
  SET_REQ_FOOTER,
  GET_DASHBOARD_NUMBERS,
  SET_STATUS_FOR_TABLE,
  SET_SEARCH_FOR_TABLE,
  SET_INVENTORY_ITEM_ACTIVE,
  SET_INVENTORY_SEARCH_ITEM,
  SET_BASE64TO_PDF,
  SET_BACKDROP_OPEN,
  SET_SECTIONS,
  SET_ADD_NEW_ITEM,
  SET_OPEN_SUPPLIER_MODAL,
  SET_SELECTED_SUPPLIERS,
  GET_SELECTED_SUPPLIERS,
  GET_SELECTED_SUPPLIERS_ITEMS,
  SET_OPEN_ITEM_FOR_SUPPLIER_MODAL,
} from "../Types/Inventory_Types";

const auth = window.localStorage.getItem("inventory_token");
const bearer_token = auth;
const bearer = "Bearer " + bearer_token;
export const action_GET_listofrequest_by_status =
  (todept, status) => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/inventory/getlistofrequestbystatus`;
    await fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: todept,
        status: status,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: SET_INVENTORY_TABLE_BYSTATUS,
          payload: { data: res.data, loading: true },
        });
        console.log(res);
      });
  };
export const action_GET_listofrequestsearched =
  (todept, status, date) => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/inventory/getlistofrequestsearched`;
    await fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dept: todept,
        status: status,
        date: date,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: SET_INVENTORY_TABLE,
          payload: { data: res.data, loading: res.success },
        });
      });
  };
export const action_GET_listofrequest = (todept) => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/inventory/getlistofrequest`;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: todept,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: SET_INVENTORY_TABLE,
        payload: { data: res.data, loading: res.success },
      });
    });
};
export const action_GET_listofdepartment = () => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/inventory/getdepartmentList`;
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
        type: GET_INVENTORY_DEPARTMENT,
        payload: { data: res.data, loading: true },
      });
    });
};
export const action_GET_listofsections = (deptcode) => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/inventory/getsectionlist`;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body:JSON.stringify({
      value:deptcode
    })
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: SET_SECTIONS,
        payload: { data: res.data, loading: true },
      });
    });
};
export const action_GET_selectedsuppliers =
  (prno) => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/inventory/getprsuppliers`;
    await fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: prno,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: SET_SELECTED_SUPPLIERS,
          payload: { data: res.data, loading: true },
        });
      });
  };
export const action_GET_selecteditemforsuppliers =
  (prno) => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/inventory/getitemforsuppliers`;
    await fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: prno,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: GET_SELECTED_SUPPLIERS_ITEMS,
          payload: { data: res.data, loading: true },
        });
      });
  };
export const action_GET_noninventoryitem =
  (active, stockdesc) => async (dispatch) => {
    console.log(stockdesc);
    var url = `${process.env.REACT_APP_BASE_URL}api/inventory/getinventoryitem`;
    await fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        active: active,
        stockdesc: stockdesc,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: GET_NON_INVENTORY,
          payload: { data: res.data, loading: true },
        });
      });
  };
export const action_GET_InsertNewRequest =
  (deptcode, reqby, reqremarks, requestdetails,selectedsuppliers) => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/inventory/InsertNewRequest`;
    await fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deptcode: deptcode,
        reqby: reqby,
        reqremarks: reqremarks,
        lisrequesttdtls: requestdetails,
        lisrequesttsuppliers: selectedsuppliers,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: REQUEST_SUCCESS,
          payload: { message: res.message, loading: res.success },
        });
        console.log(res);
      });
  };
export const action_GET_InsertNewRequestWithoutSupplier =
  (deptcode, reqby, reqremarks, requestdetails) => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/inventory/InsertNewRequestWithoutSupplier`;
    await fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deptcode: deptcode,
        reqby: reqby,
        reqremarks: reqremarks,
        lisrequesttdtls: requestdetails,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: REQUEST_SUCCESS,
          payload: { message: res.message, loading: res.success },
        });
        console.log(res);
      });
  };
export const action_GET_InsertSupplier =
  (prno,selectedsuppliers) => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/inventory/InsertSupplier`;
    await fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prno:prno,
        lisrequesttsuppliers: selectedsuppliers,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: REQUEST_SUCCESS,
          payload: { message: res.message, loading: res.success },
        });
        console.log(res);
      });
  };
export const action_GET_getsinglerequestheader =
  (reqno) => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/inventory/getsinglerequestheader`;
    await fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reqno: reqno,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: GET_SINGLEREQUEST_HEADER,
          payload: { data: res.data, loading: true },
        });
      });
  };
export const action_GET_getsinglerequestdetails =
  (reqno) => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/inventory/getsinglerequestdtls`;
    await fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reqno: reqno,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: GET_SINGLEREQUEST_DETAILS,
          payload: { data: res.data, loading: res.success },
        });
      });
  };

export const action_SET_updaterequestApproved =
  (reqno, apprbycode, apprbyname) => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/inventory/updaterequestApproved`;
    await fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reqno: reqno,
        apprbycode: apprbycode,
        apprbyname: apprbyname,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: REQUEST_SUCCESS,
          payload: { message: res.message, loading: true },
        });
        console.log(res);
      });
  };

export const action_SET_updaterequestCancelled =
  (reqno, cancelledbycode, cancelledbyname) => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/inventory/updaterequestCancelled`;
    await fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reqno: reqno,
        cancelledbycode: cancelledbycode,
        cancelledbyname: cancelledbyname,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: REQUEST_SUCCESS,
          payload: { message: res.message, loading: true },
        });
        console.log(res);
      });
  };

export const action_GET_suppliers = (id) => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/inventory/getsupplier`;
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
        payload: { data: res.data, loading: true },
      });
    });
};
export const action_GET_dashboardnumber = (id) => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/inventory/dashboardnumbers`;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: GET_DASHBOARD_NUMBERS,
        payload: { data: res.data, loading: true },
      });
    });
};

export const action_set_notification =
  (open, message, type, from, to) => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/inventory/notification`;
    await fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        notification: message,
        from: from,
        to: to,
        type: type,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: SET_GLOBAL_SNACKBAR,
          payload: { open: open, message: message, type: type },
        });
        console.log(res);
      });
  };
let generateFile = (content) => {
  const pdfContentType = "application/pdf";
  const base64WithoutPrefix = content.substr(
    `data:${pdfContentType};base64,`.length
  );
  const bytes = atob(base64WithoutPrefix);
  let length = bytes.length;
  let out = new Uint8Array(length);

  while (length--) {
    out[length] = bytes.charCodeAt(length);
  }

  return new Blob([out], { type: "application/pdf" });
  // const link = document.createElement("a");
  // link.href = window.URL.createObjectURL(blob);
  // link.download = fileName;
  // link.click();
};
const base64topdf = (base64url, fileName) => {
  const pdfContentType = "application/pdf";
  const link = document.createElement("a");
  link.href = `data:${pdfContentType};base64,${base64url}`;
  link.download = fileName;
  link.click();
};
export const action_generate_report = (prno) => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/inventory/getPRPdf`;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      value: prno,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: SET_BASE64TO_PDF,
        payload: { base64topdf: res.data, openbackdrop: false },
      });
      base64topdf(res.data, prno);
    });
};

export const action_set_open_backdrop = (message,open) => async (dispatch) => {
  dispatch({
    type: SET_BACKDROP_OPEN,
    payload: {message:message, openbackdrop: open },
  });
  console.log(open);
};
export const action_set_search_stockdesc = (stockdesc) => async (dispatch) => {
  dispatch({
    type: SET_INVENTORY_SEARCH_ITEM,
    payload: { stockdesc: stockdesc },
  });
};

export const action_set_item_active = (active) => async (dispatch) => {
  dispatch({
    type: SET_INVENTORY_ITEM_ACTIVE,
    payload: { active: active },
  });
};
export const action_set_search = (status, date, open) => async (dispatch) => {
  dispatch({
    type: SET_SEARCH_FOR_TABLE,
    payload: { status: status, date: date, open: open },
  });
};
export const action_get_request_info = (row) => async (dispatch) => {
  dispatch({
    type: GET_REQUEST_INFO,
    payload: { data: row, loading: true },
  });
};
export const action_close_success_modal = () => async (dispatch) => {
  dispatch({
    type: REQUEST_SUCCESS,
    payload: { message: "", loading: false },
  });
};

export const action_set_office = (office) => async (dispatch) => {
  dispatch({
    type: SET_OFFICE,
    payload: office,
  });
};
export const action_set_itemforsupplieropenmodal = (open) => async (dispatch) => {
  dispatch({
    type: SET_OPEN_ITEM_FOR_SUPPLIER_MODAL,
    payload: open,
  });
};
export const action_set_openmodal = (open) => async (dispatch) => {
  dispatch({
    type: SET_OPEN_MODAL,
    payload: open,
  });
};
export const action_set_addselectedsuppliers = (suppliers) => async (dispatch) => {
  dispatch({
    type: SET_SELECTED_SUPPLIERS,
    payload: {data:suppliers,loading:true},
  });
};
export const action_set_addnewsupplieropenmodal = (open) => async (dispatch) => {
  dispatch({
    type: SET_OPEN_SUPPLIER_MODAL,
    payload: open,
  });
};
export const action_set_addnewitemopenmodal = (open) => async (dispatch) => {
  dispatch({
    type: SET_OPEN_ADDITEMMODAL,
    payload: open,
  });
};
export const action_set_addnewitem = (stockdesc,averagecost,unit,qty,remarks) => async (dispatch) => {
  dispatch({
    type: SET_ADD_NEW_ITEM,
    payload: {stockdesc:stockdesc,averagecost:averagecost,unit:unit,qty:qty,remarks:remarks},
  });
};
export const action_set_qtyopenmodal = (open) => async (dispatch) => {
  dispatch({
    type: SET_OPEN_QTYMODAL,
    payload: open,
  });
};
export const action_set_status = (status) => async (dispatch) => {
  dispatch({
    type: SET_STATUS_FOR_TABLE,
    payload: status,
  });
};
export const action_set_selected_item = (selected) => async (dispatch) => {
  dispatch({
    type: SET_SELECTED_ITEM,
    payload: selected,
  });
  console.log(selected);
};
export const action_set_requestedheader = (header) => async (dispatch) => {
  dispatch({
    type: SET_REQ_HEADER,
    payload: header,
  });
};
export const action_set_requestedfooter = (reqremarks) => async (dispatch) => {
  dispatch({
    type: SET_REQ_FOOTER,
    payload: reqremarks,
  });
};
export const action_set_requesteddtls = (dtls) => async (dispatch) => {
  dispatch({
    type: SET_REQ_DTLS,
    payload: dtls,
  });
};
