<?php defined('BASEPATH') or exit('No direct script access allowed');
require APPPATH . '/libraries/REST_Controller.php';
// require APPPATH . '/libraries/Mailer.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require_once  APPPATH . '/libraries/Mailer/Exception.php';
require_once  APPPATH . '/libraries/Mailer/PHPMailer.php';
require_once  APPPATH . '/libraries/Mailer/SMTP.php';

class Mail extends REST_Controller
{
    private $nm_model;
    private $mail;
    private $msg     = array();
    private $temp;
    private $number = 200;
    private $CLIENT_ID;

    public function __construct()
    {
        parent::__construct();
        // $this->load->model(array('M_wilayah'));
        // $this->nm_model = $this->M_wilayah;
        $this->CLIENT_ID = $this->config->item('INA_CLIENT_ID');
        $this->mail = new PHPMailer(true);
    }

    function send_post()
    {
        $AUTH_API_KEY = $this->input->get_request_header('AUTH-API-KEY');

        if (in_array($AUTH_API_KEY, $this->CLIENT_ID)) {

            $FROM_MAIL          = $this->input->post('FROM');
            $FROM_NAME          = $this->input->post('SENDER_NAME');
            $TO_MAIL            = $this->input->post('TO');
            $SUBJECT            = $this->input->post('SUBJECT');
            $MESSAGE            = $this->input->post('MESSAGE');
            $ISHTML             = $this->input->post('ISHTML');

            $temp = $this->sendMail($TO_MAIL, $MESSAGE, $SUBJECT, $FROM_MAIL, $FROM_NAME, $ISHTML);
            if (!$temp) {
                $this->msg['status']     = false;
                $this->number             = 400;
                $this->msg['msg']     = 'Gagal Mengirim Email';
            } else {
                $this->number              = 200;
                $this->msg['status']     = true;
                $this->msg['msg']     = 'Berhasil Mengirim Email';
            }
        } else {
            $this->msg['status'] = false;
            $this->msg['number'] = 400;
            $this->number          = 400;
            $this->msg['msg']     = 'Maaf, anda tidak dapat mengakses sistem';
        }

        $this->response($this->msg, $this->number);
    }

    function mailer_send_post()
    {
        $AUTH_API_KEY = $this->input->get_request_header('AUTH-API-KEY');

        if (in_array($AUTH_API_KEY, $this->CLIENT_ID)) {
            $FROM_MAIL             = $this->input->post('FROM');
            // $FROM_NAME             = $this->input->post('SENDER_NAME');
            $TO_MAIL             = $this->input->post('TO');
            $SUBJECT             = $this->input->post('SUBJECT');
            $MESSAGE             = $this->input->post('MESSAGE');
            $ISHTML             = $this->input->post('ISHTML');

            $this->mail->SMTPDebug = 0;
            $this->mail->isSMTP();

            $this->mail->SMTPOptions = array(
                'ssl' => array(
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                    'allow_self_signed' => true
                )
            );

            // $this->mail->SMTPAutoTLS = false;

            // $this->mail->Host = 'nidoran.sg.rapidplex.com';
            $this->mail->Host = 'webmail.inalum.id';
            // $this->mail->Host = 'smtp.googlemail.com';
            $this->mail->SMTPAuth = false;
            // $this->mail->Username = 'gi1@alimstudio.com';
            // $this->mail->Password = "jufal0809";
            $this->mail->Username = 'ssm_reminder@inalum.id';
            $this->mail->Password = "Inalum123";
            // $this->mail->Username = GMAIL;
            // $this->mail->Password = GPASS;
            $this->mail->SMTPSecure = false;
            // $this->mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            $this->mail->Port = 25;
            // $this->mail->Port = 465;
            // $this->mail->From = GMAIL;
            // $this->mail->From = "gi1@alimstudio.com";
            $this->mail->From = $FROM_MAIL;
            $this->mail->FromName = "Application SSM Reminder";
            $this->mail->addAddress($TO_MAIL);
            $this->mail->isHTML($ISHTML);
            $this->mail->Subject = $SUBJECT;
            $this->mail->Body = $MESSAGE;
            // $this->mail->AltBody = "This is the plain text version of the email content";

            try {
                if ($this->mail->send()) {
                    $this->number              = 200;
                    $this->msg['status']     = true;
                    $this->msg['msg']     = 'Berhasil Mengirim Email';
                } else {
                    $this->number              = 204;
                    $this->msg['status']     = false;
                    $this->msg['msg']     = $this->mail->ErrorInfo;
                }
            } catch (Exception $e) {
                $this->msg['status']     = false;
                $this->number             = 400;
                $this->msg['msg']     = 'Gagal Mengirim Email. Error => ' . $this->mail->ErrorInfo;
            }
        } else {
            $this->msg['status'] = false;
            $this->msg['number'] = 400;
            $this->number          = 400;
            $this->msg['msg']     = 'Maaf, anda tidak dapat mengakses sistem';
        }

        $this->response($this->msg, $this->number);
    }

    function try_send_post()
    {
        $AUTH_API_KEY = $this->input->get_request_header('AUTH-API-KEY');

        if (in_array($AUTH_API_KEY, $this->CLIENT_ID)) {
            $FROM_MAIL             = $this->input->post('FROM');
            // $FROM_NAME             = $this->input->post('SENDER_NAME');
            $TO_MAIL             = $this->input->post('TO');
            $SUBJECT             = $this->input->post('SUBJECT');
            $MESSAGE             = $this->input->post('MESSAGE');
            $ISHTML             = $this->input->post('ISHTML');

            $smtp = new SMTP();

            //Enable connection-level debug output
            $smtp->do_debug = SMTP::DEBUG_CONNECTION;
            $smtp->SMTPOptions = array(
                'ssl' => array(
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                    'allow_self_signed' => true
                )
            );

            try {
                //Connect to an SMTP server
                if (!$smtp->connect('webmail.inalum.id', 25)) {
                    throw new Exception('Connect failed');
                }
                //Say hello
                if (!$smtp->hello(gethostname())) {
                    throw new Exception('EHLO failed: ' . $smtp->getError()['error']);
                }
                //Get the list of ESMTP services the server offers
                $e = $smtp->getServerExtList();
                //If server can do TLS encryption, use it
                if (is_array($e) && array_key_exists('STARTTLS', $e)) {
                    $tlsok = $smtp->startTLS();
                    if (!$tlsok) {
                        throw new Exception('Failed to start encryption: ' . $smtp->getError()['error']);
                    }
                    //Repeat EHLO after STARTTLS
                    if (!$smtp->hello(gethostname())) {
                        throw new Exception('EHLO (2) failed: ' . $smtp->getError()['error']);
                    }
                    //Get new capabilities list, which will usually now include AUTH if it didn't before
                    $e = $smtp->getServerExtList();
                    // throw new Exception('Error: ' . json_encode($e));
                }
                //If server supports authentication, do it (even if no encryption)
                if (is_array($e) && array_key_exists('AUTH', $e)) {
                    if ($smtp->authenticate('ssm_reminder@inalum.id', 'Inalum123')) {
                        echo 'Connected ok!';
                    } else {
                        throw new Exception('Authentication failed: ' . $smtp->getError()['error']);
                    }
                }
            } catch (Exception $e) {
                echo 'SMTP error: ' . $e->getMessage(), "\n";
            }
            //Whatever happened, close the connection.
            $smtp->quit();
        } else {
            $this->msg['status'] = false;
            $this->msg['number'] = 400;
            $this->number          = 400;
            $this->msg['msg']     = 'Maaf, anda tidak dapat mengakses sistem';
        }

        $this->response($this->msg, $this->number);
    }

    private function sendMail(
        $mailTo,
        $message,
        $subject    = "Your Account was Hacked",
        $fromMail   = "system-no-reply@fhaj-corporation.com",
        $fromName   = "Abang Ganteng ne Boss!!!",
        $ishtml = false
    ) {
        $LE = "\r\n";
        $uid = md5(uniqid(time()));

        $header = "From: " . $fromName . " <" . $fromMail . ">$LE";
        $header .= "MIME-Version: 1.0$LE";
        $header .= "Trial-Version: true$LE";
        $header .= "Contact-Me: Alimstudio.com$LE";
        if ($ishtml) {
            $header .= "Content-Type: text/html;charset=UTF-8$LE";
        } else {
            $header .= "Content-Type: multipart/mixed; boundary=\"" . $uid . "\"$LE$LE";
        }

        $add = "-fmail@vaucet.ml";
        // $add ="";

        if (mail($mailTo, $subject, $message, $header, $add) == true) {
            return true;
        } else {
            return false;
        }
    }
}
