import React from "react";
import PropTypes from "prop-types";

import Comment from "./Comment";
import CommentForm from "./CommentForm";

const CommentsList = ({
  comments,
  handleFormSubmit,
  handleTextAreaChange,
  setTextAreaValues,
  textAreaValues
}) => {
  // iterate over comments prop containing all node comments.
  // create a Comment component containing 1-3 CommentForms.
  const commentsList = comments.map((comment, index) => {
    const commentFormProps = {
      handleFormSubmit,
      handleTextAreaChange
    };

    // if the comment is a reply to another comment, DON'T render a reply form.
    // otherwise, the comment can accept replies
    let replyCommentForm = null;
    if (!comment.replyTo) {
      const replyFormId = "reply-" + comment.commentId;
      replyCommentForm = <CommentForm
        commentId={comment.commentId}
        commentFormType="reply"
        formId={replyFormId}
        textAreaValue={textAreaValues[replyFormId]}
        {...commentFormProps}
      />;
    }

    // each comment comes with in a edit comment form
    const editFormId = "edit-" + comment.commentId;
    const editCommentForm = <CommentForm 
      commentFormType="edit"
      commentId={comment.commentId}
      formId={editFormId}
      textAreaValue={textAreaValues[editFormId]}
      {...commentFormProps}
    />;

    // generate the replies' edit comment forms to avoid the alternative: passing down props two levels
    const repliesWithEditForms = comment.replies.map((reply) => {
      const replyEditFormId = "edit-" + reply.commentId;
      reply.editCommentForm = <CommentForm 
        commentFormType="edit"
        commentId={reply.commentId}
        formId={replyEditFormId}
        rawCommentText={reply.rawCommentText}
        textAreaValue={textAreaValues[replyEditFormId]}
        {...commentFormProps}
      />;
    });

    return <Comment 
      key={"comment-" + index} 
      comment={comment}
      editCommentForm={editCommentForm}
      replyCommentForm={replyCommentForm}
      replies={repliesWithEditForms}
      setTextAreaValues={setTextAreaValues}
    />;
  });

  return (
    <div id="comments-list" style={{ marginBottom: "50px" }}>
      {commentsList}
    </div>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  handleTextAreaChange: PropTypes.func.isRequired,
  setTextAreaValues: PropTypes.func.isRequired,
  textAreaValues: PropTypes.object.isRequired
};

export default CommentsList;