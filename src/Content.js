import React from "react"
import ItemsList from "./ItemsList"
const Content = ({items,handlecheck,trash}) => {
    
 
  return (
    <>
      {(items.length)?(
      <ItemsList
          items={items}
          handlecheck={handlecheck}
          trash={trash}
      />
      ):( <p>Your list is empty</p>)
}
    </>
  )
}

export default Content