//React
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useContext } from "react/cjs/react.development";
import { useSessionStorageState } from "../../../../utils/useLocalStorageState";
import { NewRequestContext } from "../../../context/new_request/newRequestProvider";

//CSS
import InputField from "../../../global_ui/input";
import Navbar from "../../../global_ui/nav";
import restyles from "./requestItem.module.css";

function EnterItemsForm() {
  const history = useHistory();
  const { dispatch } = useContext(NewRequestContext);

  const routehandler = (route) => {
    history.push(route);
  };

  const [categories, setcategories] = useSessionStorageState("tags", {
    MEDICINES: false,
    GROCERIES: false,
    MISC: false,
  });
  
  const [inputList, setInputList] = useSessionStorageState("items", []);
  const [err, setErr] = useState({
    first: "",
    second: "",
    check:''
  });
  const [itemName, setitemName] = useState("");
  const [itemQty, setitemQty] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "itemName") {
      setitemName(value);
    }
    if (name === "itemQty") {
      setitemQty(value);
    }
  };

  const handleAddClick = (e) => {
    e.preventDefault();

    if (itemQty !== "" && itemName !== "") {
      let updatelist = [
        ...inputList,
        {
          itemName: itemName,
          quantity: itemQty,
        },
      ];

      setInputList(updatelist);
      setitemName("");
      setitemQty("");

      setErr({ first: "", second: "" });
    } else {
      if (itemName === "" && itemQty === "") {
        setErr({
          ...err,
          second: "Please enter quantity",
          first: "Please enter name",
        });
      } else if (itemQty === "") {
        setErr({ ...err, second: "Please enter quantity" });
      } else if (itemName === "") {
        setErr({ ...err, first: "Please enter name" });
      }
    }

    console.log(inputList);
  };

  const onEdititem = (index) => {
    setitemName(inputList[index].itemName);
    setitemQty(inputList[index].quantity);

    const list = [...inputList];
    list.splice(index, 1);
    setInputList([...list]);

    setErr({ first: "", second: "" });
  };

  const onDelete = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList([...list]);
  };

  const _handleCheckBox = (e) => {
    let data = { ...categories };
    data[e.target.name] = e.target.checked;
    setcategories(data);
  };

  const onProceed = (e) => {
    e.preventDefault();
    if (inputList.length === 0) {
      setErr({
        ...err,
        check: "Please enter atleast one item",
      });
    } else {
      
      if (categories.MEDICINES || categories.MISC || categories.GROCERIES) {
        let list = [];
        for (const cat in categories) {
          if (categories[cat]) list.push(cat);
        }
        dispatch({
          type: "ENTER_ITEMS",
          leftOffRoute:'address',
          categories: list,
          itemsList: inputList,
        });
        history.push("address");
      } else {
        setErr({
          ...err,
          check: "Please select a category",
        });
      }
    }
  };

  return (
    <div>
      {/* Navbar */}

      <Navbar
        back="list_type"
        backStyle={{ color: "white" }}
        title="Enter Items"
        titleStyle={{ color: "white" }}
        style={{ backgroundColor: "#79CBC5", marginBottom: "10px" }}
      />

      <div className={restyles.container}>
        {/* Prompt Text */}
        <div className={restyles.rmessage}>
          <p style={{ fontWeight: "bold" }}>
            Please choose the items you want to request

          </p>
        </div>
        <p style={{textAlign:'center',color:'red'}} >{err.check}</p>
        <div style={{ marginTop: "5%" }} className={restyles.rlistname}>
          <div className={restyles.row}>
            <div className={restyles.col}>
              <p style={{ fontWeight: "bold" }}>item name</p>
            </div>
            <div className={restyles.col}>
              <p style={{ fontWeight: "bold" }}>strips/qty</p>
            </div>
            <div className={restyles.col}>
              <p style={{ fontWeight: "bold" }}>Add/Delete</p>
            </div>
          </div>

          <div className={restyles.container}>
            <div className={restyles.row} style={{ marginTop: "2%" }}>
              <div className={restyles.col1}>
                <InputField
                  type="text"
                  placeholder="Item Name..."
                  name="itemName"
                  value={itemName}
                  error={err.first}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className={restyles.col1}>
                <InputField
                  type="text"
                  placeholder="Item qty..."
                  name="itemQty"
                  value={itemQty}
                  error={err.second}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className={restyles.col1}>
                {
                  <button
                    style={{
                      marginRight: "2%",
                      backgroundColor: "green",
                      color: "white",
                      fontWeight: "bold",
                    }}
                    type="button"
                    className={restyles.btn}
                    onClick={(e) => handleAddClick(e)}
                    value="Add"
                  >
                    Add
                  </button>
                }
              </div>
            </div>
          </div>

          <div className={restyles.itemcontainer}>
            {inputList.map((x, index) => {
              return (
                <div key={x.itemName}>
                  <div className={`${restyles.row} ${restyles.card}`}>
                    <div className={restyles.col1}>
                      <span>{x.itemName}</span>
                    </div>
                    <div className={restyles.col1}>
                      <span>{x.itemQty}</span>
                    </div>
                    <div className={restyles.col1}>
                      <span>
                        <i
                          className="fa fa-pencil-square-o"
                          aria-hidden="true"
                          onClick={() => onEdititem(index)}
                        ></i>{" "}
                        &nbsp; &nbsp;
                        <i
                          className="fas fa-trash-alt"
                          onClick={() => onDelete(index)}
                        ></i>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={restyles.row} style={{ marginTop: "5%" }}>
            <div className={restyles.col}>
              <input checked={categories.MEDICINES} onChange={_handleCheckBox} name="MEDICINES" type="checkbox" />
              <p>MEDICINES</p>
            </div>
            <div className={restyles.col}>
              <input checked={categories.GROCERIES} onChange={_handleCheckBox} name="GROCERIES" type="checkbox" />

              <p>GROCERIES</p>
            </div>
            <div className={restyles.col}>
              <input checked={categories.MISC} onChange={_handleCheckBox} name="MISC" type="checkbox" />

              <p>MISC</p>
            </div>
          </div>

          <div className={restyles.container}>
            <div
              className={restyles.row}
              style={{ marginTop: "10%", marginBottom: "2%" }}
            >
              <div className={restyles.col} onClick={() => routehandler("/")}>
                <button
                  type="button"
                  style={{ backgroundColor: "red", color: "white" }}
                  className={restyles.btn}
                >
                  Cancel
                </button>
              </div>
              <div
                className={restyles.col}
                
              >
                <button
                  type="button"
                  style={{ backgroundColor: "green", color: "white" }}
                  className={restyles.btn}
                  onClick={onProceed}
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnterItemsForm;
