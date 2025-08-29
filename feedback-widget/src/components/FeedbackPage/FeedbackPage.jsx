import React, { useEffect, useState } from "react";
import "./FeedbackPage.css";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:4000/api/feedback");
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Error fetching feedback", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <Container className="feedback-container">
      <Typography variant="h5" gutterBottom>User Feedback</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Serial No</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Question</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedbacks.map((fb, index) => (
              <TableRow key={fb._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{fb.userId}</TableCell>
                <TableCell>{fb.questionId?.text || "Deleted Question"}</TableCell>
                <TableCell>{fb.value}</TableCell>
                <TableCell>{fb.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
};

export default FeedbackPage;
