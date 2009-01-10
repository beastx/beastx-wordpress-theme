<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0//EN">
<html <?php language_attributes(); ?>>
    <head>
        <meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
        <title>
            <?php bloginfo('name'); ?> <?php if ( is_single() ) { ?> &raquo; Blog Archive <?php } ?> <?php wp_title(); ?>
        </title>
        <link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" type="text/css" media="screen" />
        <link rel="alternate" type="application/rss+xml" title="<?php bloginfo('name'); ?> RSS Feed" href="<?php bloginfo('rss2_url'); ?>" />
        <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
        
        <link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/sifr/sifr.css" type="text/css" media="screen" />
        <script type="text/javascript" src="<? bloginfo('template_directory') ?>/sifr/sifr.js"></script>
        <script type="text/javascript" src="<? bloginfo('template_directory') ?>/sifr/sifr-debug.js"></script>
        <script type="text/javascript" src="<? bloginfo('template_directory') ?>/sifr/sifr-config.js"></script>
        
        <script type="text/javascript" src="<? bloginfo('template_directory') ?>/scripts/ui/TabManager.js"></script>
        <script type="text/javascript" src="<? bloginfo('template_directory') ?>/scripts/ui/FooterToggler.js"></script>
        
        <?php wp_head(); ?>
    </head>
    <body>
        <div class="wrapper">
            <div class="headerContainer">
                <div class="header">
                    <div class="mainButtonsContainer">
                        <ul class="mainButtonsList">
                            <li class="mainButton"><a class="aboutMeLink" href="" title=""> <span>About me</span></a></li>
                            <li class="mainButton"><a class="archiveLink" href="" title=""> <span>Archives</span></a></li>
                            <li class="mainButton"><a class="downloadsLink" href="" title=""> <span>Downloads</span></a></li>
                            <li class="mainButton"><a class="contactLink" href="" title=""> <span>Contact</span></a></li>
                            <?
                                if (current_user_can('level_10')) {
                                    _e('<li class="mainButton"><a class="contactLink" href="'.get_settings('home').'/wp-admin/" title="Admin"><span>Admin</span></a></li>');
                                }
                            ?>
                        </ul>
                    </div>
                    <h1 class="logoContainer">
                        <span><?php bloginfo('name'); ?></span>
                        <?=getImageTag('beastxBlogLogo.gif', 242, 63, 'logo'); ?>
                    </h1>
                    <h2 class="blogDescription"><? bloginfo('description'); ?></h2>
                </div>
            </div>
            <div class="contentWrapper">