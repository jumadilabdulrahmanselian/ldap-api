<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Whizbiz admin Controller
 *
 * This class handles user account related functionality
 *
 * @package		Install
 * @subpackage	Install
 * @author		webhelios
 * @link		http://webhelios.com
 */

class Install_core extends CI_Controller
{

	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		echo "install";
	}
}

/* End of file install.php */
/* Location: ./application/modules/install/controllers/install_core.php */