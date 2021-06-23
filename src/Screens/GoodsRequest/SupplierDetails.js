import React,{useCallback, useEffect, useReducer,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import SimpleCheckBox from '../../Plugin/SimpleCheckBox';
import {action_GET_selecteditemforsuppliers} from '../../Services/Actions/Inventory_Actions'
const SupplierDetails =()=> {


      const [checkedItems, setCheckedItems] = useState({});
      const [supplierprice, setsupplierprice] = useState(0);

      const handleChange =useCallback(async(event)=> { 
        setCheckedItems({
          ...checkedItems,[event.target.name]:event.target.checked,[event.target.name]:event.target.value
        });
        setsupplierprice(event.target.value)
    },[checkedItems]);

    console.log("checkedItems: ", checkedItems);
      const dispatch=useDispatch();
      const requestinfo = useSelector(
        (state) => state.Inventory_Reducers.requestinfo
      );
      const getitemforsuppliers = useSelector(
        (state) => state.Inventory_Reducers.getitemforsuppliers
      );
      useEffect(() => {
          let mounted=true;
          const getselecteditemforsuppliers=()=>{
                if (mounted){
                   
                        if(requestinfo?.data?.prno !== undefined){
                            dispatch(action_GET_selecteditemforsuppliers(requestinfo?.data?.prno))
                        }
                      }
                }
  
          mounted && getselecteditemforsuppliers();
          return () => {
              mounted=false
          }
      }, [dispatch, requestinfo?.data?.prno])
    return (
        <div>
        {getitemforsuppliers?.data.map((item,index)=>(
         <label key={item.index}>
                <SimpleCheckBox
         name={item.stockdesc}
            checked={checkedItems[item.stockdesc]}
            onChange={handleChange}
            price={supplierprice[item.stockdesc]}
    />
         {item.stockdesc}
     
        </label>
        ))}
    
        </div>
    )
}
export default SupplierDetails;
