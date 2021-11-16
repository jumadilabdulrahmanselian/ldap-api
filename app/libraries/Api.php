<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
/**
 * $upas = "ekin:kDF87b68dsjfkjgh";
 *
 * $headers = array(
 * 		'X-Portal-Key:00d8aec01cb37c84b3a855803f9680fb',
 * ); 
 */
class Api extends CI_Loader
{
	private $host;
	private $headers;
	private $userpasswords;

	function __construct()
	{
		parent::__construct();
		$this->CI = &get_instance();
		$this->host = getenv('API_HOST') == '' ? getConfig('API_HOST') : getenv('API_HOST');
		$this->headers = array(
			'AUTH-API-KEY:' . getenv('API_TOKEN'),
			'APP-KEY:' . getenv('API_APP_KEY')
		);
		$this->userpasswords = getenv('API_USERNAME') . ':' . getenv('API_PASSWORD');
	}

	function get_host()
	{
		return $this->host;
	}

	function set_host($host)
	{
		$this->host = $host;
	}

	function post($url, $data = array(array()), $json_decode = true, $headers = false, $userpasswords = false)
	{
		$url   		= $this->get_host() . $url;
		$ch 		= curl_init();

		$headers == true ? curl_setopt($ch, CURLOPT_HTTPHEADER, $this->headers) : '';

		if ($userpasswords) {
			curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
			curl_setopt($ch, CURLOPT_USERPWD, $this->userpasswords);
			curl_setopt($ch, CURLOPT_SSLVERSION, 6);
		}
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
		$output = 	curl_exec($ch);

		if (curl_errno($ch)) {
			print "Error: " . curl_error($ch);
			exit();
		}

		curl_close($ch);

		if ($json_decode)
			return json_decode($output);
		else
			return $output;
	}

	function get($headers, $url, $json_decode = false)
	{
		$url = $this->get_host() . $url;

		$ch 		= curl_init();

		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);

		curl_setopt($ch, CURLOPT_SSLVERSION, 6);
		$output = 	curl_exec($ch);
		if (curl_errno($ch)) {
			print "Error: " . curl_error($ch);
			exit();
		}
		curl_close($ch);

		if ($json_decode)
			return json_decode($output);
		else
			return $output;
	}
}
