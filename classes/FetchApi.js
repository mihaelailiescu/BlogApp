class FetchApi {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getPosts() {
        //1. facem request la server 
        // `${this.baseUrl}/posts` este la fel cu this.baseUrl + '/posts
        const response = await fetch(this.baseUrl + '/posts', { method: 'GET' });
        const postsJson = await response.json(); // {id, title ...} []
        //2. gfacem o mapare la Post
        const posts = postsJson.map(({ author, id, title, text, date }) => new Post(
            id,
            author,
            title,
            text,
            date,
        ));
        //3.returnam
        return posts

    }

    async getPostById(postId) {
        //1.facem request la server 
        // cautam local 

        const response = await fetch(`${this.baseUrl}/posts/${postId}`, { method: 'GET' });

        const { author, id, title, text, date } = await response.json(); //{id, title ...}

        return new Post(
            id,
            author,
            title.length == 0 ? "No title" : title,
            text,
            date,
        );

    }

    async updatePost(postId, post) {
        const response = await fetch(
            `${this.baseUrl}/posts/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(post)
            }
        ).catch(err => {
            console.log(err)
        });

        const postJson = await response.json();
        console.log(postJson);

        return new Post(
            postJson.id,
            postJson.author,
            postJson.title.length == 0 ? "No title" : postJson.title,
            postJson.text,
            postJson.date,
        );
    }

    async deletePost(postId) {
        const response = await fetch(
            `${this.baseUrl}/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        );
        const postJson = await response.json();
        return postJson;
    }

    async createPost(post) {
        const response = await fetch(
            `${this.baseUrl}/posts`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(post)
            }).catch(err => {
            console.log(err)
        });

        const postJson = await response.json();
        console.log(postJson);

        return new Post(
            postJson.id,
            postJson.author,
            postJson.title.length == 0 ? "No title" : postJson.title,
            postJson.text,
            postJson.date,
        );
    }

    async getComments(postId) {
        const response = await fetch(
            `${this.baseUrl}/posts/${postId}/comments`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        const commentsJson = await response.json();
        return commentsJson;
    }

    // async deleteComment(postId) {
    //     const response = await fetch(
    //         `${this.baseUrl}/posts/${postId}/comments`, {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //         }
    //     );
    //     const postJson = await response.json();
    //     return postJson;
    // }

}