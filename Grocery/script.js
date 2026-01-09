//Navbar
   // Navbar Functionality
        document.addEventListener('DOMContentLoaded', function() {
            
            // Get all necessary elements
            const registerBtn = document.getElementById('navbarRegisterBtn');
            const registerSection = document.getElementById('navbarRegisterSection');
            const userActions = document.getElementById('navbarUserActions');
            const menuLinks = document.getElementById('navbarMenuLinks');
            
            // Login Modal
            const loginModal = document.getElementById('navbarLoginModal');
            const loginModalClose = document.getElementById('navbarLoginModalClose');
            const loginForm = document.getElementById('navbarLoginForm');
            const showSignupLink = document.getElementById('navbarShowSignup');
            
            // Signup Modal
            const signupModal = document.getElementById('navbarSignupModal');
            const signupModalClose = document.getElementById('navbarSignupModalClose');
            const signupForm = document.getElementById('navbarSignupForm');
            const showLoginLink = document.getElementById('navbarShowLogin');
            
            // User Dropdown
            const userAvatar = document.getElementById('navbarUserAvatar');
            const userDropdown = document.getElementById('navbarUserDropdown');
            const logoutBtn = document.getElementById('navbarLogoutBtn');
            
            // Notification
            const notificationTrigger = document.getElementById('navbarNotificationTrigger');
            const notificationDropdown = document.getElementById('navbarNotificationDropdown');
            const notificationClose = document.getElementById('navbarNotificationClose');
            
            // Check if user is already logged in
            const isLoggedIn = localStorage.getItem('navbarUserLoggedIn') === 'true';
            
            if (isLoggedIn) {
                showUserInterface();
            }
            
            // Open Login Modal when Register button is clicked
            registerBtn.addEventListener('click', function() {
                loginModal.classList.add('navbar-modal-active');
            });
            
            // Close Login Modal
            loginModalClose.addEventListener('click', function() {
                loginModal.classList.remove('navbar-modal-active');
            });
            
            // Close modal when clicking outside
            loginModal.addEventListener('click', function(e) {
                if (e.target === loginModal) {
                    loginModal.classList.remove('navbar-modal-active');
                }
            });
            
            // Handle Login Form Submission
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const email = this.querySelector('input[type="email"]').value;
                const password = this.querySelector('input[type="password"]').value;
                
                // Basic validation
                if (email && password) {
                    // Store user info
                    localStorage.setItem('navbarUserLoggedIn', 'true');
                    localStorage.setItem('navbarUserEmail', email);
                    
                    // Close modal
                    loginModal.classList.remove('navbar-modal-active');
                    
                    // Show user interface
                    showUserInterface();
                    
                    // Show success notification
                    showSuccessMessage('Login successful!');
                }
            });
            
            // Switch to Signup Modal
            showSignupLink.addEventListener('click', function(e) {
                e.preventDefault();
                loginModal.classList.remove('navbar-modal-active');
                signupModal.classList.add('navbar-modal-active');
            });
            
            // Close Signup Modal
            signupModalClose.addEventListener('click', function() {
                signupModal.classList.remove('navbar-modal-active');
            });
            
            // Close signup modal when clicking outside
            signupModal.addEventListener('click', function(e) {
                if (e.target === signupModal) {
                    signupModal.classList.remove('navbar-modal-active');
                }
            });
            
            // Handle Signup Form Submission
            signupForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const name = this.querySelector('input[type="text"]').value;
                const email = this.querySelector('input[type="email"]').value;
                const password = this.querySelector('input[type="password"]').value;
                
                // Basic validation
                if (name && email && password) {
                    // Store user info
                    localStorage.setItem('navbarUserLoggedIn', 'true');
                    localStorage.setItem('navbarUserEmail', email);
                    localStorage.setItem('navbarUserName', name);
                    
                    // Close modal
                    signupModal.classList.remove('navbar-modal-active');
                    
                    // Show user interface
                    showUserInterface();
                    
                    // Show success notification
                    showSuccessMessage('Account created successfully!');
                }
            });
            
            // Switch to Login Modal
            showLoginLink.addEventListener('click', function(e) {
                e.preventDefault();
                signupModal.classList.remove('navbar-modal-active');
                loginModal.classList.add('navbar-modal-active');
            });
            
            // Toggle User Dropdown
            userAvatar.addEventListener('click', function(e) {
                e.stopPropagation();
                userDropdown.classList.toggle('navbar-dropdown-visible');
                // Close notification if open
                notificationDropdown.classList.remove('navbar-notification-visible');
            });
            
            // Toggle Notification Dropdown
            notificationTrigger.addEventListener('click', function(e) {
                e.stopPropagation();
                notificationDropdown.classList.toggle('navbar-notification-visible');
                // Close user dropdown if open
                userDropdown.classList.remove('navbar-dropdown-visible');
            });
            
            // Close Notification Dropdown
            notificationClose.addEventListener('click', function(e) {
                e.stopPropagation();
                notificationDropdown.classList.remove('navbar-notification-visible');
            });
            
            // Close dropdowns when clicking outside
            document.addEventListener('click', function(e) {
                if (!userAvatar.contains(e.target) && !userDropdown.contains(e.target)) {
                    userDropdown.classList.remove('navbar-dropdown-visible');
                }
                
                if (!notificationTrigger.contains(e.target) && !notificationDropdown.contains(e.target)) {
                    notificationDropdown.classList.remove('navbar-notification-visible');
                }
            });
            
            // Prevent dropdown from closing when clicking inside
            userDropdown.addEventListener('click', function(e) {
                e.stopPropagation();
            });
            
            notificationDropdown.addEventListener('click', function(e) {
                e.stopPropagation();
            });
            
            // Handle Logout
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Confirm logout
                if (confirm('Are you sure you want to logout?')) {
                    // Clear user data
                    localStorage.removeItem('navbarUserLoggedIn');
                    localStorage.removeItem('navbarUserEmail');
                    localStorage.removeItem('navbarUserName');
                    
                    // Hide user interface and show register button
                    hideUserInterface();
                    
                    // Close dropdown
                    userDropdown.classList.remove('navbar-dropdown-visible');
                    
                    // Show success message
                    showSuccessMessage('Logged out successfully!');
                }
            });
            
            // Function to show user interface after login
            function showUserInterface() {
                registerSection.style.display = 'none';
                userActions.classList.add('navbar-actions-visible');
                
                // Show menu links
                menuLinks.style.display = 'flex';
                
                // Load user profile image if available
                const savedProfileImage = localStorage.getItem('navbarUserProfileImage');
                if (savedProfileImage) {
                    document.getElementById('navbarUserAvatar').src = savedProfileImage;
                }
            }
            
            // Function to hide user interface after logout
            function hideUserInterface() {
                registerSection.style.display = 'block';
                userActions.classList.remove('navbar-actions-visible');
            }
            
            // Function to show success message
            function showSuccessMessage(message) {
                const successDiv = document.createElement('div');
                successDiv.className = 'navbar-success-toast';
                successDiv.textContent = message;
                successDiv.style.cssText = `
                    position: fixed;
                    top: 80px;
                    right: 20px;
                    background-color: #4CAF50;
                    color: white;
                    padding: 15px 25px;
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: 600;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    z-index: 10000;
                    animation: slideInRight 0.4s ease, slideOutRight 0.4s ease 2.6s;
                `;
                
                document.body.appendChild(successDiv);
                
                setTimeout(() => {
                    successDiv.remove();
                }, 3000);
            }
            
            // Close modals with ESC key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    loginModal.classList.remove('navbar-modal-active');
                    signupModal.classList.remove('navbar-modal-active');
                }
            });
            
            // Social Login Buttons (Demo)
            const socialButtons = document.querySelectorAll('.navbar-social-btn');
            socialButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const platform = this.querySelector('i').className;
                    let platformName = 'social';
                    
                    if (platform.includes('google')) platformName = 'Google';
                    else if (platform.includes('facebook')) platformName = 'Facebook';
                    else if (platform.includes('instagram')) platformName = 'Instagram';
                    else if (platform.includes('twitter')) platformName = 'Twitter';
                    
                    alert(`${platformName} login would be implemented here`);
                });
            });
            
            // Add animation to notification items on dropdown open
            const notificationObserver = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.target.classList.contains('navbar-notification-visible')) {
                        const items = document.querySelectorAll('.navbar-notification-item');
                        items.forEach((item, index) => {
                            item.style.opacity = '0';
                            item.style.transform = 'translateX(-20px)';
                            setTimeout(() => {
                                item.style.transition = 'all 0.4s ease';
                                item.style.opacity = '1';
                                item.style.transform = 'translateX(0)';
                            }, index * 100);
                        });
                    }
                });
            });
            
            notificationObserver.observe(notificationDropdown, {
                attributes: true,
                attributeFilter: ['class']
            });
        });

//Index Banner
  // Shop Now Button Function
        function shopNow() {
            console.log('Navigating to shop...');
            // In a real application, this would navigate to the shop page
            window.location.href = 'shop-products.html';
            // Or use: window.scrollTo({ top: document.querySelector('.products-section').offsetTop, behavior: 'smooth' });
        }

        // Enquiry Button Function
        function openEnquiry() {
            console.log('Opening enquiry form...');
            // In a real application, this would open an enquiry modal or navigate to contact page
            window.location.href = 'enquiry.html';
           
        }

        // Parallax Effect for Background (Optional)
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroImage = document.querySelector('.hero-background-image');
            if (heroImage) {
                heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Add animation on scroll (Optional)
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);

        // Smooth entrance animation on load
        document.addEventListener('DOMContentLoaded', function() {
            // Add any additional initialization here
            console.log('Hero banner loaded successfully');
        });

        // Keyboard accessibility for buttons
        document.querySelectorAll('.shop-now-primary-button, .enquiry-secondary-button').forEach(button => {
            button.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });


        //Cart
          // Update quantity function
        function updateQuantity(button, change) {
            const row = button.closest('.cart-item-row');
            const input = row.querySelector('.quantity-display-input');
            const subtotalCell = row.querySelector('.subtotal-price-cell');
            const basePrice = parseFloat(row.getAttribute('data-price'));
            
            let currentQty = parseInt(input.value);
            let newQty = currentQty + change;
            
            // Prevent quantity from going below 1
            if (newQty < 1) {
                newQty = 1;
            }
            
            // Update quantity display
            input.value = newQty;
            
            // Update subtotal for this item
            const newSubtotal = basePrice * newQty;
            subtotalCell.textContent = '$' + newSubtotal;
            
            // Update order summary
            updateOrderSummary();
        }

        // Update order summary
        function updateOrderSummary() {
            const rows = document.querySelectorAll('.cart-item-row');
            let totalItems = 0;
            let subtotal = 0;
            
            rows.forEach(row => {
                const qty = parseInt(row.querySelector('.quantity-display-input').value);
                const price = parseFloat(row.getAttribute('data-price'));
                totalItems += qty;
                subtotal += price * qty;
            });
            
            // Update items count
            document.getElementById('totalItemsCount').textContent = totalItems;
            
            // Update subtotal
            document.getElementById('subtotalAmount').textContent = '$.' + subtotal;
            
            // Calculate total (subtotal - discount)
            const discount = 100;
            const total = subtotal - discount;
            document.getElementById('totalAmount').textContent = '$.' + total;
        }

        // Clear cart function
        function clearCart() {
            if (confirm('Are you sure you want to clear your shopping cart?')) {
                const container = document.getElementById('cartItemsContainer');
                container.innerHTML = '<div style="padding: 40px; text-align: center; color: #999;">Your cart is empty</div>';
                
                // Reset summary
                document.getElementById('totalItemsCount').textContent = '0';
                document.getElementById('subtotalAmount').textContent = '$.0';
                document.getElementById('totalAmount').textContent = '$.0';
            }
        }

        // Initialize on page load
        document.addEventListener('DOMContentLoaded', function() {
            updateOrderSummary();
        });
        //Payment
          // Delivery address option toggle
        const deliveryButtons = document.querySelectorAll('.delivery-option-button');
        
        deliveryButtons.forEach(button => {
            button.addEventListener('click', function() {
                deliveryButtons.forEach(btn => btn.classList.remove('selected-option'));
                this.classList.add('selected-option');
            });
        });

        // Form validation and submission
        const form = document.getElementById('billingDetailsForm');
        const proceedButton = document.getElementById('proceedButton');

        // Validate individual field
        function validateField(field) {
            const wrapper = field.closest('.form-field-wrapper');
            const errorMessage = wrapper.querySelector('.error-message-text');
            
            if (!field.value.trim()) {
                field.classList.add('error-state');
                errorMessage.classList.add('show-error');
                return false;
            } else {
                field.classList.remove('error-state');
                errorMessage.classList.remove('show-error');
                return true;
            }
        }

        // Validate email format
        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        // Validate all fields
        function validateForm() {
            const firstNameField = document.getElementById('firstNameField');
            const lastNameField = document.getElementById('lastNameField');
            const countryField = document.getElementById('countryField');
            const streetAddressField = document.getElementById('streetAddressField');
            const cityField = document.getElementById('cityField');
            const stateField = document.getElementById('stateField');
            const zipCodeField = document.getElementById('zipCodeField');
            const phoneField = document.getElementById('phoneField');
            const emailField = document.getElementById('emailField');

            let isValid = true;

            // Validate all fields
            isValid = validateField(firstNameField) && isValid;
            isValid = validateField(lastNameField) && isValid;
            isValid = validateField(countryField) && isValid;
            isValid = validateField(streetAddressField) && isValid;
            isValid = validateField(cityField) && isValid;
            isValid = validateField(stateField) && isValid;
            isValid = validateField(zipCodeField) && isValid;
            isValid = validateField(phoneField) && isValid;

            // Validate email separately
            if (!emailField.value.trim() || !validateEmail(emailField.value)) {
                const wrapper = emailField.closest('.form-field-wrapper');
                const errorMessage = wrapper.querySelector('.error-message-text');
                emailField.classList.add('error-state');
                errorMessage.classList.add('show-error');
                isValid = false;
            } else {
                const wrapper = emailField.closest('.form-field-wrapper');
                const errorMessage = wrapper.querySelector('.error-message-text');
                emailField.classList.remove('error-state');
                errorMessage.classList.remove('show-error');
            }

            return isValid;
        }

        // Add real-time validation
        const allInputs = form.querySelectorAll('.form-text-field, .form-select-dropdown');
        allInputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.id === 'emailField') {
                    if (!this.value.trim() || !validateEmail(this.value)) {
                        const wrapper = this.closest('.form-field-wrapper');
                        const errorMessage = wrapper.querySelector('.error-message-text');
                        this.classList.add('error-state');
                        errorMessage.classList.add('show-error');
                    } else {
                        const wrapper = this.closest('.form-field-wrapper');
                        const errorMessage = wrapper.querySelector('.error-message-text');
                        this.classList.remove('error-state');
                        errorMessage.classList.remove('show-error');
                    }
                } else {
                    validateField(this);
                }
            });

            // Remove error on input
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.classList.remove('error-state');
                    const wrapper = this.closest('.form-field-wrapper');
                    const errorMessage = wrapper.querySelector('.error-message-text');
                    errorMessage.classList.remove('show-error');
                }
            });
        });

        // Proceed button click handler
        proceedButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Store form data in sessionStorage (optional)
                const formData = {
                    firstName: document.getElementById('firstNameField').value,
                    lastName: document.getElementById('lastNameField').value,
                    country: document.getElementById('countryField').value,
                    streetAddress: document.getElementById('streetAddressField').value,
                    city: document.getElementById('cityField').value,
                    state: document.getElementById('stateField').value,
                    zipCode: document.getElementById('zipCodeField').value,
                    phone: document.getElementById('phoneField').value,
                    email: document.getElementById('emailField').value,
                    deliveryOption: document.querySelector('.delivery-option-button.selected-option').dataset.option
                };
                
                sessionStorage.setItem('billingDetails', JSON.stringify(formData));
                
                // Redirect to payment options page
                window.location.href = 'payoptions.html';
            } else {
                // Scroll to first error
                const firstError = document.querySelector('.error-state');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });

       
        //Faq
         // Toggle FAQ accordion
        function toggleFAQ(header) {
            const item = header.parentElement;
            const allItems = document.querySelectorAll('.faq-accordion-item');
            
            // Check if this item is already active
            const isActive = item.classList.contains('active-accordion');
            
            // Close all items
            allItems.forEach(faqItem => {
                faqItem.classList.remove('active-accordion');
            });
            
            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active-accordion');
            }
        }

        // Optional: Close FAQ when clicking outside
        document.addEventListener('click', function(event) {
            const faqSection = document.querySelector('.faq-items-wrapper');
            if (!faqSection.contains(event.target)) {
                const allItems = document.querySelectorAll('.faq-accordion-item');
                allItems.forEach(item => {
                    item.classList.remove('active-accordion');
                });
            }
        });

        // Optional: Keyboard accessibility - Enter or Space to toggle
        document.querySelectorAll('.faq-question-header').forEach(header => {
            header.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleFAQ(this);
                }
            });
            
            // Make it focusable
            header.setAttribute('tabindex', '0');
        });

        // Smooth scroll for footer links (optional)
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });