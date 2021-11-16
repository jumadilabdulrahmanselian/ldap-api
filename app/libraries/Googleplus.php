<?php 
require_once(APPPATH.'/third_party/google-api-php-client/vendor/autoload.php');

class Googleplus {
	protected $CI;

	public function __construct(){
		$this->CI =& get_instance();
        $this->CI->load->library('session');
        $this->CI->config->load('googleplus');
        $this->client = new Google_Client();

        $this->client->setClientId($this->CI->config->item('client_id', 'googleplus'));
		$this->client->setClientSecret($this->CI->config->item('client_secret', 'googleplus'));
		$this->client->setRedirectUri($this->CI->config->item('redirect_uri', 'googleplus'));

		$this->client->setScopes(array(
			"https://www.googleapis.com/auth/plus.login",
			"https://www.googleapis.com/auth/plus.me",
			"https://www.googleapis.com/auth/userinfo.email",
			"https://www.googleapis.com/auth/userinfo.profile"
			)
		);
  

	}

	public function get_login_url(){
		return  $this->client->createAuthUrl();

	}

	public function validate(){	
		if (isset($_GET['code'])) {
		  $this->client->authenticate($_GET['code']);
		  $_SESSION['access_token'] = $this->client->getAccessToken();

		}
		if (isset($_SESSION['access_token']) && $_SESSION['access_token']) {
		  $this->client->setAccessToken($_SESSION['access_token']);
		  // $plus = new Google_Service_Plus($this->client);
		  $people_service = new Google_Service_PeopleService($this->client);
		  $person = $people_service->people->get('people/me', array('personFields' => 'names,emailAddresses,genders,photos'));

			// $person = $plus->people->get('people/me');
			$info['email']=$person->emailAddresses[0]->value;
			$info['name']=$person->names[0]->displayName;
			$info['givenName']=$person->names[0]->givenName;
			$info['familyName']=$person->names[0]->familyName;
			$info['profile_pic']=$person->photos[0]->url;
		
		   return  $info;
		}


	}

}