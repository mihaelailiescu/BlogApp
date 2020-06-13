class Post {
    constructor(id, author, title, text, data) {
        this.id = id;
        this.author = author,
            this.title = title,
            this.text = text,
            this.data = data;
    }

    //sa returneze reprezentarea html a unui Post 

    render(isSingle) {
        const containerPost = document.createElement('div');
        containerPost.classList.add('post')

        const linkHTMLString = isSingle ?
            `<a href="./edit-post.html?id=${this.id}" class="edit-btn">Edit</a>
            <button class="delete-btn" id=${this.id} >Delete</button>
            ` :
            `<a href="./view-post.html?id=${this.id}">View</a>
            `

        containerPost.innerHTML = `
      <h1>${this.title}</h1>
      <p>${this.text}</p>
      ${linkHTMLString}`

        return containerPost;
    }
}