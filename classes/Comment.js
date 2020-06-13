class MyComment {
    constructor(id, user, text) {
            this.id = id;
            this.user = user;
            this.text = text;
        }
        //reprezentarea unui comment in html
    render() {
        const containerComment = document.createElement('div');
        containerComment.setAttribute("id", this.id);
        containerComment.innerHTML = `
    <span>${this.user}</span>
    <p>${this.text}</p>
    <button class="deleteCommentBtn" >Delete</button>
    <button class="editCommentBtn" >Edit</button>
    `;
        return containerComment;
    }

    // deleteComment() {
    //     document.getElementById(this.id).addEventListener("click", function(event) {
    //         if (event.target.classList.contains('deleteCommentBtn')) {
    //             fetchApi.deleteComment(event.target.getAttribute("id"), () => {
    //                 removeDeletedElementFromDOM(event.target.parentElement);
    //             })
    //         }
    //     })

    // }
}