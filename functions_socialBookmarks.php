<?php
function social_bookmarks(){ 
    //~ _e('<span class="socbook">');        
    //~ _e('<a href="'.str_replace(
        //~ array(                
            //~ '%title%',
            //~ '%permalink%'
            //~ ),
        //~ array(                
            //~ urlencode($GLOBALS['post']->post_title),
            //~ urlencode(apply_filters('the_permalink', get_permalink())),                                
            //~ ),
        //~ 'http://reddit.com/submit?title=%title%&amp;url=%permalink%' ).'"  target="_blank" rel="nofollow"><img src="http://www.prelovac.com/vladimir/wp-content/themes/AmazingGrace/images/reddit_be.gif" alt="Reddit" title="Reddit"/></a>'); 
    //~ _e('<a href="'.str_replace(
        //~ array(                
            //~ '%title%',
            //~ '%permalink%',                
            //~ ),
        //~ array(                
            //~ urlencode($GLOBALS['post']->post_title),
            //~ urlencode(apply_filters('the_permalink', get_permalink())),                                
            //~ ),
        //~ 'http://www.facebook.com/share.php?title=%title%&amp;u=%permalink%' ).'"  target="_blank" rel="nofollow"><img src="http://www.prelovac.com/vladimir/wp-content/themes/AmazingGrace/images/facebook_be.gif" alt="Facebook" title="Facebook"/></a>'); 
    //~ _e('<a href="'.str_replace(
        //~ array(                
            //~ '%title%',
            //~ '%permalink%',                
            //~ ),
        //~ array(                
            //~ urlencode($GLOBALS['post']->post_title),
            //~ urlencode(apply_filters('the_permalink', get_permalink())),                                
            //~ ),
        //~ 'http://www.stumbleupon.com/submit?title=%title%&amp;url=%permalink%' ).'"  target="_blank" rel="nofollow"><img src="http://www.prelovac.com/vladimir/wp-content/themes/AmazingGrace/images/stumbleupon_be.gif" alt="Stumbleupon" title="Stumbleupon"/></a>'); 

    //~ _e('<a href="'.str_replace(
        //~ array(                
            //~ '%title%',
            //~ '%permalink%',                
            //~ ),
        //~ array(                
            //~ urlencode($GLOBALS['post']->post_title),
            //~ urlencode(apply_filters('the_permalink', get_permalink())),                                
            //~ ),
        //~ 'http://digg.com/submit?phase=2&amp;title=%title%&amp;url=%permalink%').'"  target="_blank" rel="nofollow"><img src="http://www.prelovac.com/vladimir/wp-content/themes/AmazingGrace/images/digg_be.gif" alt="Digg" title="Digg"/></a>'); 

    //~ _e('<a href="'.str_replace(
        //~ array(                
            //~ '%title%',
            //~ '%permalink%',                
            //~ ),
        //~ array(                
            //~ urlencode($GLOBALS['post']->post_title),
            //~ urlencode(apply_filters('the_permalink', get_permalink())),                                
            //~ ),
        //~ //'http://del.icio.us/post?title=%title%&amp;url=%permalink%' ).'"  target="_blank" rel="nofollow" ><img src="http://www.prelovac.com/vladimir/wp-content/themes/AmazingGrace/images/del_be.gif" id="del_be" alt="Del.icio.us" title="Del.icio.us" onmouseover="document.images[\'del_be\'].src=\'http://www.prelovac.com/vladimir/wp-content/themes/AmazingGrace/images/del_be.gif\';" /></a>'); 
        //~ 'http://del.icio.us/post?title=%title%&amp;url=%permalink%' ).'"  target="_blank" rel="nofollow" ><img src="http://www.prelovac.com/vladimir/wp-content/themes/AmazingGrace/images/del_be.gif" id="del_be" alt="Del.icio.us" title="Del.icio.us"  /></a>'); 

    //~ _e('</span>');
}

?>
