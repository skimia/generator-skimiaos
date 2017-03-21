using System;
using System.Collections.Generic;
using ExtCore.Infrastructure;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;<% addLines.deps.forEach(function(newline){ %>
<%- newline %><% }); %>

namespace <%= namespace %>
{
    public class <%= project %> : ExtensionBase
    {
        public override string Name => "<%= namespace %>";<% if (extcore.hasConfigureServices) { %>
        
        public override IEnumerable<KeyValuePair<int, Action<IServiceCollection>>> ConfigureServicesActionsByPriorities
        {
            get
            {
                return new Dictionary<int, Action<IServiceCollection>>()
                {
                    [1000] = services =>
                    {
                        services.AddXxx();<% addLines.services.forEach(function(newline){ %>
                        <%- newline %><% }); %>
                        //...
                    }
                };
            }
        }<% } %><% if (extcore.hasConfigureActions) { %>
        
        public override IEnumerable<KeyValuePair<int, Action<IApplicationBuilder>>> ConfigureActionsByPriorities
        {
            get
            {
                return new Dictionary<int, Action<IApplicationBuilder>>()
                {
                    [1000] = app =>
                    {
                        app.UseXxx();<% addLines.app.forEach(function(newline){ %>
                        <%- newline %><% }); %>
                        //...
                    }
                };
            }
        }<% } %>
    }
}
