<?php defined('BASEPATH') or exit('No direct script access allowed');

class M_wilayah extends CI_Model
{
    private $result = array();
    private $_table;
    private $_id_table;
    private $_id_kecamatan;
    private $_id_desa;

    function __construct()
    {
        parent::__construct();
        $this->result['error'] = null;
        $this->_table = 'MD_KABUPATEN';
        $this->_id_table = 'ID_KABUPATEN';
        $this->_id_kecamatan = 'ID_KECAMATAN';
        $this->_id_desa = 'ID_DESA';
    }

    function get_list_kabupaten()
    {
        $sql = "SELECT * FROM $this->_table";

        $query = $this->db->query($sql);
        try {
            if (!$query) {
                $this->result['error'] = $this->db->error()['message'];
            } else {
                if ($query->num_rows() > 0) {
                    $this->result['error'] = false;
                    $this->result['data'] = $query->result();
                } else {
                    $this->result['error'] = true;
                }
            }
        } catch (Exception $e) {
            $this->result['error'] = $e->getMessage();
        }
        return $this->result;
    }

    function get_list_kecamatan()
    {
        $sql = "SELECT * FROM MD_KECAMATAN";

        $query = $this->db->query($sql);
        try {
            if (!$query) {
                $this->result['error'] = $this->db->error()['message'];
            } else {
                if ($query->num_rows() > 0) {
                    $this->result['error'] = false;
                    $this->result['data'] = $query->result();
                } else {
                    $this->result['error'] = true;
                }
            }
        } catch (Exception $e) {
            $this->result['error'] = $e->getMessage();
        }
        return $this->result;
    }

    function get_list_desa()
    {
        $sql = "SELECT * FROM MD_DESA";

        $query = $this->db->query($sql);
        try {
            if (!$query) {
                $this->result['error'] = $this->db->error()['message'];
            } else {
                if ($query->num_rows() > 0) {
                    $this->result['error'] = false;
                    $this->result['data'] = $query->result();
                } else {
                    $this->result['error'] = true;
                }
            }
        } catch (Exception $e) {
            $this->result['error'] = $e->getMessage();
        }
        return $this->result;
    }

    function get_list_kecamatan_by_kabupaten($ID)
    {
        $sql = "SELECT A.*, B.* 
                FROM MD_KECAMATAN A 
                LEFT JOIN MD_KABUPATEN B ON A.ID_KABUPATEN = B.ID_KABUPATEN 
                WHERE A.ID_KABUPATEN = '$ID'";

        $query = $this->db->query($sql);
        try {
            if (!$query) {
                $this->result['error'] = $this->db->error()['message'];
            } else {
                if ($query->num_rows() > 0) {
                    $this->result['error'] = false;
                    $this->result['data'] = $query->result();
                } else {
                    $this->result['error'] = true;
                }
            }
        } catch (Exception $e) {
            $this->result['error'] = $e->getMessage();
        }
        return $this->result;
    }

    function get_list_desa_by_kabupaten_kecamatan($ID, $ID2)
    {
        $sql = "SELECT A.*, B.*, C.* 
                FROM MD_DESA A 
                LEFT JOIN MD_KABUPATEN B ON A.ID_KABUPATEN = B.ID_KABUPATEN LEFT JOIN MD_KECAMATAN C ON A.ID_KECAMATAN = C.ID_KECAMATAN AND A.ID_KABUPATEN = C.ID_KABUPATEN
                WHERE A.ID_KABUPATEN = '$ID' AND A.ID_KECAMATAN = '$ID2'";

        $query = $this->db->query($sql);
        try {
            if (!$query) {
                $this->result['error'] = $this->db->error()['message'];
            } else {
                if ($query->num_rows() > 0) {
                    $this->result['error'] = false;
                    $this->result['data'] = $query->result();
                } else {
                    $this->result['error'] = true;
                }
            }
        } catch (Exception $e) {
            $this->result['error'] = $e->getMessage();
        }
        return $this->result;
    }
}