//React
import React, { useState} from 'react';
import { useHistory } from "react-router-dom";
import { useSessionStorageState } from "../../../../utils/useLocalStorageState";

//CSS
import InputField from '../../../global_ui/input';
import Navbar from '../../../global_ui/nav';
import restyles from './requestItem.module.css';

function EnterItemsForm() {
	const history = useHistory();

	const routehandler = (route) => {
		history.push(route);
	};

	const [inputList, setInputList] = useSessionStorageState("items",[]);
	const [err, setErr] = useState({
        first:'' ,
        second:''
    })
	const [itemName, setitemName] = useState("");
	const [itemQty, setitemQty] = useState("");
	
	// useEffect( () => {
	// 	const items = localStorage.getItem("items")
	// 	if (items){
	// 		setInputList(JSON.parse(items))
	// 	}
	// },[])

	// useEffect( () => {
	// 	localStorage.setItem("items",JSON.stringify(inputList))		
	// },[inputList])

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		// const list = [...inputList];
		// list[index][name] = value;
		// setInputList(list);
		//setInputList(inputList => ({...inputList, [name]:value}))
		if(name === "itemName")
		{
			setitemName(value);
		}
		if(name === "itemQty")
		{
			setitemQty(value);
		}
		itemName
		itemQty
	};

	// const handleRemoveClick = index => {
	// 	const list = [...inputList];
	// 	list.splice(index, 1);
	// 	setInputList(list);
	// };

	const handleAddClick = (e) => {
		e.preventDefault();

			
		if(itemQty !== "" && itemName !== "")
		{
			let updatelist = [
				...inputList,  
				{
					itemName: itemName, 
					itemQty: itemQty
				}
			];
		
			setInputList(updatelist);
			setitemName("");
			setitemQty("");

			setErr( 
				{first:"",
				second:""})

		}
		else{

	if(itemName === "")
		{
			setErr( 
				{...err,
				first:"fill this field"})
		}
		if(itemQty === "")
		{
				setErr( 
					{...err,
					second:"fill this field"})
		}

		}
		

		
		console.log(inputList);

	};

	const onEdititem = (index)=> {
		setitemName(inputList[index].itemName);
		setitemQty(inputList[index].itemQty);

		const list = [...inputList];
        list.splice(index, 1);
        setInputList([...list]);

		setErr( 
			{first:"",
			second:""})
	}

	const onDelete = (index)=> {
		const list = [...inputList];
        list.splice(index, 1);
        setInputList([...list]);
	}

	return (
		<div>
 		{/* Navbar */}
		 
		<Navbar back='/list_type' backStyle={{ color: "white" }} title="Enter Items" titleStyle={{ color: "white" }} style={{ backgroundColor: "#79CBC5", marginBottom: "10px" }}/>
		
		<div className={restyles.container}>
			{/* Prompt Text */}
				<div className={restyles.rmessage}>
					<p style={{fontWeight: 'bold'}}>Please choose the items you want to request</p>
				</div>
				

			<div style={{marginTop: '5%'}} className={restyles.rlistname}>
				<div className={restyles.row}>
					<div className={restyles.col}>
						<p style={{fontWeight: 'bold'}}>item name</p>
					</div>
					<div className={restyles.col}>
						<p style={{fontWeight: 'bold'}}>strips/qty</p>
					</div>
					<div className={restyles.col}>
						<p style={{fontWeight: 'bold'}}>Add/Delete</p>
					</div>
				</div>

				<div className={restyles.container}>
				<div className={restyles.row} style={{marginTop: '2%'}}>
						<div className={restyles.col1}>
							<InputField type="text" placeholder="Item Name..." name="itemName" value={itemName} error={err.first} onChange={e => handleInputChange(e)}/>
						</div>
						<div className={restyles.col1}>
							<InputField type="text" placeholder="Item qty..." name="itemQty" value={itemQty} error={err.second} onChange={e => handleInputChange(e)}/>
						</div>
						<div className={restyles.col1}>
							{ <button style={{marginRight: '2%', backgroundColor: 'green', color: 'white', fontWeight: 'bold'}} type="button" className={restyles.btn} onClick={e=> handleAddClick(e)} value="Add">Add</button>}
						</div>
				</div>

				</div>

				<div className={restyles.itemcontainer}>
					{inputList.map((x,index)=>{
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
								    <span><i className="fa fa-pencil-square-o" aria-hidden="true" onClick={()=> onEdititem(index)}></i> &nbsp; &nbsp;
								    <i className="fas fa-trash-alt" onClick={()=>onDelete(index)}></i></span>
									</div>
                                </div>
							</div>
						)

                  })}

				</div>

				{/* <div className={restyles.container}>
					{inputList.map((x, i) => {
						return (
							<div key={inputList.id}>
								<div className={restyles.row} style={{marginTop: '2%'}}>
									<div className={restyles.col1}>
										<InputField type="text" placeholder="Item Name..." name="itemName" value={x.itemName} onChange={e => handleInputChange(e, i)}/>
									</div>
									<div className={restyles.col1}>
										<InputField type="text" placeholder="Item qty..." name="itemQty" value={x.itemQty} onChange={e => handleInputChange(e, i)}/>
									</div>
									<div className={restyles.col1}>
										{inputList.length - 1 === i && <button style={{marginRight: '2%', backgroundColor: 'green', color: 'white', fontWeight: 'bold'}} type="button" className={restyles.btn} onClick={handleAddClick} value="Add">Add</button>}
										{inputList.length !== 1 && <button style={{marginLeft: '1%', backgroundColor: 'red', color: 'white', fontWeight: 'bold'}} type="button" className={restyles.btn} onClick={() => handleRemoveClick(i)} >X</button>}
									</div>
								</div>
							</div>
						)
					})}
				</div> */}   

				<div className={restyles.row} style={{marginTop: '5%'}}>
					<div className={restyles.col}>
						<input type="checkbox"/>
						{/* <input style={{backgroundColor: 'red'}} className={restyles.form-check-input} type="checkbox" value="" id="flexCheckDisabled"></input> */}
						{/* <label style={{marginLeft: '5px'}} className="form-check-label" for="flexCheckDisabled">Medicine</label> */}
						<p>Medicine</p>
					</div>
					<div className={restyles.col}>
						<input type="checkbox"/>
						{/* <input style={{backgroundColor: 'green'}} className={restyles.form-check-input} type="checkbox" value="" id="flexCheckDisabled"></input> */}
						{/* <label style={{marginLeft: '5px'}} class="form-check-label" for="flexCheckDisabled">Grocery</label> */}
						<p>Grocery</p>
					</div>
					<div className={restyles.col}>
						<input type="checkbox"/>
						{/* <input style={{backgroundColor: 'blue'}} className={restyles.form-check-input} type="checkbox" value="" id="flexCheckDisabled"></input> */}
						{/* <label style={{marginLeft: '5px'}} class="form-check-label" for="flexCheckDisabled">Misc</label> */}
						<p>Misc</p>
					</div>
				</div>

				<div className={restyles.container}>
					<div className={restyles.row} style={{marginTop: '10%', marginBottom: '2%'}}>
					<div className={restyles.col} onClick={() => routehandler("/")}>
							<button type="button" style={{backgroundColor: 'red', color: 'white'}} className={restyles.btn}>Cancel</button>
						</div>
						<div className={restyles.col} onClick={() => routehandler("address")}>
							<button type="button" style={{backgroundColor: 'green', color: 'white'}} className={restyles.btn}>Proceed</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	)
}

export default EnterItemsForm;
