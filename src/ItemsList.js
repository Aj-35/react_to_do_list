import React from 'react'
import LineItem from './LineItem'

const ItemsList = ({items,handlecheck,trash}) => {
  return (
    <ul>
        {items.map((item) => (
          <LineItem
          item={item}
          key={item.id}
          handlecheck={handlecheck}
          trash={trash}          
          />
        ))}
      </ul>
  )
}

export default ItemsList