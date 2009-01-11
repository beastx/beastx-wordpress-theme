<?
if (function_exists('dynamic_sidebar')) {
    ?>
    <div id="topBlock">
        <? if (!dynamic_sidebar(1)) {
            echo "Dynamic Top Block not work.";
        } ?>
    </div>
    <div id="leftBar">
        <? if (!dynamic_sidebar(2)) {
            echo "Dynamic Right SideBar Left not work.";
        } ?>
    </div>
    <div id="rightBar">
        <? if (!dynamic_sidebar(3)) {
            echo "Dynamic Right SideBar Right not work.";
        } ?>
    </div>
    <?
} else {
    echo "Dynamic Sidebars not work.";
}
?>