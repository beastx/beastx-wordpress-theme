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

function getGravatarBlockByEmail($email) {
    $return = '<span class="gravatar">';
    $size=40;
    $default=get_bloginfo('template_directory').'/images/gravatar.jpg';
    $email=strtolower(trim($email));
    $rating = "G"; // [G | PG | R | X]
    
    if (function_exists('get_avatar')) {
        $return .= get_avatar($email, $size, $default);
    } else {
        $grav_url = "http://www.gravatar.com/avatar.php?gravatar_id=" . md5($emaill) . "&default=" . urlencode($default) . "&size=" . $size."&rating=".$rating;
        $return .= '<img src=' . $grav_url . '/>';
    }
    
    $return .= '</span>';
    return $return;
}

?>