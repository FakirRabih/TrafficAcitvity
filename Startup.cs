using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Owin;

[assembly: OwinStartupAttribute(typeof(TrafficAcitvity.Startup))]
namespace TrafficAcitvity
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            


            // Enable the application to use a cookie to store information for the signed i user
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                LoginPath = new PathString("/Home/Index")
            });

            // Use a cookie to temporarily store information about a user logging in with a third party login provider
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);
            //app.UseMicrosoftAccountAuthentication(new MicrosoftProvider().GetAuthenticationOptions());
            //app.UseTwitterAuthentication(new TwitterProvider().GetAuthenticationOptions());
            //app.UseFacebookAuthentication(new FacebookProvider().GetAuthenticationOptions());
            //app.UseGoogleAuthentication(new GoogleProvider().GetAuthenticationOptions());

            app.MapSignalR();
            ConfigureAuth(app);
        }
    }
}
