import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";

const AdminQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    questionId: "",
    question: "",
    type: "yesno",
  });

  // Snackbar state
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Loader state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/questions");
      setQuestions(res.data);
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Failed to fetch questions", severity: "error" });
    }
  };

  const handleOpen = (q = null) => {
    if (q) {
      setEditing(true);
      setFormData({
        questionId: q.questionId,
        question: q.question,
        type: q.type,
      });
    } else {
      setEditing(false);
      setFormData({ questionId: "", question: "", type: "yesno" });
    }
    setOpen(true);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (editing) {
        await axios.put(`http://localhost:4000/api/questions/${formData.questionId}`, formData);
        setSnackbar({ open: true, message: "Question updated successfully!", severity: "success" });
      } else {
        await axios.post("http://localhost:4000/api/questions", formData);
        setSnackbar({ open: true, message: "Question added successfully!", severity: "success" });
      }
      setOpen(false);
      fetchQuestions();
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Failed to save question", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom align="center">
        Admin: Manage Questions
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => handleOpen()}
      >
        Add Question
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Serial No</TableCell>
              <TableCell>Question ID</TableCell>
              <TableCell>Question</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((q, index) => (
              <TableRow key={q.questionId}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{q.questionId}</TableCell>
                <TableCell>{q.question}</TableCell>
                <TableCell>{q.type}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleOpen(q)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"   // ✅ makes dialog bigger
      >
        <DialogTitle>{editing ? "Edit Question" : "Add Question"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Question ID"
            type="number"
            value={formData.questionId}
            onChange={(e) => setFormData({ ...formData, questionId: e.target.value })}
            disabled={editing} // ID not editable
          />
          <TextField
            label="Question Text"
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
          />
          <FormControl>
            <InputLabel>Type</InputLabel>
            <Select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <MenuItem value="yesno">Yes/No</MenuItem>
              <MenuItem value="star-rating">Star Rating</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleSubmit}
            disabled={!formData.question || !formData.questionId || loading}
          >
            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : editing ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for success/error */}
    <Snackbar
      open={snackbar.open}
      autoHideDuration={3000}
      onClose={() => setSnackbar({ ...snackbar, open: false })}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}   // ✅ Top Center
    >
      <Alert
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        severity={snackbar.severity}
        sx={{ width: "100%" }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>

    </Container>
  );
};

export default AdminQuestions;
