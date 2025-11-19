// Get all accordion buttons
const acc = document.getElementsByClassName('accordion')
for (let i = 0; i < acc.length; i++){

for (i = 0; i < acc.length; i++) {
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
}
if (document.getElementById('map')){
  

// map
var map = L.map('map');
map.setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Map
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


// Lightbox code
const lightbox = document.createElement('div')
lightbox.id = 'lightbox'
document.body.appendChild(lightbox)

const images = document.querySelectorAll('img')
images.forEach(image => {
  image.addEventListener('click', e => {
    lightbox.classList.add('active')
    document.body.style.overflow = 'hidden'

    while (lightbox.firstChild){
      lightbox.firstChild.remove()
    }

    const img = document.createElement('img')
    img.src = image.src
    lightbox.appendChild(img)


  })
})
lightbox.addEventListener('click', e => {
    lightbox.classList.remove('active')
    document.body.style.overflow = '';
  })





// Load more products



  document.addEventListener('DOMContentLoaded', function () {
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const loadMoreClass = document.getElementById('load-more');
  let currentIndex = 0;
  function loadContent(){
    fetch('data.json')
    .then((Response) => Response.json())
    .then((data) => {
      const content = data.content
      const keys = Object.keys(content).slice(
        currentIndex,
        currentIndex + 5.
      );
      keys.forEach((key) => {
        const div = document.createElement('div');
        div.textContent = content[key];
        loadMoreClass.appendChild(div);
      });

      currentIndex += 5;
      if (currentIndex >= Object.keys(content).length){
        loadMoreBtn.style.display = 'none';
      }
    })
    .catch((error) => console.error('Error:', error));
  }
  loadContent()
  loadMoreBtn.addEventListener('click', loadContent)


  });

// Search
  function setupSearch(){
    const searchInput = document.getElementById('search');
    const galleryItems = document.querySelectorAll('.gallery-item');


    if(!searchInput) return;

    searchInput.addEventListener('input',function() {
      const searchText = this.value.toLowerCase();
      
      galleryItems.forEach(item => {
        const heading = item.querySelector('h3');

        if (heading){
          const productName = heading.textContent.toLowerCase();
          item.style.display = productName.includes(searchText) ? 'block' : 'none';
        }
      });
    });
  }


  document.addEventListener('DOMContentLoaded',function(){
    setupSearch();
  });

  // Enquiry form
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');

  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let messages = [];

    const firstName = document.getElementById('fname').value
    const lastName = document.getElementById('lname').value
    const email = document.getElementById('email').value
    const enquriyType = document.getElementById('enquiryType').value
    const subject = document.getElementById('subject').value

  if (firstName === '' || firstName == null) {
    messages.push('First name is required');
  }

  if (lastName === '' || lastName == null){
    messages.push('Last name is required');
  }

  if (email === '' || email == null){
    messages.push('Email is required');
  }

  if (subject === ''|| subject == null){
    messages.push('Message is required');
  }

  if (subject.length < 8){
    messages.push('Message is to short, atleast 8 characters long')
  }

  if(messages.length >0) {
    alert ('Please fix the followining errors:\n\n' + messages.join ('\n'));
    return;
  }

  processEnquiry(firstName, enquriyType, subject);
});
});

function processEnquiry(firstName, enquiryType, message) {
  let response = generateEnquiryResponse(enquiryType);

  displayEnquiryResponse(firstName, enquiryType, response);
}


function generateEnquiryResponse(type){
  
  if (type === 'custom-cake'){
    alert('Custom Cake Orders: \nCost: R400 - R900\nAvailable in 5-7 working days \nFree delivery anything over R500');
  }
  if (type === 'product'){
    alert('');
  }

  if (type === 'delivery-service'){
    alert('');
  }

  if (type === 'pricing'){
    alert('');
  }
}

function displayEnquiryResponse(name, type){
  alert('Thank you' + name + 'We have received your order! \nEnjoy the rest of your day!!');
  generateEnquiryResponse(type);
  }


