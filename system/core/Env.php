<?php
defined('BASEPATH') or exit('No direct script access allowed');

class CI_Env
{
    /**
     * Set path tempat .env berada.
     */
    protected $path;


    public function __construct()
    {
        $path = FCPATH . '.env';

        $this->path = $path;
    }

    public function getfileenv()
    {
        return $this->path;
    }

    public function run(string $path = null)
    {
        if ($path) {
            $this->path = $path;
        }

        $this->load();
    }

    public function load()
    {
        if (is_readable($this->path)) {

            $lines = file($this->path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($lines as $line) {

                if (strpos(trim($line), '#') === 0) {
                    continue;
                }

                list($name, $value) = explode('=', $line, 2);
                $name = trim($name);
                $value = trim($value);

                if (!array_key_exists($name, $_SERVER) && !array_key_exists($name, $_ENV)) {
                    putenv(sprintf('%s=%s', $name, $value));
                    $_ENV[$name] = $value;
                    $_SERVER[$name] = $value;
                }
            }
        }
    }
}
