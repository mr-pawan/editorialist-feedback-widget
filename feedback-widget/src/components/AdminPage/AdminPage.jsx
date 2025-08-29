import React, { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";
import QuestionsPage from "../QuestionPage/QuestionPage";
import FeedbackPage from "../FeedbackPage/FeedbackPage";
import "./AdminPage.css"

const AdminPage = () => {
  const [selectedPage, setSelectedPage] = useState("questions");

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar onSelect={setSelectedPage} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {selectedPage === "questions" && <QuestionsPage />}
        {selectedPage === "feedback" && <FeedbackPage />}
      </Box>
    </Box>
  );
};

export default AdminPage;
