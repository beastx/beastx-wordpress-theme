<?

if (!empty($_SERVER['SCRIPT_FILENAME']) && 'comments.php' == basename($_SERVER['SCRIPT_FILENAME'])) {
    die ('Please do not load this page directly. Thanks!');
}

if (post_password_required() ) {
    echo '<p class="nocomments">This post is password protected. Enter the password to view comments.</p>';
    return;
}

function comment_add_microid($classes) {
    $c_email=get_comment_author_email();
    $c_url=get_comment_author_url();
    if (!empty($c_email) && !empty($c_url)) {
        $microid = 'microid-mailto+http:sha1:' . sha1(sha1('mailto:'.$c_email).sha1($c_url));
        $classes[] = $microid;
    }
    return $classes;
}

add_filter('comment_class','comment_add_microid');



if ( have_comments() ) { ?>
    <h4 id="comments">
        <?
            $comment_count = get_comment_count($post->ID);
            if ($comment_count['approved'] == 0) {
                echo 'No comments yet, be the first.';
            } else if ($comment_count['approved'] == 1) {
                echo '1 Comment.';
            } else {
                echo $comment_count['approved'] . ' Comments';
            }
        ?>
    </h4>
    <ul class="commentlist" id="singlecomments">
        <? wp_list_comments(array('avatar_size'=>48, 'reply_text'=>'Reply to this Comment')); ?>
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