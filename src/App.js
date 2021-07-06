import './App.css';
import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import './index.css';

function App() {
  const [items, setItems] =  useState([
    {itemName: 'item1', quantity:1},
    {itemName: 'item2', quantity:1},
    {itemName: 'item3', quantity:1}
  ])

  const [inputValue, setInputValue] = useState('');

  const headers = [
    {label:"item name", key:"itemName"},
    {label:"quantity", key:"quantity"}
  ]

  const csvReport = {
    filename:"Shopping-list.csv",
    headers:headers,
    data:items
  }
  

  // method to add new foods to the list
  const handleAddButtonClick = () => {
		const newItem = {
			itemName: inputValue,
			quantity: 1,
			isSelected: false,
		};

		const newItems = [...items, newItem];

		setItems(newItems);
		setInputValue('');
		
	};

  const handleQuantityIncrease = (index) => {
		const newItems = [...items];

		newItems[index].quantity++;

		setItems(newItems);

	};

	const handleQuantityDecrease = (index) => {
		const newItems = [...items];

    if(newItems[index].quantity>0){
      newItems[index].quantity--;
    }
		else{
      newItems[index].quantity=0
    }

		setItems(newItems);
		
	};

  // const downloadTxtFile =(event)=>{
  //   const element= document.createElement('a')
  //   const file= new Blob([document.getElementById('test').value],{
  //     type: "text/plain;charset=utf-8"
  //   })

  //   element.href =  URL.createObjectURL(file)
  //   element.download="NewDocument.txt"
  //   document.body.appendChild(element)
  //   element.click()

  // }

  
  return (
    <div>
    {/* <input type="object" id="test" value={items}/> */}
      <div className='add-item-box'>
					<input value={inputValue} onChange={(event) => setInputValue(event.target.value)} className='add-item-input' placeholder='Add an item...' />
					<button onClick={() => handleAddButtonClick()}>Add</button>
			</div>
      <div className='item-list'>
					{items.map((item, index) => (
						<div className='item-container'>
							<div className='item-name'>
                <span >{item.itemName}</span>
              </div>
							
							<div className='quantity'>
								<button onClick={() => handleQuantityDecrease(index)}>
									-
								</button>
								<span> {item.quantity} </span>
								<button onClick={() => handleQuantityIncrease(index)}>
									+
								</button>
							</div>
						</div>
					))}
				</div>
        
      <CSVLink {...csvReport}>Export</CSVLink>
      {/* <button onClick={downloadTxtFile}>Download</button> */}
    </div>
    
  );
}

export default App;
