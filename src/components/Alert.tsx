import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useContext, useEffect } from "react";
import { SocketContext } from "../context/socket";
import { Slide } from "@mui/material"

export const ConnectionStatusAlert = () => {
  const socket = useContext(SocketContext);
  const [open, setOpen] = useState(true);
  const [status, setStatus] = useState("");
  const [severity, setSeverity] = useState("");
  const [retryNumber, setRetryNumber] = useState(1)

  const updateConnStatus = (status: string, severity: string, reconnect: boolean = false) => {
    if (!open) setOpen(true)
    setStatus(status);
    setSeverity(severity);

    reconnect ? setRetryNumber(retryNumber+1) : null
  };

  const autoCloseAlert = (open: boolean) => {
    if (open) {
      setTimeout(() => {
        setOpen(!open);
      }, 5000);
    }
  };
  

  useEffect(() => {
    socket.io.on("error", () => updateConnStatus("An error occured. Retrying connection...", "warning"))
    socket.io.on("reconnect", () => updateConnStatus("Succesfully reconnected!", "success"));
    socket.io.on("reconnect_attempt", () =>
      updateConnStatus(`Connection lost. Retrying... ${retryNumber} out of 5.`, "warning",  true)
    );
    socket.io.on("reconnect_failed", () =>
      updateConnStatus("Could not connect to the server. Contact the admins.", "error")
    );
    //socket.on("ping", socketHealth) 
    autoCloseAlert(open);

    return () => {
    socket.io.on("error", () =>
      updateConnStatus("An error occured. Retrying connection...", "warning")
    );
    socket.io.on("reconnect", () =>
      updateConnStatus("Succesfully reconnected!", "success")
    );
    socket.io.on("reconnect_attempt", () =>
      updateConnStatus(
        `Failed to reconnect, retrying... ${retryNumber} out of 10.`,
        "warning",
        true
      )
    );
    socket.io.on("reconnect_failed", () =>
      updateConnStatus(
        "Could not connect to the server. Contact the admins.",
        "error"
      )
    );
    };
  }, [socket, open]);

  return (
    <Box sx={{ width: "100%" }}>
      <Slide direction="down" in={open} mountOnEnter unmountOnExit >
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          <b>{status}</b>
        </Alert>
      </Slide>
    </Box>
  );
};
