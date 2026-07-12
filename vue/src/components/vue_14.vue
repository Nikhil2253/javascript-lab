<script setup>
import { ref, computed, onMounted } from "vue";

// ==============================
// 1. What is an API?
// ==============================
// What: An API (Application Programming Interface) is a contract
// that lets two programs talk to each other. In web apps, the
// CLIENT (this Vue app, running in the browser) sends a REQUEST
// to a SERVER (here, JSONPlaceholder's servers), and the server
// sends back a RESPONSE - usually as JSON (JavaScript Object
// Notation), a lightweight text format both sides can read.
// Why: without an API, the frontend would have no way to read or
// change data that lives on a server/database.
// When: any time your app needs data it doesn't already have, or
// needs to save/change/delete data somewhere else.
// REST vs GraphQL (briefly):
// - REST: multiple fixed endpoints (/users, /posts), each returns
//   a fixed shape of data, uses standard HTTP methods.
// - GraphQL: ONE endpoint, the CLIENT describes exactly which
//   fields it wants in a query, server returns only that shape.
// This file uses REST, since JSONPlaceholder is a REST API.
const API_BASE = "https://jsonplaceholder.typicode.com";
// Best practice note: in a real project this base URL would come
// from an environment variable (import.meta.env.VITE_API_BASE),
// not be hardcoded - see Best Practices section near the bottom.

// ==============================
// 2. HTTP Methods
// ==============================
// GET    -> read/fetch data, no side effects (fetch users list)
// POST   -> create a NEW resource (add a new user)
// PUT    -> replace an ENTIRE existing resource (update all fields)
// PATCH  -> update only SOME fields of an existing resource
// DELETE -> remove a resource
// Each one below is demonstrated against JSONPlaceholder, which
// is a fake/dummy API - it accepts these requests and responds
// realistically, but does not actually persist changes.

// ==============================
// State
// ==============================
const users = ref([]); // holds the fetched user list
const loading = ref(false); // true while a request is in progress
const error = ref(null); // holds an error message, or null
const searchQuery = ref(""); // bound to the search input

// ==============================
// 3. fetch()
// ==============================
// What: fetch() is the browser's built-in function for making
// HTTP requests. It returns a Promise, so it pairs naturally
// with async/await.
// Why: no install needed, works everywhere fetch is supported.
// When: fine for simple apps or when you want zero dependencies.
const fetchUsers = async () => {
    loading.value = true; // 1. show the loading state immediately
    error.value = null; // 2. clear any previous error before retrying
    try {
        // 3. fetch() sends the GET request and returns a Promise
        //    that resolves once the response headers arrive.
        const response = await fetch(`${API_BASE}/users`);

        // 4. fetch() does NOT throw on 404/500 - it only rejects on
        //    network failure. We must check response.ok ourselves.
        if (!response.ok) {
            throw new Error("Failed to fetch users (" + response.status + ")");
        }

        // 5. .json() reads the response body and parses it as JSON.
        //    This is also async, since the body streams in.
        const data = await response.json();

        // 6. Store the parsed array in our reactive state.
        users.value = data;
    } catch (err) {
        // 7. Any thrown error (network failure or our manual throw
        //    above) lands here.
        error.value = err.message;
    } finally {
        // 8. finally() ALWAYS runs, whether the try succeeded or
        //    the catch ran. It's the correct place to turn loading
        //    off, so it never gets stuck true on an error path.
        loading.value = false;
    }
};

// ==============================
// 4. Axios
// ==============================
// Install command (NOT run here): npm install axios
// Why many teams prefer Axios over fetch():
// - Automatically parses JSON (no manual .json() call)
// - Automatically rejects the Promise on HTTP error status codes
// - Built-in request/response interceptors (e.g. attach auth
//   tokens to every request in one place)
// - Built-in request timeout support
// - Built-in request cancellation (AbortController wired in)
// - Simpler request configuration object (baseURL, headers, etc.)
//
// Example only (axios is not installed/imported in this file):
//
// import axios from "axios";
// const fetchUsersWithAxios = async () => {
//     loading.value = true;
//     error.value = null;
//     try {
//         const response = await axios.get(`${API_BASE}/users`);
//         users.value = response.data; // already parsed JSON
//     } catch (err) {
//         error.value = err.message;
//     } finally {
//         loading.value = false;
//     }
// };

// ==============================
// 7. onMounted()
// ==============================
// What: onMounted() runs once, right after the component is
// first rendered to the DOM.
// Why: it's the standard place to trigger an initial data fetch -
// the component exists and is ready to display results by the
// time the request resolves.
// When: any "load data as soon as this screen opens" scenario.
// React comparison: useEffect(() => { fetchData(); }, [])
// An empty dependency array in React means "run once on mount",
// which is exactly what onMounted() does in Vue - no array needed.
onMounted(() => {
    fetchUsers();
});

// ==============================
// 9. POST Request
// ==============================
// What: sends a new resource to the server.
// Why: used for "create" actions - adding a new user, post, order.
// JSONPlaceholder doesn't really save it, but responds as if it did,
// including a fake new id, so we can inspect the response shape.
const addUser = async () => {
    try {
        const response = await fetch(`${API_BASE}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: "New Dummy User",
                email: "dummy.user@example.com"
            })
        });
        const data = await response.json();
        console.log("POST response:", data);
        alert("User added (dummy). New id from server: " + data.id);
    } catch (err) {
        error.value = err.message;
    }
};

// ==============================
// 10. PUT Request
// ==============================
// What: PUT REPLACES the entire resource with the data you send.
// Why: use when you're sending the full, complete object - any
// field you omit is expected to be wiped out on a real server.
const updateUser = async () => {
    const targetId = users.value[0]?.id ?? 1;
    try {
        const response = await fetch(`${API_BASE}/users/${targetId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: targetId,
                name: "Fully Updated Name",
                email: "updated.user@example.com",
                phone: "000-000-0000"
            })
        });
        const data = await response.json();
        console.log("PUT response:", data);
        alert("User replaced (dummy): " + data.name);
    } catch (err) {
        error.value = err.message;
    }
};

// ==============================
// 11. PATCH Request
// ==============================
// What: PATCH updates ONLY the fields you send, everything else
// on the resource stays untouched.
// Why: use for partial edits, e.g. changing just an email address
// without resending the whole user object.
const patchUser = async () => {
    const targetId = users.value[0]?.id ?? 1;
    try {
        const response = await fetch(`${API_BASE}/users/${targetId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "Patched Name Only" })
        });
        const data = await response.json();
        console.log("PATCH response:", data);
        alert("User patched (dummy): " + data.name);
    } catch (err) {
        error.value = err.message;
    }
};

// ==============================
// 12. DELETE Request
// ==============================
// What: DELETE removes a resource from the server.
// Why: used for "remove" actions. On success, we also remove it
// from our local `users` list so the UI reflects the change.
const deleteUser = async (id) => {
    try {
        await fetch(`${API_BASE}/users/${id}`, { method: "DELETE" });
        users.value = users.value.filter((user) => user.id !== id);
        alert("User deleted (dummy, id: " + id + ")");
    } catch (err) {
        error.value = err.message;
    }
};

// ==============================
// 13. Refresh Data
// ==============================
// What: simply re-runs the same GET request.
// Why: lets the user manually re-sync the list, e.g. after
// something may have changed on the server.
const refreshData = () => {
    fetchUsers();
};

// ==============================
// 14. Search Users
// ==============================
// What: a computed() that filters `users` by the current
// `searchQuery`, matched against each user's name.
// Why: computed() re-runs automatically whenever `users` or
// `searchQuery` changes, so the list filters live as you type -
// no manual event wiring needed beyond v-model on the input.
const filteredUsers = computed(() => {
    const query = searchQuery.value.trim().toLowerCase();
    if (query === "") return users.value;
    return users.value.filter((user) =>
        user.name.toLowerCase().includes(query)
    );
});

// ==============================
// 17. API Summary Card
// ==============================
// Simple computed values to summarize current API state on screen.
const totalUsers = computed(() => users.value.length);
const loadingStatus = computed(() => (loading.value ? "In Progress" : "Idle"));
const errorStatus = computed(() => (error.value ? "Error" : "None"));

// ==============================
// 18. fetch() vs Axios
// ==============================
// | Feature               | fetch()                  | Axios                     |
// |------------------------|---------------------------|----------------------------|
// | JSON parsing           | Manual: await res.json()  | Automatic: response.data   |
// | Rejects on HTTP error  | No, only network failure  | Yes, on 4xx/5xx by default |
// | Interceptors           | Not built-in               | Built-in                   |
// | Timeout                | Manual (AbortController)  | Built-in `timeout` option  |
// | Cancellation            | Manual (AbortController)  | Built-in cancel tokens     |
// | Request configuration  | Options object per call   | Reusable instance config   |
// | Install needed          | No, native to browser     | Yes, npm install axios     |

// ==============================
// 19. React Comparison
// ==============================
// React                          Vue
// -----                          ---
// useEffect(() => {}, [])   -->  onMounted()
// fetch() inside effect     -->  fetch() inside onMounted()
// useState() for data       -->  ref() for data
// useState() for loading    -->  ref() for loading
// useMemo() for filtering   -->  computed() for filtering

// ==============================
// 20. Best Practices
// ==============================
// - Separate API logic into composables/services in real projects
//   (this file keeps it inline only because the task requires ONE file)
// - Reuse API functions instead of duplicating fetch calls
// - Always track loading and error state per request
// - Avoid duplicate/overlapping requests (e.g. disable a button
//   while its own request is still in flight)
// - Never hardcode URLs in multiple places - use one base constant
//   or, better, environment variables (import.meta.env.VITE_API_BASE)

// ==============================
// 21. Interview Questions
// ==============================
// Q: What is an API?
// A: A contract that lets a client and server exchange data over
//    requests and responses, usually as JSON.
//
// Q: Difference between GET and POST?
// A: GET reads data and has no side effects; POST creates a new
//    resource and does have a side effect on the server.
//
// Q: Difference between PUT and PATCH?
// A: PUT replaces the entire resource; PATCH updates only the
//    fields included in the request.
//
// Q: Why use async/await?
// A: It lets asynchronous Promise-based code read like synchronous
//    code, top to bottom, instead of chaining .then() callbacks.
//
// Q: Why use onMounted()?
// A: It guarantees the component is in the DOM before triggering
//    an initial fetch, matching React's useEffect(fn, []).
//
// Q: fetch vs Axios?
// A: fetch is native and lightweight; Axios adds automatic JSON
//    parsing, interceptors, timeouts, and cleaner error handling
//    at the cost of an extra dependency.
//
// Q: What is CRUD?
// A: Create, Read, Update, Delete - the four basic data operations,
//    mapped to POST, GET, PUT/PATCH, DELETE.
//
// Q: What is REST?
// A: An architectural style for APIs using standard HTTP methods
//    and URLs (resources) to represent and manipulate data.
//
// Q: How do you handle API errors?
// A: Wrap the request in try/catch, check response.ok for fetch,
//    store a user-facing error message, and always reset loading
//    state in a finally block.

// ==============================
// 24. Summary
// ==============================
// API
//   |
// HTTP Methods
//   |
// fetch()
//   |
// Axios
//   |
// Loading
//   |
// Error Handling
//   |
// CRUD
//   |
// Display Data
//   |
// Best Practices
</script>

<template>
<div class="page">
    <h1>Vue API Calls - Users</h1>

    <!-- ============================== -->
    <!-- 17. API Summary Card -->
    <!-- ============================== -->
    <div class="summary-card">
        <div class="summary-item">
            <span class="summary-label">Total Users</span>
            <span class="summary-value">{{ totalUsers }}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Loading Status</span>
            <span class="summary-value">{{ loadingStatus }}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Error Status</span>
            <span class="summary-value" :class="{ 'has-error': error }">{{ errorStatus }}</span>
        </div>
    </div>

    <!-- ============================== -->
    <!-- CRUD action buttons -->
    <!-- ============================== -->
    <div class="actions">
        <button class="btn btn-primary" @click="refreshData">Refresh</button>
        <button class="btn btn-add" @click="addUser">Add User (POST)</button>
        <button class="btn btn-update" @click="updateUser">Update User (PUT)</button>
        <button class="btn btn-patch" @click="patchUser">Patch User (PATCH)</button>
    </div>

    <!-- ============================== -->
    <!-- 14. Search Users -->
    <!-- ============================== -->
    <div class="search-box">
        <input
            type="text"
            v-model="searchQuery"
            placeholder="Search users by name..."
        />
    </div>

    <!-- ============================== -->
    <!-- 6. Error Handling (UI) -->
    <!-- ============================== -->
    <p class="error-banner" v-if="error">{{ error }}</p>

    <!-- ============================== -->
    <!-- 5 & 15. Loading State / Spinner -->
    <!-- ============================== -->
    <div class="loading-box" v-if="loading">
        <div class="spinner"></div>
        <p>Loading...</p>
    </div>

    <!-- ============================== -->
    <!-- 16. Empty State -->
    <!-- ============================== -->
    <p class="empty-state" v-else-if="filteredUsers.length === 0">
        No Users Found
    </p>

    <!-- ============================== -->
    <!-- 8. Display Data -->
    <!-- ============================== -->
    <div class="user-grid" v-else>
        <div class="user-card" v-for="user in filteredUsers" :key="user.id">
            <h3>{{ user.name }}</h3>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <p><strong>Phone:</strong> {{ user.phone }}</p>
            <p><strong>Website:</strong> {{ user.website }}</p>
            <p><strong>Company:</strong> {{ user.company?.name }}</p>
            <button class="btn btn-delete" @click="deleteUser(user.id)">
                Delete
            </button>
        </div>
    </div>
</div>
</template>

<style scoped>
.page {
    max-width: 1100px;
    margin: 0 auto;
    padding: 32px 20px;
    font-family: system-ui, sans-serif;
    color: #1e293b;
}

h1 {
    text-align: center;
    margin-bottom: 24px;
}

/* Summary card */
.summary-card {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
    background: #ffffff;
    border-radius: 12px;
    padding: 16px 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
    margin-bottom: 20px;
}

.summary-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 120px;
}

.summary-label {
    font-size: 12px;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.summary-value {
    font-size: 18px;
    font-weight: 700;
    color: #1e293b;
}

.summary-value.has-error {
    color: #dc2626;
}

/* Action buttons */
.actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    margin-bottom: 16px;
}

.btn {
    border: none;
    border-radius: 8px;
    padding: 9px 16px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    color: #ffffff;
    transition: opacity 0.2s ease;
}

.btn:hover {
    opacity: 0.85;
}

.btn-primary { background: #6366f1; }
.btn-add { background: #16a34a; }
.btn-update { background: #f59e0b; }
.btn-patch { background: #0ea5e9; }
.btn-delete {
    background: #dc2626;
    margin-top: 10px;
    width: 100%;
}

/* Search box */
.search-box {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.search-box input {
    width: 100%;
    max-width: 360px;
    padding: 10px 14px;
    border-radius: 999px;
    border: 1px solid #cbd5e1;
    font-size: 14px;
    outline: none;
}

.search-box input:focus {
    border-color: #6366f1;
}

/* Error banner */
.error-banner {
    background: #fee2e2;
    color: #b91c1c;
    padding: 10px 14px;
    border-radius: 8px;
    text-align: center;
    margin-bottom: 16px;
}

/* Loading */
.loading-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 40px 0;
    color: #64748b;
}

.spinner {
    width: 32px;
    height: 32px;
    border: 4px solid #e2e8f0;
    border-top-color: #6366f1;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

/* Empty state */
.empty-state {
    text-align: center;
    padding: 40px 0;
    color: #94a3b8;
    font-size: 16px;
}

/* User grid */
.user-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
}

.user-card {
    background: #ffffff;
    border-radius: 12px;
    padding: 18px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
}

.user-card h3 {
    margin: 0 0 10px 0;
    color: #1e293b;
}

.user-card p {
    margin: 4px 0;
    font-size: 14px;
    color: #475569;
}

/* Responsive */
@media (max-width: 600px) {
    .actions {
        flex-direction: column;
    }
    .btn {
        width: 100%;
    }
}
</style>