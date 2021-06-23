import { GET_SUPPLIERS } from "../Types/Default_Types";
import {
  SET_INVENTORY_ITEM_ACTIVE,
  SET_SEARCH_FOR_TABLE,
  SET_STATUS_FOR_TABLE,
  SET_INVENTORY_TABLE_BYSTATUS,
  GET_DASHBOARD_NUMBERS,
  SET_REQ_FOOTER,
  GET_SINGLEREQUEST_HEADER,
  GET_SINGLEREQUEST_DETAILS,
  GET_REQUEST_INFO,
  REQUEST_SUCCESS,
  SET_INVENTORY_TABLE,
  GET_INVENTORY_DEPARTMENT,
  SET_OFFICE,
  SET_OPEN_MODAL,
  GET_NON_INVENTORY,
  SET_SELECTED_ITEM,
  SET_OPEN_QTYMODAL,
  SET_OPEN_ADDITEMMODAL,
  SET_REQ_DTLS,
  SET_REQ_HEADER,
  SET_INVENTORY_SEARCH_ITEM,
  SET_BASE64TO_PDF,
  SET_BACKDROP_OPEN,
  SET_SECTIONS,
  SET_ADD_NEW_ITEM,
  SET_OPEN_SUPPLIER_MODAL,
  SET_SELECTED_SUPPLIERS,
  GET_SELECTED_SUPPLIERS,
  GET_SELECTED_SUPPLIERS_ITEMS,
  SET_OPEN_ITEM_FOR_SUPPLIER_MODAL
} from "../Types/Inventory_Types";

const data = {
  data: { data: [], loading: false },
  databydept: { data: [], loading: false },
  noninventory: { data: [], loading: false },
  department: { data: [], loading: false },
  office: "",
  isOpen: false,
  QtyOpen: false,
  AddItemOpen: false,
  AddNewSupplier: false,
  AddItemForSupplier: false,
  selected: [],
  requesteddtls: [],
  requestedheader: [],
  requestfooter: "",
  requestsuccess: { message: "", loading: false },
  requestinfo: { data: [], loading: false },
  singlerequestheader: { data: [], loading: false },
  singlerequestdetails: { data: [], loading: false },
  getdashboardnumbers: { data: [], loading: false },
  status: "",
  setsearchtable: { status: "", reqdate: "", apprdate: "", open: false },
  activeinventory: { active: "Y" },
  searchitem: { stockdesc: "" },
  base64topdf: { base64: "" },
  openbackdrop: { message:"",open: false },
  sectionlist:{data:[],loading:false},
  AddNewItem:{stockdesc:"",averagecost:"",unit:"",qty:"",remarks:""},
  suppliers:{data:[],loading:false},
  selectedsuppliers:{data:[],loading:false},
  geselectedsuppliers:{data:[],loading:false},
  getitemforsuppliers:{data:[],loading:false}
};
const Inventory_Reducers = (data_state = data, actions) => {
  switch (actions.type) {
    case GET_SELECTED_SUPPLIERS_ITEMS:
      return { ...data_state, getitemforsuppliers: actions.payload };
    case GET_SELECTED_SUPPLIERS:
      return { ...data_state, geselectedsuppliers: actions.payload };
    case SET_SELECTED_SUPPLIERS:
      return { ...data_state, selectedsuppliers: actions.payload };
    case SET_OPEN_ITEM_FOR_SUPPLIER_MODAL:
      return { ...data_state, AddItemForSupplier: actions.payload };
    case SET_OPEN_SUPPLIER_MODAL:
      return { ...data_state, AddNewSupplier: actions.payload };
    case GET_SUPPLIERS:
      return { ...data_state, suppliers: actions.payload };
    case SET_ADD_NEW_ITEM:
      return { ...data_state, AddNewItem: actions.payload };
    case SET_OPEN_ADDITEMMODAL:
      return { ...data_state, AddItemOpen: actions.payload };
    case SET_SECTIONS:
      return { ...data_state, sectionlist: actions.payload };
    case SET_BACKDROP_OPEN:
      return { ...data_state, openbackdrop: actions.payload };
    case SET_BASE64TO_PDF:
      return { ...data_state, base64topdf: actions.payload };
    case SET_INVENTORY_SEARCH_ITEM:
      return { ...data_state, searchitem: actions.payload };
    case SET_INVENTORY_ITEM_ACTIVE:
      return { ...data_state, activeinventory: actions.payload };
    case SET_SEARCH_FOR_TABLE:
      return { ...data_state, setsearchtable: actions.payload };
    case SET_STATUS_FOR_TABLE:
      return { ...data_state, status: actions.payload };
    case SET_INVENTORY_TABLE_BYSTATUS:
      return { ...data_state, databydept: actions.payload };
    case GET_DASHBOARD_NUMBERS:
      return { ...data_state, getdashboardnumbers: actions.payload };
    case SET_REQ_FOOTER:
      return { ...data_state, requestfooter: actions.payload };
    case GET_SINGLEREQUEST_HEADER:
      return { ...data_state, singlerequestheader: actions.payload };
    case GET_SINGLEREQUEST_DETAILS:
      return { ...data_state, singlerequestdetails: actions.payload };
    case GET_REQUEST_INFO:
      return { ...data_state, requestinfo: actions.payload };
    case REQUEST_SUCCESS:
      return { ...data_state, requestsuccess: actions.payload };
    case SET_REQ_HEADER:
      return { ...data_state, requestedheader: actions.payload };
    case SET_REQ_DTLS:
      return { ...data_state, requesteddtls: actions.payload };
    case SET_SELECTED_ITEM:
      return { ...data_state, selected: actions.payload };
    case SET_INVENTORY_TABLE:
      return { ...data_state, data: actions.payload };
    case GET_INVENTORY_DEPARTMENT:
      return { ...data_state, department: actions.payload };
    case GET_NON_INVENTORY:
      return { ...data_state, noninventory: actions.payload };
    case SET_OFFICE:
      return { ...data_state, office: actions.payload };
    case SET_OPEN_MODAL:
      return { ...data_state, isOpen: actions.payload };
    case SET_OPEN_QTYMODAL:
      return { ...data_state, QtyOpen: actions.payload };
    default:
      return data_state;
  }
};
export default Inventory_Reducers;
