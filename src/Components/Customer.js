import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import AsyncSelect from 'react-select/async'
import { doPost, doGet, doDelete } from "../actions/common";
import PreViewQuotation from "./PreviewQuotation";
const Customer = (props) => {
  //("Login");
  const form = useRef();
  const dispatch = useDispatch();
  const [customers, setCustomer] = useState([]);
  const [stock, setStock] = useState([]);
  const [maincustomer, setMainCustomer] = useState(null);
  const [shipcustomer, setShipCustomer] = useState(null);
  const [billcustomer, setBillCustomer] = useState(null);

  const [items, setItems] = useState([
    // {
    //   item:'',
    //   description:'',
    //   rate:'',
    //   quantity:'',
    //   price:'',
    // }
  ]);

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

  const getStocks = (inputValue) => {
    dispatch(doGet("quotationapp/item_search/?search="+inputValue))
      .then((response) => {
        console.log(response);
        const stock = response.data.map((stock) => ({
          label: stock.name,
          value: stock.name,
          data: stock
        }));
        setStock(stock);
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
  const handleItemsInput = (e,index) =>{
      let value = e.target.value;
      let name = e.target.name;
      var array = [...items]; // make a separate copy of the array

      array[index][name] = value;
      let row = array[index];
     // array[index]['price'] = (row.price*row.quantity).toFixed(2)
      setItems(items => array);
  }
  const loadOptions = (inputValue, callback) => {
    // perform a request
    getCustomer(inputValue);
    const requestResults =  customers;
    callback(requestResults)
  }

  const loadStocks = (inputValue, callback) => {
    // perform a request
    getStocks(inputValue);
    const requestResults =  stock;
    callback(requestResults)
  } 
  const onchangeSearchStock = (input) =>{
    input = input.data;
    const itemRow = {item:input.name, description:input.description,rate:input.price, quantity:input.quantity,price:(input.price*input.quantity).toFixed(2),};
    setItems(items => [...items,itemRow] );
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
        <div class="content-wrapper">
        <div class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1 class="m-0">Quotation</h1>
              </div>
              <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li class="breadcrumb-item active">Dashboard v3</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="container-fluid">
          <div class="row">
            <div class="col-12 col-sm-12">
                <div class="card card-primary card-outline card-tabs">
                  <div class="card-header p-0 pt-1 border-bottom-0">
                      <ul class="nav nav-tabs" id="custom-tabs-three-tab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="custom-tabs-three-home-tab" data-toggle="pill" href="#custom-tabs-three-home" role="tab" aria-controls="custom-tabs-three-home" aria-selected="false">Fill Customer details</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="custom-tabs-three-profile-tab" data-toggle="pill" href="#custom-tabs-three-profile" role="tab" aria-controls="custom-tabs-three-profile" aria-selected="false">Search Stock</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="custom-tabs-three-messages-tab" data-toggle="pill" href="#custom-tabs-three-messages" role="tab" aria-controls="custom-tabs-three-messages" aria-selected="false">Preview Quotation</a>
                        </li>
                      </ul>
                  </div>
                  <div class="card-body">
                      <div class="tab-content" id="custom-tabs-three-tabContent">
                        <div class="tab-pane fade active show" id="custom-tabs-three-home" role="tabpanel" aria-labelledby="custom-tabs-three-home-tab">
                          
                          <div className="row">
                            <div class="col-sm-6">
                              <div className="card">
                                <div className="card-header">
                                    Main Customer <a href="javascript:void(0)"> <i className="fa fa-plus"></i> Add new customer</a>
                                </div>
                                <div className="card-body">
                                      <AsyncSelect
                                        loadOptions={loadOptions}
                                        onChange={onchangeMainCustomer}
                                      />
                                      {maincustomer &&(
                                        <table className="table table-borderless">
                                          <tr><td>Id</td><td>{maincustomer.id }</td></tr>
                                          <tr><td>Name</td><td>{maincustomer.name }</td></tr>
                                          <tr><td>Email</td><td>{maincustomer.email }</td></tr>
                                          <tr><td>Phone</td><td>{maincustomer.phone_number }</td></tr>
                                        </table>
                                      )}
                                </div>
                              </div>
                            </div>
                            <div class="col-sm-6">
                              <div className="card">
                                <div className="card-header">
                                    Ship to customer
                                </div>
                                <div className="card-body">
                                      <AsyncSelect
                                        loadOptions={loadOptions}
                                        onChange={onchangeShipCustomer}
                                      />
                                      {shipcustomer &&(
                                        <table className="table table-borderless">
                                          <tr><td>Id</td><td>{shipcustomer.id }</td></tr>
                                          <tr><td>Name</td><td>{shipcustomer.name }</td></tr>
                                          <tr><td>Email</td><td>{shipcustomer.email }</td></tr>
                                          <tr><td>Phone</td><td>{shipcustomer.phone_number }</td></tr>
                                        </table>
                                      )}
                                </div>
                              </div>
                            </div>
                            <div class="col-sm-6">
                              <div className="card">
                                <div className="card-header">
                                    Bill to customer
                                </div>
                                <div className="card-body">
                                      <AsyncSelect
                                        loadOptions={loadOptions}
                                        onChange={onchangeBillCustomer}
                                      />
                                      {billcustomer &&(
                                        <table className="table table-borderless">
                                          <tr><td>Id</td><td>{billcustomer.id }</td></tr>
                                          <tr><td>Name</td><td>{billcustomer.name }</td></tr>
                                          <tr><td>Email</td><td>{billcustomer.email }</td></tr>
                                          <tr><td>Phone</td><td>{billcustomer.phone_number }</td></tr>
                                        </table>
                                      )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="tab-pane fade" id="custom-tabs-three-profile" role="tabpanel" aria-labelledby="custom-tabs-three-profile-tab">
                        <div className="row">
                            <div class="col-sm-6">
                              <div className="card">
                                <div className="card-header">
                                    Search stock
                                </div>
                                <div className="card-body">
                                      <AsyncSelect
                                        loadOptions={loadStocks}
                                        onChange={onchangeSearchStock}
                                      />
                                </div>
                              </div>
                            </div>
                             
                            <div class="col-sm-12">
                              <div className="card">
                                <div className="card-header">
                                    Stock list
                                </div>
                                <div className="card-body">
                                <Form>
                                    <table class="table table-bordered">
                                      <thead>
                                        <tr>
                                          <th><span contenteditable>Item</span></th>
                                          <th><span contenteditable>Description</span></th>
                                          <th><span contenteditable>Rate</span></th>
                                          <th><span contenteditable>Quantity</span></th>
                                          <th><span contenteditable>Price</span></th>
                                          <th><span contenteditable>Action</span></th>
                                        </tr>
                                      </thead>
                                      
                                      <tbody>
                                      {items
                                        ? items.map((item, index) => (
                                        <tr>
                                          <td>
                                          <Input
                                            type="text"
                                            name="item"
                                            value={item.item}
                                            placeholder="Item"
                                            className="form-control"
                                            onChange={(e) => handleItemsInput(e,index)}
                                          />
                                          </td>
                                          <td>
                                          <Input
                                            type="text"
                                            value={item.description}
                                            name="description"
                                            placeholder="Description"
                                            className="form-control"
                                            onChange={(e) => handleItemsInput(e,index)}
                                          />
                                          </td>
                                          <td>
                                          <Input
                                            type="text"
                                            name="rate"
                                            value={item.rate}
                                            placeholder="rate"
                                            className="form-control"
                                            onChange={(e) => handleItemsInput(e,index)}
                                          />
                                          </td>
                                          <td>
                                          <Input
                                            type="text"
                                            name="quantity"
                                            value={item.quantity}
                                            placeholder="Quantity"
                                            className="form-control"
                                            onChange={(e) => handleItemsInput(e,index)}
                                          />
                                          </td>
                                          <td>
                                          <Input
                                            type="text"
                                            name="price"
                                            value={item.price}
                                            placeholder="Price"
                                            className="form-control"
                                            onChange={(e) => handleItemsInput(e,index)}
                                          />
                                          </td>
                                          <td>
                                            <button className="btn btn-danger btn-sm" type="button" onClick={() => deleteItem(index)}><i className="fa fa-trash"></i></button>
                                          </td>
                                        </tr>
                                        ))
                                        : ""}
                                      </tbody>
                                      
                                    </table>
                                    </Form>
                                </div>
                              </div>
                            </div>
                          </div>


                        </div>
                        <div class="tab-pane fade" id="custom-tabs-three-messages" role="tabpanel" aria-labelledby="custom-tabs-three-messages-tab">
                           <PreViewQuotation items={items} billCustomer={billcustomer} shipCustomer={shipcustomer} />

                           <div className="text-right"> <button className="btn btn-success">Create Quotation</button> </div>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    )
}

export default Customer;
