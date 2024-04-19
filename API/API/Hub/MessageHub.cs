using API.Hub;
using Microsoft.AspNetCore.SignalR;

namespace API.Hub
{
    public class MessageHub : Hub<IMessageHubCompany>
    {
        public async Task SendOffersToUser(string message)
        {
            await Clients.All.SendNotificationsToComp(message);
        }
    }
}