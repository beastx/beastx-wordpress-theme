<?php 

/* Related Posts Plugin */
if ( (function_exists('similar_posts')) && is_single()  ) {
similar_posts();


/* general */
wp_head();
wp_list_pages('sort_column=menu_order&hierarchical=0&title_li=');
wp_list_categories('exclude=1&child_of=0&hide_empty=0&orderby=ID&show_count=0&hierarchical=1&number=20&depth=1&title_li=');
wp_link_pages();
wp_list_cats('sort_column=name&optioncount=1&hierarchical=0');
wp_get_archives('type=monthly');
wp_list_bookmarks('categorize=0&title_li=0&title_after=&title_before=');
wp_register();
wp_loginout();
wp_meta();
wp_get_archives('type=monthly');




get_footer();
get_header();
get_sidebar();
get_num_queries();
get_settings('home');




_e('Subscribe to RSS feed');
_e('<abbr title="Subscribe to RSS Feed">RSS</abbr>');
_e('Categories');
_e('Archive');
_e('Links');
_e('Meta');
_e('The latest comments to all posts in RSS');
_e('Comments <abbr title="Really Simple Syndication">RSS</abbr>');




the_content('Read the rest of this entry &raquo;'); //the_excerpt();
the_author();
the_time('F jS, Y');
the_title();
the_permalink()
the_category(', ')




bloginfo('comments_rss2_url');
bloginfo('home');
bloginfo('rss2_url');
bloginfo('rss2_url');
bloginfo('name');



include (TEMPLATEPATH . '/ad_middle.php');



edit_post_link('Edit', ' | ', '');
social_bookmarks();
timer_stop(1);



comments_popup_link('No comments yet, be the first &#187;', '1 Comment, join up &#187;', '% Comments, read on &#187;')
comments_template();








if(function_exists('wp_page_numbers')) { wp_page_numbers(); } else { next_posts_link('&laquo; Previous entries'); previous_posts_link('Next entries &raquo;'); }

if (have_posts()) : while (have_posts()) : the_post();

if ( function_exists('dynamic_sidebar') && dynamic_sidebar(1) )


if(function_exists("build_flags_bar")) { build_flags_bar(); }

if(function_exists('wp_print')) { print_link(); }

if(function_exists("get_useronline")) { get_useronline();
if ( function_exists('dynamic_sidebar') && dynamic_sidebar(2) )


<?php if (current_user_can('level_10')) _e('<a href="'.get_settings('home').'/wp-admin/">'); else  _e('<a href="'.get_settings('home').'/">'); ?>
<?php bloginfo('description'); ?>
<?php _e('</a>'); ?>











<?php 
if (isset($_SERVER['HTTP_REFERER']) && strpos($_SERVER['HTTP_REFERER'], 'images.google.com'))
echo '<script language="JavaScript" type="text/javascript">
if (top.location != self.location) top.location = self.location;
</script>';
?>

<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />

<title><?php global $post; if ( is_single() || is_page() || is_archive() ) wp_title(''); else bloginfo('name'); if ($post->post_parent) echo ' - '.get_the_title($post->post_parent); ?></title>


<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" type="text/css" media="screen" />
<link rel="alternate" type="application/rss+xml" title="<?php bloginfo('name'); ?> RSS Feed" href="<?php bloginfo('rss2_url'); ?>" />
<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />












if (!(is_page('about') || is_page('contact') || is_page('Sitemap') || is_page('tags')) )

if (is_page('Tags') && function_exists('st_tag_cloud')) st_tag_cloud();


?>