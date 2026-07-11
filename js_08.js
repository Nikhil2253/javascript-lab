class User {
    constructor(username, email) {
        this.username = username;
        this.email = email;
    }

    login() {
        console.log(`${this.username} logged in`);
    }
}

// A class is a blueprint for creating objects.

const user = new User("nikhil", "nikhil@gmail.com");

console.log(user);

user.login();

// constructor() initializes object properties.

class Admin extends User {
    constructor(username, email, role) {
        super(username, email);

        this.role = role;
    }

    deleteUser() {
        console.log(`${this.username} deleted a user`);
    }
}

// extends creates a child class that inherits from a parent class.

const admin = new Admin(
    "admin",
    "admin@gmail.com",
    "Super Admin"
);

console.log(admin);

admin.login();

admin.deleteUser();

// super() calls the parent class constructor.

class PremiumUser extends User {
    login() {
        console.log(`${this.username} logged in with Premium Account`);
    }
}

// A child class can override methods of its parent class.

const premium = new PremiumUser(
    "vipUser",
    "vip@gmail.com"
);

premium.login();

class Moderator extends User {
    login() {
        super.login();

        console.log("Moderator Panel Opened");
    }
}

const moderator = new Moderator(
    "mod",
    "mod@gmail.com"
);

moderator.login();

// super.method() calls a method from the parent class.

class AppConfig {
    static version() {
        console.log("Version 1.0.0");
    }
}

AppConfig.version();

// Static methods belong to the class, not its instances.

console.log(admin instanceof Admin);
console.log(admin instanceof User);

// instanceof checks whether an object is an instance of a class.

console.log(user.constructor === User);

// constructor returns the function that created the object's instance.