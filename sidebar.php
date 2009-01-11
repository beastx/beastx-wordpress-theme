<?
if (function_exists('dynamic_sidebar')) {
    ?>
    <div id="topBlock">
        <? if (!dynamic_sidebar(1)) { ?>
            <!-- Dynamic Top Block sidebar haven't any widget configure. -->
            <div class="topBlockWidget">
                <h4 class="topBlockWidgetTitle">Tag Clouds</h4>
                <?
                    wp_tag_cloud(array(
                        'smallest' => 65,
                        'largest' => 120,
                        'unit' => '%',
                        'number' => 20,
                        'format' => 'flat',
                        'orderby' => 'count',
                        'order' => 'ASC'
                    ));
                ?>
            </div>
        <? } ?>
    </div>
    <div id="leftBar">
        <? if (!dynamic_sidebar(2)) { ?>
            <!-- Dynamic Right SideBar Left sidebar haven't any widget configure. -->
            <div class="rightSideBarLeftWidget">
                <h4 class="rightSideBarLeftWidgetTitle">Categories</h4>
                <ul class="categories">
                    <?
                        wp_list_categories($defaults = array(
                            'show_option_all' =>'', 
                            'show_last_update' => 1, 
                            'style' => 'list',
                            'show_count' => 1, 
                            'hide_empty' => 1, 
                            'use_desc_for_title' => 1, 
                            'child_of' => 0, 
                            'feed' => '', 
                            'feed_image' => '', 
                            'current_category' => 0,
                            'hierarchical' => true, 
                            'title_li' => '', 
                            'echo' => 1,
                            'depth' => 0
                        ));
                    ?>
                </ul>
            </div>
        <? } ?>
    </div>
    <div id="rightBar">
        <? if (!dynamic_sidebar(3)) { ?>
            <!-- Dynamic Right SideBar Right sidebar haven't any widget configure. -->
            <div class="rightSideBarRightWidget">
                <h4 class="rightSideBarRightWidgetTitle">Archive</h4>
                <?
                    get_calendar(true);
                ?>
            </div>
        <? } ?>
    </div>
    <?
} else {
    echo "Dynamic Sidebars not work.";
}
?>