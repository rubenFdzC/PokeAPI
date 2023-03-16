const input = document.querySelector('input');
const button = document.querySelector('.btn-add');
const list = document.querySelector('ul');
const empty = document.querySelector('.empty');

button.addEventListener('click', () => {
    const task = input.value;
    
    if(task.trim() === '') {
      //The trim() method removes whitespace from both ends of a string and returns a new string, without modifying the original string
      return;
    }
  
    const listItem = document.createElement('li');
    const textNode = document.createTextNode(task);
  
    listItem.appendChild(textNode);
    list.appendChild(listItem);
  
    input.value = ''; 
  });
  