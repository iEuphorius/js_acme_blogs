// Function 1: Create Element with Text

function createElemWithText(elementName = "p", textContent, className) {
    const newElement = document.createElement(elementName);
    newElement.textContent = textContent; 
    if(className) newElement.classList.add(className);
    return newElement; 
}

// Function 2: Create select option for each user
function createSelectOptions(parameter) {
    if(!parameter) return;
    const optionArray = [];
    console.log(parameter)
    for(let i=0; i<parameter.length; i++) {
        optionElement = document.createElement("option");
        optionElement.value = parameter[i].id;
        optionElement.textContent = parameter[i].name;
        optionArray.push(optionElement);        
    }  
    

    
    console.log(optionArray)
    return optionArray;
}

// Function 3: Create a comment section for id
function toggleCommentSection(postId) {
    if (!postId) {
        return;
    } else {
        const commentSections = document.querySelectorAll('[data-post-id]');
        for (let i = 0; i < commentSections.length; i++) {
            const commentSection = commentSections[i];            
            if (commentSection.getAttribute('data-post-id') === postId) {
                commentSection.classList.toggle('hide');
                return commentSection;
            }
        }

        // If we have gotten here, no matching id found
        return null;
    }   
}

// Function 4: Toggle the comment button to show or hide comments
function toggleCommentButton (postId) {
    if (!postId) {
      return;
    }
    const buttonSelected = document.querySelector(`button[data-post-id = "${postId}"`);
  
    if (buttonSelected != null) {
        buttonSelected.textContent === "Show Comments" ? (buttonSelected.textContent = "Hide Comments") : (buttonSelected.textContent = "Show Comments");
    }
    return buttonSelected;
  };

// function 5 delete child elements
/*
function deleteChildElements(parentElement){
    if(parentElement !== Element) {
        return undefined;
    }
    const childElement = parentElement.lastElementChild;
    while(childElement != null){
        parentElement.removeChild();
        parentElement.lastElementChild = childElement;
    }
    return parentElement;
}
*/
function deleteChildElements(parentElement) {
    if(parentElement==undefined || parentElement==null){
        return;
    }
    let child = parentElement.lastElementChild;
    while (child) {
      parentElement.removeChild(child);
      child = parentElement.lastElementChild;
    }
    return parentElement;
  }

//Function 6:
function addButtonListeners(){
    const buttons = document.querySelectorAll("#select .button");
    for(const button of buttons){
        button.addEventListerner("click", function(event){
            toggleComments();        
        })
    }
}

//Function 7:
function removeButtonListeners(){
    
}

//Function 8:
function createComments(comments){
    if (!comments) {
        return undefined;
    }
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < comments.length; i++) {
        const element = comments[i];
        const a = document.createElement("ARTICLE");
        const h3 = createElemWithText("h3", element.name);
        const p1 = createElemWithText("p", element.body);        
        const p2 = createElemWithText("p", `From: ${element.email}`);
        
        a.append(h3);
        a.append(p1);
        a.append(p2);
        fragment.append(a);
    }
    return fragment;
}

//Function 9:
function populateSelectMenu(users){
    if (!users) {
        return;
      }
      const selectMenu = document.getElementById("selectMenu");
      const options = createSelectOptions(users);
      for (let i = 0; i < options.length; i++) {
        const optionElement = options[i];
        const option = document.createElement("option");
        option.innerText = optionElement;
        selectMenu.appendChild(optionElement);
      }
      return selectMenu;
}

//Function 10:
const getUsers = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    const jsonUserData = await response.json();
    return jsonUserData;
}

//Function 11:
const getUserPosts = async (userId) => {
    if (!userId) {
        return;
    }
    try{
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    const jsonPostsData = await response.json();
    console.log(jsonPostsData);
    console.log(userId);
    return jsonPostsData;
    } catch(error){
        console.log(error);
    }
}

//Function 12:
const getUser = async (userId) => {
    if (!userId){
        return;
    }
    try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const jsonUserIdData = await response.json();
    console.log(userId);
    return jsonUserIdData;
    } catch(error){
        console.log(error);
    }
    console.log(jsonUserIdData)
}

//Function 13:
const getPostComments = async (postId) => {
    if(!postId){
        return;
    }
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        const jsonPostComments = await response.json();
        return jsonPostComments;
        } catch(error){
            console.log(error);
    }
}

//Function 14:
const displayComments = async (postId) =>{
    if(!postId){
        return;
    }
    let section = document.createElement("section");
    section.dataset.postId = postId;
    section.classList.add("comments", "hide");
    const comments = await getPostComments(postId);
    const fragment = createComments(comments);
    section.append(fragment);
    console.log(section);
    return section;
}

//Function 15:
const createPosts = async (jsonPosts) => {
    if(!jsonPosts){
        return;
    }

    let fragment = document.createDocumentFragment();

    for (let i = 0; i < jsonPosts.length; i++) {

        let post = jsonPosts[i];

        let article = document.createElement("article");
        let section = await displayComments(post.id);
        let author = await getUser(post.userId);

        let h2 = createElemWithText("h2", post.title);
        let p = createElemWithText("p", post.body);
        let p2 = createElemWithText("p", `Post ID: ${post.id}`);
        let p3 = createElemWithText("p", `Author: ${author.name} with ${author.company.name}`);
        let p4 = createElemWithText("p", `${author.company.catchPhrase}`);

        let button = createElemWithText("button", "Show Comments");
        button.dataset.postId = post.id;

        article.append(h2, p, p2, p3, p4, button, section); 
        fragment.append(article);
    }
    console.log(fragment);
    return fragment;
};

//Function 16:
const displayPosts = async (posts) => {
    let myMain = document.querySelector("main");
    let element = (posts) ? await createPosts(posts) : document.querySelector("main p");
    myMain.append(element);
    return element;
}

//Function 17:
function toggleComments(event, postId){
    if (!event || !postId){
        return;
    }
    event.target.listener = true;
    let section  = toggleCommentSection(postId);
    let button = toggleCommentButton(postId);
    return [section, button];
}

//Function 18:
const refreshPosts = async (posts) => {
    if (!posts){
        return;
    }
    let buttons = removeButtonListeners();
    let myMain = deleteChildElements(document.querySelector("main"));
    let fragment = await displayPosts(posts);
    let button = addButtonListeners();
    return [buttons, myMain, fragment, button];
}

//Function 19:
const selectMenuChangeEventHandler = async (e) => {
    let userId = e?.target?.value || 1;
    let posts = await getUserPosts(userId);
    let refreshPostsArray = await refreshPosts(posts);
    return [userId, posts, refreshPostsArray];
}

//Function 20:
const initPage = async() => {
    let users = await getUsers();
    let select = populateSelectMenu(users);
    return [users, select];
}

//Function 21:
function initApp(){
    initPage();
    let select = document.getElementById("selectMenu");
    select.addEventListener("change", selectMenuChangeEventHandler, false);
}

document.addEventListener("DOMContentLoaded", initApp, false);