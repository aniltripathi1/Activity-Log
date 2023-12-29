

import React  ,{useState,useEffect }from "react";
import "./styles.css";

// get the local data back
const getLocalData = () =>{
    const lists = localStorage.getItem("mytodolist");
    if(lists)
    {
    
        return JSON.parse(lists);
    }
    else
    {
        return [];
    }
}
const ToDo = () =>{

    const [inputData,setInputData]= useState("");
    const[items,setItems] = useState(getLocalData());
const [isEditItem,setIsEditItem] =useState("");
const [toggleButton,setToggleButton] = useState(false);
    const addItem = () =>{
        if(!inputData){
            alert("please fill the data");

        }
        else if(inputData && toggleButton){
            setItems(
                items.map((curElem)=>{
                    if(curElem.id === isEditItem){
                        return {...curElem,name:inputData};
                    }
                    return curElem;
                })
            );
            setInputData("");
            setIsEditItem(null);
            setToggleButton(false); 
        }

        else{
            const myNewInputData ={
                id:new Date().getTime().toString(),
                name:inputData,
            }
            setItems([...items,myNewInputData])
            setInputData("");
        }
    }

    // DELETE ITEMS

    const deleteItem =(index) =>{
        const updatedItems = items.filter((curElem) =>{
            return curElem.id !== index;
        });
        setItems(updatedItems);
    }
    
    const removeall = () =>{
        setItems([]);
    }

    // adding local storage

    useEffect(()=>{
        localStorage.setItem("mytodolist",JSON.stringify(items));
    },[items])

    //edit items

    const editItem = (index) =>{
        const item_todo_edited = items.find((curElem)=>{
            return curElem.id === index;
        });
        setInputData(item_todo_edited.name);
        setIsEditItem(index);
        setToggleButton(true); 
    }

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg" alt="todologo" />
                        <figcaption>Add Your List Here ⭐</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder="✍🏻 Add Items" className="form-control" 
                        value={inputData}
                        onChange={(event) => setInputData(event.target.value)}
                        />
                      {
                        toggleButton ?(
                            <i className="fa fa-edit add-btn" onClick={addItem}></i>  
                        ) :(
                            <i className="fa fa-plus add-btn" onClick={addItem}></i>  
                        )
                      }
                 
                    </div>

                    {/* show Items */}
                    <div className="showItems">
                   
                   {items.map((curElem,index)=>{
                    return(

                        <div className="eachItem" >
                            <h3>{curElem.name}</h3>
                            <div className="todo-btn">
                  <i className="far fa-edit add-btn" onClick={()=>editItem(curElem.id)}></i>  
                  <i className="far fa-trash-alt add-btn" onClick={() =>deleteItem(curElem.id)}></i>  

                            </div>
                        </div>

                    )
                   })}




                  
                    </div>

                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeall}>
                            <span >Check List</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ToDo;