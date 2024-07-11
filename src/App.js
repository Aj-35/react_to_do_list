
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import React, { useState,useEffect } from 'react'
import AddItem from './AddItem';
import Searchitem from './Searchitem';
import apiRequest from './apiRequest';

function App() {
  const API_URL ="http://localhost:3500/items"
  const [items,setItems] = useState([])
  const [fetchError,setFetchError] = useState(null)
  const [isLoading,setIsLoading]= useState(true)

  useEffect(() => {
    const fetchItems = async() =>{
      try{
        const response = await fetch(API_URL)
        if(!response.ok) throw Error("Data not received")
        const listItems = await response.json()
        setItems(listItems)
        setFetchError(null)
      }
      catch(err){
          setFetchError(err.message)
      }finally{
        setIsLoading(false)
      }
    }

    setTimeout( () => {
      (async () => await fetchItems())()
    },2000)
      
    
  },[])

  const [newItem , setNewItem] = useState('')

  const [search, setSearch] = useState('')

  const addItem = async(item) => {
    const id = items.length ? items[items.length-1].id + 1 : 1;
    const addNewItem = {id , checked:false, item}
    const listItems = [...items,addNewItem]
    setItems(listItems)

    const postOption = {
      method : 'POST',
      headers : {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(addNewItem)
    }

    const result =await apiRequest(API_URL,postOption)
    if(result) setFetchError(result)

  }
    
    const handlecheck =async (id) => {
      const listItems = items.map((item)=>
      item.id===id ? {...item,checked:!item.checked}:item)
      setItems(listItems)

      const myItem = listItems.filter((item) => item.id===id )

      const updateOption = {
        method:'PATCH',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({checked:myItem[0].checked})
      }

      const reqUrl= `${API_URL}/${id}`
      const result =await apiRequest(reqUrl,updateOption)
      if(result) setFetchError(result)
      
    }

    const trash = async (id) =>{
      const deleteitem = items.filter((item)=>
        item.id!==id)
      setItems(deleteitem)

      const deleteOption = {method:'DELETE'}

      const reqUrl = `${API_URL}/${id}`
      const result = await apiRequest(reqUrl,deleteOption)
      if(result) setFetchError(result)
    }

    const handleSubmit = (e) =>{
      e.preventDefault()
      if(!newItem) return;
      addItem(newItem)
      setNewItem('')
      
    }


  return (
    <div className='App'>
      <Header title="Tony"/>
      <AddItem
      newItem = {newItem}
      setNewItem={setNewItem}
      handleSubmit={handleSubmit}
       />
      <Searchitem
      search={search}
      setSearch={setSearch}      
      />
      <main>
        {isLoading && <p>Loading Items....</p>}
        {fetchError && <p>{`Error ${fetchError}`}</p>}
      {!isLoading && !fetchError && <Content
      items = {items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
      handlecheck={handlecheck}
      trash={trash}
      />}
      </main>
      <Footer 
      length={items.length}
      />
    </div>
  );
}

export default App;
