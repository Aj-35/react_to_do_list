import React from 'react'

const Header = ({title = "To Do list"}) => {
  return (
    <header>
    <h1>{title}</h1>
    </header>
  )
}

export default Header