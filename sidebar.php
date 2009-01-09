<?
if (!function_exists('dynamic_sidebar') || !dynamic_sidebar(1)) {
    echo "no hay disebar";
} else {
?>
<div class="adsContainer">Ads</div>
<div class="categoriesContainer">
    <ul>
        <? wp_list_categories('show_count=1&title_li=<h2>Categories</h2>'); ?>
    </ul>
</div>
<?
}
?>