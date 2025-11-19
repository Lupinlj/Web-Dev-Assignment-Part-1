// Get all accordion buttons
const acc = document.getElementsByClassName('accordion');
for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
  
    this.classList.toggle("active");
    var panel = this.nextElementSibling;

    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

// Page loading
const images = document.querySelectorAll('img');
images.forEach(img => {
  img.loading = 'lazy';
});

// Map
if (document.getElementById('map')){

var map = L.map('map');
map.setView([-33.9249, 18.4241], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


var businessMarker = L.marker([-33.9249, 18.4241]).addTo(map);
businessMarker.bindPopup("<b>Joe Bakes</b><br>Our Location").openPopup();

navigator.geolocation.watchPosition(success, error);

let marker, circle ;

function success (pos){


  const lat = pos.coords.latitude;
  const lng = pos.coords.longitude;
  const accuracy = pos.coords.accuracy;

  if (marker){
    map.removeLayer(marker);
    map.removeLayer(circle);
  }

  marker = L.marker([lat,lng]).addTo(map);
  circle = L.circle([lat,lng], { radius: accuracy}).addTo(map);
  
  map.fitBounds(circle.getBounds());

}

function error(err){

  if (err.code === 1) {
    alert("Please allow geolocation access");
  }else {
    alert("Cannot get current location");
  }
}
}
// LightBox
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);

const lightboxContent = document.createElement('div');
lightboxContent.className = 'lightbox-content';
lightbox.appendChild(lightboxContent);


const closeBtn = document.createElement('span');
closeBtn.className = 'lightbox-close';
closeBtn.innerHTML = '&times;';
lightboxContent.appendChild(closeBtn);

const slideCounter = document.createElement('div');
slideCounter.className = 'slide-counter';
lightboxContent.appendChild(slideCounter);

const imageContainer = document.createElement('div');
imageContainer.className = 'image-container';
lightboxContent.appendChild(imageContainer);

const prevArrow = document.createElement('a');
prevArrow.className = 'lightbox-prev';
prevArrow.innerHTML = '&#10094;';
lightboxContent.appendChild(prevArrow);

const nextArrow = document.createElement('a');
nextArrow.className = 'lightbox-next';
nextArrow.innerHTML = '&#10095;';
lightboxContent.appendChild(nextArrow);

const captionBox = document.createElement('div');
captionBox.className = 'caption-box';
lightboxContent.appendChild(captionBox);

const thumbnailStrip = document.createElement('div');
thumbnailStrip.className = 'thumbnail-strip';
lightboxContent.appendChild(thumbnailStrip);

const galleryImages = document.querySelectorAll('.gallary img, .image-grid img');
let activeIndex = 0;


galleryImages.forEach((img, index) => {
  const thumb = document.createElement('img');
  thumb.src = img.src;
  thumb.alt = img.alt;
  thumb.className = 'thumbnail-item';
  thumb.addEventListener('click', () => displaySlide(index));
  thumbnailStrip.appendChild(thumb);
});


function displaySlide(index) {
  imageContainer.innerHTML = '';
  
  const mainImg = document.createElement('img');
  mainImg.src = galleryImages[index].src;
  mainImg.alt = galleryImages[index].alt;
  imageContainer.appendChild(mainImg);
  
  slideCounter.textContent = `${index + 1} / ${galleryImages.length}`;
  
  captionBox.textContent = galleryImages[index].alt || 'Joe Bakes Product';
  
  const allThumbs = thumbnailStrip.querySelectorAll('.thumbnail-item');
  allThumbs.forEach(t => t.classList.remove('active-thumb'));
  allThumbs[index].classList.add('active-thumb');
  
  activeIndex = index;
}
galleryImages.forEach((image, index) => {
  image.addEventListener('click', () => {
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
    displaySlide(index);
  });
});

function closeLightbox() {
  lightbox.style.display = 'none';
  document.body.style.overflow = '';
}

closeBtn.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

prevArrow.addEventListener('click', () => {
  activeIndex = (activeIndex - 1 + galleryImages.length) % galleryImages.length;
  displaySlide(activeIndex);
});

nextArrow.addEventListener('click', () => {
  activeIndex = (activeIndex + 1) % galleryImages.length;
  displaySlide(activeIndex);
});

document.addEventListener('keydown', (e) => {
  if (lightbox.style.display !== 'block') return;
  
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') prevArrow.click();
  if (e.key === 'ArrowRight') nextArrow.click();
});

// Load more products
  document.addEventListener('DOMContentLoaded', function () {
  const loadMoreBtn = document.getElementById('loadMoreBtn');

  if (loadMoreBtn) {
    let clickCount = 0;
  
    loadMoreBtn.addEventListener('click', function() {
      clickCount++;

      if (clickCount === 1) {
        alert('All products are already loaded');
      }else if (clickCount === 2) {
        alert('We ran out of freshly baked goods');
        loadMoreBtn.style.display = 'none';
      }
    });
  }
});
// Show images when they load  
const allImages = document.querySelectorAll('img');
allImages.forEach(img => {
  if (img.complete) {
    img.classList.add('loaded');
  } else {
    img.addEventListener('load', function() {
      this.classList.add('loaded');
    });
    img.addEventListener('error', function() {
      console.error('Failed to load image:', this.src);
    });
  }
});

// Search
  function setupSearch(){
    const searchInput = document.getElementById('search');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if(!searchInput) return;

    searchInput.addEventListener('input',function() {
      const searchText = this.value.toLowerCase().trim();
      
      galleryItems.forEach(item => {
        const heading = item.querySelector('h3');
        const description = item.querySelector('p');

        if (heading){
          
          const productName = heading.textContent.toLowerCase();

          const productDescription = description ? description.textContent.toLowerCase() : '';
          const matches = productName.includes(searchText) || productDescription.includes(searchText);

          item.style.display = productName.includes(searchText) ? 'block' : 'none';
        }
      });
    });
    
  }
  setupSearch()

// Image Loading
function loadImages() {
  const images = document.querySelectorAll('img');

  images.forEach(img => {
    if (img.complete){
      img.classList.add('loaded');
    }else {
      img.addEventListener('load', function() {
        this.classList.add('loaded');
      });
      img.addEventListener('error', function() {
        console.log('Failed to load image: ', this.src);
  });
}
});
}
document.addEventListener('DOMContentLoaded', loadImages);

// Enquiry Form

$('#enquiryForm').submit(function(event){
    event.preventDefault();
    
    var firstName = $("#fname").val();
    var lastName = $("#lname").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var enquiryType = $("#enquiryType").val();
    var message = $("#subject").val();
    var submit = $("#enquiryForm input[type=submit]").val();

    $("#fname, #lname, #email, #phone, #subject").removeClass("input-error");

    var error = false;
    if(firstName == "") { $("#fname").addClass("input-error"); error = true; }
    if(email == "") { $("#email").addClass("input-error"); error = true; }
    if(message == "") { $("#subject").addClass("input-error"); error = true; }

    $(".form-message").load("mail.php", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        enquiryType: enquiryType,
        message: message,
        submit: submit
    });
});


// Contact Form
$('#contact-form').submit(function(event) {
    event.preventDefault();
    
    var nameContact = $('#name-contact').val();
    var emailContact = $('#email-contact').val();
    var messageContact = $('#message-contact').val();
    var submit = "submit";

    $("#name-contact, #email-contact, #message-contact").removeClass("input-error");

    $(".form-message").load("contact.php", {
        nameContact: nameContact,
        emailContact: emailContact,
        messageContact: messageContact,
        submit: submit
    });
});
