namespace API.Hub
{
    public interface IMessageHubCompany
    {
        Task SendNotificationsToComp(string message);
    }
}
