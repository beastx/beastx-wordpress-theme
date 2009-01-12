<? get_header(); ?>
<div class="rightSideBar">
    <? get_sidebar(); ?>
</div>
<div class="contentContainer">
    <div id="content">
        <? if (have_posts()) {
            $postCount=0;
            while (have_posts()) {
                the_post();
                $loopcounter++;
                $postCount++;
                ?>
                <div class="entry entry-<? echo $postCount ;?>">
                    <div class="entryDateContainer">
                        <div class="entryDateBorders">
                            <div class="entryDate">
                                <div class="entryDateMonth"><? mb_strtolower(the_time('M'));?></div>
                                <div class="entryDateDay"><? the_time('j'); ?></div>
                            </div>
                        </div>
                    </div>
                    <div class="entryTitle_wrap">
                        <table cellSpacing="0" cellPadding="0">
                            <tbody>
                                <tr>
                                    <td class="entryTitleTd">
                                        <div class="entryTitle">
                                            <? if ($postCount == 1) {?>  
                                                <h1><a href="<? the_permalink() ?>" rel="bookmark" title="Link to <? the_title(); ?>"><? the_title(); ?></a></h1> 
                                            <? } else { ?>
                                                <h2><a href="<? the_permalink() ?>" rel="bookmark" title="Link to <? the_title(); ?>"><? the_title(); ?></a></h2> 
                                            <? } ?>
                                        </div>
                                    </td>
                                    <td class="entryAutorTd">
                                        <div class="autor autor<? echo ($postCount == 1) ? "First" : "Second" ?>Entry">
                                            By 
                                            <a href="#"><? the_author(); ?></a>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="entryBody">
                        <? the_content('Read the rest of this entry &raquo;');   ?>
                    </div>
                    <div class="entryFooter">
                        <? require_once('postInfo.php'); ?>
                    </div>
                </div>
            <? } // end while ?>
            
            <div id="nav-global" class="navigation">
                <div class="nav-previous">
                    <? 
                    if(function_exists('wp_page_numbers')) { 
                        wp_page_numbers(); 
                    } else {
                        next_posts_link('&laquo; Previous entries');
                        echo '&nbsp;';
                        previous_posts_link('Next entries &raquo;');
                    }
                    ?>
                </div>
            </div>
        <? } else { ?>
            <h2>Not Found</h2>
            <div class="entrybody">Sorry, but you are looking for something that isn't here.</div>
        <? } ?>
    </div>
</div>
<? get_footer(); ?>