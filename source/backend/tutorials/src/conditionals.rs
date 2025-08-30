// Check condition and act on result
// No Ternary Operator in Rust
pub fn run() {
    let age: i32 = 28;
    let check_id = true;
    if age >= 21 && check_id {
        println!("ALCOHOL ALLOWED")
    } else if age < 21 && check_id {
        println!("Not Allowed")
    } else {
        println!("Need to check ID")
    }

    // No Ternary Operator in Rust
    // Shorthand If
    let is_of_age = if age >= 21 { true } else { false };
    println!("is_of_age : {}", is_of_age)
}
