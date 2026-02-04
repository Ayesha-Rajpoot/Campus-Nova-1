document.addEventListener('DOMContentLoaded', () => {
    // Current Date
    const dateOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    document.getElementById('currentDate').innerText = new Date().toLocaleDateString('en-GB', dateOptions);

    // Navigation Logic
    const navItems = document.querySelectorAll('.nav-item:not(.logout-item)');
    const views = document.querySelectorAll('.view-section');
    const pageTitle = document.getElementById('page-title');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            // Remove active class from all
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active to clicked
            item.classList.add('active');

            // Hide all views
            views.forEach(view => {
                view.style.display = 'none';
                view.classList.remove('active');
            });

            // Show target view
            const targetId = item.getAttribute('data-target') + '-view';
            const targetView = document.getElementById(targetId);

            // Special handling for My Classes if needed (e.g. refresh data)
            if (item.getAttribute('data-target') === 'my-classes') {
                // Potential future data fetch can go here
            }

            // Check if view exists (we might implement some later)
            if (targetView) {
                targetView.style.display = 'block';
                // Small delay to allow display:block to apply before opacity transition
                setTimeout(() => targetView.classList.add('active'), 10);
            } else {
                console.warn(`View ID ${targetId} not found.`);
                // Ideally create it dynamically if missing, or show a 'Coming Soon' placeholder
                renderPlaceholder(item.getAttribute('data-target'));
            }

            // Update Header Title
            pageTitle.innerText = item.innerText.trim();
        });
    });

    // Mock Data for Students
    // Mock Data for Students
    const studentsData = [
        { id: 'GT-2024-001', name: 'Ali Hassan', trade: 'Electrician', session: '2024-25', status: 'Active' },
        { id: 'GT-2024-045', name: 'Bilal Ahmed', trade: 'HVAC', session: '2024-25', status: 'Active' },
        { id: 'GT-2024-102', name: 'Zeenat Bibi', trade: 'Comp. App', session: '2024-25', status: 'Active' },
        { id: 'GT-2024-088', name: 'Usman Ghani', trade: 'Welding', session: '2024-25', status: 'Inactive' },
        { id: 'GT-2024-012', name: 'Fatima Noor', trade: 'Dress Making', session: '2024-25', status: 'Active' },
        { id: 'GT-2024-033', name: 'Hamza Malik', trade: 'Auto Cad', session: '2024-25', status: 'Active' },
        { id: 'GT-2024-056', name: 'Rashid Minhas', trade: 'Electrician', session: '2024-25', status: 'Warning' }
    ];

    // Data Management for Classes
    let activeClasses = [
        {
            title: 'Electrician',
            session: 'Session 2024-25',
            students: 42,
            time: '08:00 - 12:00',
            room: 'Lab-01',
            color: 'blue',
            icon: 'fa-bolt'
        },
        {
            title: 'HVAC',
            session: 'Session 2024-25',
            students: 35,
            time: '12:30 - 04:30',
            room: 'Workshop-B',
            color: 'green',
            icon: 'fa-snowflake'
        },
        {
            title: 'Comp. App',
            session: 'Short Course',
            students: 28,
            time: '02:00 - 05:00',
            room: 'Comp Lab',
            color: 'green',
            icon: 'fa-computer'
        }
    ];

    let archivedClasses = [];
    let currentClassView = 'active'; // 'active' or 'archived'

    // Initialize Views
    populateRecentActivity();
    renderStudentTable(studentsData);
    renderMyClasses(activeClasses); // Initial render

    // Function to render My Classes
    function renderMyClasses(data) {
        const container = document.getElementById('my-classes-container');
        if (!container) return;

        if (data.length === 0) {
            container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-muted);">No classes found in ${currentClassView} view.</div>`;
            return;
        }

        let html = '';
        data.forEach(cls => {
            html += `
            <div class="class-card" style="opacity: ${currentClassView === 'archived' ? '0.7' : '1'}">
                <div class="card-header bg-${cls.color}">
                    <div class="subject-icon">
                        <i class="fa-solid ${cls.icon}"></i>
                    </div>
                    <div class="subject-info">
                        <h3>${cls.title}</h3>
                        <span class="session-badge">${cls.session}</span>
                    </div>
                    <div class="more-opt" data-class-name="${cls.title}">
                        <i class="fa-solid fa-ellipsis"></i>
                    </div>
                </div>
                <div class="card-body">
                    <div class="class-stat">
                        <span><i class="fa-solid fa-users"></i> Students</span>
                        <strong>${cls.students}</strong>
                    </div>
                    <div class="class-stat">
                        <span><i class="fa-solid fa-clock"></i> Time</span>
                        <strong>${cls.time}</strong>
                    </div>
                    <div class="class-stat">
                        <span><i class="fa-solid fa-door-open"></i> Room</span>
                        <strong>${cls.room}</strong>
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn-class primary" data-class-name="${cls.title}" data-action="attendance" ${currentClassView === 'archived' ? 'disabled' : ''}>Attendance</button>
                    <button class="btn-class secondary" data-class-name="${cls.title}" data-action="results" ${currentClassView === 'archived' ? 'disabled' : ''}>Results</button>
                </div>
            </div>
            `;
        });
        container.innerHTML = html;
    }

    // Toggle Archive Logic
    window.toggleArchiveStatus = function (className) {
        if (currentClassView === 'active') {
            // Archive it
            const idx = activeClasses.findIndex(c => c.title === className);
            if (idx > -1) {
                const cls = activeClasses.splice(idx, 1)[0];
                archivedClasses.push(cls);
                renderMyClasses(activeClasses);
            }
        } else {
            // Unarchive it
            const idx = archivedClasses.findIndex(c => c.title === className);
            if (idx > -1) {
                const cls = archivedClasses.splice(idx, 1)[0];
                activeClasses.push(cls);
                renderMyClasses(archivedClasses);
            }
        }
    };

    // Class Card Interactions (Attendance, Results, More Options)
    const myClassesContainer = document.getElementById('my-classes-container');
    const contextMenu = document.getElementById('class-context-menu');
    const toggleArchivedBtn = document.getElementById('toggle-archived-btn');

    // Toggle View Listener
    if (toggleArchivedBtn) {
        toggleArchivedBtn.addEventListener('click', () => {
            if (currentClassView === 'active') {
                currentClassView = 'archived';
                toggleArchivedBtn.innerText = 'View Active';
                toggleArchivedBtn.style.backgroundColor = 'var(--text-muted)';
                toggleArchivedBtn.style.color = 'white';
                renderMyClasses(archivedClasses);
                document.querySelector('#my-classes-view h2').innerText = 'Archived Classes';
                // Hide Request Button in archive view
                const reqBtn = document.getElementById('request-class-btn');
                if (reqBtn) reqBtn.style.display = 'none';
            } else {
                currentClassView = 'active';
                toggleArchivedBtn.innerText = 'View Archived';
                toggleArchivedBtn.style.backgroundColor = '';
                toggleArchivedBtn.style.color = '';
                renderMyClasses(activeClasses);
                document.querySelector('#my-classes-view h2').innerText = 'Assigned Classes';
                const reqBtn = document.getElementById('request-class-btn');
                if (reqBtn) reqBtn.style.display = 'block';
            }
        });
    }

    // Hide context menu on click elsewhere
    window.addEventListener('click', () => {
        if (contextMenu) contextMenu.classList.remove('active');
    });

    if (myClassesContainer) {
        myClassesContainer.addEventListener('click', (e) => {
            const target = e.target;

            // Attendance Button
            const attBtn = target.closest('button[data-action="attendance"]');
            if (attBtn) {
                const className = attBtn.getAttribute('data-class-name');
                // Switch to Attendance View
                document.querySelector('[data-target="attendance"]').click();

                // Select Class and Load
                if (attClassSelect) {
                    attClassSelect.value = className;
                    loadAttendanceSheet(className);
                }
                return;
            }

            // Results Button
            const resBtn = target.closest('button[data-action="results"]');
            if (resBtn) {
                const className = resBtn.getAttribute('data-class-name');
                // Switch to Results View
                document.querySelector('[data-target="results"]').click();

                // Select Class and Load
                if (resultClassSelect) {
                    resultClassSelect.value = className;
                    loadResultsSheet(className);
                }
                return;
            }

            // More Options (Three Dots)
            const moreBtn = target.closest('.more-opt');
            if (moreBtn) {
                e.stopPropagation(); // Prevent closing immediately
                const className = moreBtn.getAttribute('data-class-name');
                const rect = moreBtn.getBoundingClientRect();

                if (contextMenu) {
                    // Position menu near the button
                    contextMenu.style.top = `${rect.bottom + window.scrollY + 5}px`;
                    contextMenu.style.left = `${rect.left + window.scrollX - 100}px`;
                    contextMenu.classList.add('active');
                    contextMenu.setAttribute('data-current-class', className);

                    // Toggle Context Menu Options based on View
                    const archiveOpt = contextMenu.querySelector('.archive-option');
                    const unarchiveOpt = contextMenu.querySelector('.unarchive-option');

                    if (currentClassView === 'active') {
                        if (archiveOpt) archiveOpt.style.display = 'flex';
                        if (unarchiveOpt) unarchiveOpt.style.display = 'none';
                    } else {
                        if (archiveOpt) archiveOpt.style.display = 'none';
                        if (unarchiveOpt) unarchiveOpt.style.display = 'flex';
                    }
                }
                return;
            }
        });
    }

    // Context Menu Action Logic
    if (contextMenu) {
        contextMenu.addEventListener('click', (e) => {
            const actionItem = e.target.closest('li[data-action]');
            if (!actionItem) return;

            const action = actionItem.getAttribute('data-action');
            const className = contextMenu.getAttribute('data-current-class');

            // Close menu
            contextMenu.classList.remove('active');

            if (action === 'view-details') {
                alert(`Viewing details for ${className}\n\nSession: 2024-25\nStudents: 40+\nPerformance: Good`);
            } else if (action === 'edit-class') {
                if (currentClassView === 'archived') {
                    alert('Restore class to edit it.');
                    return;
                }
                if (reqClassModal && reqClassForm) {
                    reqClassModal.style.display = 'flex';
                    setTimeout(() => reqClassModal.classList.add('active'), 10);
                    const select = reqClassForm.querySelector('select');
                    if (select) {
                        Array.from(select.options).forEach(opt => {
                            if (opt.innerText.includes(className)) select.value = opt.innerText;
                        });
                    }
                }
            } else if (action === 'manage-students') {
                if (currentClassView === 'archived') {
                    alert('Restore class to manage students.');
                    return;
                }
                document.querySelector('[data-target="students"]').click();
                const studentSelect = document.querySelector('.gtti-select');
                if (studentSelect) {
                    studentSelect.value = className;
                }
            } else if (action === 'archive') {
                if (confirm(`Are you sure you want to archive ${className}?`)) {
                    toggleArchiveStatus(className);
                }
            } else if (action === 'unarchive') {
                if (confirm(`Are you sure you want to restore ${className}?`)) {
                    toggleArchiveStatus(className);
                }
            }
        });
    }

    // Student Trade Filter Logic
    const studentTradeFilter = document.getElementById('student-trade-filter');
    if (studentTradeFilter) {
        studentTradeFilter.addEventListener('change', (e) => {
            const selectedTrade = e.target.value;
            if (selectedTrade === 'Select Trade') {
                renderStudentTable(studentsData);
            } else {
                const filtered = studentsData.filter(s => s.trade === selectedTrade);
                renderStudentTable(filtered);
            }
        });
    }



    // Global Search Logic
    const globalSearchInput = document.getElementById('global-search');
    if (globalSearchInput) {
        globalSearchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase().trim();

            // Auto-switch to students view if searching
            if (term.length > 0) {
                const studentsView = document.getElementById('students-view');
                if (studentsView && studentsView.style.display === 'none') {
                    // Click the nav item to switch properly
                    const navItem = document.querySelector('li[data-target="students"]');
                    if (navItem) navItem.click();
                }
            }

            if (term === '') {
                renderStudentTable(studentsData);
            } else {
                const filtered = studentsData.filter(s =>
                    s.name.toLowerCase().includes(term) ||
                    s.id.toLowerCase().includes(term) ||
                    s.trade.toLowerCase().includes(term)
                );
                renderStudentTable(filtered);
            }
        });
    }

    // Function to render Student Table
    function renderStudentTable(data) {
        const tbody = document.querySelector('#students-table tbody');
        if (!tbody) return;

        tbody.innerHTML = '';
        data.forEach(student => {
            const tr = document.createElement('tr');
            let statusClass = 'active';
            if (student.status === 'Inactive') statusClass = 'inactive';
            if (student.status === 'Warning') statusClass = 'inactive'; // Reuse for now or add specific style

            tr.innerHTML = `
                <td>${student.id}</td>
                <td style="font-weight: 500;">${student.name}</td>
                <td>${student.trade}</td>
                <td>${student.session}</td>
                <td><span class="status-badge ${statusClass}">${student.status}</span></td>
                <td>
                    <div class="more-opt" data-student-id="${student.id}" style="cursor: pointer; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s;">
                        <i class="fa-solid fa-ellipsis"></i>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Student Context Menu Logic
    const studentContextMenu = document.getElementById('student-context-menu');

    // Listener for Student Table Interactions (Delegation)
    const studentsTable = document.getElementById('students-table');
    if (studentsTable) {
        studentsTable.addEventListener('click', (e) => {
            const moreBtn = e.target.closest('.more-opt');
            if (moreBtn) {
                e.preventDefault();
                e.stopPropagation();

                const studentId = moreBtn.getAttribute('data-student-id');
                const rect = moreBtn.getBoundingClientRect();

                if (studentContextMenu) {
                    // Find student to check status
                    const s = studentsData.find(st => st.id === studentId);

                    studentContextMenu.style.top = `${rect.bottom + window.scrollY + 5}px`;
                    studentContextMenu.style.left = `${rect.left + window.scrollX - 100}px`;
                    studentContextMenu.classList.add('active');
                    studentContextMenu.setAttribute('data-current-student', studentId);

                    // Update Status Option Text
                    const statusOpt = studentContextMenu.querySelector('li[data-action="toggle-status"]');
                    if (statusOpt && s) {
                        if (s.status === 'Inactive') {
                            statusOpt.innerHTML = `<i class="fa-solid fa-toggle-on" style="color: var(--success);"></i> Mark Active`;
                            statusOpt.setAttribute('data-action-type', 'activate');
                        } else {
                            statusOpt.innerHTML = `<i class="fa-solid fa-toggle-off" style="color: var(--danger);"></i> Mark Inactive`;
                            statusOpt.setAttribute('data-action-type', 'deactivate');
                        }
                    }

                    // Close other menus
                    if (contextMenu) contextMenu.classList.remove('active');
                }
            }
        });
    }

    // Close menus on outside click - update to include student menu
    window.addEventListener('click', (e) => {
        if (contextMenu) contextMenu.classList.remove('active');
        if (studentContextMenu) studentContextMenu.classList.remove('active');

        // Generic Modal Close Overlay Click
        if (e.target.classList.contains('modal-overlay')) {
            e.target.classList.remove('active');
            setTimeout(() => e.target.style.display = 'none', 300);
        }
    });

    // Handle Close Modal Buttons (Generic)
    document.addEventListener('click', (e) => {
        if (e.target.closest('.close-modal') || e.target.closest('.close-modal-btn')) {
            const modal = e.target.closest('.modal-overlay');
            if (modal) {
                modal.classList.remove('active');
                setTimeout(() => modal.style.display = 'none', 300);
            }
        }
    });

    // Student Context Menu Action Logic
    if (studentContextMenu) {
        studentContextMenu.addEventListener('click', (e) => {
            const actionItem = e.target.closest('li[data-action]');
            if (!actionItem) return;

            const action = actionItem.getAttribute('data-action');
            const studentId = studentContextMenu.getAttribute('data-current-student');

            studentContextMenu.classList.remove('active'); // Close menu

            // Find student details
            const student = studentsData.find(s => s.id === studentId);
            const studentName = student ? student.name : studentId;

            if (action === 'view-profile') {
                const modal = document.getElementById('view-profile-modal');
                if (modal && student) {
                    modal.style.display = 'flex';
                    setTimeout(() => modal.classList.add('active'), 10);

                    // Populate Mock Data
                    const nameEl = modal.querySelector('#profile-name');
                    const idEl = modal.querySelector('#profile-id');
                    const tradeEl = modal.querySelector('#profile-trade');
                    const sessionEl = modal.querySelector('#profile-session');
                    const statusEl = modal.querySelector('#profile-status');
                    const attEl = modal.querySelector('#profile-attendance');

                    if (nameEl) nameEl.textContent = student.name;
                    if (idEl) idEl.textContent = student.id;
                    if (tradeEl) tradeEl.textContent = student.trade;
                    if (sessionEl) sessionEl.textContent = student.session;

                    if (statusEl) {
                        statusEl.textContent = student.status;
                        statusEl.className = 'status-badge'; // reset
                        if (student.status === 'Active') statusEl.classList.add('active');
                        else if (student.status === 'Inactive' || student.status === 'Warning') statusEl.classList.add('inactive');
                    }

                    // Mock Attendance %
                    if (attEl) attEl.textContent = (Math.floor(Math.random() * 20) + 80) + '%';
                } else {
                    alert(`Viewing profile for ${studentName} (${studentId})`);
                }
            } else if (action === 'edit-student') {
                // Reuse Add Student Modal
                const modal = document.getElementById('add-student-modal');
                if (modal) {
                    modal.style.display = 'flex';
                    setTimeout(() => modal.classList.add('active'), 10);
                    // Set title
                    modal.querySelector('h2').innerText = 'Edit Student';

                    // Pre-fill fields (Mock)
                    const inputs = modal.querySelectorAll('input');
                    if (student) {
                        if (inputs[0]) inputs[0].value = student.name;
                        if (inputs[1]) inputs[1].value = studentId;
                        if (inputs[2]) inputs[2].value = student.session;

                        const select = modal.querySelector('select');
                        if (select) {
                            // Match trade if possible
                            Array.from(select.options).forEach(opt => {
                                if (opt.innerText.includes(student.trade)) select.value = opt.innerText;
                            });
                        }
                    }
                }
            } else if (action === 'toggle-status') {
                const actionType = actionItem.getAttribute('data-action-type');
                if (actionType === 'activate') {
                    if (confirm(`Activate ${studentName}?`)) {
                        const s = studentsData.find(s => s.id === studentId);
                        if (s) {
                            s.status = 'Active';
                            renderStudentTable(studentsData);
                        }
                    }
                } else {
                    if (confirm(`Mark ${studentName} as Inactive?`)) {
                        const s = studentsData.find(s => s.id === studentId);
                        if (s) {
                            s.status = 'Inactive';
                            renderStudentTable(studentsData);
                        }
                    }
                }
            } else if (action === 'delete-student') {
                if (confirm(`Are you sure you want to PERMANENTLY delete ${studentName}? This cannot be undone.`)) {
                    const idx = studentsData.findIndex(s => s.id === studentId);
                    if (idx > -1) {
                        studentsData.splice(idx, 1);
                        renderStudentTable(studentsData);
                    }
                }
            }
        });
    }

    // Function to populate Recent Activity (Dashboard)
    function populateRecentActivity() {
        const activityContainer = document.querySelector('.activity-list');
        if (!activityContainer) return;

        const activities = [
            { icon: 'fa-check', color: 'green', text: '<strong>Ali Hassan</strong> marked present in Electrician Class', time: '10 mins ago' },
            { icon: 'fa-file-alt', color: 'blue', text: '<strong>HVAC</strong> Results uploaded for Mid-Term', time: '2 hours ago' },
            { icon: 'fa-user-plus', color: 'green', text: 'New student registration: <strong>Sara Khan</strong>', time: '5 hours ago' }
        ];

        let html = '';
        activities.forEach(act => {
            html += `
                <div style="display: flex; gap: 15px; margin-bottom: 20px; align-items: flex-start;">
                    <div style="width: 36px; height: 36px; background: var(--bg-light); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--${act.color}); flex-shrink: 0;">
                        <i class="fa-solid ${act.icon}"></i>
                    </div>
                    <div>
                        <p style="font-size: 0.95rem; margin-bottom: 4px;">${act.text}</p>
                        <span style="font-size: 0.8rem; color: var(--text-muted);">${act.time}</span>
                    </div>
                </div>
            `;
        });
        activityContainer.innerHTML = html;
    }

    // Helper for generating Views dynamically if they don't exist in HTML
    function renderPlaceholder(target) {
        let contentArea = document.getElementById('content-area');

        // Remove if exists (to avoid duplicates if clicked multiple times, though logic prevents this)
        const existing = document.getElementById(`${target}-view`);
        if (existing) {
            existing.style.display = 'block';
            setTimeout(() => existing.classList.add('active'), 10);
            return;
        }

        const div = document.createElement('div');
        div.id = `${target}-view`;
        div.className = 'view-section active';
        div.innerHTML = `
            <div style="text-align: center; padding: 4rem; color: var(--text-muted);">
                <i class="fa-solid fa-person-digging" style="font-size: 3rem; margin-bottom: 1rem; color: var(--secondary);"></i>
                <h2>${target.charAt(0).toUpperCase() + target.slice(1)} Module Under Construction</h2>
                <p>This feature will be available in the next update.</p>
            </div>
        `;
        contentArea.appendChild(div);
    }

    // Modal Logic
    const modal = document.getElementById('add-student-modal');
    const addStudentBtn = document.getElementById('add-student-btn');
    const closeBtns = document.querySelectorAll('.close-modal, .close-modal-btn');
    const studentForm = document.getElementById('add-student-form');

    if (addStudentBtn) {
        addStudentBtn.addEventListener('click', () => {
            modal.style.display = 'flex'; // make it visible for layout
            setTimeout(() => modal.classList.add('active'), 10); // fade in
        });
    }

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.style.display = 'none', 300); // wait for anim
        });
    });

    // Close on click outside
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.style.display = 'none', 300);
        }
    });

    // Handle Form Submit
    if (studentForm) {
        studentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get values
            const name = studentForm.querySelector('input[type="text"]').value; // crude, better to use IDs
            const id = studentForm.querySelectorAll('input')[1].value;
            const trade = studentForm.querySelector('select').value;
            const session = studentForm.querySelectorAll('input')[2].value;

            // Correctly add to Data Array
            const newStudent = {
                id: id,
                name: name,
                trade: trade,
                session: session,
                status: 'Active'
            };

            // Add to beginning of array
            studentsData.unshift(newStudent);

            // Re-render table to ensure correct HTML/Events
            renderStudentTable(studentsData);

            // Close Modal
            modal.classList.remove('active');
            setTimeout(() => modal.style.display = 'none', 300);

            // Reset Form
            studentForm.reset();

            // Show Notification
            console.log("Student Added:", name);
            // Optional: You could show a toast here
        });
    }

    // Attendance Logic
    const attClassSelect = document.getElementById('attendance-class-select');
    const attDateInput = document.getElementById('attendance-date');
    const attTableBody = document.querySelector('#attendance-table tbody');
    const attPlaceholder = document.getElementById('attendance-placeholder');

    // Set Default Date
    if (attDateInput) {
        attDateInput.valueAsDate = new Date();
    }

    if (attClassSelect) {
        attClassSelect.addEventListener('change', (e) => {
            const selectedClass = e.target.value;
            loadAttendanceSheet(selectedClass);
        });
    }

    function loadAttendanceSheet(className) {
        if (!attTableBody) return;

        // Clear previous
        attTableBody.innerHTML = '';
        attPlaceholder.style.display = 'none';

        // Filter students by trade/class (Mock filtering logic)
        // In real app, we would fetch based on ID
        const classStudents = studentsData.filter(student =>
            // Simple string matching for demo
            student.trade.includes(className.split(' ')[0])
        );

        if (classStudents.length === 0) {
            attTableBody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding: 2rem;">No students found for this class.</td></tr>';
            return;
        }

        classStudents.forEach(student => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${student.id}</td>
                <td><span style="font-weight:500;">${student.name}</span></td>
                <td>
                    <div class="attendance-options">
                        <button class="att-btn present active" onclick="toggleAttendance(this, 'P')">P</button>
                        <button class="att-btn absent" onclick="toggleAttendance(this, 'A')">A</button>
                        <button class="att-btn leave" onclick="toggleAttendance(this, 'L')">L</button>
                    </div>
                </td>
                <td>
                    <input type="text" class="remarks-input" placeholder="Optional...">
                </td>
            `;
            attTableBody.appendChild(tr);
        });
    }

    // Mark All Present Logic
    const markAllPresentBtn = document.getElementById('mark-all-present-btn');
    if (markAllPresentBtn) {
        markAllPresentBtn.addEventListener('click', () => {
            const rows = document.querySelectorAll('#attendance-table tbody tr');
            if (rows.length === 0) return;

            rows.forEach(row => {
                const pBtn = row.querySelector('.att-btn.present');
                if (pBtn) {
                    // Reuse existing toggle function logic manually or via click
                    // Using manual class manipulation for speed/consistency
                    const siblings = row.querySelectorAll('.att-btn');
                    siblings.forEach(sib => sib.classList.remove('active'));
                    pBtn.classList.add('active');
                }
            });
            // feedback
            // alert('All students marked Present.');
        });
    }

    // Global function for toggle (needs to be on window for onclick access from innerHTML)
    window.toggleAttendance = function (btn, status) {
        const parent = btn.parentElement;
        // Remove active from all siblings
        const siblings = parent.querySelectorAll('.att-btn');
        siblings.forEach(sib => sib.classList.remove('active'));
        // Add active to clicked
        btn.classList.add('active');
    };

    // Save Attendance
    const saveAttBtn = document.getElementById('save-attendance-btn');
    if (saveAttBtn) {
        saveAttBtn.addEventListener('click', () => {
            // Mock Save
            const btnContent = saveAttBtn.innerHTML;
            saveAttBtn.innerHTML = '<i class="fa-solid fa-check"></i> Saved!';
            saveAttBtn.style.backgroundColor = 'var(--success)';

            setTimeout(() => {
                saveAttBtn.innerHTML = btnContent;
                saveAttBtn.style.backgroundColor = ''; // revert
            }, 2000);
        });
    }

    // Notifications Logic
    const notifBtn = document.querySelector('.notifications');
    const notifDropdown = document.querySelector('.notification-dropdown');

    if (notifBtn && notifDropdown) {
        notifBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notifDropdown.classList.toggle('active');
        });

        // Close when clicking outside
        window.addEventListener('click', (e) => {
            if (!notifBtn.contains(e.target)) {
                notifDropdown.classList.remove('active');
            }
        });

        // Mark all as read functionality
        const markReadBtn = notifDropdown.querySelector('.mark-read');
        if (markReadBtn) {
            markReadBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const unreadItems = notifDropdown.querySelectorAll('.notif-item.unread');
                unreadItems.forEach(item => {
                    item.classList.remove('unread');
                    item.style.backgroundColor = 'transparent';
                });
                // Update badge
                const badge = notifBtn.querySelector('.badge');
                if (badge) badge.style.display = 'none';
            });
        }

        // View All Link in Dropdown
        const viewAllDropdown = notifDropdown.querySelector('.dropdown-footer a');
        if (viewAllDropdown) {
            viewAllDropdown.addEventListener('click', (e) => {
                e.preventDefault();
                showNotificationsView();
                notifDropdown.classList.remove('active');
            });
        }
    }

    // Recent Activity "View All" Button
    const recentViewAllBtn = document.querySelector('.recent-section .section-header button');
    if (recentViewAllBtn) {
        recentViewAllBtn.addEventListener('click', () => {
            showNotificationsView();
        });
    }

    // Back to Dashboard Logic
    const backToDashBtn = document.getElementById('back-to-dash');
    if (backToDashBtn) {
        backToDashBtn.addEventListener('click', () => {
            document.querySelector('[data-target="dashboard"]').click();
        });
    }

    function showNotificationsView() {
        // Hide all views
        views.forEach(view => {
            view.style.display = 'none';
            view.classList.remove('active');
        });

        // Show Notif View
        const notifView = document.getElementById('notifications-view');
        if (notifView) {
            notifView.style.display = 'block';
            setTimeout(() => notifView.classList.add('active'), 10);

            // Populate Data using current filter
            const activeFilterBtn = notifView.querySelector('.category-filter.active');
            const filterType = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';
            const list = notifView.querySelector('.all-notifications-list');

            renderAllNotifications(list, filterType);
        }

        // Update Title
        pageTitle.innerText = "Notifications";

        // Deselect nav items
        navItems.forEach(nav => nav.classList.remove('active'));
    }

    // Filter Buttons Logic
    const filterBtns = document.querySelectorAll('.category-filter');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');

            const filterType = btn.getAttribute('data-filter');
            const list = document.querySelector('.all-notifications-list');
            renderAllNotifications(list, filterType);
        });
    });

    function renderAllNotifications(container, filter = 'all') {
        if (!container) return;

        const allNotifs = [
            { type: 'unread', icon: 'fa-info', color: 'blue', title: 'System Update', msg: 'New features added to the dashboard.', time: '2 mins ago' },
            { type: 'unread', icon: 'fa-check', color: 'green', title: 'Attendance Saved', msg: 'Class Electrician attendance submitted.', time: '1 hour ago' },
            { type: 'alert', icon: 'fa-triangle-exclamation', color: 'orange', title: 'Pending Grades', msg: 'HVAC results are pending approval.', time: '5 hours ago' },
            { type: 'read', icon: 'fa-user-plus', color: 'green', title: 'New Student', msg: 'Ali Khan added to Electrician Class.', time: '1 day ago' },
            { type: 'read', icon: 'fa-calendar-xmark', color: 'red', title: 'Leave Request', msg: 'Hamza Malik requested leave for tomorrow.', time: '2 days ago' },
            { type: 'read', icon: 'fa-bullhorn', color: 'blue', title: 'Principal Notice', msg: 'Faculty meeting scheduled for Friday.', time: '3 days ago' }
        ];

        // Filter Logic
        let filteredNotifs = allNotifs;
        if (filter === 'unread') {
            filteredNotifs = allNotifs.filter(n => n.type === 'unread');
        } else if (filter === 'alert') {
            filteredNotifs = allNotifs.filter(n => n.type === 'alert');
        }
        // 'all' includes everything

        let html = '';
        if (filteredNotifs.length === 0) {
            html = `<div style="text-align:center; padding: 2rem; color: var(--text-muted);">No notifications found.</div>`;
        } else {
            filteredNotifs.forEach(item => {
                const bgClass = item.type === 'unread' ? 'background-color: rgba(243, 156, 18, 0.05);' : '';
                html += `
                    <div class="notif-item" style="padding: 1.5rem; ${bgClass} border-bottom: 1px solid var(--border-color); display:flex; gap: 15px; align-items: flex-start;">
                        <div class="notif-icon bg-${item.color}" style="width: 45px; height: 45px; font-size: 1.1rem;"><i class="fa-solid ${item.icon}"></i></div>
                        <div class="notif-content" style="flex:1;">
                            <h4 style="margin-bottom: 4px; color: var(--primary);">${item.title} <span style="font-size:0.75rem; color:var(--text-muted); font-weight:400; float:right;">${item.time}</span></h4>
                            <p style="color:var(--text-dark); margin-bottom:0;">${item.msg}</p>
                        </div>
                    </div>
                `;
            });
        }
        container.innerHTML = html;
    }

    // Results Logic
    const resultClassSelect = document.getElementById('result-class-select');
    const resultTableBody = document.querySelector('#results-table tbody');
    const resultPlaceholder = document.getElementById('results-placeholder');

    if (resultClassSelect) {
        resultClassSelect.addEventListener('change', (e) => {
            const selectedClass = e.target.value;
            loadResultsSheet(selectedClass);
        });
    }

    function loadResultsSheet(className) {
        if (!resultTableBody) return;

        resultTableBody.innerHTML = '';
        resultPlaceholder.style.display = 'none';

        const classStudents = studentsData.filter(student =>
            student.trade.includes(className.split(' ')[0])
        );

        if (classStudents.length === 0) {
            resultTableBody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 2rem;">No students found for this class.</td></tr>';
            return;
        }

        classStudents.forEach(student => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${student.id}</td>
                <td><strong>${student.name}</strong></td>
                <td>100</td>
                <td>
                    <input type="number" class="marks-input" max="100" min="0" value="0" oninput="calculateGrade(this)">
                </td>
                <td><span class="grade-badge F">F</span></td>
                <td><span class="status-badge inactive">Pending</span></td>
            `;
            resultTableBody.appendChild(tr);
        });
    }

    window.calculateGrade = function (input) {
        const marks = parseInt(input.value) || 0;
        const row = input.closest('tr');
        const gradeBadge = row.querySelector('.grade-badge');
        const statusBadge = row.querySelector('.status-badge');

        let grade = 'F';
        let gradeClass = 'F';
        let status = 'Fail';
        let statusClass = 'inactive'; // reusing gray for fail/pending

        if (marks >= 80) { grade = 'A+'; gradeClass = 'A'; status = 'Pass'; statusClass = 'active'; }
        else if (marks >= 70) { grade = 'A'; gradeClass = 'A'; status = 'Pass'; statusClass = 'active'; }
        else if (marks >= 60) { grade = 'B'; gradeClass = 'B'; status = 'Pass'; statusClass = 'active'; }
        else if (marks >= 50) { grade = 'C'; gradeClass = 'C'; status = 'Pass'; statusClass = 'active'; }

        // Update UI
        gradeBadge.className = `grade-badge ${gradeClass}`;
        gradeBadge.innerText = grade;

        statusBadge.className = `status-badge ${statusClass}`;
        statusBadge.innerText = status;

        // If fail change status color specifically if needed, but 'inactive' gray is okay for now or we can add .danger class
        if (status === 'Fail') statusBadge.style.color = 'var(--danger)';
        else statusBadge.style.color = '';
    };

    // Publish Results
    const publishBtn = document.getElementById('publish-result-btn');
    if (publishBtn) {
        publishBtn.addEventListener('click', () => {
            const btnContent = publishBtn.innerHTML;
            publishBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Publishing...';

            setTimeout(() => {
                publishBtn.innerHTML = '<i class="fa-solid fa-check-double"></i> Published';
                publishBtn.style.backgroundColor = 'var(--success)';

                setTimeout(() => {
                    publishBtn.innerHTML = btnContent;
                    publishBtn.style.backgroundColor = '';
                }, 3000);
            }, 1500);
        });
    }

    // Logout Logic
    const logoutBtn = document.querySelector('.logout-item a');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Check if we have a confirmation modal, if not simple confirm
            // For better UX, let's use a browser confirm or custom one.
            // Since we already have a nice modal architecture, let's just use confirm() for simplicity
            // OR create a nice sweetalert style div.

            if (confirm('Are you sure you want to logout?')) {
                // Simulate logout
                document.body.style.opacity = '0';
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 500);
            }
        });
    }

    // Request New Class Logic
    const reqClassBtn = document.getElementById('request-class-btn');
    const reqClassModal = document.getElementById('request-class-modal');
    const reqClassForm = document.getElementById('request-class-form');

    if (reqClassBtn && reqClassModal) {
        reqClassBtn.addEventListener('click', () => {
            reqClassModal.style.display = 'flex';
            setTimeout(() => reqClassModal.classList.add('active'), 10);
        });

        // Close Logic specific to this modal
        const closeReqBtns = reqClassModal.querySelectorAll('.close-modal, .close-modal-btn');
        closeReqBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                reqClassModal.classList.remove('active');
                setTimeout(() => reqClassModal.style.display = 'none', 300);
            });
        });

        window.addEventListener('click', (e) => {
            if (e.target == reqClassModal) {
                reqClassModal.classList.remove('active');
                setTimeout(() => reqClassModal.style.display = 'none', 300);
            }
        });
    }

    // Handle Request Form Submit
    if (reqClassForm) {
        reqClassForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = reqClassForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending Request...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Request Sent';
                btn.style.backgroundColor = 'var(--success)';

                setTimeout(() => {
                    reqClassModal.classList.remove('active');
                    setTimeout(() => {
                        reqClassModal.style.display = 'none';
                        btn.innerHTML = originalText;
                        btn.style.backgroundColor = '';
                        btn.disabled = false;
                        reqClassForm.reset();
                    }, 300);
                }, 1500);
            }, 1000);
        });
    }
});
