document.addEventListener("DOMContentLoaded", () => {
  // Animate polaroids in Section 1
  const polaroids = document.querySelectorAll(".polaroid");
  polaroids.forEach((polaroid, index) => {
    setTimeout(() => {
      polaroid.style.transform += " scale(1.1)";
      setTimeout(() => {
        polaroid.style.transform = polaroid.style.transform.replace(" scale(1.1)", "");
      }, 500);
    }, index * 200);
  });

  // Add modal functionality for "Us" section images
  const photos = document.querySelectorAll('.photo img');
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.style.display = 'none'; // Ensure modal is hidden initially
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.zIndex = '1000';

  const modalImage = document.createElement('img');
  modalImage.style.maxWidth = '90%';
  modalImage.style.maxHeight = '90%';
  modalImage.style.borderRadius = '10px';
  modal.appendChild(modalImage);

  const closeModal = document.createElement('span');
  closeModal.textContent = '×';
  closeModal.style.position = 'absolute';
  closeModal.style.top = '20px';
  closeModal.style.right = '30px';
  closeModal.style.fontSize = '40px';
  closeModal.style.color = 'white';
  closeModal.style.cursor = 'pointer';
  closeModal.style.fontFamily = 'Arial, sans-serif';
  modal.appendChild(closeModal);

  document.body.appendChild(modal);

  // Open modal when a photo is clicked
  photos.forEach((photo) => {
    photo.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default behavior
      modalImage.src = photo.src;
      modal.style.display = 'flex'; // Show modal
    });
  });

  // Close modal when the close button is clicked
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none'; // Hide modal
  });

  // Close modal when clicking outside the modal image
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none'; // Hide modal
    }
  });
});
  // Smooth scrolling functionality
  const navbarLinks = document.querySelectorAll(".navbar a");
  navbarLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
