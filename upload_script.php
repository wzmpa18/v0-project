<?php
$target_dir = $_POST['dir'] ?? '.';
$target_file = $target_dir . '/' . basename($_FILES["file"]["name"]);
$uploadOk = 1;
$fileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
        echo "File uploaded successfully: " . $target_file;
    } else {
        echo "Error uploading file";
    }
} else {
    echo "No file uploaded";
}
?>
