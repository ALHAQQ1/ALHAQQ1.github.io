<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    echo "You must be logged in to access your wallet.";
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $deposit_amount = htmlspecialchars($_POST['deposit_amount']);
    $user_id = $_SESSION['user_id'];

    // Database Connection Details
    $servername = "localhost";
    $username = "your_username";
    $password = "your_password";
    $dbname = "your_database";

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Update user wallet balance
        $sql = "UPDATE users SET wallet_balance = wallet_balance + :deposit_amount WHERE id = :user_id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':deposit_amount', $deposit_amount);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();

        echo "Deposit successful!";
    } catch (PDOException $e) {
        echo "Database Error: " . $e->getMessage();
    } finally {
        $conn = null;
    }
}
?>
