const postId = window.location.search.substring(4, 100).trim();
const fecthApi = new FetchApi("http://localhost:3000");

function createUpdatedPost() {
    let form = document.querySelector('#updateForm');
    let updatedPost = {
        title: form.querySelector("#postTitleUpdated").value,
        text: form.querySelector("#postTextUpdated").value
    }
    return JSON.parse(JSON.stringify(updatedPost));
}

function editSinglePost() {
    let form = document.querySelector('#updateForm');
    form.reset();

    form.querySelector("#saveBtn").addEventListener("click", () => {
        let newUpdatedPost = createUpdatedPost();
        fecthApi.updatePost(postId, newUpdatedPost)
    })
}

editSinglePost()