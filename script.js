const hamburgerBtn = document.getElementById('hamburger-btn');
const closeBtn = document.getElementById('close-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

// Open full-screen mobile menu
hamburgerBtn.addEventListener('click', () => {
  mobileMenu.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling when menu is open
});

// Close full-screen mobile menu
const closeMenu = () => {
  mobileMenu.classList.remove('active');
  document.body.style.overflow = 'auto'; // Restore scrolling
};

closeBtn.addEventListener('click', closeMenu);

// Close menu when clicking any menu link
mobileLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});
// ==========================================
// PART FINDER → FORMSPREE
// ==========================================

const partFinderForm = document.getElementById('partFinderForm');

const finderModal = document.getElementById('finderModal');
const finderModalClose = document.getElementById('finderModalClose');
const finderContactForm = document.getElementById('finderContactForm');

const finderModalSubmit = document.getElementById('finderModalSubmit');
const finderModalMessage = document.getElementById('finderModalMessage');


// Summary elements
const summaryModel = document.getElementById('summaryModel');
const summaryYear = document.getElementById('summaryYear');
const summaryCategory = document.getElementById('summaryCategory');
const summaryPart = document.getElementById('summaryPart');


// Hidden form fields
const formModel = document.getElementById('formModel');
const formYear = document.getElementById('formYear');
const formCategory = document.getElementById('formCategory');
const formPart = document.getElementById('formPart');


// ==========================================
// OPEN MODAL
// ==========================================

partFinderForm.addEventListener('submit', function(event) {

  event.preventDefault();

  // Get selected values
  const modelSelect = document.getElementById('model');
  const yearSelect = document.getElementById('year');
  const categorySelect = document.getElementById('category');
  const partInput = document.getElementById('part-needed');

  const modelValue = modelSelect.value;
  const yearValue = yearSelect.value;
  const categoryValue = categorySelect.value;
  const partValue = partInput.value.trim();

  // Get human-readable selected text
  const modelText =
    modelSelect.options[modelSelect.selectedIndex].text;

  const categoryText =
    categorySelect.options[categorySelect.selectedIndex].text;


  // Populate visible summary
  summaryModel.textContent = modelText;
  summaryYear.textContent = yearValue;
  summaryCategory.textContent = categoryText;
  summaryPart.textContent = partValue;


  // Populate hidden Formspree fields
  formModel.value = modelText;
  formYear.value = yearValue;
  formCategory.value = categoryText;
  formPart.value = partValue;


  // Reset message
  finderModalMessage.className = 'finder-modal-message';
  finderModalMessage.textContent = '';

  // Open modal
  finderModal.classList.add('active');

  // Prevent background scrolling
  document.body.style.overflow = 'hidden';


  // Focus name field
  setTimeout(() => {
    document.getElementById('finderName').focus();
  }, 250);

});


// ==========================================
// CLOSE MODAL
// ==========================================

function closeFinderModal() {

  finderModal.classList.remove('active');

  document.body.style.overflow = '';

}

finderModalClose.addEventListener(
  'click',
  closeFinderModal
);


// Close by clicking outside
finderModal.addEventListener('click', function(event) {

  if (event.target === finderModal) {
    closeFinderModal();
  }

});


// Close with Escape
document.addEventListener('keydown', function(event) {

  if (
    event.key === 'Escape' &&
    finderModal.classList.contains('active')
  ) {
    closeFinderModal();
  }

});


// ==========================================
// SUBMIT TO FORMSPREE
// ==========================================

finderContactForm.addEventListener('submit', async function(event) {

  event.preventDefault();


  finderModalSubmit.disabled = true;
  finderModalSubmit.textContent = 'Sending Request...';


  finderModalMessage.className =
    'finder-modal-message';

  finderModalMessage.textContent = '';


  const formData = new FormData(finderContactForm);


  try {

    const response = await fetch(
      'https://formspree.io/f/xoejaydk',
      {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      }
    );


    if (!response.ok) {

      const data =
        await response.json().catch(() => null);

      throw new Error(
        data?.errors?.[0]?.message ||
        'Unable to send request.'
      );

    }


    // SUCCESS

    finderModalMessage.className =
      'finder-modal-message success';

    finderModalMessage.textContent =
      'Request received. We will contact you shortly.';


    finderModalSubmit.textContent =
      'Request Sent';


    // Reset customer fields
    finderContactForm.reset();


    // Restore hidden request fields
    formModel.value = summaryModel.textContent;
    formYear.value = summaryYear.textContent;
    formCategory.value = summaryCategory.textContent;
    formPart.value = summaryPart.textContent;


    // Close after short delay
    setTimeout(() => {

      closeFinderModal();

      finderModalSubmit.disabled = false;
      finderModalSubmit.textContent =
        'Send Part Request';

      finderModalMessage.className =
        'finder-modal-message';

      finderModalMessage.textContent = '';

    }, 1800);


  } catch (error) {

    console.error(
      'Part finder Formspree error:',
      error
    );


    finderModalMessage.className =
      'finder-modal-message error';

    finderModalMessage.textContent =
      'Something went wrong. Please try again.';


    finderModalSubmit.disabled = false;

    finderModalSubmit.textContent =
      'Send Part Request';

  }

});
