using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace WeChatApp.Hubs
{
    public class ChatHub :Hub
    {
        private readonly string _botUser;
        private readonly IDictionary<string, UserConnection> _connections;
        private readonly ChatContext _context;
        public ChatHub(IDictionary<string, UserConnection> connections, ChatContext context) 
        {
            _botUser = "Prompt";
            _connections = connections;
            _context = context;
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                _connections.Remove(Context.ConnectionId);
                Clients.Group(userConnection.Room)
                    .SendAsync("ReceiveMessage", _botUser, $"{userConnection.User} Left the chatroom");


                SendConnectedUsers(userConnection.Room);
        
            }

            return base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(string message)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
                {
                var chatMessage = new ChatMessage
                {
                    User = userConnection.User,
                    Room = userConnection.Room,
                    Message = message,
                    Timestamp = DateTime.Now
                };

                _context.ChatMessages.Add(chatMessage);
                await _context.SaveChangesAsync();

                await Clients.Group(userConnection.Room)
                        .SendAsync("ReceiveMessage", userConnection.User, message);
                }
        }

        public async Task JoinRoom(UserConnection userConnection)

        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);

            _connections[Context.ConnectionId] = userConnection;

            await Clients.Groups(userConnection.Room).SendAsync("ReceiveMessage", _botUser,
                $"{userConnection.User} has joined the {userConnection.Room} Chat Room");


            await SendConnectedUsers(userConnection.Room);
        }

        public Task SendConnectedUsers(string room)
        {
            var users = _connections.Values
                .Where(c => c.Room == room)
                .Select(c => c.User);

            return Clients.Group(room).SendAsync("UsersInRoom", users);
            
        }
    }
}
