using System;

namespace WeChatApp
{
    public class ChatMessage
    {
        public int Id { get; set; }
        public string User { get; set; }
        public string Room { get; set; }
        public string Message { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
