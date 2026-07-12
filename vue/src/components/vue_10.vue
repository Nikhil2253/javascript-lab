<script setup>
import CardVue from "./CardVue.vue";
import PanelWithFooter from "./PanelWithFooter.vue";
import UserCard from "./UserCard.vue";

// ==============================
// Default Slot
// ==============================
// Card.vue exposes a single unnamed <slot>. Here the parent
// passes different HTML into it each time it's used.
// Use when a component just needs a flexible content area.

// ==============================
// Named Slot
// ==============================
// PanelWithFooter.vue exposes #header, default (body) and #footer.
// The parent targets each region with <template #header> / #footer.
// Use when a component has multiple distinct content regions.

// ==============================
// Scoped Slot
// ==============================
// UserCard.vue owns a user object internally and passes it out
// via slot props. The parent receives it with:
// <template #default="{ name, age, city }">
// Use when the child owns data but the parent should control markup.

// ==============================
// Fallback Content
// ==============================
// Shown below with three cases:
// 1. Card used with no content -> fallback text shows.
// 2. Card used with custom content -> fallback is overridden.
// 3. PanelWithFooter used with only body -> header/footer fallback show.

// ==============================
// Summary
// ==============================
// Props        -> Parent to Child (Data)
// Emits        -> Child to Parent (Events)
// Slots        -> Parent to Child (HTML)
// Scoped Slots -> Child exposes data to Parent
</script>

<template>
<h1>Slots Demo</h1>

<hr>
<h2>Default Slot</h2>
<section class="demo-section">
    <CardVue>
        <p>This is custom content passed from the parent into the default slot.</p>
    </CardVue>
</section>

<hr>
<h2>Named Slots</h2>
<section class="demo-section">
    <PanelWithFooter>
        <template #header>
            <h3>Dashboard Summary</h3>
        </template>

        <p>This is the main body content, passed into the default slot area.</p>

        <template #footer>
            <small>Updated just now</small>
        </template>
    </PanelWithFooter>
</section>

<hr>
<h2>Scoped Slot</h2>
<section class="demo-section">
    <UserCard>
        <template #default="{ name, age, city }">
            <p>Name: {{ name }}</p>
            <p>Age: {{ age }}</p>
            <p>City: {{ city }}</p>
        </template>
    </UserCard>
</section>

<hr>
<h2>Fallback Content</h2>
<section class="demo-section">
    <h3>No content passed (fallback shown):</h3>
    <CardVue />

    <h3>Custom content passed (fallback overridden):</h3>
    <CardVue>
        <p>Custom card content overriding the fallback.</p>
    </CardVue>

    <h3>Named slot fallback (header/footer skipped):</h3>
    <PanelWithFooter>
        <p>Only body content is provided here, header and footer fallback content will show.</p>
    </PanelWithFooter>
</section>
</template>

<style scoped>
h1 {
    margin-bottom: 4px;
}
h2 {
    margin-top: 24px;
}
.demo-section {
    border: 1px dashed #cbd5e1;
    border-radius: 10px;
    padding: 16px;
    margin-bottom: 16px;
    background: #f8fafc;
}
</style>