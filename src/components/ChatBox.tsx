import { Box, Paper } from "@mui/material"
import { useContext } from "react"
import { SocketContext } from "../context/socket"

export const ChatBox = ({children}) => {
  const socket = useContext(SocketContext);

  return (
    <Box>
      <Paper elevation={3} sx={{p: 3}}>
        {children}
      </Paper>
    </Box>
  );
}