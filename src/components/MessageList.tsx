import { useCallback, useContext, useState, useEffect } from "react";
import { SocketContext } from "../context/socket";
import React from "react";
import { Message } from "./Message"
import shortid from "shortid"


export const MessageList = () => {
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState([]);

  const addMsg = useCallback(
    (msg: Record<string, string>) => {
      setMessages([...messages, msg]);
    },
    [messages]
  );

  useEffect(() => {
    socket.on("new_msg", addMsg);

    return () => {
      socket.off("new_msg", addMsg);
    };
  }, [addMsg, socket]);

  return (
    <React.Fragment>
      {messages.map(({ message }) => (
        <Message msg={message} key={shortid.generate()} addMsg={addMsg}/>
      ))}
    </React.Fragment>
  );
};
