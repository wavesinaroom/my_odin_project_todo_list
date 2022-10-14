import ChecklistItem from "./check-item";

const PRIORITY={
  DEFAULT: 'default',
  LOW: 'low',
  MID: 'mid',
  HIGH: 'high'
};

const STATUS={
  DONE: 'done',
  INPROGRESS: 'InProgress'
};


export default class Card {

  static ID=0;

  static get PRIORITY(){
    return PRIORITY;
  }

  static get STATUS(){
    return STATUS;
  }

  constructor(title, description, priority, notes, listName){
    this.title = title;
    this.id = 'C'+Card.ID; 
    this.description = description;
    this.dueDate = null; 
    this.checklist = [];
    this.priority = priority; 
    this.notes = notes; 
    this.listName = listName; 
    this.completion = STATUS.INPROGRESS;

    this.render = function (){
      let innerHTML = ["<textarea>", this.title, "</textarea>",
                      "<textarea>", this.description, "</textarea>",
                      "<input type='date'>", this.dueDate, "</input>",
                      "<section id='"+this.id+"-CH'>",
                      "<button id='add-CHI'>Add</button>",
                      "</section>",
                      "<select name='priority'>",
                      "<option value='"+PRIORITY.LOW+"'>Low</option>",
                      "<option value='"+PRIORITY.MID+"'>Medium</option>",
                      "<option value='"+PRIORITY.HIGH+"'>High</option>",
                      "</select>",
                      "<select name='status'>",
                      "<option value='"+STATUS.DONE+"'>Done</option>'", 
                      "<option value='"+STATUS.INPROGRESS+"'>In progress</option>'", 
                      "</select>",
                      "<textarea>", this.notes, "</textarea>"].join("");
      document.getElementById(this.id).innerHTML = innerHTML;
    }


    let div = document.createElement('div');
    div.id = this.id; 
    div.className = 'card';
    document.body.appendChild(div);
    this.render();

    document.getElementById('add-CHI').addEventListener('click', ()=>{this.addChecklistItem();});
    for(let i=0; i<div.children.length; ++i){
      div.children[i].addEventListener('focusout', ()=>{this.saveChanges();});
    } 
  }

  addChecklistItem = function (){
    this.checklist.push(new ChecklistItem(this));
    ++ChecklistItem.checkItemID;
  } 

  saveChanges = function(){
    this.title = document.querySelector('#'+this.id+' :nth-child(1)').value;
    this.description = document.querySelector('#'+this.id+' :nth-child(2)').value;
    this.dueDate = document.querySelector('#'+this.id+' :nth-child(3)').value;
    this.priority = document.querySelector('#'+this.id+' :nth-child(4)').value;
    this.completion = document.querySelector('#'+this.id+' :nth-child(5)').value;
    this.notes = document.querySelector('#'+this.id+' :nth-child(7)').value;
    console.dir(this);
  }
}
