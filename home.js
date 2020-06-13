const fecthApi = new FetchApi("http://localhost:3000")
const containerPosts = document.getElementById('posts');
const searchBar = document.getElementById('searchBar');

function displayPosts(posts) {
    while (containerPosts.children.length > 0) {
        containerPosts.removeChild(containerPosts.childNodes[0]);
    }
    const postsDOM = posts.map(post => post.render());

    postsDOM.forEach(postDOM => {
        containerPosts.appendChild(postDOM)
    })
}

let searchPosts = [];

async function getAndShowPosts() {
    searchPosts = await fecthApi.getPosts();
    displayPosts(searchPosts);
}

getAndShowPosts();

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value;
    console.log(searchString);
    const filteredPosts = searchPosts.filter(post => {
        return post.title.includes(searchString)
    })
    displayPosts(filteredPosts);
})

//validate elements
function validateFormElement(inputElement, errorMessage) {
    if (inputElement.value === "") {
        if (!document.querySelector('[rel="' + inputElement.id + '"]')) {
            buildErrorMessage(inputElement, errorMessage);
        }
    } else {
        if (document.querySelector('[rel="' + inputElement.id + '"]')) {
            console.log("the error is erased!");
            document.querySelector('[rel="' + inputElement.id + '"]').remove();
            inputElement.classList.remove("inputError");
        }
    }
}

function buildErrorMessage(inputEl, errosMsg) {
    inputEl.classList.add("inputError");
    const errorMsgElement = document.createElement("span");
    errorMsgElement.setAttribute("rel", inputEl.id);
    errorMsgElement.classList.add("errorMsg");
    errorMsgElement.innerHTML = errosMsg;
    inputEl.after(errorMsgElement);
}

//create new posts

document.querySelector(".submitBtn").addEventListener("click", function(event) {
    event.preventDefault();

    const postAuthor = document.getElementById("postAuthor");
    const postTitle = document.getElementById("postTitle");
    console.log(postTitle.value)
    const postText = document.getElementById("postText");
    const postDate = document.getElementById("postDate");

    validateFormElement(postAuthor, "The author is required!");
    validateFormElement(postTitle, "The title is required!");
    validateFormElement(postDate, "The date is required!");

    if (postAuthor.value !== "" && postTitle.value !== "" && postDate.value !== "") {
        let newPost = {
            author: postAuthor.value,
            title: postTitle.value,
            text: postText.value,
            date: postDate.value
        }

        fecthApi.createPost(newPost);
    }
})