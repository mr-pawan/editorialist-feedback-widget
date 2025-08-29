import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  CircularProgress,
  Snackbar,
  Alert,
  TablePagination,
} from "@mui/material";
import axios from "axios";
import "./QuestionTable.css";

const QuestionTable = ({ questions, onRefresh }) => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ questionId: "", question: "", type: "yesno" });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [deleting, setDeleting] = useState(false);


  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpen = (question = null) => {
    if (question) {
      setEditing(question.questionId);
      setFormData({ questionId: question.questionId, question: question.question, type: question.type });
    } else {
      setEditing(null);
      setFormData({ questionId: "", question: "", type: "yesno" });
    }
    setOpen(true);
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;

    try {
      setDeleting(true);
      await axios.delete(`http://localhost:4000/api/questions/${id}`);
      setSnackbar({ open: true, message: "Question deleted successfully!", severity: "success" });
      onRefresh();  // refresh question list
    } catch (err) {
      setSnackbar({ open: true, message: "Error deleting question", severity: "error" });
    } finally {
      setDeleting(false);
    }
}

  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    if (!formData.questionId || !formData.question) {
      setSnackbar({ open: true, message: "Please fill all fields", severity: "error" });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        questionId: Number(formData.questionId),
        question: formData.question,
        type: formData.type,
      };

      if (editing) {
        await axios.put(`http://localhost:4000/api/questions/${payload.questionId}`, payload);
        setSnackbar({ open: true, message: "Question updated successfully!", severity: "success" });
      } else {
        await axios.post("http://localhost:4000/api/questions", payload);
        setSnackbar({ open: true, message: "Question added successfully!", severity: "success" });
      }

      setTimeout(() => {
        setOpen(false);
        onRefresh();
      }, 500);
    } catch (err) {
      const message = err?.response?.data?.message || err?.response?.data?.error || "Failed to save question";
      setSnackbar({ open: true, message, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper className="question-table-container">
      <Button variant="contained" color="primary" onClick={() => handleOpen()} sx={{ mb: 2 }}>
        Add Question
      </Button>

    <TableContainer className="table-scroll">
  <Table stickyHeader>
    <TableHead>
      <TableRow>
        <TableCell>Serial No</TableCell>
        <TableCell>Question</TableCell>
        <TableCell>Type</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {questions
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((q, idx) => (
          <TableRow key={q.questionId}>
            <TableCell>{page * rowsPerPage + idx + 1}</TableCell>
            <TableCell>{q.question}</TableCell>
            <TableCell>{q.type}</TableCell>
            <TableCell>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleOpen(q)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="small"
                style={{ marginLeft: "8px" }}
                onClick={() => handleDelete(q._id)}   // ✅ call delete
              >
                Delete
              </Button>
            </TableCell>

          </TableRow>
        ))}
    </TableBody>
  </Table>
</TableContainer>


      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={questions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{editing ? "Edit Question" : "Add Question"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Question ID"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.questionId}
            onChange={(e) => setFormData({ ...formData, questionId: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Question"
            fullWidth
            variant="outlined"
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Type"
            select
            fullWidth
            variant="outlined"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <MenuItem value="yesno">Yes/No</MenuItem>
            <MenuItem value="star-rating">Star Rating</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading} variant="contained">
            {loading ? <CircularProgress size={20} /> : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbar((s) => ({ ...s, open: false }))} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default QuestionTable
