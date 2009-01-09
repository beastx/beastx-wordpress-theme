<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0//EN">
<html <?php language_attributes(); ?>>
    <head>
        <meta name="algo" content="algo" id="algo">
        
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
        
        <script type="text/javascript" src="<? bloginfo('template_directory') ?>/scripts/base/Browser.js"></script>
        <script type="text/javascript" src="<? bloginfo('template_directory') ?>/scripts/base/Elements.js"></script>
        <script type="text/javascript" src="<? bloginfo('template_directory') ?>/scripts/base/Events.js"></script>
        <script type="text/javascript" src="<? bloginfo('template_directory') ?>/scripts/base/Effects.js"></script>
        <script type="text/javascript" src="<? bloginfo('template_directory') ?>/scripts/base/Dimensions.js"></script>
        <script type="text/javascript" src="<? bloginfo('template_directory') ?>/scripts/base/FocusManager.js"></script>
        <script type="text/javascript" src="<? bloginfo('template_directory') ?>/scripts/base/Json.js"></script>
        <script type="text/javascript" src="<? bloginfo('template_directory') ?>/scripts/base/ObjectUtils.js"></script>
        <script type="text/javascript" src="<? bloginfo('template_directory') ?>/scripts/base/Lists.js"></script>
        <script type="text/javascript" src="<? bloginfo('template_directory') ?>/scripts/base/Remote.js"></script>
        <script type="text/javascript" src="<? bloginfo('template_directory') ?>/scripts/base/Validator.js"></script>
        <script type="text/javascript" src="<? bloginfo('template_directory') ?>/scripts/base/Variables.js"></script>
        <script type="text/javascript" src="<? bloginfo('template_directory') ?>/scripts/base/ColorUtils.js"></script>
        <script type="text/javascript" src="<? bloginfo('template_directory') ?>/scripts/base/Cookies.js"></script>
        <script type="text/javascript" src="<? bloginfo('template_directory') ?>/scripts/base/DragManager.js"></script>
        <script type="text/javascript" src="<? bloginfo('template_directory') ?>/scripts/base/Forms.js"></script>
        <script type="text/javascript" src="<? bloginfo('template_directory') ?>/scripts/base/Dimensions.js"></script>
        <script type="text/javascript" src="<? bloginfo('template_directory') ?>/scripts/base/Core.js"></script>
        
        <script type="text/javascript" src="<? bloginfo('template_directory') ?>/scripts/base/Log.js"></script>
        
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