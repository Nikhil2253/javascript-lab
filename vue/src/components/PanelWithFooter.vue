<script setup>
// ==============================
// Named Slot
// ==============================
// A component can expose MULTIPLE content areas using
// <slot name="...">. The parent targets each area with
// <template #areaName>. Useful for layout components
// that have fixed regions (header, body, footer).
//
// This component exposes three areas:
// - #header  (named slot)
// - default  (unnamed slot, used for the main body)
// - #footer  (named slot)

// ==============================
// Fallback Content
// ==============================
// Each <slot> below has its own fallback content.
// If the parent skips a slot, that slot's fallback shows instead.
</script>

<template>
<div class="panel">
    <div class="panel-header">
        <slot name="header">
            <h3>Untitled Panel</h3>
        </slot>
    </div>
    <div class="panel-body">
        <slot>
            <p>No body content provided.</p>
        </slot>
    </div>
    <div class="panel-footer">
        <slot name="footer">
            <small>No footer provided.</small>
        </slot>
    </div>
</div>
</template>

<style scoped>
.panel {
    border: 1px solid #ccc;
    border-radius: 8px;
    margin: 12px 0;
    overflow: hidden;
}
.panel-header {
    background: #f2f4f7;
    padding: 12px 16px;
    border-bottom: 1px solid #ccc;
}
.panel-body {
    padding: 16px;
}
.panel-footer {
    background: #fafafa;
    padding: 8px 16px;
    border-top: 1px solid #eee;
    color: #666;
}
</style>