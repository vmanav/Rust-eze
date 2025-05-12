// Group of values of different types
// Max 12 values

pub fn run() {
    let person = ("Harry", "Potter", 14);
    let person2: (&str, &str, i8) = ("Ronald", "Weasely", 14);

    println!("Name: {} {}, Age: {}", person.0, person.1, person.2);
    println!("Name: {} {}, Age: {}", person2.0, person2.1, person2.2);
}
