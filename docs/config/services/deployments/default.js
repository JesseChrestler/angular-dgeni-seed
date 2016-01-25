var angularjsVersion = "1.4.8";
var angularjscdnUrl = "https://ajax.googleapis.com/ajax/libs/angularjs/" + angularjsVersion;
module.exports =  function(exampleJs, exampleCss, rootPath){
  if (exampleJs !== undefined && rootPath !== ""){
    for(var i = 0;i < exampleJs.length;i++){
      exampleJs[i] = "/" + rootPath + "/" +  exampleJs[i];
    }
  }
  if (exampleCss !== undefined && rootPath !== ""){
    for(var i = 0;i < exampleCss.length;i++){
      exampleCss[i] = "/" + rootPath + "/" +  exampleCss[i];
    }
  }
  return function defaultDeployment() {
    return {
      name: "default",
      examples: {
        commonFiles: {
          scripts: exampleJs,
          stylesheets : exampleCss
        },
        dependencyPath: angularjscdnUrl + "/"
      },
      scripts: [
        angularjscdnUrl + "/angular.min.js", 
        angularjscdnUrl + "/angular-sanitize.min.js",
        angularjscdnUrl + "/angular-resource.min.js",
        angularjscdnUrl + "/angular-route.min.js",
        angularjscdnUrl + "/angular-cookies.min.js",
        angularjscdnUrl + "/angular-touch.min.js",
        angularjscdnUrl + "/angular-animate.min.js",
        'components/marked/lib/marked.js',
        'js/angular-bootstrap/bootstrap.js',
        'js/angular-bootstrap/dropdown-toggle.js',
        'components/lunr.js/lunr.min.js',
        'components/google-code-prettify/src/prettify.js',
        'components/google-code-prettify/src/lang-css.js',
        'js/pages-data.js',
        'js/nav-data.js',
        'js/docs.js'
      ],
      stylesheets: [
        'components/bootstrap/css/bootstrap.min.css',
        'components/open-sans-fontface/open-sans.css',
        'css/prettify-theme.css',
        'css/docs.css',
        'css/animations.css'
      ]
    };
  };
}