<div class="postinfo"> 
    <? if ($postCount==1) { social_bookmarks(); }?>
    <div class="postInCategories">Post in <? the_category(', ') ?> </div>
    <div class="commentslink">
        <?php comments_template(); ?>
    </div>  
    <? if ($postCount==1) { if(function_exists('wp_print')) { print_link(); }} ?> 
</div>