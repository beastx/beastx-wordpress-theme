<? get_header(); ?>
<div class="rightSideBar">
    <? get_sidebar(); ?>
</div>
<div class="contentContainer">
    <div id="content">

            <h2 class="title">Sitemap of <?php bloginfo('name') ?></h2>
            
            
            <h3>Pages:</h3>
            <ul>
                <?php wp_list_pages('title_li='); ?>
            </ul>
            
            
            <h3>Posts by category:</h3>
            <?php $cats= get_categories(); ?>
            <?php foreach ($cats as $cat) { ?>
                <?php query_posts('cat=' . $cat->cat_ID); ?>
                <h4><?php echo $cat->cat_name; ?></h4>
                <ul>
                    <?php while (have_posts()) : the_post(); ?>
                        <li>
                            <a href="<?php the_permalink(); ?>/#content" title="<?php the_title(); ?>"><?php the_title(); ?></a>
                            (<?php echo $post->comment_count ?> Comments)
                        </li>
                    <?php endwhile; ?>
                </ul>
            <?php } ?>
            
            
            <h3>Posts:</h3>
            <ul>
                <?php $my_query = new WP_Query('showposts=1000000'); ?>
                <?php while ($my_query->have_posts()) : $my_query->the_post(); $do_not_duplicate = $post->ID; ?>
                    <li><a href="<?php the_permalink(); ?>/#content" title="<?php the_title(); ?>" ><?php the_title(); ?></a></li>
                <?php endwhile; ?>	
            </ul>

    </div>
</div>
<? get_footer(); ?>