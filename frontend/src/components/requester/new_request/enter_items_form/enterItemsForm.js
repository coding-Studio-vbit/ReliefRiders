//React
import React, { useState, useEffect } from 'react';

//CSS
import InputField from '../../../global_ui/input';
import Navbar from '../../../global_ui/nav';
import styles from './requestItem.module.css'

function EnterItemsForm() {

	const [inputList, setInputList] = useState([{itemName: "", itemQty: ""}]);
	
	useEffect( () => {
		const items = localStorage.getItem("items")
		if (items){
			setInputList(JSON.parse(items))
		}
	},[])

	useEffect( () => {
		localStorage.setItem("items",JSON.stringify(inputList))		
	},[inputList])

	const handleInputChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...inputList];
		list[index][name] = value;
		setInputList(list);
	};

	const handleRemoveClick = index => {
		const list = [...inputList];
		list.splice(index, 1);
		setInputList(list);
	};

	const handleAddClick = () => {
		setInputList([{ itemName: "", itemQty: "" }, ...inputList]);
	};

	return (
		<div>
 		{/* Navbar */}
		 <div className={'row'}>
			<Navbar back='/list_type' backStyle={{ color: "white" }} title="Enter Items" titleStyle={{ color: "white" }} style={{ backgroundColor: "#79CBC5", marginBottom: "10px" }}/>
		</div>
		<div className={'container'}>
			{/* Prompt Text */}
			<div className={'row'}>
				<div className={styles.message}>
					<p>Please choose the items you want to request</p>
				</div>
			</div>
			

			{/* Main Form */}
			<div className={'row'}>
				<div className={'col'}>
					<div className={styles.enter}>
						<p>Enter Items:</p>
					</div>
				</div>
			</div>

			<div className={styles.listname}>
				<div className={'row'}>
					<div className={'col'}>
						<p>item name</p>
					</div>
					<div className={'col'}>
						<p>strips/qty</p>
					</div>
					<div className={'col'}>
						<p>Add/Delete Item</p>
					</div>
				</div>

				{inputList.map((x, i) => {
					return (
						<div key={inputList.id}>
							<div className={'row'} style={{marginTop: '2%'}}>
								<div className={'col'}>
									<InputField type="text" placeholder="Itm Name..." name="itemName" value={x.itemName} onChange={e => handleInputChange(e, i)}/>
								</div>
								<div className={'col'}>
									<InputField type="number" placeholder="Itm qty..." name="itemQty" value={x.itemQty} onChange={e => handleInputChange(e, i)}/>
								</div>
								<div className={'col'}>
									{inputList.length - 1 === i && <button style={{marginRight: '2%', alignContent: 'center'}} type="button" className="btn btn-success" onClick={handleAddClick} value="Add">Add</button>}
									{inputList.length !== 1 && <button style={{marginLeft: '1%'}} type="button" className="btn btn-danger" onClick={() => handleRemoveClick(i)} >X</button>}
								</div>
							</div>
						</div>
					)
				})}

				<div className={'row'} style={{marginTop: '5%'}}>
					<div className={'col'}>
						<input style={{backgroundColor: 'red'}} className="form-check-input" type="checkbox" value="" id="flexCheckDisabled"></input>
						{/* <label style={{marginLeft: '5px'}} className="form-check-label" for="flexCheckDisabled">Medicine</label> */}
						<p>Medicine</p>
					</div>
					<div className={'col'}>
						<input style={{backgroundColor: 'green'}} className="form-check-input" type="checkbox" value="" id="flexCheckDisabled"></input>
						{/* <label style={{marginLeft: '5px'}} class="form-check-label" for="flexCheckDisabled">Grocery</label> */}
						<p>Grocery</p>
					</div>
					<div className={'col'}>
						<input style={{backgroundColor: 'blue'}} className="form-check-input" type="checkbox" value="" id="flexCheckDisabled"></input>
						{/* <label style={{marginLeft: '5px'}} class="form-check-label" for="flexCheckDisabled">Misc</label> */}
						<p>Misc</p>
					</div>
				</div>

				<div className={'container'}>
					<div className={'row'} style={{marginTop: '20%'}}>
						<div className={'col'}>
							<button type="button" className="btn btn-danger">Cancel</button>
						</div>
						<div className={'col'}>
							<button type="button" className="btn btn-success">Proceed</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	)
}

export default EnterItemsForm;
