// Database Simulation
let complaints = [
    { id: 101, category: "Water Supply", description: "Main pipe burst", status: "Pending" }
];

// Navigation Function
function showView(viewId) {
    // Hide all containers
    const containers = document.querySelectorAll('.container');
    containers.forEach(c => c.classList.add('hidden'));

    // Show the selected container
    const target = document.getElementById(viewId);
    if (target) {
        target.classList.remove('hidden');
    }

    // Refresh data when entering dashboards
    if (viewId === 'admin-dashboard') renderAdminTable();
    if (viewId === 'citizen-dashboard') renderUserList();
}

// Admin Login
function adminLogin() {
    const pin = document.getElementById('admin-pass').value;
    if (pin === "1234") {
        showView('admin-dashboard');
    } else {
        alert("Access Denied: Invalid PIN");
    }
}

// Handle Complaint Submission
document.getElementById('complaint-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newEntry = {
        id: Math.floor(Math.random() * 899) + 100,
        category: document.getElementById('category').value,
        description: document.getElementById('description').value,
        status: "Pending"
    };

    complaints.push(newEntry);
    alert("Complaint Submitted to Authority.");
    this.reset();
    renderUserList();
});

// Render Admin View
function renderAdminTable() {
    const tableBody = document.getElementById('admin-table-body');
    const countDisplay = document.getElementById('total-count');
    
    tableBody.innerHTML = "";
    countDisplay.innerText = complaints.length;

    complaints.forEach((item, index) => {
        const row = `
            <tr>
                <td>#${item.id}</td>
                <td>${item.category}</td>
                <td class="status-${item.status.toLowerCase()}">${item.status}</td>
                <td>
                    ${item.status === "Pending" ? 
                    `<button style="padding:5px; font-size:10px" onclick="resolveIssue(${index})">Resolve</button>` : 
                    "Fixed"}
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Render Citizen History
function renderUserList() {
    const list = document.getElementById('my-list');
    list.innerHTML = "";
    complaints.forEach(item => {
        const li = document.createElement('li');
        li.style.fontSize = "0.85rem";
        li.style.marginBottom = "5px";
        li.innerHTML = `<strong>#${item.id}</strong> - ${item.category} [${item.status}]`;
        list.appendChild(li);
    });
}

// Mark as Resolved
function resolveIssue(index) {
    complaints[index].status = "Resolved";
    renderAdminTable();
}