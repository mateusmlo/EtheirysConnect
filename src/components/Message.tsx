import { styled } from "@mui/material/styles";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Avatar, Grid, Paper } from "@mui/material";

export const Message = ({ msg, addMsg }) => {
  
  return (
    <SentItem sx={{ my: 1, mb: 4, p: 2 }}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar>
            <AccountCircle />
          </Avatar>
        </Grid>

        <Grid item xs>
          {msg}
        </Grid>
      </Grid>
    </SentItem>
  );
};

const SentItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#f3e5f5",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  textAlign: "left",
  fontSize: "1.4rem",
  boxShadow: "none",
  color: theme.palette.text.primary,
}));
