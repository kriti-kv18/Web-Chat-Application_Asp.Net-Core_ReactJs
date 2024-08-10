import { Form, Button, FormControl, InputGroup } from 'react-bootstrap';
import { useState } from 'react';
import '../App.css';

const SendMessageContainer = ({ sendMessage }) => {
    const [msg, setMessage] = useState('');

    return <Form
        onSubmit={e => {
            e.preventDefault();
            sendMessage(msg);
            setMessage(" ");
        }}>
        <InputGroup>
            <FormControl type="user" placeholder="Type the message..." onChange={e => setMessage(e.target.value)} value={msg} className="message-input" />
            <Button variant="success" type="submit" disabled={!msg} className="send-button">Send</Button>
        </InputGroup>
    </Form>
}

export default SendMessageContainer;