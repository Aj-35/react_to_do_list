import React from 'react'
import { FaTrashAlt } from "react-icons/fa";

const LineItem = ({item,handlecheck,trash}) => {
  return (
    <li className='item'>
            <input 
            type="checkbox"
            onChange={() => handlecheck(item.id)}
            checked = {item.checked} />
            <label style={(item.checked)?{textDecoration: 'line-through'}:null}onDoubleClick={() => handlecheck(item.id)}>{item.item}</label>
            <FaTrashAlt 
              role='button'
              tabIndex="0"
              onClick={()=>trash(item.id)}/>

    </li>
  )
}

export default LineItem