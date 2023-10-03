namespace API.Models.UserModels
{
    public class LoggedInUser
    {   
        public int Id { get; set; }
        public int UserRef { get; set; }

        public string userName { get; set; }

        public string Token { get; set; }

        public int RoleREF { get; set; }
    }
}
