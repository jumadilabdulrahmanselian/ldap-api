<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Workflow Controller
 *
 * Nah jadi ini fungsinya buat extend admin core
 * buat apa? biar kalaupun ada hacker biar dia pusing
 *
 * @package		Workflow
 * @subpackage	Workflow
 * @author		Alimstudio
 * @link		http://alimstudio.com
 */
require_once 'Workflow_core.php';

class Workflow extends Workflow_core
{

	public function __construct()
	{
		parent::__construct();
	}
}
