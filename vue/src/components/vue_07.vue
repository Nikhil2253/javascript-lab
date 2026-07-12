<script setup>
import {
  reactive,
  ref,
  toRef,
  readonly,
  shallowRef,
  shallowReactive,
  isRef,
  unref
} from "vue";


// 1. toRef()

const user = reactive({
  name: "Nikhil",
  age: 21,
  city: "Delhi"
});

const username = toRef(user, "name");

const changeName = () => {
  username.value = "Rahul";
};


// 2. readonly()

const profile = reactive({
  username: "Nikhil",
  role: "Developer"
});

const readonlyProfile = readonly(profile);

const changeProfile = () => {
  // readonlyProfile.username = "Rahul"; ❌ Not allowed
};


// 3. shallowRef()

const product = shallowRef({
  name: "Laptop",
  price: 50000
});

const changeProductName = () => {
  // Nested changes are not tracked
  product.value.name = "Phone";
};

const replaceProduct = () => {
  // Whole object replacement triggers update
  product.value = {
    name: "Mobile",
    price: 20000
  };
};


// 4. shallowReactive()

const userData = shallowReactive({
  name: "Nikhil",
  address: {
    city: "Delhi"
  }
});

const changeUserName = () => {
  userData.name = "Rahul";
};

const changeCity = () => {
  // Nested changes are not tracked
  userData.address.city = "Mumbai";
};


// 5. isRef()

const count = ref(10);

const normalValue = 20;

const checkRef = () => {
  console.log(isRef(count)); 
  // true

  console.log(isRef(normalValue));
  // false
};


// 6. unref()

const userId = ref(101);

const normalId = 202;

const getValues = () => {
  console.log(unref(userId));
  // 101

  console.log(unref(normalId));
  // 202
};

</script>


<template>

  <h1>Advanced Reactivity</h1>


  <!-- toRef -->

  <section>
    <h2>toRef()</h2>

    <p>
      Name: {{ username }}
    </p>

    <button @click="changeName">
      Change Name
    </button>
  </section>


  <!-- readonly -->

  <section>
    <h2>readonly()</h2>

    <p>
      Username: {{ readonlyProfile.username }}
    </p>

    <p>
      Role: {{ readonlyProfile.role }}
    </p>

    <button @click="changeProfile">
      Try Change Readonly
    </button>
  </section>


  <!-- shallowRef -->

  <section>
    <h2>shallowRef()</h2>

    <p>
      Product: {{ product.name }}
    </p>

    <p>
      Price: {{ product.price }}
    </p>

    <button @click="changeProductName">
      Change Nested Name
    </button>

    <button @click="replaceProduct">
      Replace Object
    </button>
  </section>


  <!-- shallowReactive -->

  <section>
    <h2>shallowReactive()</h2>

    <p>
      Name: {{ userData.name }}
    </p>

    <p>
      City: {{ userData.address.city }}
    </p>

    <button @click="changeUserName">
      Change Name
    </button>

    <button @click="changeCity">
      Change City
    </button>
  </section>


  <!-- isRef -->

  <section>
    <h2>isRef()</h2>

    <button @click="checkRef">
      Check Ref
    </button>
  </section>


  <!-- unref -->

  <section>
    <h2>unref()</h2>

    <button @click="getValues">
      Get Values
    </button>
  </section>


</template>


<style scoped>

section {
  margin: 20px;
  padding: 20px;
  border: 1px solid gray;
  border-radius: 10px;
}


button {
  margin: 8px;
  padding: 10px 15px;
  cursor: pointer;
}

</style>