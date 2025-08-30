// Modular block of code
pub fn run() {
    greeting("Hello", "Harry Potter");

    let sum = add_numbers(2, 3);
    println!("Sum : {}", sum);

    // Closure
    let n3 = 10;
    let add_nums = |n1: i32, n2: i32| n1 + n2 + n3;
    println!("closure sum: {}", add_nums(3, 4));
}

pub fn greeting(greet: &str, name: &str) {
    // Why &, So that ownership doesn't transfer
    println!("{} {}, Nice to meet you!", greet, name);
}

pub fn add_numbers(num1: i32, num2: i32) -> i32 {
    num1 + num2
    // No Semicolon since I want to return
}
