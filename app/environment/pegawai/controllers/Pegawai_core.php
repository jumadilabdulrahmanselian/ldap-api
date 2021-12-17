<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Admin Controller
 *
 * Nah jadi ini fungsinya buat dipanggil di class utamanya nanti
 * Kenapa sih kok ribet? sebenernya enggak
 * cuman buat kalo ada yang nyoba utak atik codingnya tapi gak tau konsepnya bisa setres
 *
 * @package		Admin
 * @subpackage	Admin
 * @author		Alimstudio
 * @link		http://alimstudio.com
 */

class Pegawai_core extends REST_Controller
{

	var $per_page = 10;
	private $hasAccess = [
		'RL001'
	];

	public function __construct()
	{
		parent::__construct();

		isInstalled(); #defined in asconfig helper
		CheckSavedLoginCookies(); #defined in asconfig helper

		if (!isHasAccess($this->hasAccess)) {
			createStoreUrl();
			// baseUri(AS_ADMIN_MODULES . '/auth');
			redirect(baseUri(AS_ADMIN_MODULES . '/auth'));
		}
	}

	public function index_get_post()
	{
		return '';
	}
}



/* End of file admin_core.php */
/* Location: ./application/modules/admin/controllers/admin_core.php */