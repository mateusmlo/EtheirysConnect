import Send from "@mui/icons-material/Send";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useState } from "react";

export const ComposeMessage = ({ socket }) => {
  const [message, setMessage] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);

  const sendMessage = () => {
    if (message === "") {
      setIsEmpty(true);
      return
    } else {
      setIsEmpty(false)
    }


    const payload = {
      message,
    };

    socket.emit("send_msg", payload, ({ ack }) => {
      if (ack) {
        document.getElementById("new-msg").value = ""
        setMessage("")
      }
    });
  };

  return (
    <FormControl variant="outlined" fullWidth>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <InputLabel htmlFor="component-outlined">
            Tell me something I don't know
          </InputLabel>
          <OutlinedInput
            error={isEmpty}
            id="new-msg"
            aria-describedby="user-msg"
            label="Tell me something I don't know"
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
            required
            multiline
            maxRows={4}
          />
          {isEmpty ? (
          <FormHelperText id="my-helper-text">
            Invisible messages will be supported in a future update!
          </FormHelperText>
          ):null}
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="outlined"
            size="large"
            endIcon={<Send />}
            sx={{
              height: '3.55rem',
            }}
            onClick={sendMessage}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </FormControl>
  );
};
