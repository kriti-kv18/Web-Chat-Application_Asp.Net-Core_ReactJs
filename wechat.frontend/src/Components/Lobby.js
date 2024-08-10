import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useState } from "react";
import '../App.css';

const Lobby = ({ joinRoom }) => {
    const [user, setUser] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div className="lobby-container">
            <Form className="lobby"
                onSubmit={e => {
                    e.preventDefault();
                    joinRoom(user, room);
                }}>
                <h3 className="lobby-header">Join A Room</h3>
                <Form.Group>
                    <Form.Control className="lobby-input" placeholder='Name' onChange={e => setUser(e.target.value)} />
                    <Form.Control className="lobby-input" placeholder='Room' onChange={e => setRoom(e.target.value)} />
                </Form.Group>
                <Button className="glow-on-hover" variant='success' type='submit' disabled={!user || !room}>JOIN HERE</Button>
            </Form>
        </div>
    );
}

export default Lobby;
