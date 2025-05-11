// Immutable by default
// Block Scoped

pub fn run() {
    let name = "Harry";
    println!("My name is {}", name);

    let mut age = 25;
    println!("My age is {}", age);
    age = 26;
    println!("My age is {}", age);

    // Constant
    const ID: i32 = 01;
    println!("ID: {}", ID);

    // Multiple Vars at once
    let (name2, age2) = ("Draco", 20);
    println!("Name : {}, Age: {}", name2, age2);
}
