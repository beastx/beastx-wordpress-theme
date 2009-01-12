<?

if (!empty($_SERVER['SCRIPT_FILENAME']) && 'comments.php' == basename($_SERVER['SCRIPT_FILENAME'])) {
    die ('Please do not load this page directly. Thanks!');
}

if (post_password_required() ) {
    echo '<p class="nocomments">This post is password protected. Enter the password to view comments.</p>';
    return;
}

?>

<div class="commentsHeader">
    <h4 class="commentsTitle">
        Comments
    </h4>
    <div class="commentCountBlock">
        <div class="commentCountBlockRightBorder"></div>
        <?
            $comment_count = get_comment_count($post->ID);
            if ($comment_count['approved'] == 0) {
                ?>
                <div class="commentCount noComments">
                    No comments yet.
                    <div class="lastOn"></div>
                </div>
                <?
            } else if ($comment_count['approved'] == 1) {
                ?>
                <div class="commentCount oneComment">
                    1 Comment.
                    <div class="lastOn">Last on <? echo $comments[count($comments) - 1]->comment_date ?></div>
                </div>
                <?
            } else {
                ?>
                <div class="commentCount">
                    <? echo $comment_count['approved'] ?> Comments.
                    <div class="lastOn">Last on <? echo strftime("%a %b %e, %Y", strtotime($comments[count($comments) - 1]->comment_date)); ?></div>
                </div>
                <?
            }
        ?>
        <div class="commentCountBlockLeftBorder"></div>
    </div>
</div>


<?

if ( have_comments() ) { ?>
    <ul class="commentlist" id="singlecomments">
        <? wp_list_comments(array('callback'=>'getCommentBlock')); ?>
    </ul>
    <div class="navigation">
        <div class="alignleft"><? previous_comments_link() ?></div>
        <div class="alignright"><? next_comments_link() ?></div>
    </div>
<? } else { ?>
    <? if ('open' == $post->comment_status) {
        // If comments are open, but there are no comments.
    } else {
        // comments are closed 
    }
}

if ('open' == $post-> comment_status) {
    require_once('commentsForm.php');
};