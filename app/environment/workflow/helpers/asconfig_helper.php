<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

if (!function_exists('isInstalled')) {
    function isInstalled($type = 'redirect')
    {
        //added on version 1.9
        $CI = get_instance();
        $routes = $CI->router->routes;
        // echo $routes;
        foreach ($routes as $n_route => $a_route) {
            if (stripos('-' . $n_route, 'any') > 0 && stripos('-' . $n_route, 'admin') <= 0) {
                $seg = explode('/', $a_route);
                $b_route = $seg[1] . '/' . $seg[2];
                if (!empty($seg[3]))
                    $b_route .= '/' . $seg[3];

                $c_route = $CI->uri->segment(2) . '/' . $CI->uri->segment(3);

                if ($b_route == $c_route) {
                    show_404();
                }
            }
        }
        //end

        if (!defined('IS_INSTALLED')) {
            $CI = get_instance();
            $file         = './config/config.xml';
            $xmlstr     = file_get_contents($file);
            $xml         = simplexml_load_string($xmlstr);
            $config        = $xml->xpath('//config');
            $is_installed = $config[0]->is_installed;

            if (!defined('IS_INSTALLED'))
                define('IS_INSTALLED', $is_installed);
        }

        if (constant('IS_INSTALLED') == 'no') {
            if ($type == 'redirect')
                redirect(site_url('install'), 'refresh');
            else
                return 'no';
        } else {
            if ($type != 'redirect')
                return 'yes';
        }
    }
}

if (!function_exists('CheckSavedLoginCookies')) {
    function CheckSavedLoginCookies()
    {
        $CI = get_instance();
        $key = get_cookie(AS_COOKIE_KEY);
        $user = get_cookie(AS_COOKIE_USER);

        if ($user != FALSE && $key != FALSE) {
            $CI->load->model('auth_model');
            $CI->auth_model->check_cookie_val($user, $key);
        }
    }
}

if (!function_exists('isHasAccess')) {
    function isHasAccess($role)
    {
        if ($role !== '') {
            if (isHasSession()) {
                if (is_array($role)) {
                    if (in_array(getSession('KD_ROLE'), $role)) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    if (getSession('KD_ROLE') == $role) {
                        return true;
                    } else {
                        return false;
                    }
                }
            } else {
                return FALSE;
            }
        } else {
            return FALSE;
        }
    }
}

if (!function_exists('isHasPublicWeb')) {
    function isHasPublicWeb()
    {
        $x = getenv('AS_IS_HAVE_PUBLIC');
        return $x !== true && $x !== false ? false : $x;
    }
}

/**
 * masih harus di rampungkan untuk showing errornya
 */
if (!function_exists('isErrorAdmin')) {
    function isErrorAdmin()
    {
        $segment = getSegment(1);
        $segment2 = getSegment(2);
        if (getConfig('multilang')) {
            if ($segment == AS_ADMIN_MODULES) {
                return true;
            } else {
                if ($segment2 == AS_ADMIN_MODULES) {
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            if ($segment == AS_ADMIN_MODULES) {
                return true;
            } else {
                return false;
            }
        }
    }
}

if (!function_exists('isHasPublic')) {
    function isHasPublic()
    {
        return getenv('AS_IS_HAVE_PUBLIC') == '' ? false : filter_var(getenv('AS_IS_HAVE_PUBLIC'), FILTER_VALIDATE_BOOLEAN);
    }
}

if (!function_exists('getSegment')) {
    function getSegment($segment = 1)
    {
        $CI = &get_instance();
        return $CI->uri->segment($segment);
    }
}

if (!function_exists('isHasSession')) {
    function isHasSession()
    {
        $CI = get_instance();
        if ($CI->session->has_userdata(AS_SESSION))
            return TRUE;
        else
            return FALSE;
    }
}

if (!function_exists('getLangKey')) {
    function getLangKey($key = '')
    {

        if (defined('LANG_ARRAY')) {

            $lang = (array)json_decode(constant('LANG_ARRAY'));
            if (isset($lang[$key]))
                return ($lang[$key]);
            else {
                if (constant("ENVIRONMENT") == 'development') {
                    $key = trim($key);

                    if (!empty($key) && strpos('#' . $key, " ") <= 0) {
                        $content = file_get_contents('missing_lang.txt');
                        if (strpos($content, $key) !== false) {
                        } else {
                            $myfile = fopen("missing_lang.txt", "a") or die("Unable to open file!");
                            $txt = $key . "\n\r";
                            fwrite($myfile, $txt);
                            fclose($myfile);
                        }
                    }
                }
                return ($key);
            }
        } else {

            $CI = get_instance();
            $curr_lang     = getActiveLang();
            $default_lang  = defaultLang();

            if ($curr_lang == '')
                $file_name = $default_lang . '.yml';
            else {
                if (!@file_exists(FCPATH . "config/language/" . $curr_lang . '/translate/' . $curr_lang . '.yml')) {
                    $file_name = $default_lang . '.yml';
                } else {
                    $file_name = $curr_lang . '.yml';
                }
            }

            $CI->load->library('yaml');
            $lang =  $CI->yaml->parse_file('./config/language/' . $curr_lang . '/translate/' . $file_name);



            if (count($lang) > 0) {
                if (!defined('LANG_ARRAY'))
                    define('LANG_ARRAY', json_encode($lang));


                if (isset($lang[$key]))
                    return ($lang[$key]);
                else {
                    if (constant("ENVIRONMENT") == 'development') {
                        $key = trim($key);

                        if (!empty($key) && strpos('#' . $key, " ") <= 0) {
                            $content = file_get_contents('missing_lang.txt');
                            if (strpos($content, $key) !== false) {
                            } else {
                                $myfile = fopen("missing_lang.txt", "a") or die("Unable to open file!");
                                $txt = $key . "\n\r";
                                fwrite($myfile, $txt);
                                fclose($myfile);
                            }
                        }
                    }
                    return ($key);
                }
            } else {
                return ($key);
            }
        }
    }
}

if (!function_exists('getActiveLang')) {
    function getActiveLang()
    {
        $lang = getCookie(LANGUAGE) !== '' ? decrypt(getCookie(LANGUAGE)) : defaultLang();
        if (!@file_exists(FCPATH . "config/language/" . $lang . '.yml')) {
            if ($lang == 'admin')
                $lang = defaultLang();
            else {
                $lang = defaultLang();
                // show_404();
            }
        }
        return $lang;
    }
}

if (!function_exists('defaultLang')) {
    function defaultLang()
    {
        if (isInstalled('return') != 'no') {
            if (defined('DEFAULT_LANG')) {
                return constant('DEFAULT_LANG');
            } else {
                if (isInstalled('return') == 'yes') {
                    $def = getenv('AS_LANG');
                    if ($def != '') {
                        $default_lang = $def;
                    } else
                        $default_lang = 'en';

                    if (!defined('DEFAULT_LANG') && getCookie(LANGUAGE) == '') {
                        define('DEFAULT_LANG', $default_lang);
                        setCookie(LANGUAGE, encrypt($default_lang));
                    }
                    return $default_lang;
                } else
                    return 'en';
            }
        } else
            return 'en';
    }
}

if (!function_exists('getConfig')) {
    function getConfig($item)
    {
        $CI = &get_instance();
        return $CI->config->item($item);
    }
}

if (!function_exists('loadTemplate')) {
    function loadTemplate($view = '', $data = array(), $type = 'admin', $buffer = FALSE)
    {
        $CI     = get_instance();
        if ($buffer == FALSE) {
            if ($type == 'admin') {
                if (@file_exists(MOD . DIRECTORY_SEPARATOR . AS_ADMIN_MODULES . DIRECTORY_SEPARATOR . "views" . DIRECTORY_SEPARATOR . activeTemplate('admin') . DIRECTORY_SEPARATOR . $view . ".php")) {
                    $CI->load->view(AS_ADMIN_MODULES . '/' . activeTemplate('admin') . DIRECTORY_SEPARATOR . $view, $data);
                } else {
                    $CI->load->view(AS_ADMIN_MODULES . '/' . 'default/' . $view, $data);
                }
            } else {
                if (@file_exists(MOD . DIRECTORY_SEPARATOR . AS_PUBLIC_MODULES . DIRECTORY_SEPARATOR . "views" . DIRECTORY_SEPARATOR . activeTemplate('public') . DIRECTORY_SEPARATOR . $view . ".php")) {
                    $CI->load->view(AS_PUBLIC_MODULES . '/' . activeTemplate('public') . DIRECTORY_SEPARATOR . $view, $data);
                } else {
                    $CI->load->view(AS_PUBLIC_MODULES . '/' . 'default/' . $view, $data);
                }
            }
        } else {
            if ($type == 'admin') {
                if (@file_exists(MOD . DIRECTORY_SEPARATOR . AS_ADMIN_MODULES . DIRECTORY_SEPARATOR . "views" . DIRECTORY_SEPARATOR . activeTemplate('admin') . DIRECTORY_SEPARATOR . $view . ".php")) {
                    $view_data = $CI->load->view(AS_ADMIN_MODULES . '/' . activeTemplate('admin') . DIRECTORY_SEPARATOR . $view, $data, TRUE);
                } else {
                    $view_data = $CI->load->view(AS_ADMIN_MODULES . '/' . 'default/' . $view, $data, TRUE);
                }
            } else {
                if (@file_exists(MOD . DIRECTORY_SEPARATOR . AS_PUBLIC_MODULES . DIRECTORY_SEPARATOR . "views" . DIRECTORY_SEPARATOR . activeTemplate('public') . DIRECTORY_SEPARATOR . $view . ".php")) {
                    $view_data = $CI->load->view(AS_PUBLIC_MODULES . '/' . activeTemplate('public') . DIRECTORY_SEPARATOR . $view, $data, TRUE);
                } else {
                    $view_data = $CI->load->view(AS_PUBLIC_MODULES . '/' . 'default/' . $view, $data, TRUE);
                }
            }

            return $view_data;
        }
    }
}

if (!function_exists('activeTemplate')) {
    function activeTemplate($type = 'admin')
    {
        if ($type == 'admin') {
            return getenv('AS_TEMPLATE_ADMIN') == '' ? 'default' : getenv('AS_TEMPLATE_ADMIN');
        } else {
            return getenv('AS_TEMPLATE_PUBLIC') == '' ? 'default' : getenv('AS_TEMPLATE_PUBLIC');
        }
    }
}

if (!function_exists('getCookie')) {
    function getCookie($key)
    {
        return isset($_COOKIE[$key]) ? $_COOKIE[$key] : '';
    }
}

if (!function_exists('deleteCookie')) {
    function deleteCookie($key)
    {
        setcookie($key, "", time() - 3600);
    }
}

if (!function_exists('deleteAllCookie')) {
    function deleteAllCookie()
    {
        deleteCookie(AS_COOKIE_KEY);
        deleteCookie(LANGUAGE);
    }
}

if (!function_exists('encrypt')) {
    function encrypt($string, $encryption_key = '')
    {
        $cipher     = 'AES-256-CBC';
        // $ciphering = "AES-128-CTR";

        $options = 0;
        $encryption_iv = 'sd97g6m4k19h57bg';
        if ($encryption_key == '') {
            $encryption_key = "asd7aas87da8sd79as87f9as87f9as87f9as87f";
        }
        $encryption = openssl_encrypt(
            $string,
            $cipher,
            $encryption_key,
            $options,
            $encryption_iv
        );
        return $encryption;

        // define('ENCRYPTION_KEY', 'asd7aas87da8sd79as87f9as87f9as87f9as87f');
        // $string = "Makan Yang Enak Ya";

        // $encrypted = encrypt($string);
        // // echo $encrypted . '\n';
        // // echo $decrypted . '\n';
        // if (!isset($_COOKIE['key'])) {
        // 	setcookie('key', $encrypted);
        // }
        // echo $_COOKIE['key'];
        // $decrypted = decrypt($_COOKIE['key']);
        // echo '</br>';
        // echo $decrypted;
    }
}

if (!function_exists('decrypt')) {
    function decrypt($encrypted_string, $encryption_key = '')
    {
        $cipher     = 'AES-256-CBC';
        $options = 0;
        $encryption_iv = 'sd97g6m4k19h57bg';
        if ($encryption_key == '') {
            $encryption_key = "asd7aas87da8sd79as87f9as87f9as87f9as87f";
        }
        $decryption = openssl_decrypt(
            $encrypted_string,
            $cipher,
            $encryption_key,
            $options,
            $encryption_iv
        );
        return $decryption;
    }
}


if (!function_exists('baseUri')) {
    function baseUri($uri = '', $lang = '')
    {
        $CI = &get_instance();

        if ($lang == '')
            $lang = getActiveLang();

        $enable_url_rewriting = getConfig('enable_url_rewriting');

        if ($enable_url_rewriting == 'yes') {
            $final_url = getRewrittenUrl($lang, $uri);
            // echo $final_url;
            $final_url = $CI->config->site_url($final_url);
        } else {
            if (getConfig('multilang'))
                $final_url = $CI->config->site_url($lang . '/' . $uri);
            else
                $final_url = $CI->config->site_url($uri);
        }

        if (getConfig('use_ssl') == 'yes')
            $final_url = str_replace('http://', 'https://', $final_url); #uncomment this line if you want to force
        else
            $final_url = str_replace('https://', 'http://', $final_url); #uncomment this line if you want to force

        return $final_url;
    }
}

if (!function_exists('assetsUri')) {
    function assetsUri($uri = '', $type = 'admin')
    {
        $CI = &get_instance();
        $final_url = $CI->config->site_url($uri);

        $final_url = $final_url . 'public/' . activeTemplate($type) . '/';

        if (getConfig('use_ssl') == 'yes')
            $final_url = str_replace('http://', 'https://', $final_url); #uncomment this line if you want to force
        else
            $final_url = str_replace('https://', 'http://', $final_url); #uncomment this line if you want to force

        return $final_url;
    }
}

if (!function_exists('getRewrittenUrl')) {
    function getRewrittenUrl($lang, $uri)
    {
        if (getConfig('multilang'))
            $url = $lang . '/' . $uri;
        else
            $url = $uri;

        $routes = getCustomRoutes();

        $custom_route = "";

        foreach ($routes as $route) {

            if (trim($route[0]) == trim($url)) {
                $custom_route = (isset($route[1])) ? $route[1] : '';
                break;
            }
        }

        return (empty($custom_route)) ? $url : $custom_route;
    }
}

if (!function_exists('getCustomRoutes')) {

    function getCustomRoutes()
    {
        if (defined('CUSTOM_ROUTES')) {
            $options = (array)json_decode(constant('CUSTOM_ROUTES'));
        } else {
            $options = array();
            $handle = fopen("./config/custom-routes.txt", "r");
            if ($handle) {
                while (($line = fgets($handle)) !== false) {
                    $row = explode("=", $line);
                    $options[] = $row;
                }
                fclose($handle);
            } else {
                // echo "Custom Routes File Not found";
            }

            define('CUSTOM_ROUTES', json_encode($options));
        }

        return $options;
    }
}

if (!function_exists('createStoreUrl')) {
    function createStoreUrl()
    {
        $CI = &get_instance();
        if (count($_POST) <= 0)
            $CI->session->set_userdata('storeUrl', current_url());
    }
}

/**
 * Call all library here
 */

/**
 * 1. Library session
 */

if (!function_exists('setSession')) {
    function setSession($session_name, $session_data)
    {
        $CI = &get_instance();
        $CI->session->set_userdata($session_name, $session_data);
    }
}


if (!function_exists('getSession')) {
    function getSession($session_name)
    {
        if ($session_name !== '' && isHasSession()) {
            $CI = get_instance();
            return $CI->session->userdata(AS_SESSION)[$session_name];
        } else {
            return FALSE;
        }
    }
}

if (!function_exists('destroySession')) {
    function destroySession()
    {
        $CI = &get_instance();
        $CI->session->sess_destroy();
    }
}
