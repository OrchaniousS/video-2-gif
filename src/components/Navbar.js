import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Menu } from "semantic-ui-react"

export default function Navbar() {
  const [activeItem, setActiveItem] = useState("home")

  const handleItemClick = (e, { name }) => setActiveItem(name)

  return (
    <Menu
      fluid
      pointing
      secondary
      size="huge"
      color="blue"
      style={{
        display: "flex",
        justifyContent: "center",
        background: "rgba(255, 255, 255, 0.67)",
      }}
    >
      <Menu.Item
        name="Video To Gif Converter"
        active={activeItem === "home"}
        onClick={handleItemClick}
        icon="home"
        as={Link}
        to="/"
      />
    </Menu>
  )
}
