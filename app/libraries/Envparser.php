<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Envparser
{
    /**
     * Set path tempat .env berada.
     */
    private $file;
    private $CI;

    public function __construct()
    {
        $this->CI = &get_instance();
        $file = &load_class('Env', 'core');
        $this->file = $file->getfileenv();
    }

    public function getitem($item)
    {
        if (is_readable($this->file)) {

            $lines = file($this->file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            $start = false;
            $items = array();
            foreach ($lines as $line) {
                if (strpos(trim($line), $item) === 0) {
                    $start = true;
                    continue;
                }

                if ($start === true) {
                    if (strpos(trim($line), '#') === 0) {
                        $start = false;
                        continue;
                    }
                }

                if ($start === true) {
                    list($name, $value) = explode('=', $line, 2);
                    $name = trim($name);
                    $value = trim($value);

                    $data = array('name' => $name, 'value' => $value);
                    array_push($items, $data);
                }
            }
            return $items;
        }
    }
}
