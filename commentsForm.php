<form action="<? echo get_option('siteurl'); ?>/wp-comments-post.php" method="post" id="commentform">
    <? if ( $user_ID ) { ?>
        <p>
            Logged in as <a href="<? echo get_option('siteurl'); ?>/wp-admin/profile.php"><? echo $user_identity; ?></a>.
            <a href="<? echo get_option('siteurl'); ?>/wp-login.php?action=logout" title="Log out of this account">Logout &raquo;</a>
        </p>
    <? } else { ?>
        <p>
            <input type="text" name="author" id="author" value="<? echo $comment_author; ?>" size="22" tabindex="1" />
            <label for="author"><small>Name<? if ($req) echo " (required)"; ?></small></label>
        </p>

        <p>
            <input type="text" name="email" id="email" value="<? echo $comment_author_email; ?>" size="22" tabindex="2" />
            <label for="email"><small>Email <? if ($req) echo "(required)"; ?></small></label>
        </p>

        <p>
            <input type="text" name="url" id="url" value="<? echo $comment_author_url; ?>" size="22" tabindex="3" />
            <label for="url"><small>Website</small></label>
        </p>
        <?
        /****** Math Comment Spam Protection Plugin ******/
        if ( function_exists('math_comment_spam_protection') ) { 
            $mcsp_info = math_comment_spam_protection();
            ?>
            <p>
                <input type="text" name="mcspvalue" id="mcspvalue" value="" size="22" tabindex="4" />
                <label for="mcspvalue"><small>Spam protection: Sum of <? echo $mcsp_info['operand1'] . ' + ' . $mcsp_info['operand2'] . ' ?' ?></small></label>
                <input type="hidden" name="mcspinfo" value="<? echo $mcsp_info['result']; ?>" />
            </p>
        <? } ?>
    
    <? } ?>

    <? if (!is_page('services')) { ?>
        <p><small>You will be able to edit your comment after submitting.</small></p>
    <? } else { ?>
        <p>Your comments and experiences with me and/or my services are welcome here.</p>
    <? } ?>

    <p>
        <textarea name="comment" id="comment" cols="100%" rows="15" tabindex="5"></textarea>
    </p>

    <p>
        <input name="submit" type="submit" id="submit" tabindex="6" value="Submit Comment" />
        <input type="hidden" name="comment_post_ID" value="<? echo $id; ?>" />
    </p>

    <? do_action('comment_form', $post->ID); ?>
</form>