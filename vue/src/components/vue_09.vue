<script setup>
import {
    ref,
    defineComponent,
    h,
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    onUpdated,
    onBeforeUnmount,
    onUnmounted,
    onActivated,
    onDeactivated
} from "vue";

// ==============================
// State
// ==============================
const counter = ref(0);
const seconds = ref(0);
const domBox = ref(null); // template ref, used to access real DOM
const showChild = ref(true);
const showKeepAliveChild = ref(true);
let intervalId = null;

const increment = () => counter.value++;

// ==============================
// onBeforeMount()
// ==============================
// Runs right before the component is added to the DOM.
// DOM is NOT available yet, domBox.value is still null.
onBeforeMount(() => {
    console.log("onBeforeMount: DOM not ready ->", domBox.value);
});

// ==============================
// onMounted()
// ==============================
// Runs after the component is added to the DOM, DOM is available.
// Used for DOM access, starting timers, API calls.
onMounted(() => {
    console.log("onMounted: DOM ready ->", domBox.value);
    intervalId = setInterval(() => {
        seconds.value++;
    }, 1000);
});

// ==============================
// onBeforeUpdate()
// ==============================
// Runs after reactive data changes but before the DOM re-renders.
// DOM still reflects the OLD values here.
onBeforeUpdate(() => {
    console.log("onBeforeUpdate: DOM still old, counter is", counter.value);
});

// ==============================
// onUpdated()
// ==============================
// Runs after the DOM has been updated to match new data.
// Avoid changing state here, it can cause an infinite update loop.
onUpdated(() => {
    console.log("onUpdated: DOM updated, counter is", counter.value);
});

// ==============================
// onBeforeUnmount()
// ==============================
// Runs right before the component instance is destroyed.
// Component is still fully working here, good place to clean up.
onBeforeUnmount(() => {
    console.log("onBeforeUnmount: clearing timer");
    clearInterval(intervalId);
});

// ==============================
// onUnmounted()
// ==============================
// Runs after the component has been removed from the DOM.
// No DOM access here, timers/listeners should already be cleared.
onUnmounted(() => {
    console.log("onUnmounted: component removed from DOM");
});

// ==============================
// onActivated()
// ==============================
// Only fires for components wrapped in <KeepAlive>.
// Runs when a cached component is reinserted into the DOM.
onActivated(() => {
    console.log("onActivated: fires only if this component is inside KeepAlive");
});

// ==============================
// onDeactivated()
// ==============================
// Only fires for components wrapped in <KeepAlive>.
// Runs when the component is removed but kept in memory, not destroyed.
onDeactivated(() => {
    console.log("onDeactivated: fires only if this component is inside KeepAlive");
});

// ==============================
// Child Component
// ==============================
// Defined inline with a render function since one .vue file
// can only hold one template block. Used below to test
// mount/unmount and KeepAlive activate/deactivate.
const LifecycleChild = defineComponent({
    name: "LifecycleChild",
    setup() {
        const localCount = ref(0);

        onMounted(() => console.log("Child -> onMounted"));
        onBeforeUnmount(() => console.log("Child -> onBeforeUnmount"));
        onUnmounted(() => console.log("Child -> onUnmounted"));
        onActivated(() => console.log("Child -> onActivated"));
        onDeactivated(() => console.log("Child -> onDeactivated"));

        return () =>
            h("div", { class: "child-box" }, [
                h("p", `Child local count: ${localCount.value}`),
                h("button", { onClick: () => localCount.value++ }, "Increment Child")
            ]);
    }
});

// ==============================
// Hook Summary
// ==============================
// onBeforeMount   -> before DOM insert, DOM not ready
// onMounted       -> after DOM insert, DOM ready, safe for timers/API calls
// onBeforeUpdate  -> after data change, before DOM re-render, DOM still old
// onUpdated       -> after DOM re-render, DOM matches new data
// onBeforeUnmount -> before instance destroy, ideal for cleanup
// onUnmounted     -> after instance destroy, no DOM access
// onActivated     -> KeepAlive only, runs when cached component is shown again
// onDeactivated   -> KeepAlive only, runs when component is hidden but cached
</script>

<template>
<h2>
    Lifecycle Hooks Demo
</h2>
<hr>
<h3>
    Counter: {{ counter }}
</h3>
<p ref="domBox">
    DOM Box (used in onBeforeMount / onMounted)
</p>
<button @click="increment">
    Increment Counter
</button>
<hr>
<h3>
    Timer (onMounted starts it, onBeforeUnmount clears it)
</h3>
<h3>
    Seconds: {{ seconds }}
</h3>
<hr>
<h2>
    Child Component - Mount / Unmount
</h2>
<LifecycleChild v-if="showChild" />
<button @click="showChild = !showChild">
    Toggle Child
</button>
<hr>
<h2>
    KeepAlive Child - Activate / Deactivate
</h2>
<KeepAlive>
    <LifecycleChild v-if="showKeepAliveChild" />
</KeepAlive>
<button @click="showKeepAliveChild = !showKeepAliveChild">
    Toggle KeepAlive Child
</button>
</template>