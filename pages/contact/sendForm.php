<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../../vendor/autoload.php';  // Include Composer's autoload file for PHPMailer

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!empty($_POST['name']) && !empty($_POST['email']) && !empty($_POST['message'])) {
        // Sanitize and validate form inputs
        $name = htmlspecialchars($_POST["name"]);
        $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
        $phone = htmlspecialchars($_POST["phone"]);
        $message = htmlspecialchars($_POST["message"]);

        // PHPMailer setup
        $mail = new PHPMailer(true);

        try {
            // Server settings
            $mail->isSMTP();
            $mail->Host       = 'smtp.gmail.com';  // SMTP server
            $mail->SMTPAuth   = true;
            $mail->Username   = 'LeGends9612@gmail.com';  // Your Gmail address
            $mail->Password   = 'ftxi gkgb feuw gwzd';     // App Password (if using 2FA)
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = 587;

            // Recipients
            $mail->setFrom($email, $name);  // Set the sender's email and name
            $mail->addAddress('LeGends9612@gmail.com');  // Your Gmail address to receive the message

            // Email content
            $mail->isHTML(false);  // Set email format to plain text
            $mail->Subject = 'Klientas';
            $mail->Body    = "Vardas: {$name}\nEl.paštas: {$email}\nTelefonas: {$phone}\nŽinutė: {$message}";

            $mail->send();
            echo 'Message sent successfully!';
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    } else {
        echo "All fields are required.";
    }
}
?>
