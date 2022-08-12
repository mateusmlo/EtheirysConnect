import {  Container } from "@mui/material";
import { ConnectionStatusAlert } from "./components/Alert";
import { ChatBox } from "./components/ChatBox";
import { ComposeMessage } from "./components/ComposeMessage";
import { MessageList } from "./components/MessageList";
import { Navbar } from "./components/Navbar";
import { socket, SocketContext } from "./context/socket";

function App() {
  const { Provider, Consumer } = SocketContext;

  return (
    <Provider value={socket}>
      {/*  <Navbar /> */}
      <ConnectionStatusAlert />
      <Container maxWidth="sm">
        <h1>{"Chat beta test"}</h1>
        <ChatBox>
          <MessageList />
          <Consumer>{(ctx) => <ComposeMessage socket={ctx} />}</Consumer>
        </ChatBox>
      </Container>
    </Provider>
  );
}

export default App;
