// Database Simulation
let complaints = [
    { id: 701, category: "Infrastructure", description: "Street light flickering near Library", status: "Pending" }
];

// Navigation Engine
function showView(viewId) {
    // Hide all containers using Tailwind's hidden class
    const views = document.querySelectorAll('.view-container');
    views.forEach(view => view.classList.add('hidden'));

    // Show selected view
    const target = document.getElementById(viewId);
    if (target) {
        target.classList.remove('hidden');
    }

    // Refresh tables if moving to dashboards
    if (viewId === 'admin-dashboard') renderAdminTable();
    if (viewId === 'citizen-dashboard') renderUserList();
}

// Admin Identity Verification
function adminLogin() {
    const pin = document.getElementById('admin-pass').value;
    if (pin === "1234") {
        showView('admin-dashboard');
    } else {
        alert("ACCESS DENIED: Incorrect Security PIN");
    }
}

// Citizen Submission Logic
document.getElementById('complaint-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newEntry = {
        id: Math.floor(Math.random() * 899) + 100,
        category: document.getElementById('category').value,
        description: document.getElementById('description').value,
        status: "Pending"
    };

    complaints.push(newEntry);
    alert("System: Report synchronized to central database.");
    this.reset();
    renderUserList();
});

// Render the Administrative Command Center
function renderAdminTable() {
    const tableBody = document.getElementById('admin-table-body');
    const countDisplay = document.getElementById('total-count');
    
    tableBody.innerHTML = "";
    countDisplay.innerText = complaints.length;

    complaints.forEach((item, index) => {
        const row = `
            <tr class="border-b border-white/5 hover:bg-white/5 transition">
                <td class="p-4 font-mono text-blue-400">#${item.id}</td>
                <td class="p-4">${item.category}</td>
                <td class="p-4">
                    <span class="status-${item.status.toLowerCase()} font-bold text-xs uppercase">
                        ${item.status}
                    </span>
                </td>
                <td class="p-4">
                    ${item.status === "Pending" ? 
                    `<button onclick="resolveIssue(${index})" class="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded border border-emerald-500/30 hover:bg-emerald-500 hover:text-white transition text-xs">Resolve</button>` : 
                    "Verified"}
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Render Citizen History List
function renderUserList() {
    const list = document.getElementById('my-list');
    list.innerHTML = "";
    complaints.forEach(item => {
        const li = document.createElement('li');
        li.className = "bg-white/5 p-3 rounded-lg flex justify-between";
        li.innerHTML = `<span><strong>#${item.id}</strong>: ${item.category}</span> <span class="status-${item.status.toLowerCase()}">${item.status}</span>`;
        list.appendChild(li);
    });
}

// Administrative Action
function resolveIssue(index) {
    complaints[index].status = "Resolved";
    renderAdminTable();
}