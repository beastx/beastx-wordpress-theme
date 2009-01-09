<?php

function make_chunky($ret)
{
    
    // pad it with a space
    $ret = ' ' . $ret;
    $ret = preg_replace("#(^|[\n ])([\w]+?://[\w\#$%&~/.\-;:=,?@\[\]+]*)#is", "$1<a href='$2' rel='nofollow'>$2</a>", $ret);
    $ret = preg_replace("#(^|[\n ])((www|ftp)\.[\w\#$%&~/.\-;:=,?@\[\]+]*)#is", "$1<a href='http://$2' rel='nofollow'>$2</a>", $ret);
    //chunk those long urls
    chunk_url($ret);
    $ret = preg_replace("#(\s)([a-z0-9\-_.]+)@([^,< \n\r]+)#i", "$1<a href=\"mailto:$2@$3\">$2@$3</a>", $ret);    
    // Remove our padding..
    $ret = substr($ret, 1);
    return($ret);
}


function chunk_url(&$ret)
{
   
   $links = explode('<a', $ret);
   $countlinks = count($links);
   for ($i = 0; $i < $countlinks; $i++)
   {
      $link = $links[$i];
      
      
      $link = (preg_match('#(.*)(href=")#is', $link)) ? '<a' . $link : $link;

      $begin = strpos($link, '>') + 1;
      $end = strpos($link, '<', $begin);
      $length = $end - $begin;
      $urlname = substr($link, $begin, $length);
      
      /**
       * We chunk urls that are longer than 50 characters. Just change
       * '50' to a value that suits your taste. We are not chunking the link
       * text unless if begins with 'http://', 'ftp://', or 'www.'
       */
$chunked = (strlen($urlname) > 50 && preg_match('#^(http://|ftp://|www\.)#is', $urlname)) ? substr_replace($urlname, '.....', 30, -10) : $urlname;
$ret = str_replace('>' . $urlname . '<', '>' . $chunked . '<', $ret); 

   }
} 
remove_filter('comment_text', 'make_clickable');
add_filter('comment_text', 'make_chunky');









function callback_links($match) {    
        $arguments = $match[1] . ' ' . $match[5];
        $nofollow_text = ' rel="nofollow"';
        $output = '<a href="' . $match[2] . '//' . $match[3] . '/' . $match[4] . '"';
        
        $output .= $arguments;
        
            $output .= $nofollow_text;
        
        
        $output .= ">" . $match[6] . "</a>";

        return $output;
    }


function add_nofollow_links($content, $category = null) {
        $output = $content;
        $output = preg_replace_callback('/<a (.*?)href=[\"\'](.*?)\/\/(.*?)\/(.*?)[\"\'](.*?)>(.*?)<\/a>/i','callback_links', $content);

        return $output;
    }

add_filter('wp_list_categories','add_nofollow_links');


?>
