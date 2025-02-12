<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['signup_name']);
    $email = htmlspecialchars($_POST['signup_email']);
    $password = password_hash(htmlspecialchars($_POST['signup_password']), PASSWORD_DEFAULT);

    // Database Connection Details
    $servername = "localhost";
    $username = "your_username";
    $password = "your_password";
    $dbname = "your_database";

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Prepare and Execute SQL
        $sql = "INSERT INTO users (name, email, password) VALUES (:name, :email, :password)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password);
        $stmt->execute();

        echo "Account created successfully!";
    } catch (PDOException $e) {
        echo "Database Error: " . $e->getMessage();
    } finally {
        $conn = null;
    }
}
?>
