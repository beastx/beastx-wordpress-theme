<?
if ($_REQUEST['saved']) {
    echo '<div id="message" class="updated fade"><p><strong>Beastx Theme: Settings saved.</strong></p></div>';
}
if ($_REQUEST['reset']) {
    echo '<div id="message" class="updated fade"><p><strong>Beastx Theme: Settings reset.</strong></p></div>';
}
?>
<style>
    fieldset.options {
        padding: 1em;
        border: 1px solid #999;
        padding-top: 0;
        margin-bottom: 0.5em;
        margin-top: 1em;
    }
    
    fieldset.options table {
        width: 100%;
    }
    
    fieldset.options p {
        padding: 0px;
        margin: 0.5em 0;
    }
    
    fieldset.options .submit {
        padding: 0px;
        margin: 0px;
        margin-top: 1em;
    }
    
    fieldset.options table.editform td {
        padding-top: 1em;
    }
    
    fieldset.options table.editform td.inputs {
        padding-left: 1em;
        padding-bottom: 1em;
        padding-top: 0;
        border-bottom: 1px solid #ccc;
    }
    
    fieldset.options label {
        display: block;
    }
    
    fieldset.options legend {
        font-weight: bold;
        padding: 0 0.5em;
        font-size: 1.4em;
        font-family: Georgia,"Times New Roman","Bitstream Charter",Times,serif;
        font-style: italic;
    }
    
    fieldset.options h2 {
        padding-top: 0px;
        font-size: 1.2em;
        font-weight: bold;
    }
</style>
<div class="wrap">
    <div id="icon-themes" class="icon32"><br/></div>
    <h2>Beastx Theme Settings</h2>
    <form method="post">
        <fieldset class="options">
            <legend>Appearance</legend>
            <table cellspacing="0" cellpadding="0" class="editform">
                <tr>
                    <td>
                        <h2>Logo</h2>
                    </td>
                </tr>
                <tr>
                    <td class="inputs">
                        <p>You can upload a image file to set that as a logo for tou blog.</p>
                        <? getInputTag('logo', 'file'); ?>
                    </td>
                </tr>
                <tr>
                    <td>
                        <h2>color palette</h2>
                    </td>
                </tr>
                <tr>
                    <td class="inputs">
                        <p>You can upload a image file to set that as a logo for tou blog.</p>
                        <?
                            $colorPaletteValue = get_settings('BeastxTheme_colorPalette');
                            getInputTag(
                                'colorPalette',
                                'select', 
                                '', 
                                $colorPaletteValue ? $colorPaletteValue : 'default', 
                                '', 
                                array(
                                    array('value' => 'default', 'name' => 'Default'),
                                    array('value' => 'red', 'name' => 'Red'),
                                    array('value' => 'blue', 'name' => 'Blue'),
                                    array('value' => 'green', 'name' => 'Green')
                                )
                            );
                        ?>
                    </td>
                </tr>
                <tr>
                    <td>
                        <? getInputTag( "save", "submit", "", "Save Settings" ); ?>
                        <input type="hidden" name="action" value="save" />
                    </td>
                </tr>
            </table>
        </fieldset>
    </form>
    <form method="post">
        <fieldset class="options">
            <legend>Reset</legend>
            <p>
                If for whatever reason you want to "clean up" the settings set here or want to use another theme, click the 
                <em>Reset Settings</em> 
                button below.  To completely remove the theme, make sure to delete the 
                <em>/beastx/</em> folder in the 
                <em>/wp-content/themes/</em> directory.
            </p>
            <? getInputTag( "reset", "submit", "", "Reset Settings" ); ?>
            <input type="hidden" name="action" value="reset" />
        </fieldset>
    </form>
    
    <div id="icon-themes" class="icon32"><br/></div>
    <h2>Support</h2>
    <p>
        If you need any support with this particular theme, feel free to post your question in the 
        <a href="http://blog.beastx.com.ar/BeastxTheme/">Beastx theme release post</a> 
        over at <a href="http://blog.beastx.com.ar">Beastx's Blog</a>
    </p>
</div>