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
                                            if (!function_exists('dynamic_sidebar') || !dynamic_sidebar(2)) {
                                                echo "no hay bottombar";
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
<script>
window.onload = function() {
    var tabManager = New(TabManager, [ 'footerTabsContent', 'h4' ]);
    var footerToggler = New(FooterToggler, [ 'footerContainer' ]);
}
</script>