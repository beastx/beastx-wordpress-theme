<?

function Beastx_theme_page() {
    require_once('settings.php');
}

function Beastx_add_theme_page() {
    if ($_GET['page'] == basename(__FILE__)) {
    
        if ('save' == $_REQUEST['action']) {
            // SAVE
            // HOWTO read the file input and upload the file...
            update_option( 'BeastxTheme_colorPalette', $_REQUEST[ 'colorPalette' ] );

            header("Location: themes.php?page=functions_themeSettings.php&saved=true");
            die;
            
        } else if ('reset' == $_REQUEST['action']) {
            // RESET
            delete_option( 'BeastxTheme_colorPalette' );

            header("Location: themes.php?page=functions_themeSettings.php&reset=true");
            die;
        }
    }
    add_theme_page(
        "Beastx theme Options",
        "Beastx theme Options",
        'edit_themes',
        basename(__FILE__),
        'Beastx_theme_page'
    );
}

add_action(
    'admin_menu',
    'Beastx_add_theme_page'
);

?>