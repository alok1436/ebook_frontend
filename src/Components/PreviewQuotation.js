import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import AsyncSelect from 'react-select/async'
import { doPost, doGet, doDelete } from "../actions/common";

const PreViewQuotation = (props) => {
  //("Login");
  const form = useRef();
  const dispatch = useDispatch();
  const [customers, setCustomer] = useState([]);
  const [maincustomer, setMainCustomer] = useState(null);
  const [shipcustomer, setShipCustomer] = useState(null);
  const [billcustomer, setBillCustomer] = useState(null);

  const [items, setItems] = useState(props.items);

  const getCustomer = (inputValue) => {
    dispatch(doGet("user/customerpage/?search="+inputValue))
      .then((response) => {
        console.log(response);
        const customersData = response.data.map((customer) => ({
          label: customer.name,
          value: customer.name,
          data: customer
        }));
        setCustomer(customersData);
      //   successToast("Loaded successfully")
      })
      .catch((message) => {
        
      });
  };

  const onchangeMainCustomer = (input) =>{
    setMainCustomer(input.data)
    setBillCustomer(input.data)
    setShipCustomer(input.data)
  }
  
  const onchangeBillCustomer = (input) =>{
    setBillCustomer(input.data)
  }

  const onchangeShipCustomer = (input) =>{
    setShipCustomer(input.data)
  }

  const loadOptions = (inputValue, callback) => {
    // perform a request
    getCustomer(inputValue);
    const requestResults =  customers;
    callback(requestResults)
  }
  
  const onchangeSearchStock = (input) =>{
    const itemRow = {item:'', description:'',rate:'', quantity:'',price:'',};
    setItems(items => [...items,itemRow] );
  }

  const getTotal = () =>{
    let total =0;
    props.items.map((item, index) => {
      total +=parseFloat(item.price);
    });
    return total.toFixed(2);
  }

  const deleteItem = (index) => {
   
      var array = [...items]; // make a separate copy of the array
      array.splice(index, 1);
      console.log(array);
      setItems(items => array);
  }

  
// const aquaticCreatures = [
//   { label: 'Shark', value: 'Shark' },
//   { label: 'Dolphin', value: 'Dolphin' },
//   { label: 'Whale', value: 'Whale' },
//   { label: 'Octopus', value: 'Octopus' },
//   { label: 'Crab', value: 'Crab' },
//   { label: 'Lobster', value: 'Lobster' },
// ];

    return (
         
        <div>
        <div class="card">
          {/* <div class="card-header"> Invoice <strong>01/01/01/2018</strong>
            <span class="float-right">
              <strong>Status:</strong> Pending </span>
          </div> */}
          <div class="card-body">
            <div class="row mb-4">
              <div class="col-sm-6">
                <h6 class="mb-3">Bill Customer:</h6>
                <div>
                  <strong>{props.billCustomer ? props.billCustomer.name: ''}</strong>
                </div>
                <div>{props.billCustomer ? props.billCustomer.email: ''}</div>
                <div>{props.billCustomer ? props.billCustomer.phone_number: ''}</div>
              </div>
              <div class="col-sm-6">
                <h6 class="mb-3">Ship Customer:</h6>
                <div>
                <strong>{props.shipCustomer ? props.shipCustomer.name: ''}</strong>
                </div>
                <div>{props.shipCustomer ? props.shipCustomer.email: ''}</div>
                <div>{props.shipCustomer ? props.shipCustomer.phone_number: ''}</div>
              </div>
            </div>
            <div class="table-responsive-sm">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Description</th>
                    <th class="right">Rate</th>
                    <th class="center">Qty</th>
                    <th class="right">Price</th>
                  </tr>
                </thead>
                <tbody>
                {props.items  ? props.items.map((item, index) => (
                  <tr>
                    <td class="center">{item.item}</td>
                    <td class="left strong">{item.description}</td>
                    <td class="left">{item.rate}</td>
                    <td class="right">{item.quantity}</td>
                    <td class="center">{item.price}</td>
                  </tr>
                )) : ""}
                </tbody>
              </table>
            </div>
            <div class="row">
              <div class="col-lg-4 col-sm-5"></div>
              <div class="col-lg-4 col-sm-5 ml-auto">
                <table class="table table-clear">
                  <tbody>
                    <tr>
                      <td class="left">
                        <strong>Subtotal</strong>
                      </td>
                      <td class="right">{getTotal()}</td>
                    </tr>
                    <tr>
                      <td class="left">
                        <strong>Discount</strong>
                      </td>
                      <td class="right">0.00</td>
                    </tr>
                    <tr>
                      <td class="left">
                        <strong>VAT</strong>
                      </td>
                      <td class="right">0.00</td>
                    </tr>
                    <tr>
                      <td class="left">
                        <strong>Total</strong>
                      </td>
                      <td class="right">
                        <strong>{getTotal()}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default PreViewQuotation;
