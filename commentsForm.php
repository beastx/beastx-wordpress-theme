<div class="respondBlock">
    <h4 class="commentsTitle"><? comment_form_title(); ?></h4>
    <div id="cancel-comment-reply">
        <small><? cancel_comment_reply_link(); ?></small>
    </div>
    <? if ( get_option('comment_registration') && !$user_ID ) { ?>
        <p>
            You must be 
            <a href="<? echo get_option('siteurl'); ?>/wp-login.php?redirect_to=<? echo urlencode(get_permalink()); ?>">logged in</a>
            to post a comment.
        </p>
    <? } else { ?>
        <form action="<? echo get_option('siteurl'); ?>/wp-comments-post.php" method="post" id="commentform">
            <table>
                <tr>
                    <td class="autorInputs">
                        <? if ( $user_ID ) { ?>

                            <p>You are logged in as <a href="<? echo get_option('siteurl'); ?>/wp-admin/profile.php"><? echo $user_identity; ?></a>.
                            <a href="<? echo get_option('siteurl'); ?>/wp-login.php?action=logout" title="Log out of this account">Logout &raquo;</a></p>

                        <? } else { ?>
                            
                            <label for="author">Name <? if ($req) echo '<span class="required">(required)</span>'; ?></label>
                            <input type="text" name="author" id="author" value="<? echo $comment_author; ?>" size="22" tabindex="1" />
                            <label for="email">Email <? if ($req) echo '<span class="required">(required)</span>'; ?></label>
                            <input type="text" name="email" id="email" value="<? echo $comment_author_email; ?>" size="22" tabindex="2" />
                            <label for="url">Website</label>
                            <input type="text" name="url" id="url" value="<? echo $comment_author_url; ?>" size="22" tabindex="3" />
                            
                        <? } ?>
                        <input name="submit" type="submit" id="submit" tabindex="5" value="Submit Comment" />
                        <? if (get_option("comment_moderation") == "1") { ?>
                            <p class="noteCommentModeration">
                                <small>
                                    <strong>Please note:</strong> Comment moderation is enabled and may delay your comment. There is no need to resubmit your comment.
                                </small>
                            </p>
                        <? } ?>
                    </td>
                    <td class="commentInputs">

                        <? comment_id_fields(); ?>
                        <input type="hidden" name="redirect_to" value="<? echo htmlspecialchars($_SERVER["REQUEST_URI"]); ?>" /></div>
                        <label for="comment">
                            Comment <? if ($req) echo '<span class="required">(required)</span>'; ?>
                            <span id="xhtmlTags">
                                You can use some <strong>XHTML</strong> tags...
                                <div id="availableTags">
                                    <? echo allowed_tags(); ?>
                                </div>
                            </span>
                        </label>
                        <textarea name="comment" id="comment" cols="30" rows="9" tabindex="4"></textarea>
                    </td>
                </tr>
                
            </table>
            <? do_action('comment_form', $post->ID); ?>
        </form>
    <? } ?>
</div>

<script>
    Log($('xhtmlTags'));
    Event.observe($('xhtmlTags'), 'mouseover', function() { $('availableTags').style.display = 'block'; });
    Event.observe($('xhtmlTags'), 'mouseout', function() { $('availableTags').style.display = 'none'; });
</script>