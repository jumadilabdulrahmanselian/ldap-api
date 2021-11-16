<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Admin Controller
 *
 * Nah jadi ini fungsinya buat extend admin core
 * buat apa? biar kalaupun ada hacker biar dia pusing
 *
 * @package		Admin
 * @subpackage	Admin
 * @author		Alimstudio
 * @link		http://alimstudio.com
 */
require_once 'Admin_core.php';

class Admin extends Admin_core
{

	public function __construct()
	{
		parent::__construct();
	}
}
