import '../App.css';
const ConnectedUsers = ({users}) => 
    <div className="user-list">
        <h4>Connected uers</h4>
        {users.map((u, ind) => <h6 key={ind}>{u}</h6>)}
    </div>

export default ConnectedUsers;