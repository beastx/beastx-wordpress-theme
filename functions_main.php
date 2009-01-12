<?

if (function_exists('register_sidebar')) {
    register_sidebar(
        array(
            'name'=>'Top Blobk',
            'before_widget' => '<div class="topBlockWidget">',
            'after_widget' => '</div>',
            'before_title' => '<h4 class="topBlockWidgetTitle">',
            'after_title' => '</h4>'
        )
    );
    register_sidebar(
        array(
            'name'=>'Right Sidebar (Left)',
            'before_widget' => '<div class="rightSideBarLeftWidget">',
            'after_widget' => '</div>',
            'before_title' => '<h4 class="rightSideBarLeftWidgetTitle">',
            'after_title' => '</h4>'
        )
    );
    register_sidebar(
        array(
            'name'=>'Right Sidebar (Right)',
            'before_widget' => '<div class="rightSideBarRightWidget">',
            'after_widget' => '</div>',
            'before_title' => '<h4 class="rightSideBarRightWidgetTitle">',
            'after_title' => '</h4>'
        )
    );
    
    register_sidebar(
        array(
            'name'=>'Bottom bar',
            'before_widget' => '<div class="bottomBarWidget">',
            'after_widget' => '</div>',
            'before_title' => '<h4 class="bottomBarWidgetTitle">',
            'after_title' => '</h4>'
        )
    );
}


function getImageTag($imageUrl, $width = null, $height = null, $cssClass = null, $alt = null) {
    $imageTag = '<img src="' . get_bloginfo('template_url') . '/images/' . $imageUrl . '" ';
    
    if ($width) {
        $imageTag .= ' width="' . $width . '" ';
    }
    
    if ($height) {
        $imageTag .= ' height="' . $height . '" ';
    }
    
    if ($cssClass) {
        $imageTag .= ' class="' . $cssClass . '" ';
    }
    
    if ($alt) {
        $imageTag .= ' alt="' . $alt . '" />';
    } else {
        $imageTag .= ' alt="' . get_option('blogname') . '" />';
    }
    
    return $imageTag;
}

function getInputTag($var, $type, $description = "", $value = "", $selected="", $options = array()) {
    echo "\n";
    switch ($type) {
        
        case 'text':
        case 'file':
            echo '<input name="' . $var . '" id="'. $var . '" type="' . $type . '" class="textbox" value="' . $value . '" />';
            break;
            
        case 'submit':
            echo '<p class="submit"><input name="' . $var . '" type="' . $type . '" value="' . $value . '" /></p>';
            break;
        
        case 'select':
            echo '<select name="' . $var . '" id="'. $var . '">';
            for ($i = 0; $i < count($options); ++$i) {
                echo '<option value="' . $options[$i]['value'] . '"';
                if ($value == $options[$i]['value']) {
                    echo ' selected="selected" ';
                }
                 echo '>' . $options[$i]['name'] . '</option>';
            }
            echo '</select>';
            break;
        
        case 'radio':
            if ($selected == $value) { $extra = 'checked="checked"'; }
            echo '<label for="' . $var . '"><input name="' . $var . '" id="' . $var . '" type="' . $type . '" value="' . $value . '" ' . $extra . ' /> ' . $description . '</label>';
            break;

        case 'checkbox':
            if ($selected == $value) { $extra = 'checked="checked"'; }
            echo '<label for="' . $var . '"><input name="' . $var . '" id="' . $var . '" type="' . $type . '" value="' . $value . '" ' . $extra . ' />' . $description . '</label>';
            break;
        
        case 'textarea':
            echo '<textarea name="' . $var . '" id="' . $var . '" style="width: 80%; height: 10em;" class="code">' . $value . '</textarea>';
            break;
    }
}


function getCommentBlock($comment, $args, $depth) {
    $GLOBALS['comment'] = $comment;
    global $commentNumber;
    ++$commentNumber;
    if ($commentNumber == 1) {
        $extraClass = 'first';
    } else {
        $extraClass = '';
    }
    ?>
    <li <? comment_class(); ?> id="li-comment-<? comment_ID() ?>">
        <div class="commentContainer <? echo $extraClass ?>" id="comment-<? comment_ID(); ?>">
            <div class="commentNumber"><? echo $commentNumber?></div>
            <div class="comment-author vcard">
                <? echo get_avatar($comment, $size='48', $default=get_bloginfo('template_directory') . '/images/gravatar.jpg' ); ?>
                <? printf(__('<cite class="fn">%s</cite>'), get_comment_author_link()) ?>
            </div>
            <? if ($comment->comment_approved == '0') { ?>
                <em><? _e('Your comment is awaiting moderation.') ?></em>
                <br />
            <? } ?>
            <div class="commentText">
                <? comment_text() ?>
            </div>
            <div class="comment-meta commentmetadata">
                <a href="<? echo htmlspecialchars( get_comment_link( $comment->comment_ID ) ) ?>">
                    <? printf(__('%1$s at %2$s'), comment_date('M jS, Y'),  get_comment_time()) ?>
                </a>
                <? edit_comment_link(__('Edit'),' | ','') ?>
            </div>
            <div class="reply">
                <? comment_reply_link(array_merge( $args, array('depth' => $depth, 'max_depth' => $args['max_depth']))) ?>
            </div>
        </div>
<?
}

function comment_add_microid($classes) {
    $c_email=get_comment_author_email();
    $c_url=get_comment_author_url();
    if (!empty($c_email) && !empty($c_url)) {
        $microid = 'microid-mailto+http:sha1:' . sha1(sha1('mailto:'.$c_email).sha1($c_url));
        $classes[] = $microid;
    }
    return $classes;
}
add_filter('comment_class', 'comment_add_microid');

$commentNumber = 0;

?>