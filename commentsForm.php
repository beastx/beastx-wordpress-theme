<div id="respond">
    <h3><? comment_form_title(); ?></h3>
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
            <? if ( $user_ID ) { ?>

                <p>Logged in as <a href="<? echo get_option('siteurl'); ?>/wp-admin/profile.php"><? echo $user_identity; ?></a>.
                <a href="<? echo get_option('siteurl'); ?>/wp-login.php?action=logout" title="Log out of this account">Logout &raquo;</a></p>

            <? } else { ?>

                <p><input type="text" name="author" id="author" value="<? echo $comment_author; ?>" size="22" tabindex="1" />
                <label for="author"><small>Name <? if ($req) echo "(required)"; ?></small></label></p>
                <p><input type="text" name="email" id="email" value="<? echo $comment_author_email; ?>" size="22" tabindex="2" />
                <label for="email"><small>Email <? if ($req) echo "(required)"; ?></small></label></p>
                <p><input type="text" name="url" id="url" value="<? echo $comment_author_url; ?>" size="22" tabindex="3" />
                <label for="url"><small>Website</small></label></p>

            <? } ?>

            <div>
            <? comment_id_fields(); ?>
            <input type="hidden" name="redirect_to" value="<? echo htmlspecialchars($_SERVER["REQUEST_URI"]); ?>" /></div>

            <p><small><strong>XHTML:</strong> You can use these tags: <? echo allowed_tags(); ?></small></p>

            <p><textarea name="comment" id="comment" cols="10" rows="10" tabindex="4"></textarea></p>

            <? if (get_option("comment_moderation") == "1") { ?>
                <p>
                    <small>
                        <strong>Please note:</strong> Comment moderation is enabled and may delay your comment. There is no need to resubmit your comment.
                    </small>
                </p>
            <? } ?>

            <p><input name="submit" type="submit" id="submit" tabindex="5" value="Submit Comment" /></p>
            
            <? do_action('comment_form', $post->ID); ?>

        </form>
        
    <? } ?>
</div>