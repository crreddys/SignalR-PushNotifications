using System.Threading.Tasks;

namespace SignalRHubApi
{
    public interface ITypedHubClient
    {
        Task BroadcastMessage(string type, string payload);
    }
}
