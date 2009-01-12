<div class="postinfo"> 
    <? if ($postCount==1 || is_single()) { social_bookmarks(); }?>
    <div class="postInCategories">Posted in <? the_category(', ') ?> </div>
    <? if ($postCount==1 || is_single()) { if (function_exists('wp_print')) { print_link(); }} ?> 
    <span id="rss">
        Subscribe to 
        <a href="<? bloginfo('rss2_url'); ?>" title="<? _e('Subscribe to RSS feed'); ?>" rel="nofollow">
            <? _e('<abbr title="Subscribe to RSS Feed">RSS</abbr>'); ?>
        </a>
        feed
    </span>
    <? edit_post_link('Edit', ' | ', ''); ?>
    <? if ( (function_exists('similar_posts')) && is_single()) { /* Related Posts Plugin */ ?> 
        <div class="relpost" ><? similar_posts(); ?></div>
    <? } ?>
    <div class="comments_block">
        <? comments_template(); ?>
    </div>  
</div>
