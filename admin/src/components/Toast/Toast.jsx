import React from "react";
import { Snackbar, Alert } from "@mui/material";

const Toast = ({ snackbar, setSnackbar }) => (
  <Snackbar
    open={snackbar.open}
    autoHideDuration={3000}
    onClose={() => setSnackbar({ ...snackbar, open: false })}
    anchorOrigin={{ vertical: "top", horizontal: "center" }} // ✅ Top Center
  >
    <Alert
      onClose={() => setSnackbar({ ...snackbar, open: false })}
      severity={snackbar.severity}
      sx={{ width: "100%" }}
    >
      {snackbar.message}
    </Alert>
  </Snackbar>
);

export default Toast;
