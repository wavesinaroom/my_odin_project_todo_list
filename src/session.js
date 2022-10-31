import Project from "./project.js";
import Container from "./container.js";

export default class Session extends Container{
  constructor(username){
    super();
    this.username = username;
    this.child = new Project();
    this.type = 'session';
    this.innerHTML = ["<div id='"+this.username+"-session' data-checklist='' data-card='' data-list='' data-project''>",
                "<H1>Call it a day!</H1>",
                "<button id='session-add-button'>Add Project</button>",
                "<button id='logout'>Log out</button>",
                "</div>"].join("");  
    this.div.innerHTML = this.innerHTML
    document.body.append(this.div);
    document.getElementById('session-add-button').addEventListener('click', ()=>{this.addChild(Project.getId());
    ++Project.count;});
  }
}
