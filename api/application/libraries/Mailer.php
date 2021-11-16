<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/Mailer/Exception.php';
require_once __DIR__ . '/Mailer/PHPMailer.php';
require_once __DIR__ . '/Mailer/SMTP.php';

class Mailer extends PHPMailer{
    public function __construct()
    {
        parent::__construct();
    }
}