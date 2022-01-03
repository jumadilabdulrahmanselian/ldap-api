<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

if (!function_exists('isHasAccess')) {
    function isHasAccess($token, $appkey, $ip)
    {
        $data = [
            'status' => TRUE,
            'msg' => 'You Do Not Have Authorization.'
        ];

        return arrayToObject($data);
    }
}

if (!function_exists('log4j')) {
    function log4j()
    {
        $ip = server()->REMOTE_ADDR;
        $appkey = server()->HTTP_X_APP_KEY;
        $apiToken = server()->HTTP_X_API_TOKEN;
        echo $ip . $appkey . $apiToken;
    }
}

if (!function_exists('server')) {
    function server()
    {
        return arrayToObject($_SERVER);
    }
}

if (!function_exists('isGivenApi')) {
    function isGivenApi($appkey)
    {
        return false;
    }
}

if (!function_exists('dbSchema')) {
    function dbSchema($schema)
    {
        $CI = &get_instance();
        $CI->db->simple_query('SET search_path TO ' . $schema . ',public');
        return $CI->db;
    }
}

if (!function_exists('getJsonStream')) {
    function getJsonStream()
    {
        $CI = &get_instance();
        return json_decode($CI->input->raw_input_stream);
    }
}

if (!function_exists('arrayToObject')) {
    function arrayToObject($array)
    {
        return json_decode(json_encode($array), false);
    }
}

if (!function_exists('getSegment')) {
    function getSegment($segment = 1)
    {
        $CI = &get_instance();
        return $CI->uri->segment($segment);
    }
}

if (!function_exists('getConfig')) {
    function getConfig($item)
    {
        $CI = &get_instance();
        return $CI->config->item($item);
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

if (!function_exists('post')) {
    function post($name)
    {
        $CI = &get_instance();
        return $CI->input->post($name);
    }
}

if (!function_exists('get_header')) {
    function get_header($name)
    {
        $CI = &get_instance();
        return $CI->input->get_request_header($name);
    }
}

if (!function_exists('switchBetween')) {
    function switchBetween($string, $replace)
    {
        if ($string === '') {
            return $replace;
        }

        return $string;
    }
}
