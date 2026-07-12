import { ref } from "vue";

// ==============================
// Composable
// ==============================

// A composable is a reusable function
// that contains Vue Composition API logic.

// Similar to React Custom Hooks.

// By convention, composables start with "use".

export function useCounter() {

    const count = ref(0);

    const increment = () => {

        count.value++;

    };

    const decrement = () => {

        count.value--;

    };

    const reset = () => {

        count.value = 0;

    };

    // Return everything
    // the component needs.

    return {

        count,

        increment,

        decrement,

        reset

    };

}