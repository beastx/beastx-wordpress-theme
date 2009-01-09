<?php
    function wp_widget_multi_pages($args, $number = 1) {
        extract($args);
        $options = get_option('widget_multi_pages');


        $sortby = empty( $options[$number]['sortby'] ) ? 'menu_order' : $options[$number]['sortby'];
        $exclude = empty( $options[$number]['exclude'] ) ? '' : '&exclude=' . $options[$number]['exclude'];
        $headpage = empty( $options[$number]['headpage'] ) ? '' : '&child_of=' . $options[$number]['headpage'];;
        $posts = empty( $options[$number]['posts'] ) ? '' : $options[$number]['posts'];

        if ( $sortby == 'menu_order' ) {
            $sortby = 'menu_order, post_title';
        }
        $title = $options[$number]['title'];
        
        if ($posts!='')
        {
            
            $out='';
            echo  $before_widget . $before_title . $title . $after_title . "<ul>";
             global $post;
             $myposts = get_posts('include='.$posts);
             foreach($myposts as $post) {
                 setup_postdata($post);                                          
                echo '<li><a href="';
                the_permalink();
                echo '">';
                the_title();
                echo '</a></li>';
            }             
            echo  "</ul>". $after_widget;
        }
        else {
            $out = wp_list_pages( 'title_li=&echo=0&sort_column=' . $sortby . $exclude . $headpage);
            
            if ( !empty( $title ) && !empty ( $out ) )
                {
                $out =  $before_widget . $before_title . $title . $after_title . "<ul>". $out . "</ul>". $after_widget;
                }
            
    
            if ( !empty( $out ) ) {
                ?>
                    <?php echo $out; ?>
            <?php
            }
        }

    }

    function wp_widget_multi_pages_control($number) {
        $options = $newoptions = get_option('widget_multi_pages');
        if ( !is_array($options) )
            $options = $newoptions = array();

        if ( $_POST["multi-pages-submit-$number"] ) {
            $sortby = stripslashes( $_POST["multi-pages-sortby-$number"] );
            if ( in_array( $sortby, array( 'post_title', 'menu_order', 'ID' ) ) )
                {
                $newoptions[$number]['sortby'] = $sortby;
                }
            else
                {
                $newoptions[$number]['sortby'] = 'menu_order';
                }
            $newoptions[$number]['exclude'] = strip_tags( stripslashes( $_POST["multi-pages-exclude-$number"] ) );
            $newoptions[$number]['headpage'] = strip_tags( stripslashes( $_POST["multi-pages-headpage-$number"] ) );
            $newoptions[$number]['title'] = strip_tags( stripslashes( $_POST["multi-pages-title-$number"] ) );
            $newoptions[$number]['posts'] = strip_tags( stripslashes( $_POST["multi-pages-posts-$number"] ) );

            }

        if ( $options != $newoptions ) {
            $options = $newoptions;
            update_option('widget_multi_pages', $options);
            }

        $exclude = attribute_escape( $options[$number]['exclude'] );
        $headpage = attribute_escape( $options[$number]['headpage'] );
        $title = attribute_escape( $options[$number]['title'] );
        $posts = attribute_escape( $options[$number]['posts'] );

        ?>
            <p><?php _e( 'Title :' ); ?> <input type="text" value="<?php echo $title; ?>" name="multi-pages-title-<?php echo $number; ?>" id="multi-pages-title-<?php echo $number; ?>" style="width: 180px;" /><br />
            <small><?php _e( 'Optional.' ); ?></small></p>
            <p><?php _e( 'Headpage:' ); ?> <input type="text" value="<?php echo $headpage; ?>" name="multi-pages-headpage-<?php echo $number; ?>" id="multi-pages-headpage-<?php echo $number; ?>" style="width: 180px;" /><br />
            <small><?php _e( 'Page IDs, separated by commas.' ); ?></small></p>
            <p><?php _e( 'Exclude:' ); ?> <input type="text" value="<?php echo $exclude; ?>" name="multi-pages-exclude-<?php echo $number; ?>" id="multi-pages-exclude-<?php echo $number; ?>" style="width: 180px;" /><br />
            <small><?php _e( 'Page IDs, separated by commas.' ); ?></small></p>
            <p><?php _e( 'or<br>Post IDs:' ); ?> <input type="text" value="<?php echo $posts; ?>" name="multi-pages-posts-<?php echo $number; ?>" id="multi-pages-posts-<?php echo $number; ?>" style="width: 180px;" /><br />
            <small><?php _e( 'Posts IDs, separated by commas.' ); ?></small></p>    
            <p><?php _e( 'Sort by:' ); ?>
                <select name="multi-pages-sortby-<?php echo $number; ?>" id="multi-pages-sortby-<?php echo $number; ?>">
                    <option value="post_title"<?php selected( $options[$number]['sortby'], 'post_title' ); ?>><?php _e('Page title'); ?></option>
                    <option value="menu_order"<?php selected( $options[$number]['sortby'], 'menu_order' ); ?>><?php _e('Page order'); ?></option>
                    <option value="ID"<?php selected( $options[$number]['sortby'], 'ID' ); ?>><?php _e( 'Page ID' ); ?></option>
                </select></p>
            <input type="hidden" id="multi-pages-submit-<?php echo $number; ?>" name="multi-pages-submit-<?php echo $number; ?>" value="1" />
        <?php
        }

    function wp_widget_multi_pages_setup() {
        $options = $newoptions = get_option('widget_multi_pages');
        if ( isset($_POST['multi-pages-number-submit']) ) {
            $number = (int) $_POST['multi-pages-number'];
            if ( $number > 9 ) $number = 9;
            if ( $number < 1 ) $number = 1;
            $newoptions['number'] = $number;
        }
        if ( $options != $newoptions ) {
            $options = $newoptions;
            update_option('widget_multi_pages', $options);
            wp_widget_multi_pages_register($options['number']);
        }
    }

    function wp_widget_multi_pages_page() {
        $options = $newoptions = get_option('widget_multi_pages');
    ?>
        <div class="wrap">
            <form method="POST">
                <h2><?php _e('Multi-pages Widgets'); ?></h2>
                <p style="line-height: 30px;"><?php _e('How many multi-pages widgets would you like?'); ?>
                <select id="multi-pages-number" name="multi-pages-number" value="<?php echo $options['number']; ?>">
    <?php for ( $i = 1; $i < 10; ++$i ) echo "<option value='$i' ".($options['number']==$i ? "selected='selected'" : '').">$i</option>"; ?>
                </select>
                <span class="submit"><input type="submit" name="multi-pages-number-submit" id="multi-pages-number-submit" value="<?php echo attribute_escape(__('Save')); ?>" /></span></p>
            </form>
        </div>
    <?php
    }

    function wp_widget_multi_pages_register() {
        $options = get_option('widget_multi_pages');
        $number = $options['number'];
        if ( $number < 1 ) $number = 1;
        if ( $number > 9 ) $number = 9;
        $dims = array('width' => 460, 'height' => 350);
        $class = array('classname' => 'widget_multi_pages');
        for ($i = 1; $i <= 9; $i++) {
            $name = sprintf(__('Multi-pages %d'), $i);
            $id = "multi-pages-$i"; // Never never never translate an id
            wp_register_sidebar_widget($id, $name, $i <= $number ? 'wp_widget_multi_pages' : /* unregister */ '', $class, $i);
            wp_register_widget_control($id, $name, $i <= $number ? 'wp_widget_multi_pages_control' : /* unregister */ '', $dims, $i);
        }
        add_action('sidebar_admin_setup', 'wp_widget_multi_pages_setup');
        add_action('sidebar_admin_page', 'wp_widget_multi_pages_page');
        }


?>
