<?

if (function_exists('register_sidebar')) {
    register_sidebar(
        array(
            'name'=>'Right Sidebar',
            'before_widget' => '',
            'after_widget' => '',
            'before_title' => '<h4>',
            'after_title' => '</h4>'
        )
    );
    
    register_sidebar(
        array(
            'name'=>'Bottom bar',
            'before_widget' => '',
            'after_widget' => '',
            'before_title' => '<h4>',
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

?>