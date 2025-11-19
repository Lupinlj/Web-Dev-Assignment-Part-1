<?php

if (isset($_POST['firstName'])) { 
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $enquiryType = $_POST['enquiryType'];
    $message = $_POST['message'];

    if (empty($firstName) || empty($email) || empty($message)) {
        echo "<span class='form-error'>Please fill in all required fields!</span>";
    }
    elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
         echo "<span class='form-error'>Please enter a valid email address!</span>";
    }
    elseif (!empty($phone) && !preg_match('/^[0-9+\s\-()]{10,15}$/', $phone)) {
         echo "<span class='form-error'>Please enter a valid phone number!</span>";
    }
    else {
        $to = "info@joebakes.co.za";
        $subject = "New Enquiry: " . $enquiryType;
        $emailBody = "Name: $firstName $lastName\n";
        $emailBody .= "Email: $email\n";
        $emailBody .= "Phone: $phone\n";
        $emailBody .= "Enquiry Type: $enquiryType\n\n";
        $emailBody .= "Message:\n$message\n";
        
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";
        
        if(mail($to, $subject, $emailBody, $headers)){
             echo "<span class='form-success'>Thank you! Your enquiry has been submitted successfully!</span>";
        } else {
             echo "<span class='form-error'>Sorry, there was an error sending your message.</span>";
        }
    }   
} else {
    echo "<span class='form-error'>Invalid form submission!</span>";
}
?>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<script>
    var errorEmpty = <?php echo $errorEmpty; ? 'true' : 'false'; ?>;
    var errorEmail = <?php echo $errorEmail; ? 'true' : 'false'; ?>;
    var errorPhone = <?php echo $errorPhone; ? 'true' : 'false'; ?>;

    if (errorEmpty == true) {
        $("#fname, #lname, #email, #phone, #subject").addClass("input=error");

    }
    if (errorMail == true){
          $("#email").addClass("input=error");
    }
    
    if (errorPhone == true){
        $("#phone").addClass("input-error");
    }

    if(errorEmpty == false && errorMail == false){
        $("#fname, #lname, #email, #phone, #subject").removeClass("input=error").val("");

    }

</script>