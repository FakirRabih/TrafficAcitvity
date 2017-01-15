using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Threading.Tasks;
using System.Collections.Concurrent;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;

namespace TrafficAcitvity.Controllers
{

    public class UserContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Connection> Connections { get; set; }
    }

    public class User
    {
        [Key]
        public string UserName { get; set; }
        public ICollection<Connection> Connections { get; set; }
    }

    public class Connection
    {
        public string ConnectionID { get; set; }
        public string UserAgent { get; set; }
        public bool Connected { get; set; }
    }



    public class mapHub : Hub
    {
        //------------------------
        //public void PlaceMarker(string who, string postion)
        //{
        //    var name = Context.User.Identity.Name;
        //    using (var db = new UserContext())
        //    {
        //        var user = db.Users.Find(who);
        //        if (user == null)
        //        {
        //            Clients.Caller.showErrorMessage("Could not find that user.");
        //        }
        //        else
        //        {
        //            db.Entry(user)
        //                .Collection(u => u.Connections)
        //                .Query()
        //                .Where(c => c.Connected == true)
        //                .Load();

        //            if (user.Connections == null)
        //            {
        //                Clients.Caller.showErrorMessage("The user is no longer connected.");
        //            }
        //            else
        //            {
        //                foreach (var connection in user.Connections)
        //                {
        //                    Clients.All(connection.ConnectionID)
        //                        .placeMarker(name + ": " + postion);
        //                }
        //            }
        //        }
        //    }
        //}

        //public override Task OnConnected()
        //{
        //    var name = Context.User.Identity.Name;
        //    using (var db = new UserContext())
        //    {
        //        var user = db.Users
        //            .Include(u => u.Connections)
        //            .SingleOrDefault(u => u.UserName == name);

        //        if (user == null)
        //        {
        //            user = new User
        //            {
        //                UserName = name,
        //                Connections = new List<Connection>()
        //            };
        //            db.Users.Add(user);
        //        }

        //        user.Connections.Add(new Connection
        //        {
        //            ConnectionID = Context.ConnectionId,
        //            UserAgent = Context.Request.Headers["User-Agent"],
        //            Connected = true
        //        });
        //        db.SaveChanges();
        //    }
        //    return base.OnConnected();
        //}


        //public override Task OnDisconnected(bool stopCalled)
        //{
        //    using (var db = new UserContext())
        //    {
        //        var connection = db.Connections.Find(Context.ConnectionId);
        //        db.Connections.Remove(connection);
        //        db.SaveChanges();
        //    }
        //    return base.OnDisconnected(stopCalled);
        //}

        //--------------------------------




        private static readonly ConcurrentDictionary<string, object> _connections =
                   new ConcurrentDictionary<string, object>();

        public void PlaceMarker(string position)
        {
            // string name = Context.QueryString["name"];
            string name = Context.User.Identity.Name;
            Clients.All.placeMarker( name, position);

        }

        public override Task OnConnected()
        {
            _connections.TryAdd(Context.ConnectionId, null);
          // string name = Context.User.Identity.Name;
            return Clients.All.clientCountChanged(_connections.Count);
        }

        public override Task OnReconnected()
        {
            //_connections.TryAdd(Context.User.Identity.Name, null);
            _connections.TryAdd(Context.ConnectionId, null);
            return Clients.All.clientCountChanged(_connections.Count);
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            object value;
            
            _connections.TryRemove(Context.ConnectionId, out value);
            return Clients.All.clientCountChanged(_connections.Count);
        }

        //private readonly static ConnectionMapping<string> _connections = new ConnectionMapping<string>();

        //public void PlaceMarker(string who, string position)
        //{
        //    string name = Context.User.Identity.Name;

        //    foreach (var connectionId in _connections.GetConnections(who))
        //    {
        //        Clients.Client(connectionId).placeMarker(name + ": " + position);
        //    }
        //}

        //public override Task OnConnected()
        //{
        //    string name = Context.User.Identity.Name;

        //    _connections.Add(name, Context.ConnectionId);

        //    return base.OnConnected();
        //}

        //public override Task OnDisconnected(bool stopCalled)
        //{
        //    string name = Context.User.Identity.Name;

        //    _connections.Remove(name, Context.ConnectionId);

        //    return base.OnDisconnected(stopCalled);
        //}

        //public override Task OnReconnected()
        //{
        //    string name = Context.User.Identity.Name;

        //    if (!_connections.GetConnections(name).Contains(Context.ConnectionId))
        //    {
        //        _connections.Add(name, Context.ConnectionId);
        //    }

        //    return base.OnReconnected();
        //}








        ////static List<Users> SignalRUsers = new List<Users>();

        ////public void Connect(string userName)
        ////{
        ////    var id = Context.ConnectionId;

        ////    if (SignalRUsers.Count(x => x.ConnectionId == id) == 0)
        ////    {
        ////        SignalRUsers.Add(new Users { ConnectionId = id, UserName = userName });
        ////    }
        ////}

        ////public override System.Threading.Tasks.Task OnDisconnected()
        ////{
        ////    var item = SignalRUsers.FirstOrDefault(x => x.ConnectionId == Context.ConnectionId);
        ////    if (item != null)
        ////    {
        ////        SignalRUsers.Remove(item);
        ////    }

        ////    return base.OnDisconnected();
        ////}


        ////static List<OnlineUserInfo> UserList = new List<OnlineUserInfo>();

        ////public void Group(string groupid, string usernickname, string userfaceimg, string userid)






        ////public void PlaceMarker(posData data)
        ////{

        ////    Clients.All.placeMarker(data);

        ////}
        ////////public void PlaceMarker(  string position)
        ////////{
        ////////  // var pos = string.Format("{0}: {1}", Context.User.Identity.Name, position);
        ////////   // var pos = string.Format("{0}: {1}", Context.ConnectionId, position);
        ////////    // var pos = new posData { name = Context.ConnectionId, Position = position };

        ////////    string name = Context.User.Identity.Name;
        ////////    // string name = HttpContext.Current.User.Identity.Name;
        ////////    //  Clients.All.placeMarker(name, position);
        ////////    Clients.All.placeMarker(new { name = name, position = position });

        ////////}
    }
}