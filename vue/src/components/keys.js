// ==============================
// Symbol Keys
// ==============================
// A Symbol is always unique, even two symbols created with the
// exact same description are never equal to each other.
// Using a Symbol as a provide/inject key removes any risk of
// accidentally colliding with a string key ("user") used
// somewhere else in a large codebase.
// Best practice: define Symbol keys in one shared file like this
// and import them wherever provide()/inject() is called.
export const USER_KEY = Symbol("user");