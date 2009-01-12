<? get_header(); ?>
<div class="rightSideBar">
    <? get_sidebar(); ?>
</div>
<div class="contentContainer">
    <div id="content">
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        <?php if (have_posts()) : while (have_posts()) : the_post(); ?>

        <div class="entry">
                <div class="entrytitle_wrap">
        <?php if (!(is_page('about') || is_page('contact') || is_page('Sitemap') || is_page('tags')) ) :?>		
        <div class="entrydate"><div class="dateMonth"><?php the_time('M'); ?></div><div class="dateDay"><?php the_time('j'); ?></div>  </div>
        <?php endif; ?>
        <div class="entrytitle">
        <h1><a href="<?php the_permalink() ?>" rel="bookmark" title="Link to <?php the_title(); ?>"><?php the_title(); ?></a></h1> 


        </div>
        <div class="endate"><?php the_author(); ?> on <?php the_time('F jS, Y'); ?></div>
        </div>

        <div class="entrybody">
        <?php the_content('Read the rest of this entry &raquo;');  ?>
        <?php if (is_page('Tags') && function_exists('st_tag_cloud')) st_tag_cloud(); ?>
        </div>
        <div class="pagelink"><?php wp_link_pages(); ?></div>

        <?php if (!(is_page('about') || is_page('contact') || is_page('Sitemap')  || is_page('tags')) ) :?>		

        <div class="entrymeta"><div class="postinfo"> 
        <?php social_bookmarks(); ?>
        <?php if(function_exists('wp_print')) { print_link(); } ?> 
        <span id="rss">Subscribe to <a href="<?php bloginfo('rss2_url'); ?>" title="<?php _e('Subscribe to RSS feed'); ?>" rel="nofollow"><?php _e('<abbr title="Subscribe to RSS Feed">RSS</abbr>'); ?></a></span>

        <?php edit_post_link('Edit', ' | ', ''); ?>
        </div></div>

        <?php endif; ?>

        </div>
            
        <div class="commentsblock">
        <?php comments_template(); ?>
        </div>
          
            
        <?php endwhile; ?>

        <?php else : ?>
        <h2>Not Found</h2>
        <div class="entrybody">Sorry, but you are looking for something that isn't here.</div>
        <?php endif; ?>
        </div>
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
    </div>
</div>
<? get_footer(); ?>