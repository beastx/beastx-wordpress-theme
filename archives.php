<? get_header(); ?>
<div class="rightSideBar">
    <? get_sidebar(); ?>
</div>
<div class="contentContainer">
    <div id="content">

        <h2 class="title"><?php bloginfo('name') ?> Archives</h2>

        <h3>By Category</h3>
        <ul>
            <?php wp_list_categories('title_li=&show_count=1&hide_empty=0'); ?>
        </ul>


        <h3>By Month</h3>
        <ul>
            <?php wp_get_archives('type=monthly&limit=&format=html&before=&after=&show_post_count=1'); ?>
        </ul>


        <h3>By Year</h3>
        <ul>
            <?php wp_get_archives('type=yearly&limit=&format=html&before=&after=&show_post_count=1'); ?>
        </ul>


        <?php if(function_exists('wp_tag_cloud')) { ?>
            <h3>By Tag</h3>
            <?php wp_tag_cloud(''); ?>
        <?php } ?>


        <h3>By Author</h3>
        <ul>
            <?php wp_list_authors('exclude_admin=0&optioncount=1&feed='); ?>
        </ul>

    </div>
</div>
<? get_footer(); ?>