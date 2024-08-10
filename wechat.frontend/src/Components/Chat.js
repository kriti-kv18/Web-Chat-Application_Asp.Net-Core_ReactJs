import SendMessageContainer from "./SendMessageContainer";
import MessageContainer from "./MessageContainer";
import { Button } from "react-bootstrap";
import ConnectedUsers from "./ConnectedUsers";

const Chat = ({ messages , sendMessage , closeConnection, currentUser, users}) => 
<div>
        <div className="leave-room">
          <Button variant="danger" onClick={() => closeConnection()}>Leave Room</Button>
        </div>
        <ConnectedUsers users={users}/>
        <div className="chat">
            <MessageContainer messages={messages} currentUser={currentUser}/>
            <SendMessageContainer sendMessage={sendMessage} />
        </div>
        
</div>

export default Chat;