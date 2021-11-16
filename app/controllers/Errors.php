<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
/**
 * konsep error Controller
 *
 * Pengeditan tampilan error semua disini
 *
 * @package		Error
 * @subpackage	Error Handling
 * @author		Alimstudio
 * @link		http://alimstudio.com
 */

class Errors extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        isInstalled();
    }

    public function e404()
    {
        if (isHasPublic()) {
            if (isErrorAdmin()) {
                if (isHasSession()) {
                    $data['content'] = loadTemplate('error/v_e404', '', 'admin', true);
                    loadTemplate('layout', $data);
                } else {
                    loadTemplate('error/v_e404_nologin');
                }
            } else {
                loadTemplate('error/v_e404', '', 'public');
            }
        } else {
            if (isHasSession()) {
                $data['content'] = loadTemplate('error/v_e404', '', 'admin', true);
                loadTemplate('layout', $data);
            } else {
                loadTemplate('error/v_e404_nologin');
            }
        }
    }
}
