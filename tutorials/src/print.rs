pub fn run() {
    println!("Hello from print.rs file");

    println!("Number - {0}", 1);

    println!("My name is {} {}", "Harry", "Potter");

    // Positional Parameters
    println!(
        "Hello {0} {1}, my name is {2} {1}",
        "Harry", "Potter", "Tom"
    );

    // Named
    println!(
        "{name} loves {movie}",
        name = "Manav",
        movie = "Harry Potter"
    )
}
