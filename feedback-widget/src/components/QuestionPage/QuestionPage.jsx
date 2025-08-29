import React, { useEffect, useState } from "react";
import "./QuestionPage.css";
import {
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import QuestionTable from "./QuestionTable";  // the table with add/edit
import Toast from "../Toast/Toast";

const QuestionsPage = () => {
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:4000/api/questions");
      setQuestions(res.data);
    } catch (err) {
      showToast("Error fetching questions", "error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ single function to show snackbar
  const showToast = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <Container className="questions-container">
      <Typography variant="h5" gutterBottom>
        Manage Questions
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <QuestionTable
          questions={questions}
          onRefresh={fetchQuestions}
          showToast={showToast}  // ✅ pass toast handler
        />
      )}

      <Toast snackbar={snackbar} setSnackbar={setSnackbar} />
    </Container>
  );
};

export default QuestionsPage;
