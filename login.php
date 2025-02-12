<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = htmlspecialchars($_POST['login_email']);
    $password = htmlspecialchars($_POST['login_password']);

    // Database Connection Details
    $servername = "localhost";
    $username = "your_username";
    $password = "your_password";
    $dbname = "your_database";

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Prepare and Execute SQL
        $sql = "SELECT * FROM users WHERE email = :email";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            session_start();
            $_SESSION['user_id'] = $user['id'];
            echo "Login successful!";
            // Redirect to user profile page or wallet
        } else {
            echo "Invalid email or password.";
        }
    } catch (PDOException $e) {
        echo "Database Error: " . $e->getMessage();
    } finally {
        $conn = null;
    }
}
?>
