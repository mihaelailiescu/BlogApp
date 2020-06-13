//1. prima data luam id din url 
const postId = window.location.search.substring(4, 100).trim();

function removeDeletedElementFromDOM(domElement) {
    domElement.remove();
}

function deleteSinglePost(postId) {
    document.getElementById(postId).addEventListener("click", (event) => {
        if (event.target.classList.contains('delete-btn')) {
            console.log(event.target.getAttribute("id"))
            fetchApi.deletePost(event.target.getAttribute("id"), (apiresponse) => {
                removeDeletedElementFromDOM(event.target.parentElement);
            })
        }
    })
}


//2. aducem postul 
const fetchApi = new FetchApi("http://localhost:3000")
    //const containerSinglePost = document.getElementById('single-post');

async function displaySinglePost() {

    const post = await fetchApi.getPostById(postId);

    const postDOM = post.render(true);
    let containerSinglePost = document.querySelector('#single-post');;
    containerSinglePost.appendChild(postDOM)
    deleteSinglePost(post.id);
}

displaySinglePost();

//afisare commenturi 
async function getAndShowComments() {
    const comments = await fetchApi.getComments(postId);
    console.log(comments)
    let containerComments = document.getElementById('commentList')

    for (let i = 0; i < comments.length; i++) {
        let comment = new MyComment(
            comments[i].id,
            comments[i].user,
            comments[i].text,
        )
        containerComments.appendChild(comment.render());
    }
}

getAndShowComments()