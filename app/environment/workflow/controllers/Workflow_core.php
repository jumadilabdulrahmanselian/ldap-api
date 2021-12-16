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

class Workflow_core extends REST_Controller
{

	var $per_page = 10;
	private $hasAccess = [
		'RL001'
	];

	public function __construct()
	{
		parent::__construct();

		// isInstalled(); #defined in asconfig helper
		// CheckSavedLoginCookies(); #defined in asconfig helper

		// if (!isHasAccess($this->hasAccess)) {
		// 	createStoreUrl();
		// 	// baseUri(AS_ADMIN_MODULES . '/auth');
		// 	redirect(baseUri(AS_ADMIN_MODULES . '/auth'));
		// }
	}

	public function index()
	{
		// $this->home();
	}

	private function home($start = 0, $sort_by = 'add_time')
	{
		// $data['title'] 		= getLangKey('dashboard');
		// $data['content'] 	= loadTemplate('dashboard/v_dashboard', '', 'admin', TRUE);
		// loadTemplate('layout', $data);
	}

	public function errors()
	{
		echo 'asaskjdalsjkd';
	}

	public function users_get()
	{
		// Users from a data store e.g. database
		$users = [
			['id' => 1, 'name' => 'John', 'email' => 'john@example.com', 'fact' => 'Loves coding'],
			['id' => 2, 'name' => 'Jim', 'email' => 'jim@example.com', 'fact' => 'Developed on CodeIgniter'],
			['id' => 3, 'name' => 'Jane', 'email' => 'jane@example.com', 'fact' => 'Lives in the USA', ['hobbies' => ['guitar', 'cycling']]],
		];

		$id = $this->get('id');

		// If the id parameter doesn't exist return all the users

		if ($id === NULL) {
			// Check if the users data store contains users (in case the database result returns NULL)
			if ($users) {
				// Set the response and exit
				$this->response($users, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
			} else {
				// Set the response and exit
				$this->response([
					'status' => FALSE,
					'message' => 'No users were found'
				], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
			}
		}

		// Find and return a single record for a particular user.

		$id = (int) $id;

		// Validate the id.
		if ($id <= 0) {
			// Invalid id, set the response and exit.
			$this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
		}

		// Get the user from the array, using the id as key for retrieval.
		// Usually a model is to be used for this.

		$user = NULL;

		if (!empty($users)) {
			foreach ($users as $key => $value) {
				if (isset($value['id']) && $value['id'] === $id) {
					$user = $value;
				}
			}
		}

		if (!empty($user)) {
			$this->set_response($user, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
		} else {
			$this->set_response([
				'status' => FALSE,
				'message' => 'User could not be found'
			], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
		}
	}
}



/* End of file admin_core.php */
/* Location: ./application/modules/admin/controllers/admin_core.php */