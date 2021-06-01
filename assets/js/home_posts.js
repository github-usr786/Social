{
//  method to submit (post)form data for new post using Ajax
//console.log("hello everyone");
let createPost  = function(){
    let newPostForm = $('#new-post-form');
    newPostForm.submit(function(event){
        event.preventDefault();
            
            $.ajax({
            type: 'post',
            url: '/posts/create',
            data: newPostForm.serialize(),
            success: function(data){
                //console.log(data);
                let newPost  = newPostDom(data.data.post);
                //prepending newly added post in post list
                $('#post-list-container>ul').prepend(newPost);
                //
                deletePost($(' .delete-post-button',newPost));    //delete-post-button is class inside newPost (syntax of jquery)
                
             }, error: function(error){
                console.log(error.responseText);
            }
        });
    });  
}

//method to create a post in dom
let newPostDom  = function(post){
    return $(`
    <li id="post-${post._id}">
        <p>
            ${post.content}
            
            <small>
                <!-- when X is clicked id of post is send to route /post/destroy -->
                <a class = "delete-post-button" href="/posts/destroy/${post._id}"> X </a>
            </small>

            <br>
            <small>
                ${post.user.name}
            </small>
        </p>
    <div class = "post-comments">
        <form action="comments/create" method ="POST">
            <input type="text" name="content" placeholder="Type here to add comment.." required>
            <input type ="hidden" name ="post" value="${post._id}" >
            <input type="submit" value="add comment">
        </form>
    </div>

    <div class="post-comment-list">
        <ul id = "post-comment-${post._id}">
            
            </ul>
       </div>
    </li>
    `)
}

//method to delete post from DOM
let deletePost = function(deleteLink){
    $(deleteLink).click(function(event){
        event.preventDefault();
        
        $.ajax({
            type:'get',
            url: $(deleteLink).prop('href'),
            success: function(data){
                $(`#post-${data.data.post_id}`).remove();
            }, error: function(error){
                console.log(error.responseText);
            }
        });
    });
}





createPost();
}
