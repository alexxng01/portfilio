

var typed = new Typed(".text", {
  strings: ["Frontend Developer", "Backend Developer", "Full-stack Developer"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

burger = document.querySelector(".burger");
navbar = document.querySelector(".header");
rightNav = document.querySelector(".navbar");


burger.addEventListener("click", () => {
  navbar.classList.toggle("h-nav-resp");
  rightNav.classList.toggle("v-class-resp");


});



 const form = document.getElementById('contactForm');
const messageDiv = document.getElementById('formMessage');

form.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent default submit (no page reload)

  // Basic validation - check all required fields
  if (!form.name.value.trim() || !form.email.value.trim() || !form.subject.value.trim() || !form.message.value.trim()) {
    messageDiv.style.color = 'red';
    messageDiv.textContent = 'Please fill in all fields.';
    return;
  }

  // Check HTML5 validity (email format, required, etc.)
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // Prepare data to send
  const formData = new FormData(form);

  // Send form data to formsubmit.co endpoint
  fetch(form.action, {
    method: form.method,
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      messageDiv.style.color = 'lightgreen';
      messageDiv.textContent = 'Thank you! Your message has been sent.';
      form.reset();
    } else {
      // Try to parse errors from response
      return response.json().then(data => {
        if (data.errors) {
          messageDiv.style.color = 'red';
          messageDiv.textContent = data.errors.map(error => error.message).join(", ");
        } else {
          messageDiv.style.color = 'red';
          messageDiv.textContent = 'Oops! There was a problem submitting your form.';
        }
      });
    }
  })
  .catch(error => {
    messageDiv.style.color = 'red';
    messageDiv.textContent = 'Oops! There was a problem submitting your form.';
    console.error('Form submit error:', error);
  });
});





// download
document.getElementById('downloadCvBtn').addEventListener('click', () => {
  const link = document.createElement('a');
  link.href = 'cv/cv-3.docx';  // PDF version of your CV
  link.download = 'RahulMahato_CV.docx'; // PDF filename to save as
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

