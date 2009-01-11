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
                                                }
                                            }
                                        ?>
                                    </td>
                                    <td class="blogInfoContent">
                                        <div>
                                            <?php bloginfo('name'); ?> is powered by <a href="http://wordpress.org/">WordPress</a> | 
                                            <a href="<?php bloginfo('rss2_url'); ?>">Entries (RSS)</a> and <a href="<?php bloginfo('comments_rss2_url'); ?>">Comments (RSS)</a>
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
        tabManager = New(TabManager, [ 'footerTabsContent', 'h4' ]);
        footerToggler = New(FooterToggler, [ 'footerContainer', tabManager.getLabelsHeigth() + 2 ]);
    });
} else {
    $('footerContainer').style.bottom = '-175px';
}
</script>