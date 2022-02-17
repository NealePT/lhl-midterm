// Client facing scripts here
$( document ).ready(function() {

  // Find the resource id through the url. Only works for GET /collections/:id
  const resourceID = window.location.pathname.split('/')[2];

  // For collections_show.ejs nested inside <div id="commments-all">.
  const createCommentElement = newComment => {
    const $comment = `
    <span class="comment-details">
      <p class="user-name"><b>${newComment.commenter}</b></p>
      <p>${newComment.comment}</p>
    </span>
    `;
    return $comment;
  }
  const renderComments = comments => {
    for (const comment of comments) {
      let $comment = createCommentElement(comment);
      $( '#comments-all' ).prepend($comment);
    }
  }

  // For collections_show.ejs POST /collections/:id/comment
  $( '#comment-textbox' ).submit(function(event) {

    // Stop the default action (i.e. POST /collections/:id/comment) from being triggered.
    event.preventDefault();

    // Character escape function to prevent XSS.
    const escape = function (string) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(string));
      return div.innerHTML;
    };

    // Get the value from collections_show.ejs <textarea id="comment-textarea">
    const payload = escape($( this ).serialize());

    // if (payload.length > 13) {}

      // POST /collections/:id/comment
      $.post(`/collections/${resourceID}/comment`, payload)
      .then(function() {
        $.get(`/collections/${resourceID}/comment`)
        .then(function(data) {

          if (data.length > 0) {
            const newComment = data[data.length - 1];
            const $comment = createCommentElement(newComment);
            $( '#comments-all' ).prepend($comment);
          }

        })
      });

  });

  // Fetch comments.
  const loadComments = () => {
    $.get(`/collections/${resourceID}/comment`)
    .then(function(data) {
      renderComments(data);
    });
  };

  loadComments();

});
