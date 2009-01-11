                <div class="clear"></div>
            </div>
        </div>
        <div id="footerContainer" class="footerContainer">
            <div id="footer">
                <div class="footerContent">
                    <div class="tableContainer">
                        <table>
                            <tbody>
                                <tr>
                                    <td id="footerTabsContent">
                                        <?
                                            if (function_exists('dynamic_sidebar')) {
                                                if (!dynamic_sidebar(4)) {
                                                    echo '<script type="text/javascript">var dontUseBottomBar = true; </script>';
                                                } else {
                                                    echo '<script type="text/javascript">var dontUseBottomBar = false; </script>';
                                                }
                                            }
                                        ?>
                                    </td>
                                    <td class="blogInfoContent">
                                        <div>
                                            <span class="blogInfo">
                                                <?php bloginfo('name'); ?> is powered by <a href="http://wordpress.org/">WordPress</a> | 
                                                <a href="<?php bloginfo('rss2_url'); ?>">Entries (RSS)</a> and <a href="<?php bloginfo('comments_rss2_url'); ?>">Comments (RSS)</a>
                                            </span>
                                            <?=getImageTag('validXHTML.gif', 59, 16, 'Valid XHTML Code'); ?>
                                            <?=getImageTag('validCSS.gif', 44, 16, 'Valid CSS Code'); ?>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="borderAndBackgroundContainer">
                        <div class="transparentBar"></div>
                        <div class="opaqueBackground"></div>
                    </div>
                    <?php wp_footer(); ?>
                </div>
            </div>
        </div>
    </body>
</html>
<script type="text/javascript">
if (!dontUseBottomBar) {
    var tabManager;
    var footerToggler
    Event.observe(window, 'load', function() {
        tabManager = New(TabManager, [ 'footerTabsContent', 'bottomBarWidget', 'bottomBarWidgetTitle' ]);
        footerToggler = New(FooterToggler, [ 'footerContainer', tabManager.getLabelsHeigth() + 2 ]);
    });
} else {
    $('footerContainer').style.bottom = '-175px';
}
</script>