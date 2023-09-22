namespace LoginAPI3.Models.UserModels
{
    public class User
    {
        public int Id { get; set; }
        public string userName { get; set; } = string.Empty;
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

       

        public Role? Role { get; set; }
        

        public bool IsDisabled { get; set; }

    }
}
