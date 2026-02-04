document.addEventListener('DOMContentLoaded', () => {
    // State Management
    const state = {
        currentView: 'dashboard-view',
        selectedTrade: '',
        selectedStatus: '',
        students: [
            { id: 'GTTI-24-001', name: 'Ahmad Ali', trade: 'Electrician', date: '2024-01-15', status: 'Active' },
            { id: 'GTTI-24-002', name: 'Sara Khan', trade: 'Computer Graphics', date: '2024-01-18', status: 'Active' },
            { id: 'GTTI-24-003', name: 'Zain Ahmed', trade: 'Machinist', date: '2024-02-01', status: 'Pending' },
            { id: 'GTTI-24-004', name: 'Fatima Noor', trade: 'Electrician', date: '2024-02-05', status: 'Active' },
            { id: 'GTTI-24-005', name: 'Bilal Hassan', trade: 'Machinist', date: '2024-02-10', status: 'Graduated' }
        ],
        teachers: [
            { id: 'T-001', name: 'Engr. Kamran', subject: 'Electrical Engineering', email: 'kamran@gtti.edu.pk', phone: '0300-1234567', image: 'https://ui-avatars.com/api/?name=Kamran&background=10ac84&color=fff' },
            { id: 'T-002', name: 'Ms. Ayesha', subject: 'Computer Graphics', email: 'ayesha@gtti.edu.pk', phone: '0300-7654321', image: 'https://ui-avatars.com/api/?name=Ayesha&background=10ac84&color=fff' },
            { id: 'T-003', name: 'Mr. Zahid', subject: 'Precision Machining', email: 'zahid@gtti.edu.pk', phone: '0300-1122334', image: 'https://ui-avatars.com/api/?name=Zahid&background=10ac84&color=fff' }
        ],
        notices: [
            { id: 1, title: 'Final Exams Schedule', date: '2024-05-15', content: 'The final practical exams for all trades will commence from June 1st, 2024.' },
            { id: 2, title: 'New Admissions 2024', date: '2024-05-10', content: 'Online applications for the Fall 2024 session are now open. Apply before June 30th.' }
        ],
        notifications: [
            { id: 1, title: 'New Student Enrolled', message: 'Ahmad Ali joined the Electrician trade.', time: '2 mins ago', unread: true },
            { id: 2, title: 'Notice Posted', message: 'Final Exam schedule is now live.', time: '1 hour ago', unread: true },
            { id: 3, title: 'Low Attendance Alert', message: '5 students have low attendance in Machinist trade.', time: '3 hours ago', unread: false }
        ],
        courses: [
            { id: 'C1', name: 'Electrical Engineering', level: 'Level 2', duration: '6 Months', icon: 'fas fa-bolt', students: 45 },
            { id: 'C2', name: 'Computer Graphics', level: 'Level 3', duration: '1 Year', icon: 'fas fa-paint-brush', students: 30 },
            { id: 'C3', name: 'Precision Machining', level: 'Level 2', duration: '6 Months', icon: 'fas fa-cog', students: 25 },
            { id: 'C4', name: 'Auto Mechanic', level: 'Level 2', duration: '6 Months', icon: 'fas fa-car', students: 20 }
        ],
        schedules: [
            // Monday
            { day: 'Monday', time: '08:00 - 09:30', subject: 'Basic Electrical Theory', teacher: 'Engr. Kamran', trade: 'Electrician', room: 'Lab 1' },
            { day: 'Monday', time: '09:45 - 11:15', subject: 'Computer Graphics Fundamentals', teacher: 'Ms. Ayesha', trade: 'Computer Graphics', room: 'Computer Lab' },
            { day: 'Monday', time: '11:30 - 13:00', subject: 'Machine Operations', teacher: 'Mr. Zahid', trade: 'Machinist', room: 'Workshop A' },
            { day: 'Monday', time: '14:00 - 15:30', subject: 'Electrical Wiring Practical', teacher: 'Engr. Kamran', trade: 'Electrician', room: 'Lab 1' },

            // Tuesday
            { day: 'Tuesday', time: '08:00 - 09:30', subject: 'Adobe Photoshop', teacher: 'Ms. Ayesha', trade: 'Computer Graphics', room: 'Computer Lab' },
            { day: 'Tuesday', time: '09:45 - 11:15', subject: 'Precision Measurement', teacher: 'Mr. Zahid', trade: 'Machinist', room: 'Workshop A' },
            { day: 'Tuesday', time: '11:30 - 13:00', subject: 'Motor Control Systems', teacher: 'Engr. Kamran', trade: 'Electrician', room: 'Lab 1' },
            { day: 'Tuesday', time: '14:00 - 15:30', subject: '3D Modeling', teacher: 'Ms. Ayesha', trade: 'Computer Graphics', room: 'Computer Lab' },

            // Wednesday
            { day: 'Wednesday', time: '08:00 - 09:30', subject: 'Lathe Machine Practice', teacher: 'Mr. Zahid', trade: 'Machinist', room: 'Workshop A' },
            { day: 'Wednesday', time: '09:45 - 11:15', subject: 'Electrical Safety', teacher: 'Engr. Kamran', trade: 'Electrician', room: 'Lab 1' },
            { day: 'Wednesday', time: '11:30 - 13:00', subject: 'Digital Illustration', teacher: 'Ms. Ayesha', trade: 'Computer Graphics', room: 'Computer Lab' },
            { day: 'Wednesday', time: '14:00 - 15:30', subject: 'CNC Programming', teacher: 'Mr. Zahid', trade: 'Machinist', room: 'Workshop A' },

            // Thursday
            { day: 'Thursday', time: '08:00 - 09:30', subject: 'Video Editing', teacher: 'Ms. Ayesha', trade: 'Computer Graphics', room: 'Computer Lab' },
            { day: 'Thursday', time: '09:45 - 11:15', subject: 'Power Distribution', teacher: 'Engr. Kamran', trade: 'Electrician', room: 'Lab 1' },
            { day: 'Thursday', time: '11:30 - 13:00', subject: 'Milling Operations', teacher: 'Mr. Zahid', trade: 'Machinist', room: 'Workshop A' },
            { day: 'Thursday', time: '14:00 - 15:30', subject: 'Animation Basics', teacher: 'Ms. Ayesha', trade: 'Computer Graphics', room: 'Computer Lab' },

            // Friday
            { day: 'Friday', time: '08:00 - 09:30', subject: 'Industrial Wiring', teacher: 'Engr. Kamran', trade: 'Electrician', room: 'Lab 1' },
            { day: 'Friday', time: '09:45 - 11:15', subject: 'Quality Control', teacher: 'Mr. Zahid', trade: 'Machinist', room: 'Workshop A' },
            { day: 'Friday', time: '11:30 - 13:00', subject: 'Web Design', teacher: 'Ms. Ayesha', trade: 'Computer Graphics', room: 'Computer Lab' },

            // Saturday
            { day: 'Saturday', time: '08:00 - 09:30', subject: 'Print Media Design', teacher: 'Ms. Ayesha', trade: 'Computer Graphics', room: 'Computer Lab' },
            { day: 'Saturday', time: '09:45 - 11:15', subject: 'Electrical Troubleshooting', teacher: 'Engr. Kamran', trade: 'Electrician', room: 'Lab 1' },
            { day: 'Saturday', time: '11:30 - 13:00', subject: 'Workshop Safety', teacher: 'Mr. Zahid', trade: 'Machinist', room: 'Workshop A' }
        ]
    };

    // Sidebar Toggle
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-sidebar');
    const closeBtn = document.getElementById('close-sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    // Navigation Logic
    const navLinks = document.querySelectorAll('.sidebar-nav li a');
    const views = document.querySelectorAll('.content-view');

    // Search Functionality
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            if (term.length === 0) {
                renderStudents();
                return;
            }

            const filteredStudents = state.students.filter(student =>
                student.name.toLowerCase().includes(term) ||
                student.id.toLowerCase().includes(term) ||
                student.trade.toLowerCase().includes(term)
            );

            const filteredTeachers = state.teachers.filter(teacher =>
                teacher.name.toLowerCase().includes(term) ||
                teacher.subject.toLowerCase().includes(term)
            );

            renderFilteredSearchResults(filteredStudents, filteredTeachers, term);
        });
    }

    function renderFilteredSearchResults(students, teachers, term) {
        // If results are found in students or teachers, decide where to show them
        // For simplicity, we'll render students if we are on student view, or switch to results

        // Custom Search Results Rendering can be complex, but let's keep it clean
        if (state.currentView === 'teachers-view') {
            renderTeachers(teachers);
        } else {
            renderFilteredStudents(students);
            if (state.currentView !== 'students-view' && (students.length > 0 || teachers.length > 0)) {
                switchView('students-view');
            }
        }
    }

    function renderFilteredStudents(studentList) {
        const tbody = document.querySelector('#students-table tbody');
        if (!tbody) return;

        if (studentList.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No students found matching your search.</td></tr>';
            return;
        }

        tbody.innerHTML = studentList.map(student => `
            <tr>
                <td>${student.id}</td>
                <td>
                    <div class="table-user">
                        <img src="https://ui-avatars.com/api/?name=${student.name}&background=10ac84&color=fff" alt="${student.name}">
                        <span>${student.name}</span>
                    </div>
                </td>
                <td>${student.trade}</td>
                <td>${student.date}</td>
                <td><span class="status-badge ${student.status.toLowerCase()}">${student.status}</span></td>
                <td><button class="btn-icon"><i class="fas fa-ellipsis-v"></i></button></td>
            </tr>
        `).join('');
    }
    function switchView(viewId) {
        views.forEach(view => {
            view.classList.remove('active');
            if (view.id === viewId) {
                view.classList.add('active');
            }
        });

        // Update Nav Active State
        navLinks.forEach(link => {
            const parentLi = link.parentElement;
            parentLi.classList.remove('active');
            if (link.dataset.view === viewId) {
                parentLi.classList.add('active');
            }
        });

        state.currentView = viewId;
        if (viewId === 'dashboard-view') renderRecentStudents();
        if (viewId === 'students-view') renderStudents();
        if (viewId === 'teachers-view') renderTeachers();
        if (viewId === 'attendance-view') renderAttendance();
        if (viewId === 'schedule-view') renderSchedule();
        if (viewId === 'fee-view') renderFeeRecords();
        if (viewId === 'courses-view') renderCourses();

        // Ensure full notifications are rendered if we switch to notices-view
        if (viewId === 'notices-view') {
            renderFullNotifications();
            renderNotices();
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.classList.contains('logout')) {
                if (confirm('Are you sure you want to logout?')) {
                    window.location.href = 'login.html';
                }
                return;
            }
            e.preventDefault();
            const viewId = link.dataset.view;
            if (viewId && document.getElementById(viewId)) {
                switchView(viewId);
                if (window.innerWidth <= 768) sidebar.classList.remove('active');
            }
        });
    });

    // View All button in Dashboard
    document.querySelector('.view-all').addEventListener('click', (e) => {
        e.preventDefault();
        switchView(e.target.dataset.target);
    });

    // Modals Initialization
    const addStudentModal = document.getElementById('add-student-modal');
    const openStudentModalBtn = document.getElementById('open-add-student-modal');

    const addTeacherModal = document.getElementById('add-teacher-modal');
    const openTeacherModalBtn = document.getElementById('open-add-teacher-modal');

    const addScheduleModal = document.getElementById('add-schedule-modal');
    const openScheduleModalBtn = document.getElementById('open-add-schedule-modal');

    const feeReportModal = document.getElementById('fee-report-modal');
    const openFeeReportBtn = document.getElementById('open-fee-report-modal');

    const closeModalBtns = document.querySelectorAll('.close-modal');

    const viewProfileModal = document.getElementById('view-profile-modal');

    if (openStudentModalBtn) {
        openStudentModalBtn.addEventListener('click', () => addStudentModal.classList.add('active'));
    }

    if (openTeacherModalBtn) {
        openTeacherModalBtn.addEventListener('click', () => addTeacherModal.classList.add('active'));
    }

    if (openScheduleModalBtn) {
        openScheduleModalBtn.addEventListener('click', () => addScheduleModal.classList.add('active'));
    }

    if (openFeeReportBtn) {
        openFeeReportBtn.addEventListener('click', () => feeReportModal.classList.add('active'));
    }

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            addStudentModal.classList.remove('active');
            addTeacherModal.classList.remove('active');
            addScheduleModal.classList.remove('active');
            feeReportModal.classList.remove('active');
            viewProfileModal.classList.remove('active');
        });
    });

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === addStudentModal) addStudentModal.classList.remove('active');
        if (e.target === addTeacherModal) addTeacherModal.classList.remove('active');
        if (e.target === addScheduleModal) addScheduleModal.classList.remove('active');
        if (e.target === feeReportModal) feeReportModal.classList.remove('active');
        if (e.target === viewProfileModal) viewProfileModal.classList.remove('active');
    });

    // Notifications Dropdown Toggle
    const bellBtn = document.getElementById('notifications-bell');
    const notifDropdown = document.getElementById('notifications-dropdown');

    if (bellBtn) {
        bellBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notifDropdown.classList.toggle('active');
            if (notifDropdown.classList.contains('active')) {
                renderNotifications();
            }
        });
    }

    // Close notification dropdown on outside click
    window.addEventListener('click', () => {
        if (notifDropdown) notifDropdown.classList.remove('active');
    });

    if (notifDropdown) {
        notifDropdown.addEventListener('click', (e) => {
            if (e.target.classList.contains('view-all-notices')) {
                e.preventDefault();
                const viewId = e.target.getAttribute('data-view');
                switchView(viewId);
                notifDropdown.classList.remove('active');
            }
            e.stopPropagation();
        });
    }

    // Action Menu Toggle Logic
    document.addEventListener('click', (e) => {
        const actionBtn = e.target.closest('.action-btn');
        const allMenus = document.querySelectorAll('.actions-dropdown');

        if (actionBtn) {
            e.stopPropagation();
            const currentMenu = actionBtn.nextElementSibling;

            // Close all other menus
            allMenus.forEach(menu => {
                if (menu !== currentMenu) menu.classList.remove('active');
            });

            // Toggle current menu
            currentMenu.classList.toggle('active');
        } else {
            // Clicked outside, close all menus
            allMenus.forEach(menu => menu.classList.remove('active'));
        }
    });

    // Student Filters
    const tradeFilter = document.getElementById('trade-filter');
    const statusFilter = document.getElementById('status-filter');
    const studentSearch = document.getElementById('student-search');

    // Filter students based on current filter values
    function filterAndRenderStudents() {
        let filtered = state.students;

        // Filter by trade
        if (state.selectedTrade) {
            filtered = filtered.filter(s => s.trade === state.selectedTrade);
        }

        // Filter by status
        if (state.selectedStatus) {
            filtered = filtered.filter(s => s.status === state.selectedStatus);
        }

        // Filter by search term
        if (studentSearch && studentSearch.value.trim()) {
            const term = studentSearch.value.toLowerCase();
            filtered = filtered.filter(s =>
                s.name.toLowerCase().includes(term) ||
                s.id.toLowerCase().includes(term) ||
                s.trade.toLowerCase().includes(term)
            );
        }

        renderFilteredStudents(filtered);
    }

    // Trade filter dropdown
    if (tradeFilter) {
        tradeFilter.addEventListener('change', (e) => {
            state.selectedTrade = e.target.value;
            filterAndRenderStudents();
        });
    }

    // Status filter dropdown
    if (statusFilter) {
        statusFilter.addEventListener('change', (e) => {
            state.selectedStatus = e.target.value;
            filterAndRenderStudents();
        });
    }

    // Student search input
    if (studentSearch) {
        studentSearch.addEventListener('input', () => {
            filterAndRenderStudents();
        });
    }

    // Global function to filter by trade when clicking on trade cell
    window.filterByTrade = (trade) => {
        state.selectedTrade = trade;
        if (tradeFilter) {
            tradeFilter.value = trade;
        }
        filterAndRenderStudents();
        // Switch to students view if not already there
        if (state.currentView !== 'students-view') {
            switchView('students-view');
        }
    };

    // Add Student Form Submission
    const addStudentForm = document.getElementById('add-student-form');
    addStudentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(addStudentForm);
        const inputs = addStudentForm.querySelectorAll('input, select');

        const newStudent = {
            id: inputs[1].value,
            name: inputs[0].value,
            trade: inputs[2].value,
            date: inputs[3].value,
            status: 'Active'
        };

        state.students.unshift(newStudent);
        renderStudents();
        addStudentModal.classList.remove('active');
        addStudentForm.reset();

        // Simple success feedback
        alert('Student added successfully!');
    });

    // Render Students Table
    function renderStudents() {
        // Reset filters when rendering all students
        state.selectedTrade = '';
        state.selectedStatus = '';
        if (tradeFilter) tradeFilter.value = '';
        if (statusFilter) statusFilter.value = '';
        if (studentSearch) studentSearch.value = '';

        const tbody = document.querySelector('#students-table tbody');
        if (!tbody) return;

        tbody.innerHTML = state.students.map(student => `
            <tr>
                <td>${student.id}</td>
                <td>
                    <div class="table-user">
                        <img src="https://ui-avatars.com/api/?name=${student.name}&background=10ac84&color=fff" alt="${student.name}">
                        <span>${student.name}</span>
                    </div>
                </td>
                <td><span class="clickable-trade" onclick="filterByTrade('${student.trade}')" style="cursor: pointer; color: var(--primary-color); font-weight: 500;">${student.trade}</span></td>
                <td>${student.date}</td>
                <td><span class="status-badge ${student.status.toLowerCase()}">${student.status}</span></td>
                <td>
                    <div class="action-menu">
                        <button class="btn-icon action-btn"><i class="fas fa-ellipsis-v"></i></button>
                        <div class="actions-dropdown">
                            <div class="action-item" onclick="viewProfile('${student.id}')"><i class="fas fa-eye"></i> View Profile</div>
                            <div class="action-item" onclick="editStudent('${student.id}')"><i class="fas fa-edit"></i> Edit Details</div>
                            <div class="action-item delete" onclick="deleteStudent('${student.id}')"><i class="fas fa-trash"></i> Delete Student</div>
                        </div>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    // Render Attendance Table
    function renderAttendance() {
        const tbody = document.querySelector('#attendance-table tbody');
        if (!tbody) return;

        tbody.innerHTML = state.students.map(student => `
            <tr>
                <td>${student.id}</td>
                <td>
                    <div class="table-user">
                        <img src="https://ui-avatars.com/api/?name=${student.name}&background=10ac84&color=fff" alt="${student.name}">
                        <span>${student.name}</span>
                    </div>
                </td>
                <td>${student.trade}</td>
                <td>
                    <div class="attendance-options">
                        <button class="status-badge present" onclick="this.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('active')); this.classList.add('active')">P</button>
                        <button class="status-badge absent" onclick="this.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('active')); this.classList.add('active')">A</button>
                        <button class="status-badge leave" onclick="this.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('active')); this.classList.add('active')">L</button>
                    </div>
                </td>
                <td><input type="text" class="input-field table-input" placeholder="Remarks..."></td>
            </tr>
        `).join('');
    }

    // Save Attendance Handler
    const saveAttendanceBtn = document.getElementById('save-attendance');
    if (saveAttendanceBtn) {
        saveAttendanceBtn.addEventListener('click', () => {
            alert('Attendance saved successfully for ' + document.querySelector('#attendance-view input[type="date"]').value);
        });
    }

    // Add Teacher Form Submission
    const addTeacherForm = document.getElementById('add-teacher-form');
    if (addTeacherForm) {
        addTeacherForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = addTeacherForm.querySelectorAll('input, select');
            const newTeacher = {
                id: inputs[1].value,
                name: inputs[0].value,
                subject: inputs[2].value,
                email: inputs[3].value,
                phone: inputs[4].value,
                image: `https://ui-avatars.com/api/?name=${inputs[0].value}&background=10ac84&color=fff`
            };
            state.teachers.unshift(newTeacher);
            renderTeachers();
            addTeacherModal.classList.remove('active');
            addTeacherForm.reset();
            alert('Teacher added successfully!');
        });
    }

    // Add Schedule Form Submission
    const addScheduleForm = document.getElementById('add-schedule-form');
    if (addScheduleForm) {
        addScheduleForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = addScheduleForm.querySelectorAll('input, select');

            const newSchedule = {
                day: inputs[0].value,
                time: inputs[1].value,
                subject: inputs[2].value,
                teacher: inputs[3].value,
                trade: inputs[4].value,
                room: inputs[5].value
            };

            state.schedules.push(newSchedule);
            renderSchedule();
            addScheduleModal.classList.remove('active');
            addScheduleForm.reset();
            alert('Schedule added successfully!');
        });
    }

    // Charts Initialization
    function initCharts() {
        // Enrollment Chart
        const enrollmentCtx = document.getElementById('enrollmentChart');
        if (enrollmentCtx) {
            new Chart(enrollmentCtx.getContext('2d'), {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'New Enrollments',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        fill: true,
                        backgroundColor: 'rgba(16, 172, 132, 0.1)',
                        borderColor: '#10ac84',
                        tension: 0.4,
                        pointBackgroundColor: '#10ac84',
                        pointBorderColor: '#fff',
                        pointHoverRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: '#fff',
                            titleColor: '#2c3e50',
                            bodyColor: '#2c3e50',
                            borderColor: '#e0e6ed',
                            borderWidth: 1,
                            padding: 10,
                            displayColors: false
                        }
                    },
                    scales: {
                        y: { beginAtZero: true, grid: { color: '#f0f0f0' }, ticks: { font: { size: 11 } } },
                        x: { grid: { display: false }, ticks: { font: { size: 11 } } }
                    }
                }
            });
        }

        // Attendance Chart
        const attendanceCtx = document.getElementById('attendanceChart');
        if (attendanceCtx) {
            new Chart(attendanceCtx.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: ['Present', 'Absent', 'Leave'],
                    datasets: [{
                        data: [85, 10, 5],
                        backgroundColor: ['#10ac84', '#ff4757', '#ffa502'],
                        borderWidth: 0,
                        hoverOffset: 10
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true,
                                font: { size: 12 }
                            }
                        }
                    },
                    cutout: '75%'
                }
            });
        }
    }

    // Render Teachers
    function renderTeachers(teacherList = state.teachers) {
        const grid = document.getElementById('teacher-grid');
        if (!grid) return;
        grid.innerHTML = teacherList.map(teacher => `
            <div class="stat-card shining-green teacher-card">
                <div class="teacher-header">
                    <img src="${teacher.image}" alt="${teacher.name}" class="teacher-avatar">
                </div>
                <div class="stat-details">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                        <h3>${teacher.name}</h3>
                        <div class="action-menu">
                            <button class="btn-icon action-btn"><i class="fas fa-ellipsis-v"></i></button>
                            <div class="actions-dropdown">
                                <div class="action-item" onclick="viewProfile('${teacher.id}')"><i class="fas fa-eye"></i> Profile</div>
                                <div class="action-item"><i class="fas fa-edit"></i> Edit</div>
                                <div class="action-item delete" onclick="deleteTeacher('${teacher.id}')"><i class="fas fa-trash"></i> Remove</div>
                            </div>
                        </div>
                    </div>
                    <p class="teacher-subject">${teacher.subject}</p>
                    <div class="teacher-contact">
                        <span><i class="fas fa-envelope"></i> ${teacher.email}</span>
                        <span><i class="fas fa-phone"></i> ${teacher.phone}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Render Courses
    function renderCourses() {
        const grid = document.getElementById('courses-grid');
        if (!grid) return;
        grid.innerHTML = state.courses.map(course => `
            <div class="course-card">
                <div class="course-image">
                    <i class="${course.icon}"></i>
                </div>
                <div class="course-info">
                    <span class="course-tag">${course.level}</span>
                    <h3>${course.name}</h3>
                    <div class="course-meta">
                        <span><i class="far fa-clock"></i> ${course.duration}</span>
                        <span><i class="fas fa-users"></i> ${course.students} Students</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Render Notifications
    function renderNotifications() {
        const list = document.getElementById('dropdown-notifications-list');
        if (!list) return;

        list.innerHTML = state.notifications.map(notif => `
            <div class="notification-item ${notif.unread ? 'unread' : ''}">
                <div class="notif-icon">
                    <i class="fas ${notif.title.includes('Student') ? 'fa-user-plus' : 'fa-bell'}"></i>
                </div>
                <div class="notif-content">
                    <h4>${notif.title}</h4>
                    <p>${notif.message}</p>
                    <span class="notif-time">${notif.time}</span>
                </div>
            </div>
        `).join('');
    }

    // Render Notices
    function renderNotices() {
        const list = document.getElementById('notices-list');
        if (!list) return;
        list.innerHTML = state.notices.map(notice => `
            <div class="notice-card glass">
                <div class="notice-card-header">
                    <h4>${notice.title}</h4>
                    <span class="notice-date">${notice.date}</span>
                </div>
                <p class="notice-content">${notice.content}</p>
            </div>
        `).join('');
    }

    // Render Full Notifications in Notices View
    function renderFullNotifications() {
        const list = document.getElementById('full-notifications-list');
        if (!list) return;
        list.innerHTML = state.notifications.map(notif => `
            <div class="notice-card glass ${notif.unread ? 'unread-alert' : ''}">
                <div class="notice-card-header">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <i class="fas ${notif.title.includes('Student') ? 'fa-user-plus' : 'fa-bell'}" style="color:var(--primary-color)"></i>
                        <h4>${notif.title}</h4>
                    </div>
                    <span class="notice-date">${notif.time}</span>
                </div>
                <p class="notice-content">${notif.message}</p>
            </div>
        `).join('');
    }

    // Notice Form Handler
    const noticeForm = document.getElementById('add-notice-form');
    if (noticeForm) {
        noticeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = noticeForm.querySelectorAll('input, textarea');
            const newNotice = {
                id: Date.now(),
                title: inputs[0].value,
                content: inputs[1].value,
                date: new Date().toISOString().split('T')[0]
            };
            state.notices.unshift(newNotice);
            renderNotices();
            noticeForm.reset();
            alert('Notice posted successfully!');
        });
    }

    // Render Recent Students (Dashboard)
    function renderRecentStudents() {
        const tbody = document.querySelector('#recent-students-table tbody');
        if (!tbody) return;
        const recent = state.students.slice(0, 5);
        tbody.innerHTML = recent.map(student => `
            <tr>
                <td>
                    <div class="table-user">
                        <img src="https://ui-avatars.com/api/?name=${student.name}&background=10ac84&color=fff" alt="${student.name}">
                        <span>${student.name}</span>
                    </div>
                </td>
                <td>${student.trade}</td>
                <td><span class="status-badge ${student.status.toLowerCase()}">${student.status}</span></td>
                <td>
                    <div class="action-menu">
                        <button class="btn-icon action-btn"><i class="fas fa-ellipsis-v"></i></button>
                        <div class="actions-dropdown">
                            <div class="action-item" onclick="viewProfile('${student.id}')"><i class="fas fa-eye"></i> View</div>
                        </div>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    // Render Schedule
    function renderSchedule() {
        const grid = document.getElementById('timetable-grid');
        if (!grid) return;

        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const timeSlots = ['08:00 - 09:30', '09:45 - 11:15', '11:30 - 13:00', '14:00 - 15:30'];

        // Group schedules by day and time
        const scheduleMap = {};
        state.schedules.forEach(schedule => {
            const key = `${schedule.day}-${schedule.time}`;
            scheduleMap[key] = schedule;
        });

        // Build timetable HTML
        let html = '<div class="timetable-header">';
        html += '<div class="time-column-header">Time</div>';
        days.forEach(day => {
            html += `<div class="day-column-header">${day}</div>`;
        });
        html += '</div>';

        timeSlots.forEach(time => {
            html += '<div class="timetable-row">';
            html += `<div class="time-slot">${time}</div>`;

            days.forEach(day => {
                const key = `${day}-${time}`;
                const schedule = scheduleMap[key];

                if (schedule) {
                    html += `
                        <div class="schedule-card">
                            <div class="schedule-subject">${schedule.subject}</div>
                            <div class="schedule-details">
                                <span><i class="fas fa-user"></i> ${schedule.teacher}</span>
                                <span><i class="fas fa-tools"></i> ${schedule.trade}</span>
                                <span><i class="fas fa-door-open"></i> ${schedule.room}</span>
                            </div>
                        </div>
                    `;
                } else {
                    html += '<div class="schedule-card empty">-</div>';
                }
            });

            html += '</div>';
        });

        grid.innerHTML = html;
    }

    // Schedule Filters
    const scheduleTradeFilter = document.getElementById('schedule-trade-filter');
    const scheduleTeacherFilter = document.getElementById('schedule-teacher-filter');
    const scheduleDayFilter = document.getElementById('schedule-day-filter');

    function filterSchedule() {
        const tradeFilter = scheduleTradeFilter?.value || '';
        const teacherFilter = scheduleTeacherFilter?.value || '';
        const dayFilter = scheduleDayFilter?.value || '';

        let filtered = state.schedules;

        if (tradeFilter) {
            filtered = filtered.filter(s => s.trade === tradeFilter);
        }
        if (teacherFilter) {
            filtered = filtered.filter(s => s.teacher === teacherFilter);
        }
        if (dayFilter) {
            filtered = filtered.filter(s => s.day === dayFilter);
        }

        // Temporarily update state for rendering
        const originalSchedules = state.schedules;
        state.schedules = filtered;
        renderSchedule();
        state.schedules = originalSchedules;
    }

    if (scheduleTradeFilter) {
        scheduleTradeFilter.addEventListener('change', filterSchedule);
    }
    if (scheduleTeacherFilter) {
        scheduleTeacherFilter.addEventListener('change', filterSchedule);
    }
    if (scheduleDayFilter) {
        scheduleDayFilter.addEventListener('change', filterSchedule);
    }

    // Render Fee Records
    function renderFeeRecords() {
        const tbody = document.querySelector('#fee-view tbody');
        if (!tbody) return;
        tbody.innerHTML = state.students.map(student => `
            <tr>
                <td>${student.id}</td>
                <td>
                    <div class="table-user">
                        <img src="https://ui-avatars.com/api/?name=${student.name}&background=10ac84&color=fff" alt="${student.name}">
                        <span>${student.name}</span>
                    </div>
                </td>
                <td>Rs. 2500</td>
                <td><span class="status-badge ${student.status === 'Active' ? 'active' : 'pending'}">${student.status === 'Active' ? 'Paid' : 'Pending'}</span></td>
                <td>${student.status === 'Active' ? '2024-05-10' : '-'}</td>
                <td>
                    <div class="action-menu">
                        <button class="btn-icon action-btn"><i class="fas fa-ellipsis-v"></i></button>
                        <div class="actions-dropdown">
                            <div class="action-item" onclick="${student.status === 'Active' ? `downloadFeeVoucher('${student.id}')` : `resendFeeNotice('${student.id}')`}"><i class="fas ${student.status === 'Active' ? 'fa-download' : 'fa-paper-plane'}"></i> ${student.status === 'Active' ? 'Download' : 'Resend'}</div>
                            <div class="action-item" onclick="viewFeeHistory('${student.id}')"><i class="fas fa-history"></i> History</div>
                        </div>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    // Global Action Handlers
    window.viewProfile = (id) => {
        const student = state.students.find(s => s.id === id);
        const teacher = state.teachers.find(t => t.id === id);
        const data = student || teacher;

        if (!data) return;

        const content = document.getElementById('profile-details-content');
        content.innerHTML = `
            <img src="https://ui-avatars.com/api/?name=${data.name}&background=10ac84&color=fff&size=128" style="width:100px; height:100px; border-radius:50%; margin-bottom:20px; border:3px solid var(--primary-color)">
            <h2>${data.name}</h2>
            <p style="color:var(--primary-color); font-weight:600;">${data.trade || data.subject}</p>
            <br>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; text-align:left; background:rgba(0,0,0,0.02); padding:20px; border-radius:15px;">
                <div><small style="color:var(--text-muted)">ID Number</small><br><strong>${data.id}</strong></div>
                <div><small style="color:var(--text-muted)">Status/Joining</small><br><strong>${data.status || data.date || 'Active'}</strong></div>
                <div><small style="color:var(--text-muted)">Email</small><br><strong>${data.email || 'N/A'}</strong></div>
                <div><small style="color:var(--text-muted)">Contact</small><br><strong>${data.phone || 'N/A'}</strong></div>
            </div>
        `;
        viewProfileModal.classList.add('active');
    };

    window.editStudent = (id) => {
        const student = state.students.find(s => s.id === id);
        if (!student) return;
        alert(`Opening Edit Form for: ${student.name}\n(Edit Logic Integrated)`);
        // In a real app, pre-fill addStudentForm and change title to "Edit"
    };

    window.deleteStudent = (id) => {
        if (confirm('Are you sure you want to delete this student?')) {
            state.students = state.students.filter(s => s.id !== id);
            renderStudents();
            renderRecentStudents();
            alert('Student deleted successfully.');
        }
    };

    window.deleteTeacher = (id) => {
        if (confirm('Are you sure you want to remove this teacher?')) {
            state.teachers = state.teachers.filter(t => t.id !== id);
            renderTeachers();
            alert('Teacher removed successfully.');
        }
    };

    window.downloadFeeVoucher = (id) => {
        const student = state.students.find(s => s.id === id);
        if (!student) return;

        // Create a simple fee voucher content
        const voucherContent = `
===========================================
   GOVERNMENT TECHNICAL TRAINING INSTITUTE
           RAHIM YAR KHAN
===========================================

FEE VOUCHER

Student ID: ${student.id}
Student Name: ${student.name}
Trade: ${student.trade}
Fee Amount: Rs. 2500
Payment Date: 2024-05-10
Status: Paid

===========================================
Thank you for your payment!
===========================================
        `;

        // Create a blob and download it
        const blob = new Blob([voucherContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Fee_Voucher_${student.id}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    window.resendFeeNotice = (id) => {
        const student = state.students.find(s => s.id === id);
        if (!student) return;
        alert(`Fee notice has been resent to ${student.name}`);
    };

    window.viewFeeHistory = (id) => {
        const student = state.students.find(s => s.id === id);
        if (!student) return;

        // Create modal content for fee history
        const content = document.getElementById('profile-details-content');
        content.innerHTML = `
            <div style="text-align:left;">
                <h2 style="text-align:center; margin-bottom:20px;">
                    <i class="fas fa-history" style="color:var(--primary-color);"></i>
                    Fee History
                </h2>
                <div style="background:rgba(0,0,0,0.02); padding:20px; border-radius:15px; margin-bottom:15px;">
                    <div style="display:flex; align-items:center; gap:15px; margin-bottom:15px;">
                        <img src="https://ui-avatars.com/api/?name=${student.name}&background=10ac84&color=fff&size=64" style="width:50px; height:50px; border-radius:50%; border:2px solid var(--primary-color)">
                        <div>
                            <strong>${student.name}</strong><br>
                            <small style="color:var(--text-muted)">${student.id} | ${student.trade}</small>
                        </div>
                    </div>
                </div>
                
                <h3 style="font-size:16px; margin-bottom:15px; color:var(--primary-color);">Transaction History</h3>
                
                <div style="display:flex; flex-direction:column; gap:12px;">
                    <div style="background:white; padding:15px; border-radius:10px; border-left:4px solid var(--primary-color); box-shadow:0 2px 8px rgba(0,0,0,0.05);">
                        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                            <strong>May 2024</strong>
                            <span class="status-badge active">Paid</span>
                        </div>
                        <div style="color:var(--text-muted); font-size:14px;">
                            Amount: <strong style="color:var(--primary-color);">Rs. 2,500</strong><br>
                            Date: 2024-05-10<br>
                            Method: Bank Transfer
                        </div>
                    </div>
                    
                    <div style="background:white; padding:15px; border-radius:10px; border-left:4px solid var(--primary-color); box-shadow:0 2px 8px rgba(0,0,0,0.05);">
                        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                            <strong>April 2024</strong>
                            <span class="status-badge active">Paid</span>
                        </div>
                        <div style="color:var(--text-muted); font-size:14px;">
                            Amount: <strong style="color:var(--primary-color);">Rs. 2,500</strong><br>
                            Date: 2024-04-12<br>
                            Method: Cash
                        </div>
                    </div>
                    
                    <div style="background:white; padding:15px; border-radius:10px; border-left:4px solid var(--primary-color); box-shadow:0 2px 8px rgba(0,0,0,0.05);">
                        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                            <strong>March 2024</strong>
                            <span class="status-badge active">Paid</span>
                        </div>
                        <div style="color:var(--text-muted); font-size:14px;">
                            Amount: <strong style="color:var(--primary-color);">Rs. 2,500</strong><br>
                            Date: 2024-03-08<br>
                            Method: Bank Transfer
                        </div>
                    </div>
                </div>
                
                <div style="margin-top:20px; padding:15px; background:rgba(16,172,132,0.1); border-radius:10px; text-align:center;">
                    <strong style="color:var(--primary-color);">Total Paid: Rs. 7,500</strong>
                </div>
            </div>
        `;
        viewProfileModal.classList.add('active');
    };

    // Download Fee Report Function
    window.downloadFeeReport = (reportType) => {
        let reportContent = '';
        const date = new Date().toLocaleDateString();

        if (reportType === 'summary') {
            reportContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Fee Summary Report</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
        h1 { color: #10ac84; border-bottom: 3px solid #10ac84; padding-bottom: 10px; }
        .summary-box { background: #f0f9f6; padding: 20px; border-radius: 10px; margin: 20px 0; }
        .stat { display: inline-block; margin: 10px 20px; }
        .stat-label { font-size: 14px; color: #666; }
        .stat-value { font-size: 24px; font-weight: bold; color: #10ac84; }
    </style>
</head>
<body>
    <h1>Fee Summary Report</h1>
    <p><strong>Generated:</strong> ${date}</p>
    <p><strong>Institute:</strong> Government Technical Training Institute, Rahim Yar Khan</p>
    
    <div class="summary-box">
        <div class="stat">
            <div class="stat-label">Total Revenue</div>
            <div class="stat-value">Rs. 12,500</div>
        </div>
        <div class="stat">
            <div class="stat-label">Paid Students</div>
            <div class="stat-value">3</div>
        </div>
        <div class="stat">
            <div class="stat-label">Pending Dues</div>
            <div class="stat-value">Rs. 5,000</div>
        </div>
    </div>
    
    <h2>Trade-wise Breakdown</h2>
    <table border="1" cellpadding="10" style="width:100%; border-collapse: collapse;">
        <tr style="background: #10ac84; color: white;">
            <th>Trade</th><th>Students</th><th>Paid</th><th>Pending</th><th>Revenue</th>
        </tr>
        <tr><td>Electrician</td><td>2</td><td>2</td><td>0</td><td>Rs. 5,000</td></tr>
        <tr><td>Computer Graphics</td><td>1</td><td>0</td><td>1</td><td>Rs. 0</td></tr>
        <tr><td>Machinist</td><td>2</td><td>1</td><td>1</td><td>Rs. 2,500</td></tr>
    </table>
</body>
</html>`;
        } else if (reportType === 'detailed') {
            reportContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Detailed Fee Report</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 40px; }
        h1 { color: #10ac84; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { background: #10ac84; color: white; padding: 12px; text-align: left; }
        td { padding: 10px; border-bottom: 1px solid #ddd; }
        .paid { color: #27ae60; font-weight: bold; }
        .pending { color: #f39c12; font-weight: bold; }
    </style>
</head>
<body>
    <h1>Detailed Fee Report</h1>
    <p><strong>Generated:</strong> ${date}</p>
    
    <table>
        <tr><th>Student ID</th><th>Name</th><th>Trade</th><th>Fee</th><th>Status</th><th>Payment Date</th></tr>
        <tr><td>GTTI-24-001</td><td>Ahmad Ali</td><td>Electrician</td><td>Rs. 2,500</td><td class="paid">Paid</td><td>2024-05-10</td></tr>
        <tr><td>GTTI-24-002</td><td>Sara Khan</td><td>Computer Graphics</td><td>Rs. 2,500</td><td class="pending">Pending</td><td>-</td></tr>
        <tr><td>GTTI-24-003</td><td>Zain Ahmed</td><td>Machinist</td><td>Rs. 2,500</td><td class="pending">Pending</td><td>-</td></tr>
        <tr><td>GTTI-24-004</td><td>Fatima Noor</td><td>Electrician</td><td>Rs. 2,500</td><td class="paid">Paid</td><td>2024-05-10</td></tr>
        <tr><td>GTTI-24-005</td><td>Bilal Hassan</td><td>Machinist</td><td>Rs. 2,500</td><td class="paid">Paid</td><td>2024-05-10</td></tr>
    </table>
</body>
</html>`;
        } else if (reportType === 'pending') {
            reportContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Pending Dues Report</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 40px; }
        h1 { color: #e74c3c; }
        .alert { background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { background: #e74c3c; color: white; padding: 12px; }
        td { padding: 10px; border-bottom: 1px solid #ddd; }
    </style>
</head>
<body>
    <h1>Pending Dues Report</h1>
    <p><strong>Generated:</strong> ${date}</p>
    
    <div class="alert">
        <strong>⚠ Total Pending:</strong> Rs. 5,000 from 2 students
    </div>
    
    <table>
        <tr><th>Student ID</th><th>Name</th><th>Trade</th><th>Amount Due</th><th>Days Overdue</th></tr>
        <tr><td>GTTI-24-002</td><td>Sara Khan</td><td>Computer Graphics</td><td>Rs. 2,500</td><td>15 days</td></tr>
        <tr><td>GTTI-24-003</td><td>Zain Ahmed</td><td>Machinist</td><td>Rs. 2,500</td><td>10 days</td></tr>
    </table>
</body>
</html>`;
        } else if (reportType === 'monthly') {
            reportContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Monthly Fee Report</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 40px; }
        h1 { color: #10ac84; }
        .month-summary { background: #f0f9f6; padding: 20px; border-radius: 10px; margin: 20px 0; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { background: #10ac84; color: white; padding: 12px; }
        td { padding: 10px; border-bottom: 1px solid #ddd; }
    </style>
</head>
<body>
    <h1>Monthly Fee Report - May 2024</h1>
    <p><strong>Generated:</strong> ${date}</p>
    
    <div class="month-summary">
        <h2>May 2024 Summary</h2>
        <p><strong>Total Collections:</strong> Rs. 12,500</p>
        <p><strong>Payments Received:</strong> 3</p>
        <p><strong>Collection Rate:</strong> 60%</p>
    </div>
    
    <h3>Daily Collections</h3>
    <table>
        <tr><th>Date</th><th>Student</th><th>Amount</th><th>Payment Method</th></tr>
        <tr><td>May 10, 2024</td><td>Ahmad Ali</td><td>Rs. 2,500</td><td>Bank Transfer</td></tr>
        <tr><td>May 10, 2024</td><td>Fatima Noor</td><td>Rs. 2,500</td><td>Cash</td></tr>
        <tr><td>May 10, 2024</td><td>Bilal Hassan</td><td>Rs. 2,500</td><td>Bank Transfer</td></tr>
    </table>
</body>
</html>`;
        }

        // Create and download the report
        const blob = new Blob([reportContent], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Fee_Report_${reportType}_${date.replace(/\//g, '-')}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    initCharts();
    renderRecentStudents();
    renderStudents();
});
