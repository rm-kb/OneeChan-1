(function()
{
  var defaultConfig =
  {
    "--Main Rice--":                     [ "header",  "" ],
    "Left Margin":
    [
      5, "Change the size of the left margin.",
      [
        { name: "Large",    value: 65 },
        { name: "Medium",   value: 25 },  
        { name: "Small",    value: 5  },
        { name: "None",     value: 0  },
        { name: "Custom",   value: 999  }
      ], true
    ],
    "Custom Left Margin": 
    [ 
      0, 
      "Left margin custom width (pixels)", 
      "Left Margin", 
      999,
      true
    ],
    "Right Margin":
    [
      5, "Change the size of the right margin.",
      [
        { name: "Large",    value: 65 },
        { name: "Medium",   value: 25 },
        { name: "Small",    value: 5  },
        { name: "None",     value: 0  },
        { name: "Custom",   value: 999  }
      ], true
    ],
    "Custom Right Margin": 
    [ 
      0, 
      "Right side margin custom width (pixels)", 
      "Right Margin", 
      999,
      true
    ],
    "Underline Links":    [ false, "Underlines links" ],
    "Expanded Images Cover QR": [ false, "Lets expanded images overlap the quick reply" ],
    "Show Banner":              [ true,  "Toggle visibility of the logo banner", null, true ],
    "Show Banner Reflection":     [ true,  "Toggle visibility of the logo banner reflection", "Show Banner", true, true ],
    "Reduce Banner Opacity":       [ false, "Reduce the opacity of the logo for easier viewing", "Show Banner", true, true ],
    "Show Board Name":          [ true,  "Toggle visibility of the board name", null, true ],
    "Show Text Board":          [ true,  "Toggle visibility of the text board link", "Show Board Name", true, true ],
    "Show Reply to Thread Button": [ true, "Toggle visibility of the Start a Thread / Reply to Thread button"],
    "Show Checkboxes":          [ false,  "Hides checkboxes and deleteform to be replaced by 4chan X menus" ],
    "--Sidebar--":                     [ "header",  "" ],
    "Sidebar Position":
    [
      3, "Change the position of the sidebar",
      [
        { name: "Right",    value: 1 },
        { name: "Left",     value: 2 },
        { name: "Disabled", value: 3 }
      ], true
    ],
    "SS-like Sidebar":          [ false, "Optionally darkens the sidebar and adds a border like 4chan Style Script" ],
    "--Replies--":              [ "header",  "" ],
    "Fit Width":                [ false,  "Makes the replies stretch to the width of the page" ],
    "Style Post Info":          [ true, "Separate the post info by the post info colors defined in themes" ],
    "Allow Wrapping Around OP": [ true, "Allow for replies to wrap around the OP instead of forced onto their own line. "],
    "Rounded Corners":          [ false,  "Styles a few elements to have subtly rounded coreners" ], 
    "Recolor Even Replies":       [ false,  "Makes every other post a darker color. Not compatible with Quote Threading." ],
    "Backlink Icons":          [ false,  "Use icons for backlinks instead of text." ],
    "Backlinks on Bottom":          [ false,  "Move backlinks to the bottom right of replies." ],
    "Borders":
    [
      1, "Changes which sides of replies have borders",
      [
        { name: "Normal",      value: 1 },
        { name: "On all sides",          value: 2 },
        { name: "None", value: 3 }
      ]
    ],
    "Margin Between Replies":
    [
      -2, "Change the position of 4chan x backlinks",
      [
        { name: "Large",      value: 6 },
        { name: "Normal (4chan default)", value: '' },
        { name: "Minimal",  value: -2 },
        { name: "None",  value: -4 },
        { name: "Overlapping Borders", value: -5 }
      ]
    ],
    "--Quick Reply--":                  [ "header",  "" ],
    "Autohide Style":
    [
      1, "Changes the style of the quick reply.",
      [
        { name: "Normal",      value: 1 },
        { name: "Vertical Tabbed",          value: 2 },
        { name: "Fade", value: 3 }
      ]
    ],
    /*"Expanding Form Inputs":    [ false,  "Makes certain form elements expand on focus" ],*/
    "--Font--":                     [ "header",  "" ],
    "Font Family":
    [
      "sans-serif", "Set the default font family",
      [
        { name: "Default",       value: "sans-serif"    },
        { name: "Monospace",     value: "monospace"     },
        { name: "Ubuntu",        value: "Ubuntu"        },
        { name: "Consolas",      value: "Consolas"      },
        { name: "Droid Sans",    value: "Droid Sans"    },
        { name: "Segoe UI",      value: "Segoe UI"      },
        { name: "Calibri",       value: "Calibri"       },
        { name: "Arial",         value: "Arial"         },
        { name: "Lucida Grande", value: "Lucida Grande" },
        { name: "Helvetica",     value: "Helvetica"     }
      ]
    ],
    "Font Size": [ 13, "Set the general size of text (Pixels)" ],
    "Bitmap Font": [ false, "Check this if you are using a bitmap font" ],
    "Themes"          : [],
    "Hidden Themes"   : [],
    "Selected Theme"  : 1,
    "NSFW Theme"      : 8,
    "Selected Mascots": 1,
    "Mascots"         : [],
    "Hidden Mascots"  : []
  },
  MAX_FONT_SIZE = 18,
  MIN_FONT_SIZE = 10,
  NAMESPACE     = "OneeChan.",
  VERSION       = "<%= version %>",
  inputImages   = "iVBORw0KGgoAAAANSUhEUgAAAAgAAAAgCAYAAAAv8DnQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAP9JREFUOMvV0CFLQ2EYxfHfrtdiURgbmCxOmFPBJgZZ0CQD0Q+goFkwabWIyWIWFgwmy7Qp7DPI3GD7ACZlYLNcy31ljG0aDHrSy3N43nOef6ZULBiifczEQ8wV7OAtGmBO4wgfOI2whsXUnMAJ8rhCJ8IxDpHDHpZwixqM5XPZBBtYxioauEgjRLjBI2bRxTneQ6EYCS4xiTu89DbONJrtP88hwnV64hm28YRqyPsFDkmSGKUYFubnsqignM7rqDWa7dcAqoLdnsXwrgZQ5QG/l8MVIxX1ZPar/lUyUOsv+aMzv+0Qw3OrM4VNrKfzB9yXioVu6LDVx+EA4/+Gwycw/Uz36O07WwAAAABJRU5ErkJggg==",
  defaultIcons  = "iVBORw0KGgoAAAANSUhEUgAAAGAAAAAgCAYAAADtwH1UAAAAAXNSR0IArs4c6QAAD+FJREFUaN7tWQlUU0cXzoIWl1ZBBLeqDQUVsSjUpdW6V1FRXEAri1JlcQGkYGkVadGqRSnFfWMR/asiiCACxYggS5XlgSwKBgiIAkZZ1KJCLHj/uU/z+pIGoZr+/XtO55zvvJu595vMu3dm3ssXDucf3iYFS0wmH71PEbh1lIOxyEHu/+VNJfnwTZJ9+O4EO17CHfted7xqLncCQcRtLvcTVc/1k8Aa6nA1gOXZehGx6SJMOFxlMpGVXLSx72W8G8YiB7mqmMNpDqd7OIfjQSAkoNoBxnggR+lgcRv4o1N/eDewNuebyvy4NfcRaGMf+l6zABEQFgalXG50Hpc7SZUFIIl1szhbJ9pfBTA//L7o44O3t+F1Usg9Jrlos337SKxlVINI2a4hsaYEh9vdeayYMJLQqwYG4gcrV0qfuLhAW3js7AwNK1ZIfxk2TIwcpQOHu/M23s3YVBOzc9wNX2vubgTa2Ie+10nSHS43Evz9oWXvXrjK5SYkcLnTVFmEcQdvu5mFSUS+FaQIgflwiKzusQcqmQKgfaDqhQ9jMBY5iuOMP3THdPzhKgrxqu8jcRvZMSfIqq6zs5PesbaGjuCutbUUOUoHD17NO1iTubV1n0PnC7I+tLEPfa9z/JRzuVFSHx+oNDeHMgsLINsvPZDDmYn+bt26LVVXV//qdYBc2fcY+hVtMycJ9i4DWJP5tPED/2ImQWhjH/owBmMV5zlmd5npmD1i+jjDq6x/9K5SNQINgqEEM4nP3/RYVQ65xstijpOj5f6KFVBM7q8juG1lBchRmrBddtz/lAo9YZ89N4YpALHFiV8D+l7n7IegIKiztYUb06ZBlZkZPFi8GA68nICBgYFHeXk5vA6Qi2MM/jbLZMyhEtHeOwB26Y8bd5Or7pYc5gbR9q984fMjV4xFjsxvtOO66cidN+jk+xW3ANoyGP9QlDN+b0n+zJCK4iVnam55pDY+WnWhvpb4/GX8EHIvmNSsqVM7hKJ58yBEsQDJm/mrhd78gO1LOWFUuAMccuRGBq3mnv5uCScL7bjdcwB90Z68wIvf8F3aSPhmTDgCjx0882XJryITJNvuShCHk4nJ38/hmCJnxowZ627fvg1JSUkQEBBAA23saw/IxTEGeF0x6bchnWKj/8ZfmDMabUU/ctA31CfbdNhmijpIiuae9Bg2XnkKW3KbYXNOM/hQzfBtdhNsymiCr9OfwvrLT2B9SmPLxwHXCw225DDPwyPkfm7Onw/JY8cyEBobQ/SQIXBywAAI1daGIE1NGmjHDR8OR5QUwA/unYBnFUHwuHgfNOT+AJKr30Fx7DIoFy4DSeoy+DVrGfxWtAJIAXYpK0AyGRQftvDjj9CyfTv86unJJJ9kI1uWdHZbsGCBy927d2Hbtm1QUlJCA23saw/IfdPnh+CrVGpvRSusin0gh8+ja8Hi1B2YFVIC0w7dgCn7C2B2cFHLOD9KTDgb2GPggiqYPRsumphAc3MzvTtzc3MhPz8fysrKQCKRQENDA41jGhpw5t13mRNArgBZ4Y6Qe2YVFEQ7Q+E5V8g7uwaSgy0hNdQSsk5YQmGEJZQnWLVZgESS4AQy8PPAQGiws4OyWbPgxsyZ9JmvLPnYbGxsnOvr68HLy4ueLEVR9C7AvvaA3DctwIB1QtP+rheonUXPwDGmAZwSHsHiCw9hckwdjI+qhXGR92HMqWqpyaGbdbobUwpJ7IaBHpe6ssfYQ+45d8YMiNPXh7y8PPoelCUfEU4KEN2nD+z5K3YANmsO5/NzZPBad3fIHTMGbk6ZAnjstBXv4OCwprGxkT523AnH19cXVq5cSa8g7H8VkItj9F0bb9LPJYGSg/PPzBGEtqIfOTJ/b4doUy37KMqZegaGl1oAbRayCeIJ/Emc0tdw8jCgrn74IcSSIyaMJPhViCWI19ICf8UCkPN/Z0d3QPxGfkAb+XybwCk9PR3Iey5VNmcOSMhT/0BbT3zSXF1dV+O2ZaOgoACsyLGl2K8I5OIY2k4xJgO800X21wGGRdQ2Li8A6O14jvlOtBflvvDNowAwFjnsebxjc8r0beuTlHEaAF7/zC7aQe4vQyCAJJLcDoEUaodiTo468r7v6A4IcuDtVJwEl8vlE1gWFxc38fl8r0U83upQ8iUNlpaw/xUF8PT0XNXa2gqvA+TKxum5PHybyc4MEFwCGHjyfmNPuwjmO9HGPvRhDMYqm0sXy1BTdYujFOLPFGArHkHkYZtBkttRbFXMyaY5XP+O7gCv2dw/7AAejzfl1KlT2Wpqao4EGvRvCnLuH37xxtPmL8tNmzbN9fb2dnodIBfH6G51wq2He6JIRwgwiiR48lUA0sfcINomaS98GIOxyFE2HzXzI6YEh/9MAbzJAZKtrS3NJ4ntCDJ69JB6K/4QWzmWGwr1p6Hl7k/QjLugaB88vOYH5YmOUJXqCHVZjvC4wBFaShwBY9lcsuJHmJmZBZPEmxHw/5e6FVmtblpfJIh0kwC6uvws6rL42Da8qluGMgVAm+3TJkV4e12CCLmqmAN5FfPYq64upnr2lIpIgl8FiiR/z1tviV0UpYjFhpz9Vkac8/ZjOSGeM7h7fZdw9+9bwT2+ZATnEkEi4rOXWPoBx09u1aip7SAY9XcIh53mB1IjUsiqdo4VdVoQRCe088JgE4Qshv0ZY7qsiRVpXQBArirmYE82mS1JKIGQgGoHGONh35YY909r/HmHTXhmByne3EMdXs0Yixzkcv5t/7Y31rPflM83utCNP1K4huAMwaV2cIaOJRwZf/rx2msWZxsemIfXSxZGNvw6NfRePPkPQIv1f0CXySGS7XNP10sXRTbcW3CmvmH2ybpK1SWwd3dOeG8PAiEB1Q6EdCxy2tKzW7/8EuCrrxg8J5LCbx4etKatTM9+Uz2cb5Sw1sS6oNB196Mmz0NPQR5P4MuDL7D+wBNY++PDplFL8wuRI+ObR9Q+CK0D2FXe0vot9ahlamhNwEcH7zC/VomtNjGoeoVLcsOjfRXPIPgegEtq43OVFSBMy+P9lLFii1uOUttqV2DDpspFDosq7KW6yWPEyOEo07OlX3wB5URGiJk+HY4SUQkRQ1TM0mXL6CTWkKuinv2mejh/RFykc8DDpuWb7wIb891v0lDsd/CtbUKOjP/p8WqJf3nrc6+MOjA/KpIY766wG+VX1EXmJ8olz3iXeNL0I2W57knVEFD+DGzjGh6rrAAntISLyu2l84qWAxuTrs6nodhvXmInRQ5HUc/GBONKP0cSnrp1KzQ/ekSjMiUFIoiEnDZ3LtQSmaDKxkZOz1bUw7EpauDsPkU9nG8Yk+y66wEs2VDBYLZzAcga2myfw/cSQI6MPyW44levzIZm0yPX724sbn2+8IykZKRfsaPRjhvdSfLVjHYWTZ8ReueqR96z5zbn7zTYRVU8sI2vBZUV4HgvanG5E8zIXcLgo5TZzPzRZvvMi+0AORy2nt24di2ISGLPEb0a7cNE2StLSGAGeUrELyxCDpFdK5culdOz2Xo4u8n0b8U+RT2cbxCVvGqnBOa5FTGY7kgxHLTZPptvbgFyZHy9bdfihu4sDHhvyzW7acfEJT5EWLMIr64c9l2+5fCtBYJpR8R5X+c1gVW8pG6QT663/vcFbkN98xNVVoAQTQqT+skv8xiYXJzOzB9ttm/mtc8AORy2no1JjyLCGa58TH41KYZiEXAnnCACWxaJY+vZbD08QleXjm1qaqKVQJRmS0tLQSwWQyD5IaJMD+cNibhst+U2zFx9jcF42zSora2ldX9907Pw/oxIGkNmR8OE5amAHEZS3pLTm6Azrf17XXWadlR0e6Xw3tP3vLJs3vfO1pt1XFxpFVfdRHzbBVtyNTHuvc05OiorwBENala+FYxJmgkj4ibS0D87lpm/VrAeaAbq0tA+OgSGnvsIkCOnZz9wcoIQklw8cjDpmPycyZPlioC+IPI5mfzZwBbY2Hp4wgcfwNFevRg9vKioiJZlQ0jyj72Eoh7O0zuVYu0tplc6imyxl4pBf1YMEF2J5uqZnoO4pJt0QfVnx4Kx5SVAjlJ52TOFp+mauFjTJdFa1tfHPXl8j7XCtf2+vNzrL3mNPNCTmk5ZwvDzE+j5V1ZWwo0bN5j537p1C6qqquj5a4QKoH+4ISBHTs+WkAdv8OjRdJKxyYqQPmoUUwT0BRL7op6enJ7N1sMjiNSKmjc7+bgKsE8GRT2cp/uflCUbSmD88gy4fv06FBYWQkRsLjN5WfLr6urAYH4SjFqcBshpKx/918Tr6jjF6sk+910Vq91vVZxhvzVxnf6SAuzpQU3JXAiCKBNm/sqSj/PXOCkAnaihgBw5PbuU/FcbRgqAx4ysyYqQQo4VvOLxdGzECBD27SunZ7P18Fglya+pqYH79+/TPmV6OG/w0dQ5627CyKXZMMw8sc3Jo8/os2wwtqYAOTK+lkN0l14rz3Lp1b7q/KeGW67kfbi7oFLb8fx4HZL8IT5XkowD8uv7ro51IHHqNMc+qqvKCuD/DjUybQpoxuqCRpjgBX4SMPNHm+mPFYBWnB4gR07Pzh85EpKNjOgHLT5wFYuQSlYtXs+T40NRz2br4ezkR5LPCEy+7B8hZXo4b2Bg2lTnchhtd5OG4aK0PyQf+2R+BHJk/F4O0dt62kev6Gl7euIgr9QrMy8+hGk/iZ++YxOxVsMu0nC4b1ad6eWnoOt3rYzE2Gp8HvmplmOMn8oKsONtavCVUaCRJPgdcYLfj504gZxPM0kXkCOnZ18bOBDyBg+G8wYGdBFwJ8heQ2UP5rb0bLYeHkOAyY9hxaKNyY9pg8/rfyB9qqsEPnaqZmC0JJNJPtpsHwI5zBnv9rN0dJCoYcB6Yc67YfXPhx4pqdMkmj9Z5X21VkZ10bSLcBi4NVMsiHoE/TZnluhvzxT325qlutfQrd2pftRw0MgQ/I5Ewe/HTqJA3keAnD/o2QXk4XldRwdSBg2CMPKmEkwetgi0L5MEt6VnK+rh8Uo08PhX6OE8nV3nJ6y+2zxx3SNgY5TVNRqK/eMcapqRwxxB6+LvjU59DnonJTBgT/HDTvODvdUtQrVl/m5LjnfuPD94ubZ3eumwM3WgH/8UevvlN6msAN5dhb2z9KQa+SS5bMS/hEJ/j4zBUuSoTM9+Uz73HR+3fiYRpRNW1zVPXf8MXoXxJKaPcUQpcpg/XFbF1GtfBtCMb4Xh+643cheGrOOZHeDKKaDmgZ/qfJNW0T9WCurkv4Pu3+X8prICuHT2UN+jKe5JDZZqiEiSX4Ee1CDpW3t6ipGjMj37TfncLhu6czq5uxMkEGS3A4xxpzkvW1ebk7f6+OW0dt6Q9kSTHC1ci9BLamYHezP/V8w91IW/IMiv8/ok6LyZan7r28zf1F3iG1VWAHu17hxbngeBkIBqB0I6Fjn/tr+//RcxnKd6I69GhwAAAABJRU5ErkJggg==",
  fontListSWF   = "http://ahodesuka.github.com/FontList.swf",
  themeInputs   =
  [
    { dName: "Reply Background", name: "mainColor",   property: "background-color" },
    { dName: "Reply Border",     name: "brderColor",  property: "border-color"     },
    { dName: "Input Background", name: "inputColor",  property: "background-color" },
    { dName: "Input Border",     name: "inputbColor", property: "border-color"     },
    { dName: "Header Background", name: "headerBGColor",   property: "background-color" },
    { dName: "Header Text",     name: "headerColor", property: "color"     },
    { dName: "Board Title",     name: "boardColor", property: "color"     },
    { dName: "Body Background",  name: "bgColor",     property: "background-color" },
    { dName: "Text",             name: "textColor",   property: "color"            },
    { dName: "Backlink",        name: "blinkColor",  property: "color"            },
    { dName: "4chan X Link",    name: "jlinkColor",  property: "color"            },
    { dName: "Header Link",            name: "headerLColor",   property: "color"            },
    { dName: "Header Link Hover",            name: "headerLHColor",   property: "color"            },
    { dName: "Link",            name: "linkColor",   property: "color"            },
    { dName: "Link Hover",    name: "linkHColor",  property: "color"            },
    { dName: "Name",            name: "nameColor",   property: "color"            },
    { dName: "Tripcode",        name: "tripColor",   property: "color"            },
    { dName: "Subject",           name: "titleColor",  property: "color"            },
    { dName: "Greentext",           name: "quoteColor",  property: "color"            }
  ],
  $lib, $SS;

  if (!Array.isArray)
    Array.isArray = function(arg){ return Object.prototype.toString.call(arg) === "[object Array]"; };

  Number.prototype.toHexStr = function()
  {
    var s = "", v;

    for (var i = 7; i >= 0; i--)
    {
      v = (this >>> (i * 4)) & 0xf;
      s += v.toString(16);
    }

    return s;
  };

  /* STYLE SCRIPT LIBRARY */
  /* More or less based off jQuery */
  $lib = window.$ = function(selector, root)
  {
    return this instanceof $lib ?
      this.init(selector, root) : new $lib(selector, root);
  };

  /* From 4chan X, unchainable */
  $.asap = function(test, cb) {
    if (test()) {
      return cb();
    } else {
      return setTimeout($.asap, 25, test, cb);
    }
  };

  $lib.prototype =
  {
    constructor: $lib,
    elems: [],
    length: function(){ return this.elems.length; },

    /* CONSTRUCTOR */
    init: function(selector, root)
    {
      if (selector == null || selector == undefined) return this;

      if (selector.constructor === $lib) return selector;
      else if (typeof selector === "string")
      {
        var root = root || document;
        var tagCheck = /^<(\w+)([^>]*)>(.*)$/.exec(selector); // No closing tag for root node.

        if (root.constructor === $lib)
          root = root.get();

        if (tagCheck)
        {
          var tag = document.createElement(tagCheck[1]);

          if (tagCheck[2])
          {
            var attribs, atRegEx = /(\w+)=((?:"(?:[^"]+)"|'(?:[^']+)'|(?:\w+)))/g;
            while ((attribs = atRegEx.exec(tagCheck[2])) != null)
            {
              var val = attribs[2];
              if ((val[0] == '"' || val[0] === "'") && val[0] == val[val.length-1])
                val = val.substr(1, val.length-2)

              tag.setAttribute(attribs[1], val);
            }
          }

          tag.innerHTML = tagCheck[3];

          this.elems = [ tag ];
        }
        else if (/^#[\w-]+$/.test(selector) && root == document)
        {
          var el;

          if ((el = document.getElementById(selector.substr(1))) != null)
            this.elems = [ el ];
        }
        else
        {
          var results = root.querySelectorAll(selector);
          this.elems = Array.prototype.slice.call(results);
        }
      }
      else if (selector.nodeType)
        this.elems = [ selector ];
      else if (Array.isArray(selector))
        this.elems = Array.prototype.slice.call(selector);

      return this;
    },

    /* DOM NODE RETRIEVAL */
    clone: function()
    {
      var ret = [];

      this.each(function(){ ret.push(this.cloneNode(true)); });

      return new $lib(ret);
    },
    elements: function()
    {
      if (!this.hasSingleEl())
        return this;

      this.elems = Array.prototype.slice.call(this.elems[0].elements);

      return this;
    },
    get: function(index)
    {
      if (index == undefined && this.elems.length === 1)
        return this.elems[0];
      else if (index == undefined && !this.hasSingleEl())
        return this.elems;

      return this.elems[index];
    },

    /* DOM MANIPULATION */
    prepend: function(el)
    {
      if (el.constructor === $lib)
        el = el.get();

      return this.each(function(){ this.insertBefore(el, this.firstChild); });
    },
    append: function(el)
    {
      if (el.constructor === $lib)
        el = el.get();

      return this.each(function(){ this.appendChild(el); });
    },
    before: function(el)
    {
      if (el.constructor === $lib)
        el = el.get();

      return this.each(function(){ this.parentNode.insertBefore(el, this); });
    },
    after: function(el)
    {
      if (el.constructor === $lib)
        el = el.get();

      return this.each(function()
      {
        if (this.nextSibling != null)
          this.parentNode.insertBefore(el, this.nextSibling);
        else if (this.parentNode != null)
          this.parentNode.appendChild(el);
      });
    },
    replace: function(el)
    {
      return this.each(function()
      {
        $(this).before(el).remove();
      });
    },
    html: function(html)
    {
      if (html == undefined)
        return this.elems[0].innerHTML;

      return this.each(function(){ this.innerHTML = html; });
    },
    text: function(text)
    {
      if (this.length() === 0)
        return;

      if (text == undefined)
        return this.elems[0].textContent;

      return this.each(function(){ this.textContent = text; });
    },
    appendText: function(text)
    {
      return this.each(function(){ this.textContent += text; });
    },
    attr: function(name, val)
    {
      if (val == undefined)
        if (!this.hasSingleEl())
          return this;
        else
          return this.elems[0].getAttribute(name);
      else if (val === "")
        return this.each(function(){ this.removeAttribute(name); });

      return this.each(function(){ this.setAttribute(name, val); });
    },
    disabled: function(bDisabled)
    {
      if (bDisabled == undefined)
        return this.elems[0].disabled;

      return this.each(function(){ this.disabled = bDisabled; });
    },
    toggle: function(bHidden)
    {
      return this.each(function()
      {
        var $this = $(this);

        if (bHidden == undefined)
          bHidden = !($this.attr("disabled") === "true");

        $this.attr("hidden", bHidden || "");
      });
    },
    hide: function()
    {
      return this.toggle(true);
    },
    show: function()
    {
      return this.toggle(false);
    },
    val: function(val)
    {
      if (val == undefined)
      {
        var el = this.elems[0];

        if (el == undefined)
          return false;

        switch(el.type)
        {
          case "checkbox":
          case "radio":
            return el.checked == true;
          default:
            if (/^\d+$/.test(el.value))
              return parseInt(el.value);
            return el.value;
        }
      }

      return this.each(function()
      {
        switch(this.type)
        {
          case "checkbox":
          case "radio":
            this.checked = val;
            break;
          default:
            this.value = val;
            break;
        }
      });
    },
    checked: function(state)
    {
      return this.each(function(){ this.checked = state; });
    },
    addClass: function(classNames)
    {
      return this.each(function()
      {
        classNames = classNames.split(" ");
        for (var j = 0, jMAX = classNames.length; j < jMAX; j++)
          if (!$(this).hasClass(classNames[j]))
            this.className += (this.className ? " " : "") + classNames[j];
      });
    },
    hasClass: function(className)
    {
      if (!this.hasSingleEl() || this.elems[0].className == undefined)
        return false;

      var regx = new RegExp("\\b" + className + "\\b");

      return regx.test(this.elems[0].className);
    },
    removeClass: function(classNames)
    {
      return this.each(function()
      {
        classNames = classNames.split(" ");
        for (var j = 0, jMAX = classNames.length; j < jMAX; j++)
          if ($(this).hasClass(classNames[j]))
          {
            var cclassNames = this.className.split(" ");
            this.className = "";

            for (var k = 0, kMAX = cclassNames.length; k < kMAX; k++)
              if (classNames[j] !== cclassNames[k])
                this.className += (this.className ? " " : "") + cclassNames[k];
          }
      });
    },
    toggleClass: function(classNames)
    {
      return this.each(function()
      {
        classNames = classNames.split(" ");
        for (var j = 0, jMAX = classNames.length; j < jMAX; j++)
          if (!$(this).hasClass(classNames[j]))
            $(this).addClass(classNames[j]);
          else
            $(this).removeClass(classNames[j]);
      });
    },
    optionClass: function(optionName, optionValue, className) {
      return this.each(function()
      {
        if ($SS.conf[optionName] === optionValue && !$(this).hasClass(className))
          $(this).addClass(className);
        else if ($SS.conf[optionName] !== optionValue && $(this).hasClass(className))
          $(this).removeClass(className);
        else
          return
      });
    },
    remove: function()
    {
      return this.each(function(){ this.parentNode.removeChild(this); });
    },

    /* DOM TRAVERSING */
    parent: function()
    {
      if (!this.hasSingleEl()) return this;

      return new $lib(this.elems[0].parentNode);
    },
    children: function(selector)
    {
      if (!this.hasSingleEl())
        return this;
      else if (selector == null)
        selector = "*";

      return new $lib(selector, this.elems[0]);
    },
    nextSibling: function(selector)
    {
      if (!this.hasSingleEl() ? true : this.elems[0].nextSibling == null)
        return new $lib(null);

      if (selector != undefined)
      {
        var t, m = new $lib(selector, this.elems[0].parentNode),
          s = this.elems[0].parentNode.childNodes;

        for (var i = s.length - 1; i >= 0; --i)
        {
          if (s[i] === this.elems[0] && t == undefined) // end and no matching siblings
            return new $lib(null);
          else if (s[i] === this.elems[0] && t != undefined) // end and matched sibling
            return new $lib(t);
          else if (m.elems.indexOf(s[i]) !== -1) // this element matches the selector
            t = s[i];
        }
      }

      return new $lib(this.elems[0].nextSibling);
    },
    previousSibling: function(selector)
    {
      if (!this.hasSingleEl() ? true : this.elems[0].previousSibling == null)
        return new $lib(null);

      if (selector != undefined)
      {
        var t, m = new $lib(selector, this.elems[0].parentNode),
          s = this.elems[0].parentNode.childNodes;

        for (var i = 0, MAX = s.length; i < MAX; ++i)
        {
          if (s[i] === this.elems[0] && t == undefined)
            return new $lib(null);
          else if (s[i] === this.elems[0] && t != undefined)
            return new $lib(t);
          else if (m.elems.indexOf(s[i]) !== -1)
            t = s[i];
        }
      }

      return new $lib(this.elems[0].previousSibling);
    },

    /* EVENT METHODS */
    bind: function(type, listener)
    {
      return this.each(function(){ this.addEventListener(type, listener, false); });
    },
    unbind: function(type, listener)
    {
      return this.each(function(){ this.removeEventListener(type, listener, false); });
    },
    fire: function(evnt)
    {
      var ev = document.createEvent("HTMLEvents");

      return this.each(function()
      {
        ev.initEvent(evnt, true, true);
        this.dispatchEvent(ev);
      });
    },
    blur: function()
    {
      return this.each(function(){ this.blur(); });
    },
    click: function()
    {
      return this.each(function(){ this.click(); });
    },
    scrollIntoView: function(alignWithTop)
    {
      return this.each(function(){ this.scrollIntoView(alignWithTop); });
    },

    /* HELPER METHODS */
    delay: function(func, time)
    {
      return this.each(function()
      {
        var $this = this;
        setTimeout(function()
        {
          func.call($this);
        }, time);
      });
    },
    each: function(func, args)
    {
      if (args != null && !Array.isArray(args))
        args = [ args ];

      for (var i = 0, MAX = this.elems.length; i < MAX; ++i)
        func.apply(this.elems[i], args || [ i ]);

      return this;
    },
    exists: function()
    {
      return this.elems.length > 0;
    },
    hasSingleEl: function()
    {
      return this.elems.length === 1;
    },

    riceCheck: function()
    {
      return this.each(function()
      {
        var click =  function(e){ e.preventDefault(); this.previousSibling.click(); };
        if (this.isRiced) return;
        else if (this.nextSibling != undefined && this.nextSibling.className === "riceCheck")
          return $(this.nextSibling).bind("click", click);

        var div = $("<div class=riceCheck>").bind("click", click);
        $(this).hide().after(div);

        return this.isRiced = true;
      });
    },

    jsColor: function()
    {
      return this.each(function()
      {
        this.color = new $SS.jscolor.color(this);
      });
    }
  };
  /* END STYLE SCRIPT LIBRARY */

  /* STYLE SCRIPT CLASSES & METHODS */
  $SS =
  {
    browser: { },
    DOMLoaded: function(reload)
    {
      $SS.classes.init();

      if ($SS.location.sub === "sys") // fix for firefux on report popups that have setTimeout.
        document.head.innerHTML = document.head.innerHTML;

      var div;

      if (reload !== true)
      {
        $SS.options.init();

        $(document).bind("QRDialogCreation", $SS.QRDialogCreationHandler);

        var MutationObserver = window.MutationObserver;
        var observer = new MutationObserver(function(mutations) {
          var i, j, MAX, _MAX, nodes;

          for (i = 0, MAX = mutations.length; i < MAX; ++i) {
            nodes = mutations[i].addedNodes;

            for (j = 0, _MAX = nodes.length; i < _MAX; ++i)
              $("input[type=checkbox]", nodes[j]).riceCheck()

          }
        });

        observer.observe(document, { childList: true, subtree: true });

        if ((!(html = $("*[xmlns]")).exists()) && (!(ctxmenu = $("#ctxmenu-main").exists())))
          if ((link = $("*[rel='stylesheet']")).exists())
            link.each(function() { $(this).attr("href", ""); });

        if ((div = $("#globalMessage *[style]")).exists())
          div.each(function() { $(this).attr("style", ""); });

        if ((div = $(".closeIcon")).exists()) {
          div.text("x");
        };

        // things that need to change after 4chan X loads.
        setTimeout(function() {
          if (!$SS.QRhandled && (div = $("#qr")).exists())
            $SS.QRDialogCreationHandler({ target: div });
        });

      }
      
      $SS.pages.init();

      $SS.riceInputs.init();
      $SS.logoReflect.init();
    },
    init: function(reload)
    {
      if (!reload)
      {
        if (/^about:neterror/.test(document.documentURI)) return;
        localStorage["4chan-settings"] = "{ \"disableAll\" : true }";

        var m_VERSION;
        $SS.browser.webkit = /AppleWebKit/.test(navigator.userAgent);
        $SS.browser.gecko  = /Gecko\//.test(navigator.userAgent);
        $SS.location       = $SS.getLocation();

        // correct selected theme/mascot after updating
        // and the number defaults has changed.
        if ((m_VERSION = $SS.Config.get("VERSION")) !== VERSION)
        {
          var ntMascots = $SS.Mascots.defaults.length, // new total
            ntThemes  = $SS.Themes.defaults.length,
            otMascots = $SS.Config.get("Total Mascots"), // old total
            otThemes  = $SS.Config.get("Total Themes"),
            sMascots  = $SS.Config.get("Selected Mascots"),
            sTheme    = $SS.Config.get("Selected Theme");

          if (otMascots !== ntMascots && otMascots != undefined)
          {
            var mDiff = ntMascots - otMascots;

            for (var i = 0, MAX = sMascots.length; i < MAX; ++i)
              if (sMascots[i] < otMascots) break;
              else sMascots[i] += mDiff;

            $SS.Config.set("Selected Mascots", sMascots);
          }

          if (otThemes !== ntThemes && otThemes != undefined && sTheme >= otThemes)
          {
            sTheme += ntThemes - otThemes;
            $SS.Config.set("Selected Theme", sTheme);
          }

          $SS.Config.set("VERSION", VERSION);
          $SS.Config.set("Total Mascots", ntMascots);
          $SS.Config.set("Total Themes", ntThemes);
        }
      }
      
      $SS.Config.init();
      $SS.Themes.init();
      $SS.Mascots.init();

      

      if (reload)
      {
        $SS.insertCSS();
        $SS.DOMLoaded(true);
      }
      else
      {
        $.asap((function() { return $("link[rel=stylesheet]", document.head).exists();}), $SS.insertCSS);
        if (/complete|interactive/.test(document.readyState))
          $SS.DOMLoaded();
        else
          $(document).bind("DOMContentLoaded", $SS.DOMLoaded);
      }

    },

    /* STYLING & DOM */
    insertCSS: function()
    {
      var css;

      $SS.bHideSidebar = $SS.location.sub !== "boards" ||
                $SS.location.board === "f";
      css = "<%= grunt.file.read('tmp/style.min.css').replace(/\\(^\")/g, '') %>";
      if ($("#ch4SS").exists())
        $("#ch4SS").text(css);
      else
        $(document.head).append($("<style type='text/css' id=ch4SS>").text(css));
    },
    QRDialogCreationHandler: function(e)
    {
      var qr = e.target;

      if (!$SS.browser.webkit)
        $("input[type=checkbox]", qr).riceCheck();

      $SS.QRhandled = true;
    },
    /* CONFIG */
    Config:
    {
      hasGM: typeof GM_deleteValue !== "undefined",
      init: function()
      {
        var parseVal = function(key, val)
        {
          if (/^(Selected|Hidden)+\s(Mascots|Themes?)+$/.test(key))
          {
            if (key === "Selected Theme")
              return parseInt(val);
            else if (key === "NSFW Theme")
              return parseInt(val);
            else if (key === "Selected Mascots" && val === 0)
              return 0;

            for (var i = 0, MAX = val.length, ret = []; i < MAX; ++i)
              ret[i] = parseInt(val[i]);

            return ret;
          }

          return (Array.isArray(val) && typeof val[0] !== "object") ? val[0] : val;
        };

        $SS.conf = [];

        for (var key in defaultConfig)
          $SS.conf[key] = parseVal(key, this.get(key));

        $SS.conf["Margin Left"]  = $SS.conf["Left Margin"] !== 999 ? $SS.conf["Left Margin"] : $SS.conf["Custom Left Margin"];
        $SS.conf["Margin Right"]  = $SS.conf["Right Margin"] !== 999 ? $SS.conf["Right Margin"] : $SS.conf["Custom Right Margin"];
      },
      get: function(name)
      {
        var val = this.hasGM ?
              GM_getValue(NAMESPACE + name) :
              localStorage.getItem(NAMESPACE + name);

        if (val != undefined)
          return JSON.parse(val);

        return defaultConfig[name];
      },
      set: function(name, val)
      {
        name = NAMESPACE + name;

        if (typeof val !== "number")
          val = JSON.stringify(val);

        return this.hasGM ?
            GM_setValue(name, val) :
            localStorage.removeItem(name, val),
            localStorage.setItem(name, val);
      }
    },

    /* OPTIONS */
    options:
    {
      saveAndClose  : false,
      init: function()
      {
        var a = document.createElement("a");
        a.textContent = "Style Settings";
        a.href = "javascript:;";
        a.addEventListener("click", function() {
          $SS.options.show();
          return $("#menu").remove();
        });

        this.createEntry(a);
        $(document).bind("keydown", $SS.options.keydown);
      },
      createEntry: function(a)
      {
        return document.dispatchEvent(new CustomEvent("AddMenuEntry",
        {
          detail: {
            el   : a,
            order : 112,
            type : "header"
          }
        }));
      },
      show: function()
      {
        if ($("#overlay").exists())
          $SS.options.close();
        else
        {
          var overlay     = $("<div id=overlay>").bind("click", $SS.options.close),
            tOptions    = $("<div id='oneechan-options' class=dialog>").bind("click", function(e) { return e.stopPropagation(); }),
            optionsHTML = "<ul id=options-tabs>" +
            "<li class='tab-item'><label class='tab-label selected' for=main-select>Main</label></li>" +
            "<li class='tab-item'><label class='tab-label' for=themes-select>Themes</label></li>" +
            "<li class='tab-item'><label class='tab-label' for=mascots-select>Mascots</label></li>" +
            "</ul><div id=options-container><input type=radio class=tab-select name=tab-select id=main-select hidden checked><div id='main-section' class='options-section'>" +
            "<p class='buttons-container'><a class='options-button' name=loadSysFonts title='Requires flash'>" + ($SS.fontList ? "System Fonts Loaded!" : "Load System Fonts") + "</a>" +
            "<span id=oneechan-version>OneeChan v" + VERSION + "</span>" +
            "<a href='https://raw.github.com/seaweedchan/OneeChan/stable/OneeChan.user.js' id=update-link target='_blank'>Update</a><span class=link-delim> | </span>" +
            "<a href='https://raw.github.com/seaweedchan/OneeChan/master/changelog' id=changelog-link target='_blank'>Changelog</a><span class=link-delim> | </span>" +
            "<a href='https://github.com/seaweedchan/OneeChan/issues' id=issues-link target='_blank'>Issues</a></p>",
            bindNavLinks = function(el)
            {
              $(".handle", el).bind("dragstart", function(e)
              {
                $(this.parentNode).addClass("moving");
                e.dataTransfer.effectAllowed = "move";
                e.dataTransfer.setData("text/plain", this.parentNode.id);
              })
              .bind("dragend", function(e){ $(this.parentNode).delay(function(){ $(this).removeClass("moving"); }, 1); })
              .bind("dragenter", function(e){ $(this.parentNode).addClass("over"); })
              .bind("dragleave", function(e){ $(this.parentNode).removeClass("over"); });
              $(el).bind("drop", function(e)
              {
                var node = $("#tNavLinks>#" + e.dataTransfer.getData("text/plain"));

                if (e.dataTransfer.getData("text/plain") !== this.id)
                {

                  if ($(this).nextSibling(node).exists())
                    $(this).before(node);
                  else
                    $(this).after(node);
                }

                $(this).removeClass("over");
                e.preventDefault();
              })
              .bind("dragover", function(e)
              {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
              });
              $("a[name=delLink]", el).bind("click", function(){ $(this).parent().remove(); });
            },
            key, val, des;

          for (key in defaultConfig)
          {
            if ((key === "Style Scrollbars" && !$SS.browser.webkit) ||
              key === "Nav Link Delimiter" ||
              /^(Selected|Hidden)+\s(Mascots|Themes?)+$/.test(key))
              continue;

            val = $SS.conf[key];
            des = defaultConfig[key][1];

            if ((defaultConfig[key][4] === true) && (key === "Custom Left Margin"))
            {
              var pVal = $SS.conf[defaultConfig[key][2]];
                id   = defaultConfig[key][2].replace(/\s/g, "_") + defaultConfig[key][3];
              optionsHTML += "<span class='option suboption " + id + "' title=\"" + des + "\"" +
                      (pVal != defaultConfig[key][3] ? "hidden" : "") + "><span class='option-title'>" + key +
                      "</span><input name='Custom Left Margin' type=text value=" + $SS.conf["Custom Left Margin"] + "px></span>";
            }
            else if ((defaultConfig[key][4] === true) && (key === "Custom Right Margin"))
            {
              var pVal = $SS.conf[defaultConfig[key][2]];
                id   = defaultConfig[key][2].replace(/\s/g, "_") + defaultConfig[key][3];
              optionsHTML += "<span class='option suboption " + id + "' title=\"" + des + "\"" +
                      (pVal != defaultConfig[key][3] ? "hidden" : "") + "><span class='option-title'>" + key +
                      "</span><input name='Custom Right Margin' type=text value=" + $SS.conf["Custom Right Margin"] + "px></span>";
            }
            else if (val === "header") {
              optionsHTML += "<label class='option header'><span class='option-title'>" + key + "</span></label>";
            }
            else if (defaultConfig[key][4] === true) // sub-option
            {
              var pVal = $SS.conf[defaultConfig[key][2]];
                id   = defaultConfig[key][2].replace(/\s/g, "_") + defaultConfig[key][3];
              optionsHTML += "<label class='option suboption " + id + "' title=\"" + des + "\"" +
                      (pVal != defaultConfig[key][3] ? "hidden" : "") + "><span class='option-title'>" + key +
                      "</span><input" + (val ? " checked" : "") + " name='" + key + "' type=checkbox></label>";
            }
            else if (Array.isArray(defaultConfig[key][2])) // select
            {
              var opts = key === "Font Family" ? $SS.fontList || defaultConfig[key][2] : defaultConfig[key][2],
                cFonts = [];
              optionsHTML += "<label class=option title=\"" + des + "\"><span class='option-title'>" + key + "</span>" +
                      "<select name='" + key + "'" + (defaultConfig[key][3] === true ? " has-suboption" : "")  + ">";

              for (var i = 0, MAX = opts.length; i < MAX; ++i)
              {
                var name, value;

                if (typeof opts[i] === "object")
                {
                  name  = opts[i].name;
                  value = opts[i].value;
                }
                else
                  name = value = opts[i];

                if (key === "Font Family") cFonts.push(value);

                optionsHTML += "<option" + (key === "Font Family" ? " style=\"font-family:" + $SS.formatFont(value) + "!important\"" : "") +
                        " value='" + value + "'" + (value == val ? " selected" : "") + ">" + name + "</option>";
              }

              if (key === "Font Family" && cFonts.indexOf($SS.conf["Font Family"]) == -1)
                optionsHTML += "<option style=\"font-family:" + $SS.formatFont($SS.conf["Font Family"]) + "!important\" value='" + $SS.conf["Font Family"] + "' selected>" + $SS.conf["Font Family"] + "</option>";

              optionsHTML += "</select></label>";
            }
            else if (key === "Font Size")
            {
              optionsHTML += "<label class='option visible' title=\"" + des + "\"><span class='option-title'>" + key + "</span>" +
                      "<input type=text name='Font Size' value=" + $SS.conf["Font Size"] + "px></label>";
            }
            else if (key === "Themes")
            {
              optionsHTML += "</div><input type=radio class=tab-select name=tab-select class=tab-select  id=themes-select hidden><div id='themes-section' class='options-section'>";
            }
            else if (key === "Mascots")
            {
              optionsHTML += "</div><input type=radio class=tab-select name=tab-select id=mascots-select hidden><div id='mascot-section' class='options-section'>";
            }
            else // checkbox
              optionsHTML += "<label class=option title=\"" + des + "\"><span class='option-title'>" + key + "</span><input" + (val ? " checked" : "") +
                      " name='" + key + "' " + (defaultConfig[key][3] === true ? " has-suboption" : "")  + " type=checkbox></label>";
          }

          optionsHTML += "</div></div><div class='options-close'><a class='options-button' name=save>Save</a><a class='options-button' name=cancel>Cancel</a></div>";
          tOptions.html(optionsHTML);
          overlay.append(tOptions);


          // options window
          $(".tab-label", tOptions).bind("click", function(e)
          {
            if ($(this).hasClass("selected")) return;

            $(".tab-label.selected").removeClass("selected");
            $(this).addClass("selected");
          });
          $("[has-suboption]", tOptions).bind("change", function()
          {
            var id  = this.name.replace(/\s/g, "_") + $(this).val(),
              sub = $("." + id);

            if (sub.exists())
              sub.each(function(){ $(this).show(); });
            else
              $("[class*='" + this.name.replace(/\s/g, "_") + "']")
                .each(function(){ $(this).hide(); });
          });
          $("a[name=save]", tOptions).bind("click", function() {
            $SS.options.saveAndClose = true;
            $SS.options.save();
            $SS.options.saveAndClose = false;
          });
          $("a[name=cancel]",tOptions).bind("click", $SS.options.close);

          // main tab
          $("input[name='Font Size']", tOptions).bind("keydown", function(e)
          {
            var val    = parseInt($(this).val()),
              bitmap = $(this).parent().nextSibling().children("input[name='Bitmap Font']").val();

            if (e.keyCode === 38 && (val < MAX_FONT_SIZE || bitmap))
              $(this).val(++val + "px");
            else if (e.keyCode === 40 && (val > MIN_FONT_SIZE || bitmap))
              $(this).val(--val + "px");
          });
          if (!$SS.fontList)
            $("a[name=loadSysFonts]", tOptions).bind("click", $SS.options.loadSystemFonts);

          // themes tab
          $SS.options.createThemesTab(tOptions);

          // mascots tab
          $SS.options.createMascotsTab(tOptions);

          return $(document.body).append(overlay);
        }
      },
      createThemesTab: function(tOptions)
      {
        var themes = $("#themes-section", tOptions).html(""),
          p      = $("<p class='buttons-container'>");

        p.append($("<a class='options-button' name=addTheme>Add", tOptions).bind("click", $SS.options.showTheme));
        p.append($("<a class='options-button' href='https://github.com/seaweedchan/OneeChan/wiki/Custom-Themes' target='_blank'>Custom Themes"));
        p.append($("<div id='import-link'>").append($("<input type=file class='import-input' riced=true>")
         .bind("change", function()
        {
          var file = this.files[0],
            reader = new FileReader(),
            val, first, valid = true, theme, div, index, imported;

          reader.onload = (function(tFile)
          {
            return function(e)
            {
              try
              {
                theme = JSON.parse(e.target.result);
              }
              catch (err)
              {
                alert("Invalid theme file!");
                return;
              }

              /* Check if this is an OneeChan v5 file, do nothing if so */
              if (theme["headerColor"] !== undefined) {
              }

              /* Old OneeChan */
              else if (theme["navOp"] !== undefined) {
                theme.headerColor = theme["textColor"];
                theme.headerBGColor = theme["mainColor"];
                theme.headerLColor = theme["linkColor"];
                theme.headerLHColor = theme["linkHColor"];
                theme.boardColor = theme["textColor"];
              }

              /* 4chan Style Script */
              else if (theme["timeColor"] !== undefined) {
                theme.replyOp = "1.0";
                theme.navOp = "0.9";
                theme.headerColor = theme["textColor"];
                theme.headerBGColor = theme["mainColor"];
                theme.headerLColor = theme["linkColor"];
                theme.headerLHColor = theme["linkHColor"];
                theme.boardColor = theme["textColor"];
              }

              /* Appchan X */
              else if (theme["Theme"] !== undefined) {
                theme.name = theme["Theme"];
                theme.authorName = theme["Author"];
                theme.authorTrip = theme["Author Tripcode"];
                theme.replyOp = "1.0";
                theme.navOp = "0.9";
                theme.mainColor = $SS.colorToHex(theme["Reply Background"]);
                theme.textColor = $SS.colorToHex(theme["Text"]);
                theme.linkColor = $SS.colorToHex(theme["Links"]);
                theme.linkHColor = $SS.colorToHex(theme["Hovered Links"]);
                theme.headerColor = $SS.colorToHex(theme["Text"]);
                theme.headerBGColor = $SS.colorToHex(theme["Navigation Background"]);
                theme.headerLColor = $SS.colorToHex(theme["Navigation Links"]);
                theme.headerLHColor = $SS.colorToHex(theme["Hovered Navigation Links"]);
                theme.boardColor = $SS.colorToHex(theme["Board Title"]);
                theme.brderColor = $SS.colorToHex(theme["Reply Border"]);
                theme.inputColor = $SS.colorToHex(theme["Input Background"]);
                theme.inputbColor = $SS.colorToHex(theme["Input Border"]);
                theme.bgColor = $SS.colorToHex(theme["Background Color"]);
                theme.blinkColor = $SS.colorToHex(theme["Backlinks"]);
                theme.jlinkColor = $SS.colorToHex(theme["Links"]);
                theme.nameColor = $SS.colorToHex(theme["Names"]);
                theme.tripColor = $SS.colorToHex(theme["Tripcodes"]);
                theme.titleColor = $SS.colorToHex(theme["Subjects"]);
                theme.quoteColor = $SS.colorToHex(theme["Greentext"]);
              }

              /* Can't be exported from the main scripts, so toss an error */
              else {
                alert("Invalid theme file!");
                return;
              }

              index = $SS.conf["Themes"].push(theme);
              theme = new $SS.Theme(--index);
              div   = theme.preview();
              $("#overlay #themes-section").append(div);
              div.fire("click").scrollIntoView(true);
            }
          })(file);

          reader.readAsText(file);
        })).append($("<span class='options-button'>Import")));
        p.append($("<a class='options-button' name=restoreThemes title='Restore hidden default themes'>restore", tOptions)
          .bind("click", function()
          {
            $SS.conf["Hidden Themes"] = [];
            $("#themes-section>div[hidden]").show();
          })
        );

        if ($SS.conf["Hidden Themes"].length === 0)
          $("a[name=restoreThemes]", p).hide();

        themes.append(p);

        for (var i = 0, MAX = $SS.conf["Themes"].length, tTheme; i < MAX; ++i)
        {
          tTheme = new $SS.Theme(i);
          themes.append(tTheme.preview());
        }
      },
      createMascotsTab: function(tOptions)
      {
        var mascots = $("#mascot-section", tOptions).html(""),
          p       = $("<p class='buttons-container'>");

        p.append($("<a class='options-button' name=addMascot>Add", tOptions).bind("click", $SS.options.showMascot));
        p.append($("<a class='options-button' name=restoreMascots title='Restore hidden default mascots'>Restore", tOptions)
          .bind("click", function()
          {
            $SS.conf["Hidden Mascots"] = [];
            $("#mascot-section>div[hidden]").show();
          })
        );

        if ($SS.conf["Hidden Mascots"].length === 0)
          $("a[name=restoreMascots]", p).hide();

        p.append($("<a class='options-button' name=selectAll>Select All", tOptions)
          .bind("click", function(){ $("#mascot-section>div:not([hidden])").each(function(){ $(this).addClass("selected") }); }));
        p.append($("<a class='options-button' name=selectNone>Select None", tOptions)
          .bind("click", function(){ $("#mascot-section>div").each(function(){ $(this).removeClass("selected") }); }));

        mascots.append(p);

        for (var i = 0, MAX = $SS.conf["Mascots"].length, tMascot; i < MAX; ++i)
        {
          tMascot = new $SS.Mascot(i);
          mascots.append(tMascot.preview());
        }
      },
      close: function()
      {
        return $("#overlay").remove();
      },
      keydown: function(e)
      {
        if (e.ctrlKey && e.keyCode === 79)
        {
          e.preventDefault();
          e.stopPropagation();
          $SS.options.show();
        }
      },
      loadSystemFonts: function(evt)
      {
        var loadFontBTN = $(evt.target),
          getFontMessage;
        $(document.head).append($('<script type="text/javascript">' +
        "function populateFontList(fontArr)" +
        "{" +
          "var fontList = [];" +
          "for (var key in fontArr)" +
            "fontList.push(fontArr[key]);" +
          "window.postMessage(fontList, '*');" +
        "}"));
        window.addEventListener("message", getFontMessage = function(e)
        {
          $SS.fontList = e.data;
          var fontSelect = $("<select name='Font Family'>");

          for (var i = 0, MAX = $SS.fontList.length; i < MAX; ++i)
          {
            var name, value;
              name = value = $SS.fontList[i];

            fontSelect.append($("<option" + " style=\"font-family:" + $SS.formatFont(value) + "!important\"" +
                      " value='" + value + "'" + (value == $SS.conf["Font Family"] ? " selected=true" : "") + ">" + name));
          }

          $("select[name='Font Family']").before(fontSelect).remove();

          $("#fontListSWF").remove();
          window.removeEventListener("message", getFontMessage);
          loadFontBTN.text("System Fonts Loaded!").unbind("click", $SS.options.loadSystemFonts);
        }, false);

        $(document.body).append($("<div id=fontListSWF hidden><object type='application/x-shockwave-flash'" +
                     " data='" + fontListSWF + "'><param name=allowScriptAccess value=always></object>"));
        return loadFontBTN.text("Loading...");
      },
      save: function()
      {
        var div             = $("#oneechan-options"),
          themes          = [],
          mascots         = [],
          selectedMascots = [],
          nsfwTheme,
          selectedTheme;

        // Save main
        $("#oneechan-options input[name]:not(.tab-select), #oneechan-options select").each(function()
        {
          var name = $(this).attr("name"),
            val  = $(this).val();

          if (name === "Font Size")
          {
            val = parseInt(val);

            if (!$("input[name='Bitmap Font']", div).val())
              val = Math.max(Math.min(val, MAX_FONT_SIZE), MIN_FONT_SIZE);
          }
          else if (name === "Custom Right Margin")
          {
            val = parseInt(val);
          }
          else if (name === "Custom Left Margin")
          {
            val = parseInt(val);
          }


          $SS.Config.set($(this).attr("name"), val);
        });

        // Save Themes
        $("#oneechan-options #themes-section>div").each(function(index)
        {
          var oldIndex = parseInt(this.id.substr(5));
          if (!$SS.conf["Themes"][oldIndex].default)
            themes.push($SS.conf["Themes"][oldIndex]);
        });

        selectedTheme = (selectedTheme = $("#oneechan-options #themes-section>div.selected")).exists() ?
          parseInt(selectedTheme.attr("id").substr(5)) : 0;

        nsfwTheme = (nsfwTheme = $("#oneechan-options #themes-section>div.nsfw")).exists() ?
          parseInt(nsfwTheme.attr("id").substr(5)) : 0;

        $SS.Config.set("Themes", themes);
        $SS.Config.set("Selected Theme", selectedTheme);
        $SS.Config.set("NSFW Theme", nsfwTheme);
        $SS.Config.set("Hidden Themes", $SS.conf["Hidden Themes"]);

        // Save Mascots
        $("#oneechan-options #mascot-section>div").each(function(index)
        {
          var oldIndex = parseInt(this.id.substr(6));
          if ($(this).hasClass("selected"))
            selectedMascots.push(index);

          if (!$SS.conf["Mascots"][oldIndex].default)
            mascots.push($SS.conf["Mascots"][oldIndex]);
        });

        $SS.Config.set("Mascots", mascots);
        $SS.Config.set("Selected Mascots", selectedMascots);
        $SS.Config.set("Hidden Mascots", $SS.conf["Hidden Mascots"]);

        if ($SS.options.saveAndClose)
          $SS.options.close();

        return $SS.init(true);
      },
      showTheme: function(tIndex)
      {
        var div, overly;

        if (typeof tIndex === "number")
        {
          var bEdit  = true,
            tEdit  = $SS.conf["Themes"][tIndex],
            RPA, themeR, themePY, themePX, themeA;

          if (tEdit.bgImg && tEdit.bgRPA)
          {
            RPA     = tEdit.bgRPA.split(" ");
            themeR  = RPA[0];
            themePY = RPA[1];
            themePX = RPA[2];
            themeA  = RPA[3];
          }
        }

        div = $("<div id='add-theme' class='dialog'>");

        var innerHTML = "<label>" +
        "<span class='option-title'>Theme Name:</span><input type=text name=name value='" + (bEdit ? tEdit.name : "") + "'>" +
        "</label><label>" +
        "<span class='option-title'>Author Name:</span><input type=text name=authorName value='" + (bEdit ? (tEdit.authorName !== undefined ? tEdit.authorName : "") : "") + "'>" +
        "</label><label>" +
        "<span class='option-title'>Author Tripcode:</span><input type=text name=authorTrip value='" + (bEdit ? (tEdit.authorTrip !== undefined ? tEdit.authorTrip : "")  : "") + "'>" +
        "</label><label>" +
        "<span class='option-title'>BG Image:</span><input type=text name=bgImg value='" + (bEdit ? ($SS.validImageURL(tEdit.bgImg) ? tEdit.bgImg + "'" :
        ($SS.validBase64(tEdit.bgImg) ? "[Base 64 Encoded Image]' disabled=true" : "'")) : "'") + "></label><label>" +
        "<span class='option-title'>BG Repeat:</span><select name=bgR>" +
        "<option" + (bEdit && themeR === "no-repeat" ? " selected" : "") + ">no-repeat</option>" +
        "<option" + (bEdit && themeR === "repeat" ? " selected" : "") + ">repeat</option>" +
        "<option" + (bEdit && themeR === "repeat-x" ? " selected" : "") + ">repeat-x</option>" +
        "<option" + (bEdit && themeR === "repeat-y" ? " selected" : "") + ">repeat-y</option>" +
        "</select></label><label>" +
        "<span class='option-title'>BG Attachment:</span><select name=bgA>" +
        "<option" + (bEdit && themeA === "fixed" ? " selected" : "") + ">fixed</option>" +
        "<option" + (bEdit && themeA === "scroll" ? " selected" : "") + ">scroll</option>" +
        "</select></label><label>" +
        "<span class='option-title'>BG Position-X:</span><select name=bgPX>" +
        "<option" + (bEdit && themePX === "left" ? " selected" : "") + ">left</option>" +
        "<option" + (bEdit && themePX === "center" ? " selected" : "") + ">center</option>" +
        "<option" + (bEdit && themePX === "right" ? " selected" : "") + ">right</option>" +
        "</select></label><label>" +
        "<span class='option-title'>BG Position-Y:</span><select name=bgPY>" +
        "<option" + (bEdit && themePY === "top" ? " selected" : "") + ">top</option>" +
        "<option" + (bEdit && themePY === "center" ? " selected" : "") + ">center</option>" +
        "<option" + (bEdit && themePY === "bottom" ? " selected" : "") + ">bottom</option>" +
        "</select></label><label>" +
        "<span class='option-title'>Reply Opacity:</span><input type=text name=replyOp value='" + (bEdit ? tEdit.replyOp : "1.0") + "'></label><label>" +
        "<span class='option-title'>Header Opacity:</span><input type=text name=navOp value='" + (bEdit ? tEdit.navOp : "0.9") + "'>" +
        "</label>";

        for (var i = 0, MAX = themeInputs.length; i < MAX; ++i)
          innerHTML += "<label><span class='option-title'>" + themeInputs[i].dName + ":</span>" +
          "<input type=text class=jsColor name=" + themeInputs[i].name + " value=" + (bEdit ? tEdit[themeInputs[i].name] : "") + "></label>";

        innerHTML += "<label id=customCSS><span class='option-title'>Custom CSS:</span><textarea name=customCSS>" + (bEdit ? tEdit.customCSS || "" : "") + "</textarea>" +
        "</label><div><div id='import-link'><input class='import-input' type=file riced=true accept='image/GIF,image/JPEG,image/PNG'>" +
        "<span class='options-button'>Select Image</span></div>" +
        "" + (bEdit && $SS.validBase64(tEdit.bgImg) ? "<input type=hidden name=customIMGB64 value='" + tEdit.bgImg + "'>" : "") + "" +
        "<a class='options-button' name=clearIMG>Clear Image</a>" +
        "<a class='options-button' name=export>Export</a>" +
        "<a class='options-button' name=" + (bEdit ? "edit" : "add") + ">Save</a><a class='options-button' name=cancel>Cancel</a></div>";

        div.html(innerHTML);
        $(".jsColor", div).jsColor();

        overlay = $("<div id=overlay2>").append(div);

        $(".import-input", div).bind("change", $SS.options.SelectImage);
        $("a[name=clearIMG]", div).bind("click", $SS.options.ClearImage);

        $("a[name=export]", div).bind("click", function()
        {
          var theme = $SS.options.addTheme(tIndex, true);
          if ($("a[download]", div).exists())
            return;
          var exportalert = $("<a class='options-button'download='" + theme.name +".json' href='data:application/json," + encodeURIComponent(JSON.stringify(theme)) + "'>Save me!");
          return $(this).replace(exportalert);
        });

        if (bEdit)
          $("a[name=edit]", div).bind("click", function(){ $SS.options.addTheme(tIndex); });
        else
          $("a[name=add]", div).bind("click", $SS.options.addTheme);

        $("a[name=cancel]", div).bind("click", function(){ $("#overlay2").remove(); });

        if (bEdit)
          $("input,textarea,select", div).bind("change", tEdit.mHandler = function()
          {
            tEdit.modified = true;
            $("input,textarea,select", $("#addTheme")).unbind("change", tEdit.mHandler);
          });

        return $(document.body).append(overlay);
      },
      addTheme: function(tIndex, exp)
      {
        var overlay = $("#overlay2"),
          tTheme  = { },
          makeRPA = function()
          {
            var RPA = [];

            RPA.push($("select[name=bgR]",  overlay).val());
            RPA.push($("select[name=bgPY]", overlay).val());
            RPA.push($("select[name=bgPX]", overlay).val());
            RPA.push($("select[name=bgA]",  overlay).val());

            return RPA.join(" ");
          },
          bEdit = typeof tIndex === "number",
          tEdit = bEdit ? $SS.conf["Themes"][tIndex] : null,
          error = false,
          div;

        if (!exp && bEdit && !tEdit.modified)
          return overlay.remove();

        $("input[type=text],textarea", overlay).each(function()
        {
          var val;

          if (this.name === "bgImg")
          {
            var b64 = $("input[name=customIMGB64]", overlay);
            val     = b64.exists() ? decodeURIComponent(b64.val()) : this.value;

            if (val !== "" && !$SS.validImageURL(val) && !$SS.validBase64(val))
            {
              error = true;
              return alert("Invalid image URL/base64.");
            }

            val = $SS.cleanBase64(val);
          }
          else if (this.name === "name")
          {
            val = this.value;

            if (bEdit && tEdit.default && tEdit.name === val)
              val += " [Modded]"
          }
          else
            val = this.value;

          if (val !== "")
            tTheme[this.name] = val;
        });

        if (error) return;

        if (tTheme.bgImg)
          tTheme.bgRPA = makeRPA();

        if (exp) return tTheme;

        if (bEdit && !tEdit.default)
        {
          $SS.conf["Themes"][tIndex] = tTheme;
          tTheme = new $SS.Theme(tIndex);
          div    = $("#theme" + tIndex, $("#overlay"));

          div.replace(tTheme.preview());
        }
        else
        {
          tTheme.author = "You";
          tIndex        = $SS.conf["Themes"].push(tTheme);
          tTheme        = new $SS.Theme(--tIndex);
          div           = tTheme.preview();

          $("#overlay #themes-section").append(div);
        }

        div.fire("click").scrollIntoView(true);

        return overlay.remove();
      },
      deleteTheme: function(tIndex)
      {
        if ($SS.conf["Themes"][tIndex].default &&
          $SS.conf["Hidden Themes"].push(tIndex) === 1)
          $("#themes-section a[name=restoreThemes]").show();

        return $SS.conf["Themes"][tIndex].default ?
          $("#theme" + tIndex).removeClass("selected").hide() : $("#theme" + tIndex).remove();
      },
      showMascot: function(mIndex)
      {
        var div, overly;

        if (typeof mIndex === "number")
          var bEdit = true,
            mEdit = $SS.conf["Mascots"][mIndex];

        div = $("<div id='add-mascot' class='dialog'>").html("<label class='add-mascot-label'><span class='option-title'>Image:</span><input class='mascot-input image' type=text name=customIMG value='" +
            (bEdit ? ($SS.validImageURL(mEdit.img) ? mEdit.img + "'" : "[Base 64 Encoded Image]' disabled=true") : "'") +
            "></label>" +
            "<label class='add-mascot-label' title='Auto goes according to the post forms position' for=null><span class='option-title'>Alignment/Offset:</span>" +
            "<select class='mascot-select' name=mPosition>" +
              "<option" + ((bEdit && !mEdit.position) || !bEdit ? " selected" : "") + ">Auto</option>" +
              "<option" + (bEdit && mEdit.position === "top" ? " selected" : "") + ">Top</option>" +
              "<option" + (bEdit && mEdit.position === "center" ? " selected" : "") + ">Center</option>" +
              "<option" + (bEdit && mEdit.position === "bottom" ? " selected" : "") + ">Bottom</option>" +
            "</select>" +
            "<input class='mascot-input offset' type=text name=mOffset value='" + (bEdit && mEdit.position ? mEdit.offset + "px" : "") + "'></label>" +
            "<label class='add-mascot-label' title='Prevent streching with smaller images (Width < 313px)'><span class='option-title'>Prevent stretching:</span>" +
            "<input type=checkbox name=mSmall" + (bEdit && mEdit.small ? " checked" : "") + "></label>" +
            "<label class='add-mascot-label' title='Horizontally flip the mascot when sidebar is on the left'><span class='option-title'>Flip with sidebar:</span>" +
            "<input type=checkbox name=mFlip" + (!bEdit || (bEdit && (mEdit.flip || mEdit.flip == undefined)) ? " checked" : "") + "></label>" +
            "<label class='add-mascot-label' title='Allows the mascot to be shown outside the sidebar, ignores `Prevent stretching` option'>" +
            "<span class='option-title'>Allow overflow:</span><input type=checkbox name=mOverflow" + (bEdit && mEdit.overflow ? " checked" : "") + "></label>" +
            "<label class='add-mascot-label' title='List of boards to display this mascot on, seperated by commas. Example: a,c,g,v,jp'><span class='option-title'>Boards:</span>" +
            "<input class='mascot-input mascot-boards' type=text name=mBoards value='" + (bEdit && mEdit.boards ? mEdit.boards : "") + "'></label>" +
            "<div id='mascot-buttons-container'>" +
            "<div id='import-link'><input class='import-input' type=file riced=true accept='image/GIF,image/JPEG,image/PNG'>" +
            "<span class='options-button'>Select Image</span></div>" +
            "" + (bEdit && $SS.validBase64(mEdit.img) ? "<input type=hidden name=customIMGB64 value='" + mEdit.img + "'>" : "") + "" +
            "<a class='options-button' name=clearIMG>Clear Image</a>" +
            "<a class='options-button' name=" + (bEdit ? "edit" : "add") + ">Save</a><a class='options-button' name=cancel>Cancel</a></div></div>");

        overlay = $("<div id=overlay2>").append(div);

        $(".import-input", div).bind("change", $SS.options.SelectImage);
        $("a[name=clearIMG]", div).bind("click", $SS.options.ClearImage);

        if (bEdit)
          $("a[name=edit]", div).bind("click", function(){ $SS.options.addMascot(mIndex); });
        else
          $("a[name=add]", div).bind("click", $SS.options.addMascot);

        $("a[name=cancel]", div).bind("click", function(){ $("#overlay2").remove(); });

        return $(document.body).append(overlay);
      },
      addMascot: function(mIndex)
      {
        var overlay = $("#overlay2"),
          bSetPos, cIMG, cPosition, cOffset, cSmall, cFlip, tMascot, bDefault;

        cIMG      = decodeURIComponent($("input[name=customIMGB64]", overlay).val() || $("input[name=customIMG]", overlay).val());
        cPosition = $("select[name=mPosition]", overlay).val().toLowerCase();
        cOffset   = parseInt($("input[name=mOffset]", overlay).val()) || 0;
        cSmall    = $("input[name=mSmall]", overlay).val();
        cFlip     = $("input[name=mFlip]", overlay).val();
        cOverflow = $("input[name=mOverflow]", overlay).val();
        cBoards   = $("input[name=mBoards]", overlay).val();
        bSetPos   = cPosition !== "auto";

        if (!$SS.validImageURL(cIMG) && !$SS.validBase64(cIMG))
          return alert("Invalid image URL/base64.");

        cIMG     = $SS.cleanBase64(cIMG);
        bDefault = $SS.conf["Mascots"][mIndex] != undefined && $SS.conf["Mascots"][mIndex].default;

        if (typeof mIndex === "number" && !bDefault)
        {
          $SS.conf["Mascots"][mIndex].img      = cIMG;
          $SS.conf["Mascots"][mIndex].small    = cSmall;
          $SS.conf["Mascots"][mIndex].flip     = cFlip;
          $SS.conf["Mascots"][mIndex].overflow = cOverflow;

          if (cBoards !== "")
            $SS.conf["Mascots"][mIndex].boards   = cBoards;
          else
            delete $SS.conf["Mascots"][mIndex].boards;

          if (bSetPos)
          {
            $SS.conf["Mascots"][mIndex].position = cPosition;
            $SS.conf["Mascots"][mIndex].offset   = cOffset;
          }
          else
          {
            delete $SS.conf["Mascots"][mIndex].position;
            delete $SS.conf["Mascots"][mIndex].offset;
          }

          tMascot = new $SS.Image(cIMG);
          $("#mascot" + mIndex).attr("style", "background:" + tMascot.get());
        }
        else
        {
          var tMascot = { img: cIMG, small: cSmall, flip: cFlip, overflow: cOverflow, boards: (cBoards === "" ? undefined : cBoards) };

          if (bSetPos)
          {
            tMascot.position = cPosition;
            tMascot.offset   = cOffset;
            tMascot.overflow = cOverflow;
          }

          if (bDefault)
            $SS.options.deleteMascot(mIndex);

          mIndex = $SS.conf["Mascots"].push(tMascot);
          tMascot = new $SS.Mascot(--mIndex).preview();
          $("#mascot-section").append(tMascot);
          tMascot.fire("click").scrollIntoView(true);
        }

        return overlay.remove();
      },
      deleteMascot: function(mIndex)
      {
        if ($SS.conf["Mascots"][mIndex].default &&
          $SS.conf["Hidden Mascots"].push(mIndex) === 1)
          $("#mascot-section a[name=restoreMascots]").show();

        return $SS.conf["Mascots"][mIndex].default ?
          $("#mascot" + mIndex).removeClass("selected").hide() : $("#mascot" + mIndex).remove();
      },
      SelectImage: function()
      {
        var div      = $("#overlay2"),
          parent   = $(this).parent(),
          image    = this.files[0],
          fileName = image.name.substr(image.name.lastIndexOf("\\") + 1),
          reader   = new FileReader(),
          b64, val, input;

        reader.onload = (function(tImage)
        {
          return function(evt)
          {
            val = $SS.cleanBase64(evt.target.result);

            if (!(b64 = $("input[name=customIMGB64]", div)).exists())
            {
              b64 = $("<input type=hidden name=customIMGB64>").val(val);
              parent.after(b64);
            }
            else
              b64.val(val);

            if ((input = $("input[name=bgImg]", div)).exists())
              input.val(fileName).disabled(true);
            else
              $("input[name=customIMG]", div).val(fileName).disabled(true);
          }
        })(image);

        reader.readAsDataURL(image);
      },
      ClearImage: function()
      {
        var div = $("#overlay2"), input;

        $("input[name=customIMGB64]").remove();

        if ((input = $("input[name=bgImg]", div)).exists())
          return input.val("").disabled(false);

        return $("input[name=customIMG]", div).val("").disabled(false);
      }
    },

    /* THEMES */
    Themes:
    {
      defaults:
      [
        {
          name:       "Vimyanized Dark",
          authorName:  "Seaweed",
          authorTrip:  "!!lq+3fff+/ev",
          "default":   true,
          bgImg:       false,
          replyOp:    "1.0", 
          navOp:      "0.9",
          bgColor:    "090d0f",
          mainColor:  "0d1114",
          brderColor: "0b1316",
          inputColor: "090d0f",
          inputbColor:"0d1114",
          blinkColor: "4797cc",
          jlinkColor: "4270b2",
          linkColor:  "53bdb1",
          linkHColor: "3090b5",
          nameColor:  "d63e34",
          quoteColor: "96c83b",
          textColor:  "f8f8f8",
          tripColor:  "d4b63c",
          titleColor: "b88cd1",
          headerColor: "f8f8f8",
          headerLColor: "53bdb1",
          headerLHColor: "3090b5",
          headerBGColor: "0d1114",
          boardColor:  "f8f8f8"
        },
        {
          name:        "Muted",
          authorName:  "Seaweed",
          authorTrip:  "!!lq+3fff+/ev",
          "default":   true,
          bgImg:       false,
          replyOp:     "1.0",
          navOp:       "0.9", 
          bgColor:     "ffffff",
          mainColor:   "f5f2e9",
          brderColor:  "dddddd",
          inputColor:  "ffffff",
          inputbColor: "dddddd",
          blinkColor:  "bc312a",
          jlinkColor:  "bc312a",
          linkColor:   "bc312a",
          linkHColor:  "8e2220",
          nameColor:   "2c64a0",
          quoteColor:  "789922",
          textColor:   "393735",
          tripColor:   "cc6563",
          titleColor:  "111111",
          headerColor: "393735",
          headerLColor: "bc312a",
          headerLHColor: "8e2220",
          headerBGColor: "f5f2e9",
          boardColor:  "bc312a"
        },
        {
          name:       "Minimalistic Mayhem",
          authorName:  "Mayhem",
          authorTrip:  "!MayhemxaEo",
          "default":   true,
          bgImg:       false,
          replyOp:    "1.0",
          navOp:       "0.9",  
          bgColor:    "191919",
          mainColor:  "222222",
          brderColor: "292929",
          inputColor: "222222",
          inputbColor:"151515",
          blinkColor: "897399",
          jlinkColor: "897399",
          linkColor:  "897399",
          linkHColor: "c617e6",
          nameColor:  "a34443",
          quoteColor: "8ba446",
          textColor:  "bbbbbb",
          tripColor:  "96562c",
          titleColor: "987d3e",
          headerColor: "bbbbbb",
          headerLColor: "897399",
          headerLHColor: "c617e6",
          headerBGColor: "222222",
          boardColor:  "bbbbbb"
        },
        {
          name:       "Blackboard",
          authorName:  "Seaweed",
          authorTrip:  "!!lq+3fff+/ev",
          "default":   true,
          bgImg:       false,
          replyOp:    "1.0",
          navOp:       "0.9",  
          bgColor:    "0a0d1c",
          mainColor:  "0c1021",
          brderColor: "0e1228",
          inputColor: "0c1021",
          inputbColor:"080b16",
          blinkColor: "54b12e",
          jlinkColor: "8da6ce",
          linkColor:  "fbde2d",
          linkHColor: "4b65cc",
          nameColor:  "8da6ce",
          quoteColor: "9acf08",
          textColor:  "f8f8f8",
          tripColor:  "ff6400",
          titleColor: "ff6400",
          headerColor: "f8f8f8",
          headerLColor: "fbde2d",
          headerLHColor: "4b65cc",
          headerBGColor: "0c1021",
          boardColor:  "f8f8f8"
        },
        {
          name:        "Dark Flat",
          authorName:  "ahodesuka",
          authorTrip:  "!.pC/AHOKAg",
          "default":   true,
          bgImg:       false,
          replyOp:     "1.0",
          navOp:       "0.9",  
          bgRPA:       "repeat top left fixed",
          bgColor:     "1C1D1E",
          mainColor:   "232425",
          brderColor:  "292a2b",
          inputColor:  "18191a",
          inputbColor: "121314",
          blinkColor:  "6f99b4",
          jlinkColor:  "ac9bb0",
          linkColor:   "ac9bb0",
          linkHColor:  "6f99b4",
          nameColor:   "a8c6d9",
          quoteColor:  "b3c45e",
          textColor:   "dddddd",
          tripColor:   "d4c095",
          titleColor:  "9390c9",
          headerColor: "dddddd",
          headerLColor: "ac9bb0",
          headerLHColor: "6f99b4",
          headerBGColor: "232425",
          boardColor:  "dddddd"
        },
        {
          name:        "Photon",
          authorName:  "Seaweed",
          authorTrip:  "!!lq+3fff+/ev",
          "default":   true,
          bgImg:       false,
          replyOp:     "1.0",
          navOp:       "0.9",  
          bgColor:     "eeeeee",
          mainColor:   "dddddd",
          brderColor:  "cccccc",
          inputColor:  "ffffff",
          inputbColor: "cccccc",
          blinkColor:  "111111",
          jlinkColor:  "ff6600",
          linkColor:   "ff6600",
          linkHColor:  "ff3300",
          nameColor:   "004a99",
          quoteColor:  "789922",
          textColor:   "333333",
          tripColor:   "ff3300",
          headerColor: "333333",
          headerLColor: "ff6600",
          headerLHColor: "ff3300",
          headerBGColor: "dddddd",
          boardColor:  "004a99"
        },
        {
          name:        "Original Minimalistic Mayhem",
          authorName:  "Mayhem",
          authorTrip:  "!MayhemxaEo",
          "default":   true,
          bgImg:       "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAAAAACoBHk5AAAAFUlEQVQIW2NgYJCRkUEmGMAsBjAXABi6AaXXHST3AAAAAElFTkSuQmCC",
          bgRPA:       "repeat top left fixed",
          replyOp:     "1.0",
          navOp:       "0.9",  
          bgColor:     "191919",
          mainColor:   "333333",
          brderColor:  "111111",
          inputColor:  "222222",
          inputbColor: "151515",
          blinkColor:  "559c7a",
          jlinkColor:  "559c7a",
          linkColor:   "559c7a",
          linkHColor:  "c7de1a",
          nameColor:   "2e88a6",
          quoteColor:  "8ba446",
          textColor:   "dddddd",
          tripColor:   "8c5d2a",
          titleColor:  "486273",
          headerColor: "dddddd",
          headerLColor: "559c7a",
          headerLHColor: "c7de1a",
          headerBGColor: "333333",
          boardColor:  "dddddd"
        },
        {
          name:        "Tomorrow",
          authorName:  "Seaweed",
          authorTrip:  "!!lq+3fff+/ev",
          "default":   true,
          bgImg:       false,
          replyOp:     "1.0", 
          navOp:       "0.9", 
          bgColor:     "1d1f21",
          mainColor:   "282a2e",
          brderColor:  "373b41",
          inputColor:  "282a2e",
          inputbColor: "1d1f21",
          blinkColor:  "cc6666",
          jlinkColor:  "81a2be",
          linkColor:   "81a2be",
          linkHColor:  "cc6666",
          nameColor:   "81a2be",
          quoteColor:  "b5bd68",
          textColor:   "c5c8c6",
          tripColor:   "8abeb7",
          titleColor:  "b294bb",
          headerColor: "c5c8c6",
          headerLColor: "81a2be",
          headerLHColor: "cc6666",
          headerBGColor: "282a2e",
          boardColor:  "c5c8c6"
        },
        {
          name:        "Yotsuba",
          authorName:  "moot",
          authorTrip:  "!Εр8рui8Vw2",
          "default":   true,
          bgImg:       "iVBORw0KGgoAAAANSUhEUgAAAAEAAADICAIAAACmkByiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFxJREFUKJFj+ndtPRMDAwMSZmRiYGTAFEPmM2IRg/EZcenBop4otYw47MSinxw16HYRZQYBPfjkUdRims1ItNmE/EOcfSTLEx2GBNTgSkc41eGLF3S7cKQr0tM2AO8LBH073E/fAAAAAElFTkSuQmCC",
          bgRPA:       "repeat-x top center scroll",
          replyOp:     "1.0", 
          navOp:       "0.9", 
          bgColor:     "ffffee",
          mainColor:   "f0e0d6",
          brderColor:  "d9bFb7",
          inputColor:  "ffffff",
          inputbColor: "aaaaaa",
          blinkColor:  "0000ee",
          jlinkColor:  "0000ee",
          linkColor:   "0000ee",
          linkHColor:  "dd0000",
          nameColor:   "117743",
          quoteColor:  "789922",
          textColor:   "800000",
          tripColor:   "228854",
          titleColor:  "cc1105",
          headerColor: "800000",
          headerLColor: "0000ee",
          headerLHColor: "dd0000",
          headerBGColor: "f0e0d6",
          boardColor:  "800000"
        },                                                           
        {
          name:        "Yotsuba B",
          authorName:  "moot",
          authorTrip:  "!Εр8рui8Vw2",
          "default":   true,
          bgImg:       "iVBORw0KGgoAAAANSUhEUgAAAAEAAADICAIAAACmkByiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAE5JREFUKJFjunj1HRMDAwNWzMiILsZIpDpcarDrx28GI17zUeUYiXITLrdg08PISKyfGfGYgT38cLkRm50Dbx9944KYdIUrbohNV0SoAwD1FwRwgMmDbgAAAABJRU5ErkJggg==",
          bgRPA:       "repeat-x top center scroll",
          replyOp:     "1.0", 
          navOp:       "0.9", 
          bgColor:     "eef2ff",
          mainColor:   "d6daf0",
          brderColor:  "b7c5d9",
          inputColor:  "ffffff",
          inputbColor: "aaaaaa",
          blinkColor:  "34345C",
          jlinkColor:  "34345C",
          linkColor:   "34345c",
          linkHColor:  "dd0000",
          nameColor:   "117743",
          quoteColor:  "789922",
          textColor:   "000000",
          tripColor:   "228854",
          titleColor:  "0f0c5d",
          headerColor: "000000",
          headerLColor: "34345c",
          headerLHColor: "dd0000",
          headerBGColor: "d6daf0",
          boardColor:  "000000"
        },
        {
          name:        "Yotsuba Purple",
          authorName:  "Seaweed",
          authorTrip:  "!!lq+3fff+/ev",
          "default":   true,
          bgImg:       "iVBORw0KGgoAAAANSUhEUgAAAAEAAADICAIAAACmkByiAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAPVJREFUOE91i1lywjAQROf+VySEhMW7kazFNhhSTM9YxoUrH69ed49El52lRLbrCEj/MorkVZesZGCPdzA6/2cvHduKfO8o/8YbBXmLvikOeisO7l/KH73BierXS4Yr+BPe6+NMyjA4JYLk5hSEtEs+8/ZBe47UXCIlIyfaDLmnt3u65pHBxhlIHsSCbOgDmUJBtvlIBi7ZxUiWEXPvKu1v3yR3Jbu+kdtwJ8+br+/kKrX0BuYNnTPssCXmXXqrhHZaspecwH3dJwrXbce2JtoHRTMJwXBGT8y73h/Ud0+F74uRpc+2Txoc+FPzDkaPrmjWd8gzL82jLtr9nlP8AAAAAElFTkSuQmCC",
          bgRPA:       "repeat-x top center scroll",
          replyOp:     "1.0", 
          navOp:       "0.9", 
          bgColor:     "f8f3fe",
          mainColor:   "eeddff",
          brderColor:  "cab7d9",
          inputColor:  "ffffff",
          inputbColor: "cab7d9",
          blinkColor:  "000000",
          jlinkColor:  "962594",
          linkColor:   "962594",
          linkHColor:  "b22caa",
          nameColor:   "591177",
          quoteColor:  "789922",
          textColor:   "000000",
          tripColor:   "b22caa",
          titleColor:  "0f0c5d",
          headerColor: "000000",
          headerLColor: "962594",
          headerLHColor: "b22caa",
          headerBGColor: "eeddff",
          boardColor:  "591177"
        },
        {
          name:        "安心院なじみ",
          authorName:  "ahodesuka",
          authorTrip:  "!.pC/AHOKAg",
          "default":   true,
          bgImg:       false,
          replyOp:     "1.0", 
          navOp:       "0.9", 
          bgColor:     "ffffff",
          mainColor:   "efefef",
          brderColor:  "d6d6d6",
          inputColor:  "cccccc",
          inputbColor: "bbbbbb",
          blinkColor:  "f5871f",
          jlinkColor:  "bf8040",
          linkColor:   "bf8040",
          linkHColor:  "bf8040",
          nameColor:   "2b80c2",
          quoteColor:  "718c00",
          textColor:   "4d4d4c",
          tripColor:   "3e999f",
          titleColor:  "4d4d4d",
          headerColor: "4d4d4c",
          headerLColor: "bf8040",
          headerLHColor: "bf8040",
          headerBGColor: "efefef",
          boardColor:  "4d4d4c"
        },
        {
          name:        "Solarized Dark", // http://ethanschoonover.com/solarized
          authorName:  "ubuntufriend",
          authorTrip:  "!UbuntuBReY!!iizPaxgtRk3",
          "default":   true,
          bgImg:       false,
          replyOp:     "1.0", 
          navOp:       "0.9", 
          bgColor:     "073642",
          mainColor:   "032b36",
          brderColor:  "133942",
          inputColor:  "073642",
          inputbColor: "0d272e",
          blinkColor:  "4f5f8f",
          jlinkColor:  "696fc0",
          linkColor:   "696bba",
          linkHColor:  "d33682",
          nameColor:   "586e75",
          quoteColor:  "859900",
          textColor:   "93a1a1",
          tripColor:   "2aa198",
          titleColor:  "bec2c4",
          headerColor: "93a1a1",
          headerLColor: "696bba",
          headerLHColor: "d33682",
          headerBGColor: "032b36",
          boardColor:  "93a1a1"
        },
        {
          name:        "4chan Rewired Modded", // Originally by !K.WeEabo0o, modded by ahoka
          authorName:  "ahodesuka",
          authorTrip:  "!.pC/AHOKAg",
          "default":   true,
          bgImg:       false,
          replyOp:     "1.0", 
          navOp:       "0.9", 
          bgColor:     "f4f4f4",
          mainColor:   "efefef",
          brderColor:  "d4d4d4",
          inputColor:  "e4e4e4",
          inputbColor: "cccccc",
          blinkColor:  "bf7f3f",
          jlinkColor:  "bf7f3f",
          linkColor:   "bf7f3f",
          linkHColor:  "d33682",
          nameColor:   "4c4c4c",
          quoteColor:  "6b7a1e",
          textColor:   "4c4c4c",
          tripColor:   "bf7f3f",
          titleColor:  "4c4c4c",
          headerColor: "4c4c4c",
          headerLColor: "bf7f3f",
          headerLHColor: "d33682",
          headerBGColor: "efefef",
          boardColor:  "4c4c4c"
        },
        {
          name:        "4chan Dark Upgrade",
          authorName:  "ahodesuka",
          authorTrip:  "!.pC/AHOKAg",
          "default":   true,
          bgImg:       "http://img85.imageshack.us/img85/4162/4chbg.gif",
          bgRPA:       "repeat top left fixed",
          replyOp:     "1.0", 
          navOp:       "0.9", 
          bgColor:     "242424",
          mainColor:   "333333",
          brderColor:  "3a3a3a",
          inputColor:  "2f2f2f",
          inputbColor: "0f0f0f",
          blinkColor:  "cccccc",
          jlinkColor:  "cccccc",
          linkColor:   "dddddd",
          linkHColor:  "eeeeee",
          nameColor:   "ffffff",
          quoteColor:  "63995b",
          textColor:   "ffffff",
          tripColor:   "a7dce7",
          titleColor:  "999999",
          headerColor: "ffffff",
          headerLColor: "dddddd",
          headerLHColor: "eeeeee",
          headerBGColor: "333333",
          boardColor:  "ffffff",
          customCSS:   "\n\n\n\n\n\n#delform{background:rgba(22,22,22,.8)!important;border:0!important;padding:1px!important;box-shadow:rgba(0,0,0,.8) 0 0 10px;}" +
                 ".postContainer>.reply{background-image:url(http://img714.imageshack.us/img714/3969/4ch2.gif)!important;" +
                 "border-bottom:#1f1f1f!important;border-radius:5px!important}" +
                 ".thread:not(.stub){background:0!important}a:not([href='javascript:;']){text-shadow:#0f0f0f 0 1px;}"
        },
        {
          name:        "AppChan", // Originally by Zixaphir @ http://userstyles.org/styles/54149/appchan
          authorName:  "Zixaphir",
          authorTrip:  "!M.........",
          "default":   true,
          bgImg:       false,
          replyOp:     "1.0", 
          navOp:       "0.9", 
          bgColor:     "2c2c2c",
          mainColor:   "333333",
          brderColor:  "333333",
          inputColor:  "333333",
          inputbColor: "2c2c2c",
          blinkColor:  "4f5f8f",
          jlinkColor:  "6688aa",
          linkColor:   "6688aa",
          linkHColor:  "6688aa",
          nameColor:   "aaaaaa",
          quoteColor:  "789922",
          textColor:   "aaaaaa",
          tripColor:   "aaaaaa",
          titleColor:  "aaaaaa",
          headerColor: "aaaaaa",
          headerLColor: "6688aa",
          headerLHColor: "6688aa",
          headerBGColor: "333333",
          boardColor:  "aaaaaa"
        },
        {
          name:        "Zenburned",
          authorName:  "lazy",
          authorTrip:  "!HONKYn7h1.",
          "default":   true,
          bgImg:       false,
          replyOp:     "1.0", 
          navOp:       "0.9", 
          bgColor:     "3f3f3f",
          mainColor:   "575757",
          brderColor:  "5e5e5e",
          inputColor:  "454545",
          inputbColor: "888888",
          blinkColor:  "dca3a3",
          jlinkColor:  "93b3a3",
          linkColor:   "efdcbc",
          linkHColor:  "f8f893",
          nameColor:   "c0bed1",
          quoteColor:  "7f9f7f",
          textColor:   "dcdccc",
          tripColor:   "8cd0d3",
          titleColor:  "aaaaaa",
          headerColor: "dcdccc",
          headerLColor: "efdcbc",
          headerLHColor: "f8f893",
          headerBGColor: "575757",
          boardColor:  "dcdccc"
        },
        {
          name:        "Monokai",
          authorName:  "Seaweed",
          authorTrip:  "!!lq+3fff+/ev",
          "default":   true,
          replyOp:     "1.0",
          navOp:       "0.9", 
          bgColor:     "20211c",
          mainColor:   "272822",
          brderColor:  "2d2e27",
          inputColor:  "20211c",
          inputbColor: "171713",
          blinkColor:  "f92672",
          jlinkColor:  "e2db74",
          linkColor:   "e2db74",
          linkHColor:  "ae81ff",
          nameColor:   "5ac0cc",
          quoteColor:  "a2cc28",
          textColor:   "f8f8f2",
          tripColor:   "fa8220",
          titleColor:  "ae81ff",
          headerColor: "f8f8f2",
          headerLColor: "e2db74",
          headerLHColor: "ae81ff",
          headerBGColor: "272822",
          boardColor:  "f8f8f2"
        },
        {
          name:        "Ao ni sarasu", // based on jaygeegeegee's http://userstyles.org/styles/75602/last-fm-kind-of-blue
          authorName:  "Seaweed",
          authorTrip:  "!!lq+3fff+/ev",
          "default":   true,
          replyOp:     "1.0",
          navOp:       "0.9",
          bgColor:     "e9eced",
          mainColor:   "e3e7e8",
          brderColor:  "cccccc",
          inputColor:  "e9eced",
          inputbColor: "cccccc",
          blinkColor:  "477085",
          jlinkColor:  "477085",
          linkColor:   "477085",
          linkHColor:  "5d6678",
          nameColor:   "4c4c4c",
          quoteColor:  "6b7a1e",
          textColor:   "4c4c4c",
          tripColor:   "5d6678",
          titleColor:  "617d6f",
          headerColor: "4c4c4c",
          headerLColor: "477085",
          headerLHColor: "5d6678",
          headerBGColor: "e3e7e8",
          boardColor:  "477085"
        }
      ],

      init: function()
      {
        $SS.conf["Themes"] = Array.isArray($SS.conf["Themes"]) ?
          this.defaults.concat($SS.conf["Themes"]) : this.defaults.slice(0);

        var i      = $SS.location.nsfw ?
                $SS.conf["NSFW Theme"] : $SS.conf["Selected Theme"],
          tIndex = $SS.conf["Themes"][i] ? i : 0;

        $SS.theme = new $SS.Theme(tIndex); // Set the active theme.
      }
    },

    /* MASCOTS */
    Mascots:
    {
      defaults:
      [
        { img: "https://i.minus.com/ibqbz63WobNaUZ.png",                                                         "default":   true }, // akiyama mio 2
        { img: "https://i.minus.com/itXHnhcnpzlZ0.png",                                                          "default":   true }, // akiyama mio sitting
        { img: "https://i.minus.com/i9fkOkQQ0Iyov.png",                                                          "default":   true }, // Asuka Langley Soryu
        { img: "https://i.minus.com/ibp4PTT2SK6I4o.png",                                                         "default":   true }, // BLACK★ROCK SHOOTER
        { img: "https://i.minus.com/iWV2iXY4AgeAz.png",                                                          "default":   true }, // Dawn / Hikari (Pokemon)
        { img: "https://i.minus.com/iwijU3hXlJwvx.png", small: true,                                             "default":   true }, // Furudo Erika
        { img: "https://i.minus.com/ixEW2qpW09BuX.png",                                                          "default":   true }, // Gasai Yuno
        { img: "https://i.minus.com/irXtk9ydjWtsl.png",                                                          "default":   true }, // Hasekura Youko
        { img: "https://i.minus.com/i3B8dszlW3Mfw.png",                                                          "default":   true }, // Hatsune Miku
        { img: "https://i.minus.com/iDNDSbUD5pXHZ.png",                                                          "default":   true }, // Hatsune Miku 2
        { img: "https://i.minus.com/iLkr2EDaYmknX.png", offset: -120, position: "center",                        "default":   true }, // Hatsune Miku (big)
        { img: "https://i.minus.com/idk1cr4HEhd9C.png",                                                          "default":   true }, // Hirasawa Yui
        { img: "https://i.minus.com/i8B0jpOGGqr8F.png",                                                          "default":   true }, // Ika Musume
        { img: "https://i.minus.com/iIKosmoehVEsl.png",                                                          "default":   true }, // Ika Musume 2
        { img: "https://i.minus.com/ibrwcAB72agjkn.png",                                                         "default":   true }, // Iwakura Lain 2
        { img: "https://i.minus.com/ib022yxCvyGw5z.png",                                                         "default":   true }, // Kagamine Rin
        { img: "https://i.minus.com/iben2goxAmh7aV.png",                                                         "default":   true }, // Kaname Madoka
        { img: "https://i.minus.com/ihyDfRynJ25vD.png",                                                          "default":   true }, // Koiwai Yotsuba
        { img: "https://i.minus.com/ijJber6Ts4www.png",                                                          "default":   true }, // Nagato Yuki 
        { img: "https://i.minus.com/ibtRMzjF9MS6oy.png", overflow: true,                                         "default":   true }, // Nakano Azusa
        { img: "http://i.minus.com/i87u3AnyzlVnb.png", small: true,                                              "default":   true }, // Patchouli Knowledge
        { img: "https://i.minus.com/izQNQ4akphZWn.png",                                                          "default":   true }, // Shana
        { img: "https://i.minus.com/iMUgBG7BdvMUU.png",                                                          "default":   true }, // Shinonome Hakase
        { img: "https://i.minus.com/iYuOeiFWnqP9i.png",                                                          "default":   true }, // Suzumiya Haruhi
        { img: "https://i.minus.com/iWUx3OHgNeyrS.png", offset: -120, position: "center",                        "default":   true }, // Suzumiya Haruhi 2
        { img: "https://i.minus.com/iortvyiEFHVQi.png", overflow: true,                                          "default":   true }, // asuka
        { img: "https://i.minus.com/ir1jBydJsjYtX.png",                                                          "default":   true }, // erio
        { img: "https://i.minus.com/iIoEVlv6PpsZt.png",                                                          "default":   true }, // homu
        { img: "https://i.minus.com/ilMeKtSdD4Ih9.png", offset: -90, position: "center", small: true,            "default":   true }, // kuroneko
        { img: "https://i.minus.com/i40A8T1uvg833.png", small: true,                                             "default":   true }, // lain
        { img: "https://i.minus.com/iHnv6bBdH3ElF.png",                                                          "default":   true }, // luka
        { img: "https://i.minus.com/iqVknxajfDzAD.png", offset: -90, position: "center",                         "default":   true }, // madotsuki
        { img: "https://i.minus.com/ibkEnN35Yaewt2.png", overflow: true,                                         "default":   true }, // ムゥ～りさ
        { img: "https://i.minus.com/iiEOIF7u05fIr.png", flip: false, overflow: true,                             "default":   true }, // mio
        { img: "https://i.minus.com/ieZPtyTynlwBK.png", offset: 0, position: "center",                           "default":   true }, // mokou
        { img: "https://i.minus.com/ib1pOfjwSD53sl.png", flip: false, small: true,                               "default":   true }, // shana
        { img: "https://i.minus.com/iRA9OW02HVchv.png",                                                          "default":   true }, // shiki
        { img: "https://i.minus.com/ik0hNJ61QjgD0.png",                                                          "default":   true }, // yin
        { img: "https://i.minus.com/i0v2fCxA6msfB.png",                                                          "default":   true }, // yuzuki
        { img: "https://i.minus.com/iBvqnYscczL3D.png", overflow: true,                                          "default":   true }, // patchouli 2
        { img: "https://i.minus.com/i31h7nnelAj5C.png",                                                          "default":   true }, // kefka
        { img: "https://i.minus.com/iNB442qqEYXzn.png",                                                          "default":   true }, // ciel
        { img: "https://i.minus.com/ibc2GhW4AW6tYy.png",                                                         "default":   true }, // fubuki atsuya
        { img: "https://i.minus.com/iqIGKQS61Uydk.png",                                                          "default":   true }, // inazuma 1
        { img: "https://i.minus.com/indbfcA4TS0Xb.png", small: true,                                             "default":   true }, // inazuma 2
        { img: "https://i.minus.com/ijdm4b711HIWs.png",                                                          "default":   true }, // inazuma 3
        { img: "https://i.minus.com/i2ODpJc3iRt3A.png",                                                          "default":   true }, // inazuma 4
        { img: "https://i.minus.com/i8FafJhXgAyWo.png",                                                          "default":   true }, // inazuma 5
        { img: "https://i.minus.com/i6gc70Hv8lTl6.png",                                                          "default":   true }, // inazuma 6
        { img: "https://i.minus.com/igbibpeTcWQIS.png",                                                          "default":   true }, // inazuma 7
        { img: "https://i.minus.com/ibjnPNJv4QGiUn.png",                                                         "default":   true }, // inga
        { img: "https://i.minus.com/ihhgWi5dADZKx.png",                                                          "default":   true }, // knb
        { img: "https://i.minus.com/iwp3zHABdUZn9.png", small: true,                                             "default":   true }, // knb 2
        { img: "https://i.minus.com/iP4MQ0TblOArQ.png", small: true,                                             "default":   true }, // kuroshitsuji
        { img: "https://i.minus.com/iboIUPbZAbNRiz.png",                                                         "default":   true }, // magi 1
        { img: "https://i.minus.com/ibptj9XtEE4yoi.png",                                                         "default":   true }, // magi 2
        { img: "https://i.minus.com/iJlh7Ek7QGYHf.png", small: true,                                             "default":   true }, // shinji
        { img: "https://i.minus.com/i7hTdHzxeHKuM.png", small: true,                                             "default":   true }, // shuu
        { img: "https://i.minus.com/ibvGG8EqpN9CVW.png",                                                         "default":   true }  // uta
      ],

      init: function()
      {
        $SS.conf["Mascots"] = Array.isArray($SS.conf["Mascots"]) ?
          this.defaults.concat($SS.conf["Mascots"]) : this.defaults.slice(0);

        var eMascot = [],
          mIndex;

        if ($SS.conf["Selected Mascots"] === 0)
        {
          eMascot = $SS.conf["Mascots"];
          mIndex  = Math.floor(Math.random() * eMascot.length);
        }
        else
        {
          for (var i = 0, MAX = $SS.conf["Selected Mascots"].length, j; i < MAX; ++i)
          {
            j = $SS.conf["Selected Mascots"][i];

            if ($SS.conf["Mascots"][j].boards == undefined ||
              $SS.conf["Mascots"][j].boards.split(",").indexOf($SS.location.board) !== -1)
              eMascot.push(j);
          }

          if (eMascot.length === 0)
            return $SS.mascot = new $SS.Mascot(-1);
          else
            mIndex = eMascot[Math.floor(Math.random() * eMascot.length)];
        }

        $SS.mascot = new $SS.Mascot(mIndex); // Set the active mascot.
      }
    },

    classes:
    {
      init: function()
      {
        /* Function arguments: ("Option Name", value, "class-name") */
        $("html").optionClass("Underline Links",              false,  "underline-disabled" );
        $("html").optionClass("Rounded Corners",              true,   "rounded-corners" );
        $("html").optionClass("Show Checkboxes",              false,  "hide-checkboxes" );
        $("html").optionClass("Show Board Name",              false,  "hide-board-name" );
        $("html").optionClass("Fit Width",                    true,   "reply-fit-width" );
        $("html").optionClass("Show Text Board",              false,  "hide-text-board" );
        $("html").optionClass("Show Banner",                  false,  "hide-banner" );
        $("html").optionClass("Show Banner Reflection",       true,   "banner-reflect" );
        $("html").optionClass("Reduce Banner Opacity",        true,   "banner-opacity" );
        $("html").optionClass("Show Reply to Thread Button",  false,  "hide-button" );
        $("html").optionClass("Style Post Info",              true,   "post-info" );
        $("html").optionClass("Borders",                      2,      "borders-all" );
        $("html").optionClass("Borders",                      3,      "borders-none" );
        $("html").optionClass("Sidebar Position",             1,      "right-sidebar" );
        $("html").optionClass("Sidebar Position",             2,      "left-sidebar" );
        $("html").optionClass("Recolor Even Replies",         true,   "recolor-even" );
        $("html").optionClass("Backlink Icons",               true,   "backlink-icon" );
        $("html").optionClass("Backlinks on Bottom",          true,   "backlink-bottom" );
        $("html").optionClass("Expanded Images Cover QR",     true,   "expand-cover" );
        $("html").optionClass("Autohide Style",               2,      "vertical-qr" );
        $("html").optionClass("Autohide Style",               3,      "fade-qr" );
        $("html").optionClass("SS-like Sidebar",              true,   "ss-sidebar" );
        $("html").optionClass("Allow Wrapping Around OP",     false,   "force-op" );
      }
    },

    pages:
    {
      hasInit: false,
      init: function()
      {
        if (this.hasInit)
        {
          $("#pagesDrop").remove();
          return this.hasInit = false;
        }
      }
    },

    tripHider:
    {
      hasInit: false,
      init: function(input)
      {
        if (this.hasInit && !$SS.conf["Smart Tripcode Hider"])
        {
          $("input[name=name]").each(function()
          {
            $(this).unbind("blur", $SS.tripHider.handle)
                .removeClass("tripping");
          });
          return this.hasInit = false;
        }
        else
        {
          input.bind("blur", this.handle);
          return this.hasInit = true;
        }
      },
      handle: function(e)
      {
        var $this = this.nodeName ? $(this) : $(e),
          check = /^.*##?.+/.test($this.val());

        if (check && !$this.hasClass("tripping"))
          $this.addClass("tripping");
        else if (!check && $this.hasClass("tripping"))
          $this.removeClass("tripping");
      }
    },

    riceInputs:
    {
      hasInit: false,
      init: function()
      {
        if (!this.hasInit)
        {
          if (!$SS.browser.webkit && !$SS.conf["Hide Checkboxes"])
            $("input[type=checkbox]").riceCheck();

          return this.hasInit = true;
        }
        else if (!$SS.browser.webkit &&
             !$SS.conf["Hide Checkboxes"] &&
             !$(".postInfo>.riceCheck").exists())
        {
          $("input[type=checkbox]").riceCheck();
          return this.hasInit = false;
        }
      }
    },

    logoReflect:
    {
      hasInit: false,
      init: function()
      {
        if (this.hasInit) return;

        var div = $("<div id=bBanner>").append($(".boardBanner>img").attr("id", "banner"));
        $(".boardBanner").prepend(div);

        return this.hasInit = true;
      }
    },

    jscolor:
    {
      getElementPos: function(e)
      {
        var e1=e, e2=e;
        var x=0, y=0;

        if (e1.offsetParent)
          do
          {
            x += e1.offsetLeft;
            y += e1.offsetTop;
          }
          while(e1 = e1.offsetParent);

        while((e2 = e2.parentNode) && e2.nodeName.toUpperCase() !== "BODY")
        {
          x -= e2.scrollLeft;
          y -= e2.scrollTop;
        }

        return [x, y];
      },
      getElementSize: function(e)
      {
        return [e.offsetWidth, e.offsetHeight];
      },
      getRelMousePos: function(e)
      {
        var x = 0, y = 0;

        if (!e)
          e = window.event;

        if (typeof e.offsetX === "number")
        {
          x = e.offsetX;
          y = e.offsetY;
        }
        else if (typeof e.layerX === "number")
        {
          x = e.layerX;
          y = e.layerY;
        }

        return { x: x, y: y };
      },
      getViewPos: function()
      {
        if (typeof window.pageYOffset === "number")
          return [window.pageXOffset, window.pageYOffset];
        else if (document.body && (document.body.scrollLeft || document.body.scrollTop))
          return [document.body.scrollLeft, document.body.scrollTop];
        else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop))
          return [document.documentElement.scrollLeft, document.documentElement.scrollTop];
        else
          return [0, 0];
      },
      getViewSize: function()
      {
        if (typeof window.innerWidth === "number")
          return [window.innerWidth, window.innerHeight];
        else if (document.body && (document.body.clientWidth || document.body.clientHeight))
          return [document.body.clientWidth, document.body.clientHeight];
        else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight))
          return [document.documentElement.clientWidth, document.documentElement.clientHeight];
        else
          return [0, 0];
      },

      // TODO: remove this array.
      images:
      {
        pad: [ 181, 101 ],
        sld: [ 16, 101 ],
        cross: [ 15, 15 ],
        arrow: [ 7, 11 ]
      },

      color: function(target)
      {

        this.required = true; // refuse empty values?
        this.adjust = true; // adjust value to uniform notation?
        this.hash = false; // prefix color with # symbol?
        this.caps = false; // uppercase?
        this.slider = true; // show the value/saturation slider?
        this.valueElement = target; // value holder
        this.styleElement = target; // where to reflect current color
        this.onImmediateChange = null; // onchange callback (can be either string or function)
        this.hsv = [0, 0, 1]; // read-only  0-6, 0-1, 0-1
        this.rgb = [1, 1, 1]; // read-only  0-1, 0-1, 0-1

        this.pickerSmartPosition = true; // automatically adjust picker position when necessary
        this.pickerFace = 10; // px
        this.pickerFaceColor = "ThreeDFace"; // CSS color
        this.pickerBorder = 1; // px
        this.pickerBorderColor = "ThreeDHighlight ThreeDShadow ThreeDShadow ThreeDHighlight"; // CSS color
        this.pickerInset = 1; // px
        this.pickerInsetColor = "ThreeDShadow ThreeDHighlight ThreeDHighlight ThreeDShadow"; // CSS color
        this.pickerZIndex = 10000;

        this.hidePicker = function()
        {
          if (isPickerOwner())
            removePicker();
        };
        this.showPicker = function()
        {
          if (!isPickerOwner())
          {
            var tp = $SS.jscolor.getElementPos(target); // target pos
            var ts = $SS.jscolor.getElementSize(target); // target size
            var ps = getPickerDims(this); // picker size
            var a=0, b=1, c=1;
            var l = (ts[1]+ps[1])/2;

            var pp =
            [
              tp[0],
              tp[1]+ts[1]
            ];

            drawPicker(pp[0], pp[1]);
          }
        };
        this.importColor = function()
        {
          if (!valueElement)
          {
            this.exportColor();
          }
          else
          {
            if (!this.adjust)
            {
              if (!this.fromString(valueElement.value, leaveValue))
              {
                styleElement.style.backgroundColor = styleElement.jscStyle.backgroundColor;
                styleElement.style.color = styleElement.jscStyle.color;
                this.exportColor(leaveValue | leaveStyle);
              }
            }
            else if (!this.required && /^\s*$/.test(valueElement.value))
            {
              valueElement.value = "";
              styleElement.style.backgroundColor = styleElement.jscStyle.backgroundColor;
              styleElement.style.color = styleElement.jscStyle.color;
              this.exportColor(leaveValue | leaveStyle);

            }
            else if (!this.fromString(valueElement.value))
              this.exportColor();
          }
        };
        this.exportColor = function(flags)
        {
          if (!(flags & leaveValue) && valueElement)
          {
            var value = this.toString();

            if (value[0] === "#")
              value = value.substr(1);

            valueElement.value = value;
          }

          if (!(flags & leaveStyle) && styleElement)
          {
            styleElement.style.backgroundColor = "#"+this.toString();
            styleElement.style.color =
              0.213 * this.rgb[0] +
              0.715 * this.rgb[1] +
              0.072 * this.rgb[2]
              < 0.5 ? "#FFF": "#000";
          }

          if (!(flags & leavePad) && isPickerOwner())
            redrawPad();

          if (!(flags & leaveSld) && isPickerOwner())
            redrawSld();
        };
        this.fromHSV = function(h, s, v, flags)
        {
          h<0 && (h=0) || h>6 && (h=6);
          s<0 && (s=0) || s>1 && (s=1);
          v<0 && (v=0) || v>1 && (v=1);

          this.rgb = HSV_RGB(
            h===null ? this.hsv[0]: (this.hsv[0]=h),
            s===null ? this.hsv[1]: (this.hsv[1]=s),
            v===null ? this.hsv[2]: (this.hsv[2]=v)
          );

          this.exportColor(flags);
        };
        this.fromRGB = function(r, g, b, flags)
        {
          r<0 && (r=0) || r>1 && (r=1);
          g<0 && (g=0) || g>1 && (g=1);
          b<0 && (b=0) || b>1 && (b=1);

          var hsv = RGB_HSV(
            r===null ? this.rgb[0]: (this.rgb[0]=r),
            g===null ? this.rgb[1]: (this.rgb[1]=g),
            b===null ? this.rgb[2]: (this.rgb[2]=b)
          );

          if(hsv[0] !== null)
            this.hsv[0] = hsv[0];

          if(hsv[2] !== 0)
            this.hsv[1] = hsv[1];

          this.hsv[2] = hsv[2];
          this.exportColor(flags);
        };
        this.fromString = function(hex, flags)
        {
          var m = hex.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i);

          if (!m) return false;
          else
          {
            if (m[1].length === 6)
              this.fromRGB(
                parseInt(m[1].substr(0,2),16) / 255,
                parseInt(m[1].substr(2,2),16) / 255,
                parseInt(m[1].substr(4,2),16) / 255,
                flags);
            else
              this.fromRGB(
                parseInt(m[1].charAt(0)+m[1].charAt(0),16) / 255,
                parseInt(m[1].charAt(1)+m[1].charAt(1),16) / 255,
                parseInt(m[1].charAt(2)+m[1].charAt(2),16) / 255,
                flags);

            return true;
          }
        };
        this.toString = function()
        {
          return (
            (0x100 | Math.round(255*this.rgb[0])).toString(16).substr(1) +
            (0x100 | Math.round(255*this.rgb[1])).toString(16).substr(1) +
            (0x100 | Math.round(255*this.rgb[2])).toString(16).substr(1)
          );
        };

        function RGB_HSV(r, g, b)
    {
          var n = Math.min(Math.min(r,g),b);
          var v = Math.max(Math.max(r,g),b);
          var m = v - n;
          if (m === 0) { return [ null, 0, v ]; }
          var h = r===n ? 3+(b-g)/m: (g===n ? 5+(r-b)/m: 1+(g-r)/m);
          return [ h===6?0:h, m/v, v ];
        }

        function HSV_RGB(h, s, v)
    {
          if (h === null) { return [ v, v, v ]; }
          var i = Math.floor(h);
          var f = i%2 ? h-i: 1-(h-i);
          var m = v * (1 - s);
          var n = v * (1 - s*f);
          switch(i) {
            case 6:
            case 0: return [v,n,m];
            case 1: return [n,v,m];
            case 2: return [m,v,n];
            case 3: return [m,n,v];
            case 4: return [n,m,v];
            case 5: return [v,m,n];
          }
        }

        function removePicker()
    {
          delete $SS.jscolor.picker.owner;
          window.removeEventListener("resize", removePicker, false);
          target.blur();
          document.getElementsByTagName("body")[0].removeChild($SS.jscolor.picker.boxB);
        }

        function drawPicker(x, y)
    {
          if (!$SS.jscolor.picker)
          {
            $SS.jscolor.picker =
            {
              box: document.createElement("div"),
              boxB: document.createElement("div"),
              pad: document.createElement("div"),
              padB: document.createElement("div"),
              padM: document.createElement("div"),
              sld: document.createElement("div"),
              sldB: document.createElement("div"),
              sldM: document.createElement("div"),
            };

            for(var i=0,segSize=4; i<$SS.jscolor.images.sld[1]; i+=segSize)
            {
              var seg = document.createElement("div");
              seg.style.height = segSize+"px";
              seg.style.fontSize = "1px";
              seg.style.lineHeight = "0";
              $SS.jscolor.picker.sld.appendChild(seg);
            }

            $SS.jscolor.picker.sldB.appendChild($SS.jscolor.picker.sld);
            $SS.jscolor.picker.box.appendChild($SS.jscolor.picker.sldB);
            $SS.jscolor.picker.box.appendChild($SS.jscolor.picker.sldM);
            $SS.jscolor.picker.padB.appendChild($SS.jscolor.picker.pad);
            $SS.jscolor.picker.box.appendChild($SS.jscolor.picker.padB);
            $SS.jscolor.picker.box.appendChild($SS.jscolor.picker.padM);
            $SS.jscolor.picker.boxB.appendChild($SS.jscolor.picker.box);
          }

          var p = $SS.jscolor.picker;

          // controls interaction
          window.addEventListener("resize", removePicker, false);
          p.box.onmouseup = p.box.onmouseout = function() { target.focus(); };
          p.box.onmousedown = function() { abortBlur=true; };
          p.box.onmousemove = function(e)
          {
            if (holdPad || holdSld)
            {
              holdPad && setPad(e);
              holdSld && setSld(e);

              if (document.selection)
                document.selection.empty();
              else if (window.getSelection)
                window.getSelection().removeAllRanges();

              dispatchImmediateChange();
            }
          };
          p.padM.onmouseup =
          p.padM.onmouseout = function() { if (holdPad) { holdPad=false; $(valueElement).fire("change"); } };
          p.padM.onmousedown = function(e)
          {
            holdPad=true;
            setPad(e);
            dispatchImmediateChange();
          };
          p.sldM.onmouseup =
          p.sldM.onmouseout = function() { if (holdSld) { holdSld=false; $(valueElement).fire("change"); } };
          p.sldM.onmousedown = function(e)
          {
            holdSld=true;
            setSld(e);
            dispatchImmediateChange();
          };

          // picker
          var dims = getPickerDims(THIS);
          p.box.style.width = dims[0] + "px";
          p.box.style.height = dims[1] + "px";

          /** MOVE TO CSS **/
          // picker border
          p.boxB.style.position = "fixed";
          p.boxB.style.clear = "both";
          p.boxB.style.left = x+"px";
          p.boxB.style.top = y+"px";
          p.boxB.style.zIndex = THIS.pickerZIndex;
          p.boxB.style.border = THIS.pickerBorder+"px solid";
          p.boxB.style.borderColor = THIS.pickerBorderColor;
          p.boxB.style.background = THIS.pickerFaceColor;

          // pad image
          p.pad.style.width = $SS.jscolor.images.pad[0]+"px";
          p.pad.style.height = $SS.jscolor.images.pad[1]+"px";

          // pad border
          p.padB.style.position = "absolute";
          p.padB.style.left = THIS.pickerFace+"px";
          p.padB.style.top = THIS.pickerFace+"px";
          p.padB.style.border = THIS.pickerInset+"px solid";
          p.padB.style.borderColor = THIS.pickerInsetColor;

          // pad mouse area
          p.padM.style.position = "absolute";
          p.padM.style.left = "0";
          p.padM.style.top = "0";
          p.padM.style.width = THIS.pickerFace + 2*THIS.pickerInset + $SS.jscolor.images.pad[0] + $SS.jscolor.images.arrow[0] + "px";
          p.padM.style.height = p.box.style.height;
          p.padM.style.cursor = "crosshair";

          // slider image
          p.sld.style.overflow = "hidden";
          p.sld.style.width = $SS.jscolor.images.sld[0]+"px";
          p.sld.style.height = $SS.jscolor.images.sld[1]+"px";

          // slider border
          p.sldB.style.display = THIS.slider ? "block" : "none";
          p.sldB.style.position = "absolute";
          p.sldB.style.right = THIS.pickerFace+"px";
          p.sldB.style.top = THIS.pickerFace+"px";
          p.sldB.style.border = THIS.pickerInset+"px solid";
          p.sldB.style.borderColor = THIS.pickerInsetColor;

          // slider mouse area
          p.sldM.style.display = THIS.slider ? "block" : "none";
          p.sldM.style.position = "absolute";
          p.sldM.style.right = "0";
          p.sldM.style.top = "0";
          p.sldM.style.width = $SS.jscolor.images.sld[0] + $SS.jscolor.images.arrow[0] + THIS.pickerFace + 2*THIS.pickerInset + "px";
          p.sldM.style.height = p.box.style.height;
          try {
            p.sldM.style.cursor = "pointer";
          } catch(eOldIE) {
            p.sldM.style.cursor = "hand";
          }

          // load images in optimal order
          p.padM.style.backgroundImage = "url('data:image/gif;base64,R0lGODlhDwAPAKEBAAAAAP///////////yH5BAEKAAIALAAAAAAPAA8AAAIklB8Qx53b4otSUWcvyiz4/4AeQJbmKY4p1HHapBlwPL/uVRsFADs=')";
          p.padM.style.backgroundRepeat = "no-repeat";
          p.sldM.style.backgroundImage = "url('data:image/gif;base64,R0lGODlhBwALAKECAAAAAP///6g8eKg8eCH5BAEKAAIALAAAAAAHAAsAAAITTIQYcLnsgGxvijrxqdQq6DRJAQA7')";
          p.sldM.style.backgroundRepeat = "no-repeat";
          p.pad.style.backgroundImage = "url('data:image/jpeg;base64,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')";
          p.pad.style.backgroundRepeat = "no-repeat";
          p.pad.style.backgroundPosition = "0 0";
          /** UNTIL HERE **/

          // place pointers
          redrawPad();
          redrawSld();

          $SS.jscolor.picker.owner = THIS;
          document.getElementsByTagName("body")[0].appendChild(p.boxB);
        }

        function getPickerDims(o)
    {
          var dims =
          [
            2*o.pickerInset + 2*o.pickerFace + $SS.jscolor.images.pad[0] +
              (o.slider ? 2*o.pickerInset + 2*$SS.jscolor.images.arrow[0] + $SS.jscolor.images.sld[0]: 0),
              2*o.pickerInset + 2*o.pickerFace + $SS.jscolor.images.pad[1]
          ];

          return dims;
        }

        function redrawPad()
    {
          // redraw the pad pointer
          var yComponent = 1;
          var x = Math.round((THIS.hsv[0]/6) * ($SS.jscolor.images.pad[0]-1));
          var y = Math.round((1-THIS.hsv[yComponent]) * ($SS.jscolor.images.pad[1]-1));
          $SS.jscolor.picker.padM.style.backgroundPosition =
            (THIS.pickerFace+THIS.pickerInset+x - Math.floor($SS.jscolor.images.cross[0]/2)) + "px " +
            (THIS.pickerFace+THIS.pickerInset+y - Math.floor($SS.jscolor.images.cross[1]/2)) + "px";

          // redraw the slider image
          var seg = $SS.jscolor.picker.sld.childNodes;

          var rgb = HSV_RGB(THIS.hsv[0], THIS.hsv[1], 1);
          for(var i=0; i<seg.length; i+=1)
            seg[i].style.backgroundColor = "rgb("+
              (rgb[0]*(1-i/seg.length)*100)+"%,"+
              (rgb[1]*(1-i/seg.length)*100)+"%,"+
              (rgb[2]*(1-i/seg.length)*100)+"%)";
        }

        function redrawSld()
    {
          // redraw the slider pointer
          var yComponent = 2;
          var y = Math.round((1-THIS.hsv[yComponent]) * ($SS.jscolor.images.sld[1]-1));
          $SS.jscolor.picker.sldM.style.backgroundPosition =
            "0 " + (THIS.pickerFace+THIS.pickerInset+y - Math.floor($SS.jscolor.images.arrow[1]/2)) + "px";
        }

        function isPickerOwner()
    {
          return $SS.jscolor.picker && $SS.jscolor.picker.owner === THIS;
        }

        function blurTarget()
    {
          if (valueElement === target)
            THIS.importColor();

          THIS.hidePicker();
        }

        function blurValue()
    {
          if (valueElement !== target)
            THIS.importColor();
        }

        function setPad(e)
    {
          var mpos = $SS.jscolor.getRelMousePos(e);
          var x = mpos.x - THIS.pickerFace - THIS.pickerInset;
          var y = mpos.y - THIS.pickerFace - THIS.pickerInset;
          THIS.fromHSV(x*(6/($SS.jscolor.images.pad[0]-1)), 1 - y/($SS.jscolor.images.pad[1]-1), null, leaveSld);
        }

        function setSld(e)
    {
          var mpos = $SS.jscolor.getRelMousePos(e);
          var y = mpos.y - THIS.pickerFace - THIS.pickerInset;
          THIS.fromHSV(null, null, 1 - y/($SS.jscolor.images.sld[1]-1), leavePad);
        }

        function dispatchImmediateChange()
    {
          if (THIS.onImmediateChange)
            if (typeof THIS.onImmediateChange === "string")
              eval(THIS.onImmediateChange);
            else
              THIS.onImmediateChange(THIS);
        }

        var THIS = this;
        var abortBlur = false;
        var valueElement = this.valueElement,
          styleElement = this.styleElement;
        var holdPad = false,
          holdSld = false;
        var leaveValue = 1<<0,
          leaveStyle = 1<<1,
          leavePad = 1<<2,
          leaveSld = 1<<3;

        // target
        $(target).bind("focus", THIS.showPicker)
             .bind("blur", function()
        {
          if (!abortBlur)
            window.setTimeout(function(){ abortBlur || blurTarget(); abortBlur=false; });
          else
            abortBlur = false;
        });

        // valueElement
        if (valueElement) {
          var updateField = function() {
            THIS.fromString(valueElement.value, leaveValue);
            dispatchImmediateChange();
          };
          $(valueElement).bind("keyup", updateField)
                  .bind("input", updateField)
                  .bind("blur", blurValue)
                  .attr("autocomplete", "off");
        }

        // styleElement
        if (styleElement) {
          styleElement.jscStyle =
          {
            backgroundColor: styleElement.style.backgroundColor,
            color: styleElement.style.color
          };
        }

        this.importColor();
      }
    },

    /* STRUCTS */
    Color: function(hex, incHover)
    {
      this.hex = "#" + hex;
      this.private_rgb = $SS.RGBFromHex(hex);
      this.rgb = this.private_rgb.join(",");
      this.isLight = $SS.isLight(this.private_rgb);
      this.shiftRGB = function(shift, smart)
      {
        var rgb = this.private_rgb.slice(0);

        shift = smart ?
          (this.isLight ? (shift < 0 ? shift : -shift) : Math.abs(shift)) : shift;

        rgb[0] = Math.min(Math.max(rgb[0] + shift, 0), 255);
        rgb[1] = Math.min(Math.max(rgb[1] + shift, 0), 255);
        rgb[2] = Math.min(Math.max(rgb[2] + shift, 0), 255);

        return rgb.join(",");
      };

      if (incHover)
        this.hover = this.shiftRGB(16, true);
    },
    colorToHex: function(color) {
      var digits, hex;

      if (color.substr(0, 1) === '#') {
        return color.slice(1, color.length);
      }
      if (digits = color.match(/(.*?)rgba?\((\d+), ?(\d+), ?(\d+)(.*?)\)/)) {
        hex = ((parseInt(digits[2], 10) << 16) | (parseInt(digits[3], 10) << 8) | (parseInt(digits[4], 10))).toString(16);
        while (hex.length < 6) {
          hex = "0" + hex;
        }
        return hex;
      } else {
        return false;
      }
    },
    Image: function(img, RPA)
    {
      this.img = img;
      this.RPA = RPA;
      this.get = function()
      {
        if (!this.img) return "none ";

        var ret = "url('";
        if ($SS.validBase64(this.img))
          ret += "data:image/" + $SS.typeofBase64(this.img) + ";base64," + this.img;
        else
          ret += this.img;

        return ret + "')" + (this.RPA != undefined ? " " + this.RPA : "");
      };
    },
    Mascot: function(index)
    {
      if (index == -1) // no mascot
      {
        this.img    = new $SS.Image(null);
        this.hidden = true;
        return;
      }
      else
        var mascot = $SS.conf["Mascots"][index];

      this.index    = index;
      this.hidden   = $SS.conf["Hidden Mascots"].indexOf(index) !== -1;
      this.default  = mascot.default;
      this.position = mascot.position;
      this.overflow = mascot.overflow;
      this.flip     = mascot.flip == undefined ? true : mascot.flip;
      this.img      = new $SS.Image(mascot.img,
        "no-repeat " + ("center") +
        " " + (this.position || "bottom"));
      this.small    = mascot.small || this.overflow;
      this.bOffset  = typeof mascot.offset === "number";
      this.offset   = this.bOffset ? mascot.offset : 24;
      this.boards   = mascot.boards;
      this.enabled  = $SS.conf["Selected Mascots"] === 0 || $SS.conf["Selected Mascots"].indexOf(index) !== -1;

      this.preview  = function()
      {
        var div = $("<div " + (this.hidden ? "hidden=true " : "") +
              "id=mascot" + this.index + " class=\'mascot-preview" + (this.enabled ? " selected" : "") +
              "\' style=\"background:" + this.img.get() + "\">")
              .html("<a class='mascot-link delete' title=Delete>X</a><a class='mascot-link edit' title=Edit>E</a>");

        $(div).bind("click", function(){ $(this).toggleClass("selected"); });

        $(".mascot-link.delete", div).bind("click", function(e)
        {
          e.stopPropagation();
          $SS.options.deleteMascot(index);
        });
        $(".mascot-link.edit", div).bind("click", function(e)
        {
          e.stopPropagation();
          $SS.options.showMascot(index);
        });

        return div;
      }
    },
    Theme: function(index)
    {
      var theme;

      if ((theme = $SS.conf["Themes"][index]) == undefined)
      {
        this.hidden = true;
        return;
      }

      this.index       = index;
      this.hidden      = $SS.conf["Hidden Themes"].indexOf(index) !== -1;
      this.name        = theme.name;
      this.authorName  = theme.authorName || "Anonymous";
      this.authorTrip  = theme.authorTrip || "!..NoTrip..";
      this.default     = theme.default;
      this.replyBrder  = theme.replyBrder;
      this.bgImg       = new $SS.Image(theme.bgImg, theme.bgRPA);
      this.replyOp     = theme.replyOp;
      this.navOp       = theme.navOp;
      this.bgColor     = new $SS.Color(theme.bgColor);
      this.mainColor   = new $SS.Color(theme.mainColor);
      this.brderColor  = new $SS.Color(theme.brderColor);
      this.inputColor  = new $SS.Color(theme.inputColor, true);
      this.inputbColor = new $SS.Color(theme.inputbColor);
      this.blinkColor  = new $SS.Color(theme.blinkColor);
      this.jlinkColor  = new $SS.Color(theme.jlinkColor);
      this.linkColor   = new $SS.Color(theme.linkColor);
      this.linkHColor  = new $SS.Color(theme.linkHColor);
      this.nameColor   = new $SS.Color(theme.nameColor);
      this.quoteColor  = new $SS.Color(theme.quoteColor);
      this.textColor   = new $SS.Color(theme.textColor);
      this.titleColor  = new $SS.Color(theme.titleColor);
      this.tripColor   = new $SS.Color(theme.tripColor);
      this.boardColor  = new $SS.Color(theme.boardColor);
      this.headerColor = new $SS.Color(theme.headerColor);
      this.headerLColor = new $SS.Color(theme.headerLColor);
      this.headerLHColor = new $SS.Color(theme.headerLHColor);
      this.headerBGColor = new $SS.Color(theme.headerBGColor);
      this.headerbColor= new $SS.Color(theme.headerbColor); 
      this.checkMark   = new $SS.Image(inputImages, "no-repeat center " + (this.inputColor.isLight ? 0 : -8) + "px");
      this.radioCheck  = new $SS.Image(inputImages, "no-repeat center " + (this.inputColor.isLight ? -16 : -24) + "px");
      this.dIcons      = new $SS.Image(theme.dIcons || defaultIcons);
      this.header      = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA";
      this.icons       =
      {
        closeButton:   "<svg viewBox='0 0 30 30' hpreserveAspectRatio='true' eight='16' width='16' xmlns='http://www.w3.org/2000/svg'>" +
                "<path fill='rgb(" + this.jlinkColor.rgb + ")' d='M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z'/></svg>",
        closedThread:  "<svg viewBox='0 0 30 30' preserveAspectRatio='true' height='16' width='16' xmlns='http://www.w3.org/2000/svg'>" +
                "<path fill='rgb(" + this.jlinkColor.rgb + ")' d='M22.335,12.833V9.999h-0.001C22.333,6.501,19.498,3.666,16,3.666S9.666,6.502,9.666,10h0v2.833H7.375V25h17.25V12.833H22.335zM11.667,10C11.667,10,11.667,10,11.667,10c0-2.39,1.944-4.334,4.333-4.334c2.391,0,4.335,1.944,4.335,4.333c0,0,0,0,0,0v2.834h-8.668V10z'/></svg>",
         stuckThread:  "<svg viewBox='0 0 30 30' preserveAspectRatio='true' height='16' width='16' xmlns='http://www.w3.org/2000/svg'>" +
                "<path fill='rgb(" + this.tripColor.rgb + ")' d='M16,3.5c-4.142,0-7.5,3.358-7.5,7.5c0,4.143,7.5,18.121,7.5,18.121S23.5,15.143,23.5,11C23.5,6.858,20.143,3.5,16,3.5z M16,14.584c-1.979,0-3.584-1.604-3.584-3.584S14.021,7.416,16,7.416S19.584,9.021,19.584,11S17.979,14.584,16,14.584z'/></svg>",
         imgExpand:    "<svg viewBox='0 0 30 30' preserveAspectRatio='true' height='18' width='18' xmlns='http://www.w3.org/2000/svg'>" +
                "<path fill='rgb(" + this.textColor.shiftRGB(32, true) + ")' d='M25.545,23.328,17.918,15.623,25.534,8.007,27.391,9.864,29.649,1.436,21.222,3.694,23.058,5.53,15.455,13.134,7.942,5.543,9.809,3.696,1.393,1.394,3.608,9.833,5.456,8.005,12.98,15.608,5.465,23.123,3.609,21.268,1.351,29.695,9.779,27.438,7.941,25.6,15.443,18.098,23.057,25.791,21.19,27.638,29.606,29.939,27.393,21.5z'/></svg>",
         imgContract:  "<svg viewBox='0 0 30 30' preserveAspectRatio='true' height='18' width='18' xmlns='http://www.w3.org/2000/svg'>" +
                "<path fill='rgb(" + this.textColor.rgb + ")' d='M25.083,18.895l-8.428-2.259l2.258,8.428l1.838-1.837l7.053,7.053l2.476-2.476l-7.053-7.053L25.083,18.895zM5.542,11.731l8.428,2.258l-2.258-8.428L9.874,7.398L3.196,0.72L0.72,3.196l6.678,6.678L5.542,11.731zM7.589,20.935l-6.87,6.869l2.476,2.476l6.869-6.869l1.858,1.857l2.258-8.428l-8.428,2.258L7.589,20.935zM23.412,10.064l6.867-6.87l-2.476-2.476l-6.868,6.869l-1.856-1.856l-2.258,8.428l8.428-2.259L23.412,10.064z'/></svg>",
         hideButton:   "<svg viewBox='0 0 30 30' preserveAspectRatio='true' height='16' width='16' xmlns='http://www.w3.org/2000/svg'>" +
                "<path fill='rgb(203,77,70)' d='M25.979,12.896,5.979,12.896,5.979,19.562,25.979,19.562z'/></svg>",
         showButton:   "<svg viewBox='0 0 30 30' preserveAspectRatio='true' height='16' width='16' xmlns='http://www.w3.org/2000/svg'>" +
                "<path fill='rgb(63,203,73)' d='M25.979,12.896 19.312,12.896 19.312,6.229 12.647,6.229 12.647,12.896 5.979,12.896 5.979,19.562 12.647,19.562 12.647,26.229 19.312,26.229 19.312,19.562 25.979,19.562z'/></svg>",
         returnButton: "<svg viewBox='0 0 30 30' height='16' width='16' xmlns='http://www.w3.org/2000/svg'>" +
                "<path fill='rgb(" + this.textColor.rgb + ")' d='M12.981,9.073V6.817l-12.106,6.99l12.106,6.99v-2.422c3.285-0.002,9.052,0.28,9.052,2.269c0,2.78-6.023,4.263-6.023,4.263v2.132c0,0,13.53,0.463,13.53-9.823C29.54,9.134,17.952,8.831,12.981,9.073z'/></svg>",
         notWatched:   "<svg viewBox='0 0 30 30' preserveAspectRatio='true' height='16' width='16' xmlns='http://www.w3.org/2000/svg'>" +
                "<path fill='rgb(" + this.quoteColor.rgb + ")' d='M16,22.375L7.116,28.83l3.396-10.438l-8.883-6.458l10.979,0.002L16.002,1.5l3.391,10.434h10.981l-8.886,6.457l3.396,10.439L16,22.375L16,22.375zM22.979,26.209l-2.664-8.205l6.979-5.062h-8.627L16,4.729l-2.666,8.206H4.708l6.979,5.07l-2.666,8.203L16,21.146L22.979,26.209L22.979,26.209z'/></svg>",
         watchedIco:   "<svg viewBox='0 0 30 30' preserveAspectRatio='true' height='16' width='16' xmlns='http://www.w3.org/2000/svg'>" +
                "<path fill='rgb(" + this.quoteColor.rgb + ")' d='M16,22.375L7.116,28.83l3.396-10.438l-8.883-6.458l10.979,0.002L16.002,1.5l3.391,10.434h10.981l-8.886,6.457l3.396,10.439L16,22.375L16,22.375z'/></svg>",
         menuButtonTop: "<svg viewBox='0 0 30 30' preserveAspectRatio='true' height='14' width='14' xmlns='http://www.w3.org/2000/svg'>" +
                "<path fill='rgb(" + this.textColor.rgb + ")' d='M8.037,11.166L14.5,22.359c0.825,1.43,2.175,1.43,3,0l6.463-11.194c0.826-1.429,0.15-2.598-1.5-2.598H9.537C7.886,8.568,7.211,9.737,8.037,11.166z'/></svg>",
         menuButtonBot: "<svg viewBox='0 0 30 30' preserveAspectRatio='true' height='14' width='14' xmlns='http://www.w3.org/2000/svg'>" +
                "<path fill='rgb(" + this.textColor.rgb + ")' d='M23.963,20.834L17.5,9.64c-0.825-1.429-2.175-1.429-3,0L8.037,20.834c-0.825,1.429-0.15,2.598,1.5,2.598h12.926C24.113,23.432,24.788,22.263,23.963,20.834z'/></svg>",
         OneeChan:     "<svg viewBox='0 0 32 32' preserveAspectRatio='true' height='16' width='16' xmlns='http://www.w3.org/2000/svg'>" +
                "<path fill='rgb(" + this.textColor.rgb + ")' d='M31.229,17.736c0.064-0.571,0.104-1.148,0.104-1.736s-0.04-1.166-0.104-1.737l-4.377-1.557c-0.218-0.716-0.504-1.401-0.851-2.05l1.993-4.192c-0.725-0.91-1.549-1.734-2.458-2.459l-4.193,1.994c-0.647-0.347-1.334-0.632-2.049-0.849l-1.558-4.378C17.165,0.708,16.588,0.667,16,0.667s-1.166,0.041-1.737,0.105L12.707,5.15c-0.716,0.217-1.401,0.502-2.05,0.849L6.464,4.005C5.554,4.73,4.73,5.554,4.005,6.464l1.994,4.192c-0.347,0.648-0.632,1.334-0.849,2.05l-4.378,1.557C0.708,14.834,0.667,15.412,0.667,16s0.041,1.165,0.105,1.736l4.378,1.558c0.217,0.715,0.502,1.401,0.849,2.049l-1.994,4.193c0.725,0.909,1.549,1.733,2.459,2.458l4.192-1.993c0.648,0.347,1.334,0.633,2.05,0.851l1.557,4.377c0.571,0.064,1.148,0.104,1.737,0.104c0.588,0,1.165-0.04,1.736-0.104l1.558-4.377c0.715-0.218,1.399-0.504,2.049-0.851l4.193,1.993c0.909-0.725,1.733-1.549,2.458-2.458l-1.993-4.193c0.347-0.647,0.633-1.334,0.851-2.049L31.229,17.736zM16,20.871c-2.69,0-4.872-2.182-4.872-4.871c0-2.69,2.182-4.872,4.872-4.872c2.689,0,4.871,2.182,4.871,4.872C20.871,18.689,18.689,20.871,16,20.871z'/></svg>",
         _4chanX:      "<svg viewBox='0 0 30 30' preserveAspectRatio='true' height='18' width='18' xmlns='http://www.w3.org/2000/svg'>" +
                "<path fill='rgb(" + this.textColor.rgb + ")' d='M28.537,9.859c-0.473-0.259-1.127-0.252-1.609-0.523c-0.943-0.534-1.186-1.316-1.226-2.475c-2.059-2.215-5.138-4.176-9.424-4.114c-1.162,0.017-2.256-0.035-3.158,0.435c-0.258,0.354-0.004,0.516,0.288,0.599c-0.29,0.138-0.692,0.147-0.626,0.697c2.72-0.383,7.475,0.624,7.116,2.966c-0.08,0.521-0.735,1.076-1.179,1.563c-1.263,1.382-2.599,2.45-3.761,3.667l0.336,0.336c0.742-0.521,1.446-0.785,2.104-0.785c0.707,0,1.121,0.297,1.276,0.433c0.575-0.618,1.166-1.244,1.839-1.853c0.488-0.444,1.047-1.099,1.566-1.178l0.949-0.101c1.156,0.047,1.937,0.29,2.471,1.232c0.27,0.481,0.262,1.139,0.521,1.613c0.175,0.324,0.937,1.218,1.316,1.228c0.294,0.009,0.603-0.199,0.899-0.49l1.033-1.034c0.291-0.294,0.501-0.6,0.492-0.896C29.754,10.801,28.861,10.035,28.537,9.859zM13.021,15.353l-0.741-0.741c-3.139,2.643-6.52,5.738-9.531,8.589c-0.473,0.443-1.452,1.021-1.506,1.539c-0.083,0.781,0.95,1.465,1.506,2c0.556,0.533,1.212,1.602,1.994,1.51c0.509-0.043,1.095-1.029,1.544-1.502c2.255-2.374,4.664-4.976,6.883-7.509c-0.312-0.371-0.498-0.596-0.498-0.596C12.535,18.451,11.779,17.272,13.021,15.353zM20.64,15.643c-0.366-0.318-1.466,0.143-1.777-0.122c-0.311-0.266,0.171-1.259-0.061-1.455c-0.482-0.406-0.77-0.646-0.77-0.646s-0.862-0.829-2.812,0.928L7.44,6.569C7.045,6.173,7.203,4.746,7.203,4.746L3.517,2.646L2.623,3.541l2.1,3.686c0,0,1.428-0.158,1.824,0.237l7.792,7.793c-1.548,1.831-0.895,2.752-0.895,2.752s0.238,0.288,0.646,0.771c0.196,0.23,1.188-0.249,1.455,0.061c0.264,0.312-0.196,1.41,0.12,1.777c2.666,3.064,6.926,7.736,8.125,7.736c0.892,0,2.021-0.724,2.948-1.64c0.925-0.917,1.639-2.055,1.639-2.947C28.377,22.567,23.704,18.309,20.64,15.643z'/></svg>",
         _4chanSP:     "<svg viewBox='0 0 30 30' preserveAspectRatio='true' height='16' width='16' xmlns='http://www.w3.org/2000/svg'>" +
                "<path fill='rgb(" + this.textColor.rgb + ")' d='M4.998,12.127v7.896h4.495l6.729,5.526l0.004-18.948l-6.73,5.526H4.998z M18.806,11.219c-0.393-0.389-1.024-0.389-1.415,0.002c-0.39,0.391-0.39,1.024,0.002,1.416v-0.002c0.863,0.864,1.395,2.049,1.395,3.366c0,1.316-0.531,2.497-1.393,3.361c-0.394,0.389-0.394,1.022-0.002,1.415c0.195,0.195,0.451,0.293,0.707,0.293c0.257,0,0.513-0.098,0.708-0.293c1.222-1.22,1.98-2.915,1.979-4.776C20.788,14.136,20.027,12.439,18.806,11.219z M21.101,8.925c-0.393-0.391-1.024-0.391-1.413,0c-0.392,0.391-0.392,1.025,0,1.414c1.45,1.451,2.344,3.447,2.344,5.661c0,2.212-0.894,4.207-2.342,5.659c-0.392,0.39-0.392,1.023,0,1.414c0.195,0.195,0.451,0.293,0.708,0.293c0.256,0,0.512-0.098,0.707-0.293c1.808-1.809,2.929-4.315,2.927-7.073C24.033,13.24,22.912,10.732,21.101,8.925z'/></svg>",
         _4sight:      "<svg viewBox='0 0 30 30' preserveAspectRatio='true' height='16' width='16' xmlns='http://www.w3.org/2000/svg'>" +
                "<path fill='rgb(" + this.textColor.rgb + ")' d='M29.772,26.433l-7.126-7.126c0.96-1.583,1.523-3.435,1.524-5.421C24.169,8.093,19.478,3.401,13.688,3.399C7.897,3.401,3.204,8.093,3.204,13.885c0,5.789,4.693,10.481,10.484,10.481c1.987,0,3.839-0.563,5.422-1.523l7.128,7.127L29.772,26.433zM7.203,13.885c0.006-3.582,2.903-6.478,6.484-6.486c3.579,0.008,6.478,2.904,6.484,6.486c-0.007,3.58-2.905,6.476-6.484,6.484C10.106,20.361,7.209,17.465,7.203,13.885z'/></svg>",
         catalog:      "<svg viewBox='0 0 30 30' preserveAspectRatio='true' height='16' width='16' xmlns='http://www.w3.org/2000/svg'>" +
                "<path fill='rgb(" + this.textColor.rgb + ")' d='M25.754,4.626c-0.233-0.161-0.536-0.198-0.802-0.097L12.16,9.409c-0.557,0.213-1.253,0.316-1.968,0.316c-0.997,0.002-2.029-0.202-2.747-0.48C7.188,9.148,6.972,9.04,6.821,8.943c0.056-0.024,0.12-0.05,0.193-0.075L18.648,4.43l1.733,0.654V3.172c0-0.284-0.14-0.554-0.374-0.714c-0.233-0.161-0.538-0.198-0.802-0.097L6.414,7.241c-0.395,0.142-0.732,0.312-1.02,0.564C5.111,8.049,4.868,8.45,4.872,8.896c0,0.012,0.004,0.031,0.004,0.031v17.186c0,0.008-0.003,0.015-0.003,0.021c0,0.006,0.003,0.01,0.003,0.016v0.017h0.002c0.028,0.601,0.371,0.983,0.699,1.255c1.034,0.803,2.769,1.252,4.614,1.274c0.874,0,1.761-0.116,2.583-0.427l12.796-4.881c0.337-0.128,0.558-0.448,0.558-0.809V5.341C26.128,5.057,25.988,4.787,25.754,4.626zM5.672,11.736c0.035,0.086,0.064,0.176,0.069,0.273l0.004,0.054c0.016,0.264,0.13,0.406,0.363,0.611c0.783,0.626,2.382,1.08,4.083,1.093c0.669,0,1.326-0.083,1.931-0.264v1.791c-0.647,0.143-1.301,0.206-1.942,0.206c-1.674-0.026-3.266-0.353-4.509-1.053V11.736zM10.181,24.588c-1.674-0.028-3.266-0.354-4.508-1.055v-2.712c0.035,0.086,0.065,0.176,0.07,0.275l0.002,0.053c0.018,0.267,0.13,0.408,0.364,0.613c0.783,0.625,2.381,1.079,4.083,1.091c0.67,0,1.327-0.082,1.932-0.262v1.789C11.476,24.525,10.821,24.588,10.181,24.588z'/></svg>",
         announcement: "<svg viewBox='0 0 30 30' preserveAspectRatio='true' height='16' width='16' xmlns='http://www.w3.org/2000/svg'>" +
                "<path fill='rgb(" + this.textColor.rgb + ")' d='M16,4.938c-7.732,0-14,4.701-14,10.5c0,1.981,0.741,3.833,2.016,5.414L2,25.272l5.613-1.44c2.339,1.316,5.237,2.106,8.387,2.106c7.732,0,14-4.701,14-10.5S23.732,4.938,16,4.938zM16.868,21.375h-1.969v-1.889h1.969V21.375zM16.772,18.094h-1.777l-0.176-8.083h2.113L16.772,18.094z'/></svg>",
         lastmu:       "<svg viewBox='0 0 30 30' preserveAspectRatio='true' height='18' width='18' xmlns='http://www.w3.org/2000/svg'>" +
                "<path fill='rgb(" + this.textColor.rgb + ")' d='M12.751,8.042v6.041v9.862c-0.677-0.45-1.636-0.736-2.708-0.736c-2.048,0-3.708,1.025-3.708,2.292c0,1.265,1.66,2.291,3.708,2.291s3.708-1.026,3.708-2.291V13.786l10.915-3.24v9.565c-0.678-0.45-1.635-0.736-2.708-0.736c-2.048,0-3.708,1.025-3.708,2.292c0,1.265,1.66,2.291,3.708,2.291s3.708-1.026,3.708-2.291V10.249V4.208L12.751,8.042z'/></svg>",
         heart:        "<svg viewBox='0 0 26 26' preserveAspectRatio='true' xmlns='http://www.w3.org/2000/svg'>" +
                "<path fill='rgb(" + this.textColor.rgb + ")' d='M24.132,7.971c-2.203-2.205-5.916-2.098-8.25,0.235L15.5,8.588l-0.382-0.382c-2.334-2.333-6.047-2.44-8.25-0.235c-2.204,2.203-2.098,5.916,0.235,8.249l8.396,8.396l8.396-8.396C26.229,13.887,26.336,10.174,24.132,7.971z'/></svg>",
         backlink:     "<svg viewBox='0 0 30 30' preserveAspectRatio='true' xmlns='http://www.w3.org/2000/svg'>" +
                "<path fill='rgb(" + this.blinkColor.rgb + ")' d='M12.981,9.073V6.817l-12.106,6.99l12.106,6.99v-2.422c3.285-0.002,9.052,0.28,9.052,2.269c0,2.78-6.023,4.263-6.023,4.263v2.132c0,0,13.53,0.463,13.53-9.823C29.54,9.134,17.952,8.831,12.981,9.073z'/></svg>",
      };

      if (theme.customCSS)
      {
        try
        {
          if (theme.customCSS[0] === "(")
            theme.customCSS = "\"+".concat(theme.customCSS);
          if (theme.customCSS[theme.customCSS.length-1] === ")")
            theme.customCSS += "+\"";

          this.customCSS = eval($SS.trimLineBreaks(new String('"'+theme.customCSS.replace(/\"/g, "\\\"") +'"')));
        }
        catch (e)
        {
          alert("Error evaluating " + this.name + "'s theme.customCSS!\n" + e.message);
          this.customCSS = theme.customCSS;
        }
      }
      else
        this.customCSS = "";

      this.preview = function()
      {
        var div = $("<div " + (this.hidden ? "hidden=true " : "") +
            " id=theme" + this.index + " class=\'theme-preview " + (($SS.conf["Selected Theme"] == $SS.conf["NSFW Theme"]) && ($SS.conf["Selected Theme"] == this.index) ? "selected nsfw" : ($SS.conf["Selected Theme"] == this.index ? "selected " : "") + ($SS.conf["NSFW Theme"] == this.index ? "nsfw " : "")) + "\'>").html("<div class=reply " +
            "style='background-color:" + this.mainColor.hex + "!important;border:1px solid " + this.brderColor.hex + "!important;color:" + this.textColor.hex + "!important'>" +
            "<div class=riceCheck style='background-color:" + this.inputColor.hex + "!important;border:1px solid " + this.inputbColor.hex + "!important;box-shadow:rgba(" + this.mainColor.shiftRGB(64) + ",.3) 0 1px;'></div>" +
            "<span style='color:" + this.titleColor.hex + "!important; font-weight: 700 !important'>" + this.name + "</span> " +
            "<span style='color:" + this.nameColor.hex + "!important; font-weight: 700 !important'>" + this.authorName + "</span>" +
            "<span style='color:" + this.tripColor.hex + "!important'> " + this.authorTrip + "</span>" +
            "<time style='color:" + this.textColor.hex + "'> 20XX.01.01 12:00 </time>" +
            "<a href='javascript:;' style='color:" + this.linkColor.hex + "!important' " +
            "onmouseover='this.setAttribute(\"style\",\"color:" + this.linkHColor.hex + "!important\")' " +
            "onmouseout='this.setAttribute(\"style\",\"color:" + this.linkColor.hex + "!important\")'>No.22772469</a>" +
            "<br><blockquote>Post content is right here.</blockquote>" +
            "<p class='theme-buttons-container'>" +
            "<a href='javascript:;' title='Sets the SFW theme.' style='background-color:" + this.inputColor.hex + "!important;border:1px solid " + this.inputbColor.hex + "!important;color:" + this.textColor.hex + "!important'>SFW</a>" +
            "<a href='javascript:;' title='Sets the NSFW theme.' style='background-color:" + this.inputColor.hex + "!important;border:1px solid " + this.inputbColor.hex + "!important;color:" + this.textColor.hex + "!important'>NSFW</a>" +
            "<a href='javascript:;' title=Edit style='background-color:" + this.inputColor.hex + "!important;border:1px solid " + this.inputbColor.hex + "!important;color:" + this.textColor.hex + "!important'>Edit</a>" +
            "<a href='javascript:;' title=Delete style='background-color:" + this.inputColor.hex + "!important;border:1px solid " + this.inputbColor.hex + "!important;color:" + this.textColor.hex + "!important'>Delete</a></p>" +
            "<h3 class='sfw-label notsafe'>NSFW</h3>" +
            "<h3 class='sfw-label safe'>SFW</h3>" +
            "<h3 class='sfw-label both'>SFW & NSFW</h3>" +
          "</div>");

        $(div).bind("click", function()
        {
          var $this = $(this);

          if ($this.hasClass("selected nsfw")) return;

          $this.parent().children(".selected").removeClass("selected");
          $this.parent().children(".nsfw").removeClass("nsfw");
          $this.addClass("selected nsfw");
          $SS.options.save();
        });

        $("a[title='Sets the SFW theme.']", div).bind("click", function(e)
        {
          e.stopPropagation();
          var $this = $(this);
          if ($this.hasClass("selected")) return;

          $this.parent().parent().parent().parent().children(".selected").removeClass("selected");
          $this.parent().parent().parent().addClass("selected");
        });

        $("a[title='Sets the NSFW theme.']", div).bind("click", function(e)
        {
          e.stopPropagation();
          var $this = $(this);
          if ($this.hasClass("nsfw")) return;

          $this.parent().parent().parent().parent().children(".nsfw").removeClass("nsfw");
          $this.parent().parent().parent().addClass("nsfw");
        });
        $("a[title=Delete]", div).bind("click", function(e)
        {
          e.stopPropagation();
          $SS.options.deleteTheme(index);
        });
        $("a[title=Edit]", div).bind("click", function(e)
        {
          e.stopPropagation();
          $SS.options.showTheme(index);
        });

        return div;
      }
    },




    /* HELPER METHODS */
    formatFont: function(font)
    {
      if (font === "sans-serif" || font === "monospace")
        return font;

      return "'" + font + "'";
    },
    RGBFromHex: function(hex)
    {
      var rgb = [];
      hex = parseInt(hex, 16);

      rgb[0] = (hex >> 16) & 0xFF;
      rgb[1] = (hex >> 8) & 0xFF;
      rgb[2] = hex & 0xFF;

      return rgb;
    },
    isLight: function(rgb)
    {
      return rgb[0] + rgb[1] + rgb[2] >= 400;
    },
    trimLineBreaks: function(str)
    {
      return str.replace(/(\r\n|\r|\n)/gm, "");
    },
    cleanBase64: function(b64)
    {
      return b64.replace(/^(data:image\/(?:gif|jpe?g|png);base64,)(\r\n|\r|\n)?/gmi, "");
    },
    typeofBase64: function(b64)
    {
      switch (b64.substr(0, 8))
      {
        case "PD94bWwg":
          return "svg+xml";
        case "R0lGODlh":
          return "gif";
        case "/9j/4AAQ":
        case "/9j/4QAY":
          return "jpeg";
        case "iVBORw0K":
        default:
          return "png";
      }
    },
    validBase64: function(b64)
    {
      return /^(?:data:image\/(?:gif|jpe?g|png);base64,)?(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=|[A-Za-z0-9+\/]{4})$/i.test(b64);
    },
    validImageURL: function(img)
    {
      return /^https?:\/\/.+$/i.test(img);
    },
    getLocation: function(url)
    {
      var obj;

      if (typeof url === "string")
      {
        obj = document.createElement("a");
        obj.href = location.protocol + "//" + url;
      }
      else
        obj = window.location;

      var pathname = obj.pathname.substr(1).split("/");

      return {
        sub  : obj.hostname.split(".")[0],
        board: pathname[0],
        nsfw:  /^(b|d|e|f|gif|h|hr|r|s|t|u|wg|i|ic|r9k|hm|y|hc|pol|soc)$/.test(pathname[0]),
        reply: pathname[1] === "res"
      };
    }
  };
  /* END STYLE SCRIPT CLASSES */

  $SS.init();
})();
