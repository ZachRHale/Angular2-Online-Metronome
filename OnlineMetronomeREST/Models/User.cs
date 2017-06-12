using System;
namespace OnlineMetronomeREST.Models
{
    public class User
    {
        public int UserID { get; private set; }
        public string UserName { get; private set; }
        public string UserFirstName { get; private set; }
        public string UserLastName { get; private set; }

        public User(int userid, string username, string userfirstname, string userlastname)
        {
            UserID = userid;
            UserName = username;
            UserFirstName = userfirstname;
            UserLastName = userlastname;
        }
    }
}
