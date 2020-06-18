const path = require("path");
const fs = require("fs");

const htmlDir = path.resolve(__dirname, "../htmls");

const render = employees => {
    const html = [];

    html.push(employees
        .filter(employee => employee.getRole() == "Manager")
        .map(manager => renderManager(manager)).join("")
    );

    return renderMain(html.join(""));

};

const renderManager = manager => {
    let template = fs.readFileSync(path.resolve(htmlDir, "manager.html"), "utf8");
    template = replacePlaceholders(template, "name", manager.getName());
    template = replacePlaceholders(template, "role", manager.getRole());
    template = replacePlaceholders(template, "email", manager.getEmail());
    template = replacePlaceholders(template, "id", manager.getId());
    template = replacePlaceholders(template, "officeNumber", manager.getOfficeNumber());
    return template;
  };

  const renderMain = html => {
    const template = fs.readFileSync(path.resolve(htmlDir, "main.html"), "utf8");
    return replacePlaceholders(template, "team", html);
  };
  
  const replacePlaceholders = (template, placeholder, value) => {
    const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
    return template.replace(pattern, value);
  };
  
  module.exports = render;
  var HH = "";
var hh = ";"