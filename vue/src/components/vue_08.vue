<script setup>
import { ref, reactive, computed, watch, watchEffect } from "vue";
const firstName = ref("Nikhil");
const lastName = ref("Saxena");
const fullName = computed(() => {
    return firstName.value + " " + lastName.value;
});
// ==============================
// Writable Computed
// ==============================
// Normal computed is read-only.
// Writable computed allows:
// 1. Getting value
// 2. Setting value
const username = computed({
    get(){
        return firstName.value + " " + lastName.value;
    },
    set(value){
        const names = value.split(" ");
        firstName.value = names[0];
        lastName.value = names[1];
    }
});
const changeUsername = () => {
    username.value = "Rahul Sharma";
};
// ==============================
// watch()
// ==============================
// watch() observes a reactive value.
// When the value changes,
// the callback function runs.
const age = ref(20);
watch(age, (newValue, oldValue)=>{
    console.log("Old Age:", oldValue);
    console.log("New Age:", newValue);
});
const increaseAge = () => {
    age.value++;
};
// watch receives:
// newValue = updated value
// oldValue = previous value
// ==============================
// Watch Multiple Sources
// ==============================
// watch() can observe multiple reactive values.
// Multiple sources are passed inside an array.
// If any value changes,
// the watcher runs.
watch(
    [
        firstName,
        lastName
    ],
    (
        newValues,
        oldValues
    )=>{
        console.log("New Values:", newValues);
        console.log("Old Values:", oldValues);
    }
);
const changeFirstName = () => {
    firstName.value = "Aman";
};
const changeLastName = () => {
    lastName.value = "Verma";
};
// newValues contains current values.
// oldValues contains previous values.
// Array order is maintained:
// first value -> firstName
// second value -> lastName

// ==============================
// Immediate Watch
// ==============================
// watch() normally skips the first run.
// immediate: true runs it once on creation too.
const theme = ref("light");
watch(
    theme,
    (newValue, oldValue) => {
        console.log("Theme changed from", oldValue, "to", newValue);
    },
    { immediate: true } // runs callback immediately, then on every change
);
const toggleTheme = () => {
    theme.value = theme.value === "light" ? "dark" : "light";
};

// ==============================
// Deep Watch
// ==============================
// Watching a reactive object doesn't catch nested changes by default.
// deep: true makes it track changes at every nested level.
const userSettings = reactive({
    profile: {
        name: "Nikhil",
        email: "nikhil@example.com"
    },
    preferences: {
        notifications: true,
        language: "en"
    }
});

watch(
    userSettings,
    (newValue, oldValue) => {
        // newValue/oldValue are the same object ref here (mutated in place)
        console.log("Settings changed (deep):", newValue);
    },
    { deep: true } // tracks changes inside nested properties too
);

const toggleNotifications = () => {
    userSettings.preferences.notifications = !userSettings.preferences.notifications;
};
const changeLanguage = () => {
    userSettings.preferences.language =
        userSettings.preferences.language === "en" ? "hi" : "en";
};

// ==============================
// watchEffect()
// ==============================
// Runs immediately, no explicit source needed.
// Auto-tracks any reactive value used inside it.
const cartItems = ref(3);
const discountApplied = ref(false);

watchEffect(() => {
    // cartItems and discountApplied are both auto-tracked here
    const discountText = discountApplied.value ? "with discount" : "without discount";
    console.log(`Dashboard: ${cartItems.value} items in cart, ${discountText}`);
});
// runs once immediately, then again whenever a tracked value changes

const addToCart = () => {
    cartItems.value++;
};
const toggleDiscount = () => {
    discountApplied.value = !discountApplied.value;
};

// ==============================
// Interview Notes
// ==============================
// watch() vs watchEffect():
// - watch needs explicit source(s); watchEffect auto-tracks dependencies
// - watch skips first run by default; watchEffect runs immediately
// - watch gives old + new values; watchEffect only gives current values
//
// computed() vs watch():
// - computed derives/returns a value, cached, used in template
// - watch runs side effects (API calls, logging) on value change
// - computed should have no side effects; watch is for side effects
</script>
<template>
<h2>
    Normal Computed:
    {{ fullName }}
</h2>
<hr>
<h2>
    Writable Computed:
    {{ username }}
</h2>
<button @click="changeUsername">
    Change Username
</button>
<h3>
    First Name: {{ firstName }}
</h3>
<h3>
    Last Name: {{ lastName }}
</h3>
<hr>
<h2>
    Watch Example
</h2>
<h3>
    Age: {{ age }}
</h3>
<button @click="increaseAge">
    Increase Age
</button>
<hr>
<h2>
    Watch Multiple Sources
</h2>
<h3>
    First Name: {{ firstName }}
</h3>
<h3>
    Last Name: {{ lastName }}
</h3>
<button @click="changeFirstName">
    Change First Name
</button>
<button @click="changeLastName">
    Change Last Name
</button>
<hr>
<h2>
    Immediate Watch
</h2>
<h3>
    Theme: {{ theme }}
</h3>
<button @click="toggleTheme">
    Toggle Theme
</button>
<hr>
<h2>
    Deep Watch
</h2>
<h3>
    Notifications: {{ userSettings.preferences.notifications }}
</h3>
<h3>
    Language: {{ userSettings.preferences.language }}
</h3>
<button @click="toggleNotifications">
    Toggle Notifications
</button>
<button @click="changeLanguage">
    Change Language
</button>
<hr>
<h2>
    watchEffect Example
</h2>
<h3>
    Cart Items: {{ cartItems }}
</h3>
<h3>
    Discount Applied: {{ discountApplied }}
</h3>
<button @click="addToCart">
    Add To Cart
</button>
<button @click="toggleDiscount">
    Toggle Discount
</button>
</template>