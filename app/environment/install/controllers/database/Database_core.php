
<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
/**
 * konsep database Controller
 *
 * Semua proses create and upload database ada disini
 * jadi jangan kelasakan nyari2 di tempat lain
 *
 * @package		Database
 * @subpackage	Database
 * @author		Alimstudio
 * @link		http://alimstudio.com
 */

class Database_core extends CI_Controller
{

    private $engine = 'mysql';
    private $host;
    private $user;
    private $pass;
    private $port;
    private $db;
    private $dsn;
    private $dsn_default;

    private $connect;

    public function __construct()
    {
        parent::__construct();
        isInstalled();

        $this->engine = getenv('DB_ENGINE');
        $this->host = getenv('DB_HOST');
        $this->user = getenv('DB_USER');
        $this->pass = getenv('DB_PASSWORD');
        $this->port = getenv('DB_PORT');
        $this->db = getenv('DB_NAME');

        $this->dsn_default = "$this->engine:host=$this->host;port=$this->port";
        $this->dsn = $this->dsn_default;

        $this->connect();
    }

    function connect()
    {
        try {
            $this->connect = new PDO($this->dsn, $this->user, $this->pass);
            // ngeset PDO error mode ke exception
            $this->connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return true;
        } catch (PDOException $e) {
            // echo $this->port . $e->getMessage();
            return false;
        }
    }

    function up()
    {
        try {
            $sql = "DROP DATABASE IF EXISTS $this->db;CREATE DATABASE $this->db";
            $this->connect->exec($sql);

            $create = FCPATH . 'database/create.sql';
            $insert = FCPATH . 'database/insert.sql';

            if (file_exists($create)) {
                $this->dsn = "$this->engine:host=$this->host;port=$this->port;dbname=$this->db";
                $this->connect();

                $readcreate = file_get_contents($create);
                $sqlcreate = $readcreate;
                $this->connect->exec($sqlcreate);

                if (file_exists($insert)) {
                    $readinsert = file_get_contents($insert);
                    $this->connect->exec($readinsert);
                }
            }

            $data['status'] = true;
            $data['msg'] = "Database Created successfully";
            $this->load->view('database/v_database_up', $data);
        } catch (PDOException $e) {
            $data['status'] = false;
            $data['msg'] = "Failed to create database";
            $this->load->view('database/v_database_up', $data);
        }
    }

    function down()
    {
        try {
            $sql = "DROP DATABASE IF EXISTS $this->db";
            $this->connect->exec($sql);

            $data['status'] = true;
            $data['msg'] = "Database Droped successfully";
            $this->load->view('database/v_database_down', $data);
        } catch (PDOException $e) {
            $data['status'] = false;
            $data['msg'] = "Failed to drop database";
            $this->load->view('database/v_database_down', $data);
        }
    }
}
