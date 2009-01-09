<?php

if ( function_exists('register_sidebar_widget') ) {
    if ( function_exists('wp_register_sidebar_widget')) {
        global $wp_register_widget_defaults;
        $wp_register_widget_defaults = false;

        wp_widget_multi_pages_register();
        register_sidebar_widget('SEO Archives', 'wp_seo_get_archives');

    }
}


/* link navigation hack by Orien http://icecode.com/ */
function wp_seo_get_archives_link($url, $text, $format = 'html', $before = '', $after = '', $do_nofollow = false) {
    $text = wptexturize($text);
    $title_text = attribute_escape($text);
    $nofollow_text = 'nofollow';
    
    if ('link' == $format)
        return "\t<link rel='archives" . ($do_nofollow?$nofollow_text:'') . "' title='$title_text' href='$url' />\n";
    elseif ('option' == $format)
        return "\t<option value='$url'>$before $text $after</option>\n";
    elseif ('html' == $format)
        return "\t<li>$before<a href='$url' title='$title_text'" . ($do_nofollow?' rel="' . $nofollow_text . '"':'') . ">$text</a>$after</li>\n";
    else // custom
        return "\t$before<a href='$url' title='$title_text'" . ($do_nofollow?' rel=\"' . $nofollow_text . '\"':'') . ">$text</a>$after\n";
}



function wp_seo_get_archives($args) {
    global $wp_locale, $wpdb;

    extract($args);
    
    $do_nofollow = true;
    
    echo $before_widget.$before_title.'Archives'.$after_title.'<ul>';
    
    /*if ( is_array($args) )
        $r = &$args;
    else
        parse_str($args, $r);
*/
    $defaults = array('type' => 'monthly', 'limit' => '', 'format' => 'html', 'before' => '', 'after' => '', 'show_post_count' => true);
    //$r = array_merge($defaults, $r);
    //extract($r);
    extract($defaults);

    if ( '' == $type )
        $type = 'monthly';

    if ( '' != $limit ) {
        $limit = (int) $limit;
        $limit = ' LIMIT '.$limit;
    }

    // this is what will separate dates on weekly archive links
    $archive_week_separator = '&#8211;';

    // over-ride general date format ? 0 = no: use the date format set in Options, 1 = yes: over-ride
    $archive_date_format_over_ride = 0;

    // options for daily archive (only if you over-ride the general date format)
    $archive_day_date_format = 'Y/m/d';

    // options for weekly archive (only if you over-ride the general date format)
    $archive_week_start_date_format = 'Y/m/d';
    $archive_week_end_date_format    = 'Y/m/d';

    if ( !$archive_date_format_over_ride ) {
        $archive_day_date_format = get_option('date_format');
        $archive_week_start_date_format = get_option('date_format');
        $archive_week_end_date_format = get_option('date_format');
    }

    $add_hours = intval(get_option('gmt_offset'));
    $add_minutes = intval(60 * (get_option('gmt_offset') - $add_hours));

    if ( 'monthly' == $type ) {
        $arcresults = $wpdb->get_results("SELECT DISTINCT YEAR(post_date) AS `year`, MONTH(post_date) AS `month`, count(ID) as posts FROM $wpdb->posts WHERE post_type = 'post' AND post_status = 'publish' GROUP BY YEAR(post_date), MONTH(post_date) ORDER BY post_date DESC" . $limit);
        if ( $arcresults ) {
            $afterafter = $after;
            foreach ( $arcresults as $arcresult ) {
                $url    = get_month_link($arcresult->year,    $arcresult->month);
                $text = sprintf(__('%1$s %2$d'), $wp_locale->get_month($arcresult->month), $arcresult->year);
                if ( $show_post_count ) 
                    $after = '&nbsp;('.$arcresult->posts.')' . $afterafter;
                echo wp_seo_get_archives_link($url, $text, $format, $before, $after, $do_nofollow);
            }
        }
    } elseif ('yearly' == $type) {
         $arcresults = $wpdb->get_results("SELECT DISTINCT YEAR(post_date) AS `year`, count(ID) as posts FROM $wpdb->posts WHERE post_type ='post' AND post_status = 'publish' GROUP BY YEAR(post_date) ORDER BY post_date DESC" . $limit);
        if ($arcresults) {
            $afterafter = $after;
            foreach ($arcresults as $arcresult) {
                $url = get_year_link($arcresult->year);
                $text = sprintf('%d', $arcresult->year);
                if ($show_post_count)
                    $after = '&nbsp;('.$arcresult->posts.')' . $afterafter;
                echo wp_seo_get_archives_link($url, $text, $format, $before, $after, $do_nofollow);
            }
        }              
    } elseif ( 'daily' == $type ) {
        $arcresults = $wpdb->get_results("SELECT DISTINCT YEAR(post_date) AS `year`, MONTH(post_date) AS `month`, DAYOFMONTH(post_date) AS `dayofmonth`, count(ID) as posts FROM $wpdb->posts WHERE post_type = 'post' AND post_status = 'publish' GROUP BY YEAR(post_date), MONTH(post_date), DAYOFMONTH(post_date) ORDER BY post_date DESC" . $limit);
        if ( $arcresults ) {
            $afterafter = $after;
            foreach ( $arcresults as $arcresult ) {
                $url    = get_day_link($arcresult->year, $arcresult->month, $arcresult->dayofmonth);
                $date = sprintf('%1$d-%2$02d-%3$02d 00:00:00', $arcresult->year, $arcresult->month, $arcresult->dayofmonth);
                $text = mysql2date($archive_day_date_format, $date);
                if ($show_post_count)
                    $after = '&nbsp;('.$arcresult->posts.')'.$afterafter;
                echo wp_seo_get_archives_link($url, $text, $format, $before, $after, $do_nofollow);
            }
        }
    } elseif ( 'weekly' == $type ) {
        $start_of_week = get_option('start_of_week');
        $arcresults = $wpdb->get_results("SELECT DISTINCT WEEK(post_date, $start_of_week) AS `week`, YEAR(post_date) AS yr, DATE_FORMAT(post_date, '%Y-%m-%d') AS yyyymmdd, count(ID) as posts FROM $wpdb->posts WHERE post_type = 'post' AND post_status = 'publish' GROUP BY WEEK(post_date, $start_of_week), YEAR(post_date) ORDER BY post_date DESC" . $limit);
        $arc_w_last = '';
        $afterafter = $after;
        if ( $arcresults ) {
                foreach ( $arcresults as $arcresult ) {
                    if ( $arcresult->week != $arc_w_last ) {
                        $arc_year = $arcresult->yr;
                        $arc_w_last = $arcresult->week;
                        $arc_week = get_weekstartend($arcresult->yyyymmdd, get_option('start_of_week'));
                        $arc_week_start = date_i18n($archive_week_start_date_format, $arc_week['start']);
                        $arc_week_end = date_i18n($archive_week_end_date_format, $arc_week['end']);
                        $url  = sprintf('%1$s/%2$s%3$sm%4$s%5$s%6$sw%7$s%8$d', get_option('home'), '', '?', '=', $arc_year, '&amp;', '=', $arcresult->week);
                        $text = $arc_week_start . $archive_week_separator . $arc_week_end;
                        if ($show_post_count)
                            $after = '&nbsp;('.$arcresult->posts.')'.$afterafter;
                        echo wp_seo_get_archives_link($url, $text, $format, $before, $after, $do_nofollow);
                    }
                }
        }
    } elseif ( ( 'postbypost' == $type ) || ('alpha' == $type) ) {
        ('alpha' == $type) ? $orderby = "post_title ASC " : $orderby = "post_date DESC ";
        $arcresults = $wpdb->get_results("SELECT * FROM $wpdb->posts WHERE post_type = 'post' AND post_status = 'publish' ORDER BY $orderby $limit");
        if ( $arcresults ) {
            $do_nofollow = false;
            foreach ( $arcresults as $arcresult ) {
                if ( $arcresult->post_date != '0000-00-00 00:00:00' ) {
                    $url  = get_permalink($arcresult);
                    
                    if("nofollow" == get_post_meta($arcresult->ID, 'nofollow_page', true) || ("nofollow_only_homepage" == get_post_meta($arcresult->ID, 'nofollow_page', true) && (is_frontpage() || is_home())) || ("not_homepage" == get_post_meta($arcresult->ID, 'nofollow_page', true) && !(is_frontpage() || is_home()))) {
                        $do_nofollow = true;
                    } else {
                        $do_nofollow = false;
                    }
                    
                    $arc_title = $arcresult->post_title;
                    
                    if(get_option('mt_meta_enabled_global') && (get_post_meta($arcresult->ID, 'mt_meta_page_enabled', true) || get_option('mt_meta_enabled_all_posts_default_global')) && get_post_meta($arcresult->ID, 'mt_meta_title_page', true)) {    // If meta plugin with options are enabled and the title is altered in the plugin, we need that title.
                            $arc_title = trim(stripslashes(get_post_meta($arcresult->ID, 'mt_meta_title_page', true)));
                    }
                    
                    if ($arc_title)
                        $text = strip_tags($arc_title);
                    else
                        $text = $arcresult->ID;
                    echo wp_seo_get_archives_link($url, $text, $format, $before, $after, $do_nofollow);
                }
            }
        }
    }
    echo '</ul>'.$after_widget;

}



?>
