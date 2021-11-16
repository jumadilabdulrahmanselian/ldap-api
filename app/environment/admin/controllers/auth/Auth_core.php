<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
/**
 * konsep auth Controller
 *
 * Semua proses autentikasi admin ada disini
 * jadi jangan kelasakan nyari2 di tempat lain
 *
 * @package		Auth
 * @subpackage	Auth
 * @author		Alimstudio
 * @link		http://alimstudio.com
 */

class Auth_core extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
		isInstalled();
	}

	function index()
	{
		if (isHasSession()) {
			redirect(baseUri(AS_ADMIN_MODULES));
		} else {
			redirect(baseUri(AS_ADMIN_MODULES . '/auth/login'));
		}
	}

	#*************************************************#
	#login function
	function login()
	{
		// $data['title'] 		= getLangKey('auth_title');
		$data['content'] 	= '';
		// $data['content'] 	= loadTemplate('auth/v_auth', '', 'admin', TRUE);
		loadTemplate('auth/v_left_right', $data);
	}

	function authorize()
	{
		// $data = [
		// 	'USERNAME' => $this->input->post('USERNAME'),
		// 	'PASSWORD' => $this->input->post('PASSWORD')
		// ];
		// $data = [
		// 	'FROM' => 'ssm_reminder@inalum.id',
		// 	'SENDER_NAME' => 'Application SSM Reminder',
		// 	'TO' => 'reminder_ssm@inalum.id',
		// 	'SUBJECT' => 'Coba Dari SMTP Inalum',
		// 	'MESSAGE' => "Assalamu'alaikum, mas ini mau nyoba kirim langsung by program",
		// 	'ISHTML' => true,
		// ];

		// $auth = $this->api->post('mail/mailer_send', $data, '', true);
		// echo $auth;
		// "Login Berhasil, Apakah Anda Ingin Masuk Ke Halaman Dashboard?"
		$this->load->library('UUID');
		echo UUID::v5('1546058f-5a25-4334-85ae-e68f2a44bbaf', 'apikeypabrik');
		// echo '<br /><br /><br /><br /><br />';
		// echo $this->input->ip_address();
	}

	#logout function
	function logout()
	{
		deleteAllCookie();
		destroySession();
		redirect(baseUri(AS_ADMIN_MODULES . '/auth'));
	}

	function ee()
	{
		$this->load->library('envparser');
		echo var_dump($this->envparser->getitem('# API'));
	}
}

/* End of file auth.php */
/* Location: ./system/application/modules/admin/controllers/auth.php */