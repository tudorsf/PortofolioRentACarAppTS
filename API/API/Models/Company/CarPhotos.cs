namespace API.Models.Company
{
    public class CarPhotos
    {
        public int Id { get; set; }
        public int CarREF { get; set; }

        public byte[] Photo { get; set; }
    }
}
