document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-sidebar');
    const navItems = document.querySelectorAll('.sidebar-nav ul li');
    const greetingElement = document.getElementById('greeting');

    // Sidebar Toggle
    toggleBtn.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            sidebar.classList.toggle('active');
        } else {
            sidebar.classList.toggle('collapsed');
        }
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target) && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        }
    });

    // Nav Item Click Handling
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Toast Notification System
    const createToastContainer = () => {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        return container;
    };

    const showToast = (title, message, type = 'success') => {
        const container = createToastContainer();
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const icon = type === 'success' ? 'fa-check-circle' : (type === 'error' ? 'fa-times-circle' : 'fa-info-circle');

        toast.innerHTML = `
            <i class="fas ${icon}"></i>
            <div class="toast-content">
                <h5>${title}</h5>
                <p>${message}</p>
            </div>
        `;

        container.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 3500);
    };

    // Download Vouchers Simulation
    const downloadBtn = document.getElementById('download-vouchers');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing Vouchers...';
            downloadBtn.style.opacity = '0.7';
            downloadBtn.style.pointerEvents = 'none';

            showToast('Processing', 'Your fee vouchers are being prepared for download.', 'info');

            setTimeout(() => {
                downloadBtn.innerHTML = '<i class="fas fa-file-download"></i> Download All Vouchers';
                downloadBtn.style.opacity = '1';
                downloadBtn.style.pointerEvents = 'all';

                showToast('Success!', 'All vouchers have been downloaded successfully.', 'success');
            }, 2500);
        });
    }

    // Dynamic Greeting
    const updateGreeting = () => {
        const hour = new Date().getHours();
        let greeting = "";

        if (hour >= 5 && hour < 12) greeting = "Good Morning";
        else if (hour >= 12 && hour < 17) greeting = "Good Afternoon";
        else greeting = "Good Evening";

        const userName = "Ayesha Khan";
        const greetingElement = document.getElementById('greeting');
        if (greetingElement) {
            greetingElement.innerText = `${greeting}, ${userName}!`;
        }
    };

    updateGreeting();

    // Add scroll effect to header
    const mainContent = document.querySelector('.main-content');
    const topHeader = document.querySelector('.top-header');

    mainContent.addEventListener('scroll', () => {
        if (mainContent.scrollTop > 20) {
            topHeader.classList.add('scrolled');
        } else {
            topHeader.classList.remove('scrolled');
        }
    });

    // Logout Confirmation Modal
    const createLogoutModal = () => {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.id = 'logout-modal';

        modal.innerHTML = `
            <div class="modal-container">
                <div class="modal-icon">
                    <i class="fas fa-sign-out-alt"></i>
                </div>
                <h3 class="modal-title">Sign Out?</h3>
                <p class="modal-message">Are you sure you want to sign out of your account?</p>
                <div class="modal-actions">
                    <button class="btn-cancel" onclick="closeLogoutModal()">Cancel</button>
                    <a href="login.html" class="btn-confirm">Yes, Sign Out</a>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        return modal;
    };

    // Close Modal Function
    window.closeLogoutModal = () => {
        const modal = document.getElementById('logout-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
            }, 300); // Wait for transition
        }
    };

    // Intercept Logout Clicks
    const logoutLinks = document.querySelectorAll('a[href="login.html"]');
    logoutLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = createLogoutModal();
            // Force reflow
            void modal.offsetWidth;
            modal.classList.add('active');
        });
    });

    // Close modal when clicking outside
    document.addEventListener('click', (e) => {
        const modal = document.getElementById('logout-modal');
        if (modal && e.target === modal) {
            closeLogoutModal();
        }
    });

    // Notification Bell Interaction
    const bellBtn = document.querySelector('.notification-bell');
    if (bellBtn) {
        bellBtn.addEventListener('click', () => {
            window.location.href = 'notices.html';
        });
    }

    // AI Workshop Registration Logic
    const registerBtn = document.getElementById('register-ai-workshop');

    // Create Registration Modal Function (Reusing same styles)
    const createRegistrationModal = () => {
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        modalOverlay.id = 'registration-modal';

        const modalHTML = `
            <div class="modal-container">
                <div class="modal-icon" style="background: #eff6ff; color: #3b82f6;">
                    <i class="fas fa-robot"></i>
                </div>
                <h3 class="modal-title">Workshop Registration</h3>
                <p class="modal-message">Do you want to confirm your registration for the "Artificial Intelligence in Modern Industry" workshop?</p>
                <div class="modal-actions">
                    <button class="btn-cancel" onclick="closeRegistrationModal()">Cancel</button>
                    <button class="btn-confirm" onclick="confirmRegistration()" style="background: #3b82f6; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);">Confirm</button>
                </div>
            </div>
        `;

        modalOverlay.innerHTML = modalHTML;
        document.body.appendChild(modalOverlay);
        return modalOverlay;
    };

    // Global Functions for Registration
    window.closeRegistrationModal = () => {
        const modal = document.getElementById('registration-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    };

    window.confirmRegistration = () => {
        closeRegistrationModal();
        showToast('Successfully Registered!', 'You have been enrolled in the AI Workshop.', 'success');
    };

    // Attach Click Listener
    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            const modal = createRegistrationModal();
            // Force reflow
            void modal.offsetWidth;
            modal.classList.add('active');
        });
    }

    // Profile Picture Upload Logic
    const uploadBtn = document.getElementById('upload-profile-pic-btn');
    const fileInput = document.getElementById('profile-pic-input');
    const profileImg = document.getElementById('profile-img-preview');

    if (uploadBtn && fileInput && profileImg) {
        uploadBtn.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    profileImg.src = e.target.result;
                    showToast('Profile Updated', 'Your profile picture has been updated successfully!', 'success');
                };
                reader.readAsDataURL(file);
            }
        });
    }
});
