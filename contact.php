<?php

if (isset($_POST['nameContact'])) {
    $nameContact = $_POST['nameContact'];
    $emailContact = $_POST['emailContact'];
    $messageContact = $_POST['messageContact'];

    if (empty($nameContact) || empty($emailContact) || empty($messageContact)){
        echo "<span class='form-error'>Please fill in all fields!</span>";
    }
    elseif (!filter_var($emailContact, FILTER_VALIDATE_EMAIL)) {
        echo "<span class='form-error'>Please enter a valid email address!</span>";
    }
    else {
        $to = "info@joebakes.co.za";
        $subject = "New Contact Form Message";
        $emailBody = "Name: $nameContact\n";
        $emailBody .= "Email: $emailContact\n\n";
        $emailBody .= "Message:\n$messageContact\n";
        
        $headers = "From: $emailContact\r\n";
        $headers .= "Reply-To: $emailContact\r\n";
        
        if(mail($to, $subject, $emailBody, $headers)){
             echo "<span class='form-success'>Message sent successfully!</span>";
        } else {
             echo "<span class='form-error'>Sorry, there was an error.</span>";
        }
    }   
} else {
    echo "<span class='form-error'>Invalid form submission!</span>";
}
?>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<script>
    var errorEmpty = <?php echo $errorEmpty ? 'true' : 'false'; ?>;
    var errorEmail = <?php echo $errorEmail ? 'true' : 'false'; ?>;

    if (errorEmpty == true) {
        $("#name-contact, #email-contact, #message-contact").addClass("input-error");
    }
    
    if (errorEmail == true){
        $("#email-contact").addClass("input-error");
    }

    if(errorEmpty == false && errorEmail == false){
        $("#name-contact, #email-contact, #message-contact").removeClass("input-error").val("");
    }

</script>