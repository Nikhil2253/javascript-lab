<script setup>
// ==============================
// Default Slot
// ==============================
// <slot></slot> is a placeholder where the PARENT injects HTML.
// Used when a component's inner content changes per usage
// but the outer wrapper (styling/structure) stays the same.
// This component has no props, its only job is to wrap
// whatever content the parent passes in.

// ==============================
// Fallback Content
// ==============================
// Anything written INSIDE <slot>...</slot> in this file
// is fallback content. It only renders when the parent
// does not pass any content for this slot.
</script>

<template>
<div class="card">
    <slot>
        <p class="fallback-text">No content provided for this card.</p>
    </slot>
</div>
</template>

<style scoped>
.card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    margin: 12px 0;
    background: #ffffff;
}
.fallback-text {
    color: #888;
    font-style: italic;
    margin: 0;
}
</style>