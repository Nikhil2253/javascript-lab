<script setup>
import { reactive, computed } from "vue";

// ==============================
// 1. Basic HTML Form
// ==============================
// What: <form> groups all inputs together and lets us handle
// submission as one event instead of listening on every button.
// Why: @submit.prevent stops the browser's default form submit,
// which would otherwise reload the page.
// When: use this on every form that should be handled by JS
// instead of a real HTTP page navigation.
// React comparison: React uses <form onSubmit={handleSubmit}>
// and calls event.preventDefault() manually inside the handler.
// Vue's .prevent modifier does that for you declaratively.

// ==============================
// 2. v-model
// ==============================
// What: v-model creates TWO-WAY data binding between an input
// and a reactive property - typing in the input updates the
// data, and changing the data updates the input.
// Why: without it you'd need :value + @input on every field.
// When: use on any form control (text, textarea, select, radio,
// checkbox) that needs to read AND write reactive state.
// React comparison: v-model = value={state} + onChange={setState}
// combined into one directive.
const form = reactive({
    name: "",
    email: "",
    password: "",
    age: null,
    bio: "",
    country: "",
    gender: "",
    terms: false,
    skills: [] // 7. Multiple Checkboxes -> holds selected skill strings
});

// ==============================
// 9. Computed Validation
// ==============================
// What: computed() derives validation state from the form data.
// Why: it automatically re-evaluates whenever any form field
// changes, so error messages and the submit button stay in sync
// without manually re-checking on every keystroke.
// When: use computed() for anything DERIVED from state (validity,
// totals, filtered lists) instead of storing it as separate state.
// React comparison: same idea as useMemo(() => ..., [deps]),
// except Vue tracks dependencies automatically - no deps array.
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const errors = computed(() => ({
    name: form.name.trim() === "" ? "Name is required." : "",
    email:
        form.email.trim() === ""
            ? "Email is required."
            : !emailPattern.test(form.email)
            ? "Invalid Email."
            : "",
    password:
        form.password.length < 8
            ? "Password must be at least 8 characters."
            : "",
    age: !form.age || form.age < 18 ? "Age must be 18+." : "",
    country: form.country === "" ? "Country required." : "",
    gender: form.gender === "" ? "Gender required." : "",
    terms: !form.terms ? "Accept Terms required." : ""
}));

const isFormValid = computed(() => {
    return Object.values(errors.value).every((message) => message === "");
});

// ==============================
// 12. Submit
// ==============================
// What: submitForm() runs when the form is submitted.
// Why: this is where you'd normally send data to an API; here we
// print the final object and confirm success to the user.
// When: only reachable once isFormValid is true, since the submit
// button is disabled until then (see topic 11).
const submitForm = () => {
    console.log("Form Submitted:", { ...form });
    alert("Form Submitted Successfully");
};

// ==============================
// 13. Reset
// ==============================
// What: resetForm() clears every field back to its initial state.
// Why: gives the user a quick way to start over without a page reload.
// When: attach to a "Reset" button, separate from submit.
const resetForm = () => {
    form.name = "";
    form.email = "";
    form.password = "";
    form.age = null;
    form.bio = "";
    form.country = "";
    form.gender = "";
    form.terms = false;
    form.skills = [];
};

// ==============================
// 16. React Comparison
// ==============================
// React useState        -> Vue reactive()/ref()
// React onChange         -> Vue v-model (auto-wires value + input handler)
// React onSubmit         -> Vue @submit.prevent
// React useMemo(deps)    -> Vue computed() (auto-tracked, no deps array)

// ==============================
// 17. Interview Notes
// ==============================
// Q: What is v-model?
// A: A directive that binds an input's value and its input/change
//    event together, giving two-way sync between the DOM and state.
//
// Q: Why use computed validation?
// A: It stays automatically in sync with form data and is cached -
//    it only re-runs when a tracked field actually changes.
//
// Q: Difference between radio and checkbox?
// A: Radio buttons allow choosing ONE option from a group (same
//    v-model, mutually exclusive). Checkboxes allow independent
//    true/false choices.
//
// Q: Difference between checkbox and multiple checkboxes?
// A: A single checkbox bound to v-model gives a boolean. Multiple
//    checkboxes bound to the SAME array push/remove their value
//    from that array when checked/unchecked.
//
// Q: Why use @submit.prevent?
// A: To stop the browser's default full-page form submission/reload
//    so the form can be handled in JavaScript instead.
//
// Q: When should validation happen?
// A: Continuously while the user types/selects (client-side, for
//    instant feedback) AND again on the server before trusting data.
//
// Q: Client-side vs Server-side validation?
// A: Client-side gives instant UX feedback but can be bypassed.
//    Server-side is the actual source of truth and security boundary -
//    always validate on the server too, never trust the client alone.

// ==============================
// 18. Summary
// ==============================
// Forms
//   |
// v-model
//   |
// Validation
//   |
// Computed
//   |
// Disable Submit
//   |
// Submit
//   |
// Reset
</script>

<template>
<div class="page">
    <form class="form-card" @submit.prevent="submitForm">
        <h1>Registration Form</h1>

        <!-- ============================== -->
        <!-- 2. v-model -->
        <!-- ============================== -->
        <div class="field">
            <label>Name</label>
            <input type="text" v-model="form.name" placeholder="Enter your name" />
            <span class="error" v-if="errors.name">{{ errors.name }}</span>
        </div>

        <div class="field">
            <label>Email</label>
            <input type="text" v-model="form.email" placeholder="Enter your email" />
            <span class="error" v-if="errors.email">{{ errors.email }}</span>
        </div>

        <div class="field">
            <label>Password</label>
            <input type="password" v-model="form.password" placeholder="Enter your password" />
            <span class="error" v-if="errors.password">{{ errors.password }}</span>
        </div>

        <div class="field">
            <label>Age</label>
            <input type="number" v-model.number="form.age" placeholder="Enter your age" />
            <span class="error" v-if="errors.age">{{ errors.age }}</span>
        </div>

        <!-- ============================== -->
        <!-- 3. Textarea -->
        <!-- ============================== -->
        <div class="field">
            <label>Bio</label>
            <textarea v-model="form.bio" rows="3" placeholder="Tell us about yourself"></textarea>
        </div>

        <!-- ============================== -->
        <!-- 4. Select -->
        <!-- ============================== -->
        <div class="field">
            <label>Country</label>
            <select v-model="form.country">
                <option value="" disabled>Select a country</option>
                <option value="india">India</option>
                <option value="usa">USA</option>
                <option value="uk">UK</option>
                <option value="canada">Canada</option>
            </select>
            <span class="error" v-if="errors.country">{{ errors.country }}</span>
        </div>

        <!-- ============================== -->
        <!-- 5. Radio Buttons -->
        <!-- ============================== -->
        <div class="field">
            <label>Gender</label>
            <div class="inline-group">
                <label class="inline-option">
                    <input type="radio" value="male" v-model="form.gender" />
                    Male
                </label>
                <label class="inline-option">
                    <input type="radio" value="female" v-model="form.gender" />
                    Female
                </label>
                <label class="inline-option">
                    <input type="radio" value="other" v-model="form.gender" />
                    Other
                </label>
            </div>
            <span class="error" v-if="errors.gender">{{ errors.gender }}</span>
        </div>

        <!-- ============================== -->
        <!-- 7. Multiple Checkboxes -->
        <!-- ============================== -->
        <div class="field">
            <label>Skills</label>
            <div class="inline-group">
                <label class="inline-option">
                    <input type="checkbox" value="HTML" v-model="form.skills" />
                    HTML
                </label>
                <label class="inline-option">
                    <input type="checkbox" value="CSS" v-model="form.skills" />
                    CSS
                </label>
                <label class="inline-option">
                    <input type="checkbox" value="JavaScript" v-model="form.skills" />
                    JavaScript
                </label>
                <label class="inline-option">
                    <input type="checkbox" value="Vue" v-model="form.skills" />
                    Vue
                </label>
                <label class="inline-option">
                    <input type="checkbox" value="React" v-model="form.skills" />
                    React
                </label>
            </div>
        </div>

        <!-- ============================== -->
        <!-- 6. Single Checkbox -->
        <!-- ============================== -->
        <div class="field">
            <label class="inline-option">
                <input type="checkbox" v-model="form.terms" />
                Accept Terms
            </label>
            <span class="error" v-if="errors.terms">{{ errors.terms }}</span>
        </div>

        <!-- ============================== -->
        <!-- 11. Disable Submit -->
        <!-- ============================== -->
        <div class="actions">
            <button type="submit" class="btn-primary" :disabled="!isFormValid">
                Submit
            </button>
            <button type="button" class="btn-secondary" @click="resetForm">
                Reset
            </button>
        </div>
    </form>

    <!-- ============================== -->
    <!-- 8. Live Preview -->
    <!-- ============================== -->
    <div class="preview-card">
        <h2>Live Preview</h2>
        <ul>
            <li><strong>Name:</strong> {{ form.name || "-" }}</li>
            <li><strong>Email:</strong> {{ form.email || "-" }}</li>
            <li><strong>Age:</strong> {{ form.age ?? "-" }}</li>
            <li><strong>Country:</strong> {{ form.country || "-" }}</li>
            <li><strong>Gender:</strong> {{ form.gender || "-" }}</li>
            <li><strong>Bio:</strong> {{ form.bio || "-" }}</li>
            <li><strong>Skills:</strong> {{ form.skills.length ? form.skills.join(", ") : "-" }}</li>
            <li><strong>Accept Terms:</strong> {{ form.terms ? "Yes" : "No" }}</li>
        </ul>
    </div>
</div>
</template>

<style scoped>
/* ============================== */
/* 14. Styling */
/* ============================== */
.page {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    justify-content: center;
    padding: 32px 16px;
    background: #f1f5f9;
    min-height: 100vh;
    box-sizing: border-box;
}

.form-card,
.preview-card {
    background: #ffffff;
    border-radius: 14px;
    padding: 28px;
    width: 100%;
    max-width: 420px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

h1 {
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 22px;
    text-align: center;
    color: #1e293b;
}

h2 {
    margin-top: 0;
    margin-bottom: 16px;
    font-size: 18px;
    color: #1e293b;
}

.field {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
}

label {
    font-size: 14px;
    font-weight: 600;
    color: #334155;
    margin-bottom: 6px;
}

input[type="text"],
input[type="password"],
input[type="number"],
select,
textarea {
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 10px 12px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s ease;
    font-family: inherit;
}

input:focus,
select:focus,
textarea:focus {
    border-color: #6366f1;
}

.inline-group {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

.inline-option {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 400;
    font-size: 14px;
    color: #334155;
}

.error {
    color: #dc2626;
    font-size: 12px;
    margin-top: 4px;
}

.actions {
    display: flex;
    gap: 12px;
    margin-top: 8px;
}

.btn-primary,
.btn-secondary {
    flex: 1;
    padding: 10px 0;
    border-radius: 8px;
    border: none;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;
}

.btn-primary {
    background: #6366f1;
    color: #ffffff;
}

.btn-primary:hover:not(:disabled) {
    background: #4f46e5;
}

.btn-primary:disabled {
    background: #c7d2fe;
    cursor: not-allowed;
}

.btn-secondary {
    background: #e2e8f0;
    color: #334155;
}

.btn-secondary:hover {
    background: #cbd5e1;
}

.preview-card ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.preview-card li {
    padding: 8px 0;
    border-bottom: 1px solid #f1f5f9;
    font-size: 14px;
    color: #334155;
    word-break: break-word;
}

.preview-card li:last-child {
    border-bottom: none;
}

/* Responsive */
@media (max-width: 900px) {
    .page {
        flex-direction: column;
        align-items: center;
    }
}
</style>