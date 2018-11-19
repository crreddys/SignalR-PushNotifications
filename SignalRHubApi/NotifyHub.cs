using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace SignalRHubApi
{
    public class NotifyHub : Hub<ITypedHubClient>
    {
        public Task SendMessage(Message message)
        {
            return Clients.All.BroadcastMessage(message.Type, message.Payload);
        }
    }
}
