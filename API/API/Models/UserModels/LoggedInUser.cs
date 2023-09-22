namespace LoginAPI3.Models.UserModels
{
    public class LoggedInUser
    {
        public int Id { get; set; }

        public string userName { get; set; }
        public string token { get; set; }

        public int UserRef { get; set; }

        public int RoleRef { get; set; }


    }
}
