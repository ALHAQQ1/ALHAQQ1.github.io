<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Here you can add code to process the form data (e.g., save to a database, send an email, etc.)

    echo "Thank you, $name! Your message has been received.";
}
?>
