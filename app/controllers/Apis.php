<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
/**
 * konsep base aja Controller
 *
 * mau curhat aku, capek kali lah aku mikirin konsep kayak gini,
 * dikira buat analisis konsep itu mudah, hargai napa,
 * aku mau buat inalum ne maju nya, bukan mau ku rusak inalum ne
 * aku kerja disini, disini aku nyari makan, mana mungkin mau kuhancurkan
 *
 * @package		Basis
 * @subpackage	Basis Handling
 * @author		Alimstudio
 * @link		http://alimstudio.com
 */

class Apis extends REST_Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    function index_get()
    {
        // $this->response([
        //     'status' => FALSE,
        //     'message' => 'User could not be found'
        // ], REST_Controller::HTTP_INTERNAL_SERVER_ERROR);
        header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
    }

    function index_post()
    {
        header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
    }
}
