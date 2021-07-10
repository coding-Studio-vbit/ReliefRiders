//React
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { useContext } from "react/cjs/react.development";
import { useSessionStorageState } from "../../../../utils/useLocalStorageState";
import { NewRequestContext } from "../../../context/new_request/newRequestProvider";

//CSS
import InputField from "../../../global_ui/input";
import Navbar from "../../../global_ui/nav";
import restyles from "./requestItem.module.css";

function EnterItemsForm() {
  const history = useHistory();
  const {
    dispatch,
    state: { itemsList, categories: cat },
  } = useContext(NewRequestContext);

  const routehandler = (route) => {
    history.push(route);
  };
  useEffect(() => {
    if (cat.length !== 0) {
      setcategories((categories) => {
        let cats = {};
        for (const c in cat) cats[cat[c]] = true;
        console.log(cats);
        return { ...categories, ...cats };
      });
    }
  }, []);

  const [categories, setcategories] = useSessionStorageState("cat",{
    MEDICINES: false,
    GROCERIES: false,
    MISC: false,
  });

  const [inputList, setInputList] = useSessionStorageState('enter_items',itemsList);
  const [err, setErr] = useState({
    first: "",
    second: "",
    check: "",
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
      <Navbar back="list_type" title="Enter Items" />
      <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
        <p
          style={{
            marginTop: "2rem",
            fontSize: "1.2rem",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Please enter the items you want to request
        </p>

        <p style={{ textAlign: "center", color: "red" }}>{err.check}</p>
        <div className={restyles.inputArea}>
          <InputField
            type="text"
            placeholder="Item Name"
            name="itemName"
            value={itemName}
            error={err.first}
            onChange={(e) => handleInputChange(e)}
          />

          <InputField
            type="text"
            placeholder="Item quantity"
            name="itemQty"
            value={itemQty}
            error={err.second}
            onChange={(e) => handleInputChange(e)}
          />

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

          {inputList.map((x, index) => {
            return (
              <div className={restyles.card} key={x.itemName}>
                    <span>{x.itemName}  |  {x.quantity} </span>
                 
                  <div >
                    <span>
                      <i
                        className="fas fa-pen"
                        aria-hidden="true"
                        onClick={() => onEdititem(index)}
                      ></i>{" "}
                      &nbsp; &nbsp;
                      <i
                        className="far fa-trash-alt"
                        onClick={() => onDelete(index)}
                      ></i>
                    </span>
                  </div>
                </div>
             
            );
          })}

        </div>
          
       

        <div className={restyles.checkBoxArea}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <input
              checked={categories.MEDICINES}
              onChange={_handleCheckBox}
              name="MEDICINES"
              type="checkbox"
            />
            <p>MEDICINES</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <input
              checked={categories.GROCERIES}
              onChange={_handleCheckBox}
              name="GROCERIES"
              type="checkbox"
            />

            <p>GROCERIES</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <input
              checked={categories.MISC}
              onChange={_handleCheckBox}
              name="MISC"
              type="checkbox"
            />

            <p>MISC</p>
          </div>
        </div>

        <div className={restyles.buttonArea}>
          <button
            type="button"
            onClick={() => routehandler("/")}
            style={{ backgroundColor: "red", color: "white" }}
            className={restyles.btn}
          >
            Cancel
          </button>

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
  );
}

export default EnterItemsForm;
