<?

if ('comments.php' == basename($_SERVER['SCRIPT_FILENAME'])) {
    die ('Please do not load this page directly. Thanks!');
};

if (!empty($post->post_password)) {
    if ($_COOKIE['wp-postpass_' . COOKIEHASH] != $post->post_password) {
        ?>
            <p class="nocomments">This post is password protected. Enter the password to view comments.<p>
        <?
        return;
    }
}

$oddcomment = 'alt';

if ($comments) { ?>
    <h3 class="comments"><? comments_number('No Responses', 'One Response', '% Responses' );?> to &#8220;<? the_title(); ?>&#8221;</h3> 
    <ol class="commentlist">
        <? foreach ($comments as $comment) { ?>
        
            <? if(get_comment_type() == 'comment') { ?>
                <li class="<? echo $oddcomment; ?>" id="comment-<? comment_ID() ?>">
                    <? getGravatarBlock($comment->comment_author_email); ?>
                    <div class="commentmeta">
                        <cite><? comment_author_link() ?></cite>
                        <small>
                            <a href="#comment-<? comment_ID() ?>" title=""><? comment_date('F jS, Y') ?> at <? comment_time() ?></a>
                            <? edit_comment_link('e','',''); ?>
                        </small>
                    </div>
                    <? if ($comment->comment_approved == '0') { ?>
                        <em>Your comment is awaiting moderation.</em>
                    <? } ?>
                    <? comment_text() ?>
                </li>

                <?  if ($oddcomment == 'alt') { $oddcomment = ''; } else { $oddcomment = 'alt'; } ?>
            <? } ?>
        <? } ?>
    </ol>
    <? if (!is_page('services')) { ?>
        <h3 class="comments">Trackbacks/Pingbacks</h3>
    <? } ?>
    <ol>
        <? foreach ($comments as $comment) { ?>
            <? if(get_comment_type() != 'comment') { ?>
                <li><? comment_author_link() ?></li>
            <? } ?>
        <? } ?>
    </ol>
<? } else {
    //~ Dont have any post to show
    if ('open' != $post->comment_status) { ?>
        <p class="nocomments"></p>
    <? } else { ?>
        <div id="comments">
            <h3 class="comments">Leave a 
                <? if (is_page('services')) { echo 'Testimonial'; } else { echo 'Reply';  } ?>
            </h3>
        </div>

        <? if ( get_option('comment_registration') && !$user_ID ) { ?>
            <p>You must be <a href="<? echo get_option('siteurl'); ?>/wp-login.php?redirect_to=<? the_permalink(); ?>">logged in</a> to post a comment.</p>
        <? } else { ?>
            <? require_once('commentsForm.php'); ?>
        <? } ?>
    <? }?>
<? }?>