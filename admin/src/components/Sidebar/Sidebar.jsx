import React from "react";
import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import "./Sidebar.css";

const Sidebar = ({ selected, onSelect }) => {
  const menuItems = [
    { key: "questions", label: "Questions" },
    { key: "feedback", label: "Feedback" },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 220,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 220,
          boxSizing: "border-box",
          backgroundColor: "#1e293b", // Dark theme
          color: "#fff",
          marginTop: "83px !important"
        },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.key}
            onClick={() => onSelect(item.key)}
            className={`sidebar-item ${
              selected === item.key ? "sidebar-selected" : ""
            }`}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
