using System.Collections.Generic;

namespace <%= namespace %>.Configuration
{
    public class <%= project %>Options
    {
        public static readonly string DefaultOption = "opt1";

        public string Option { get; set; } = DefaultOption;
    }
}
