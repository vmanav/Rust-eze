use std::env;

pub fn run() {
    let args: Vec<String> = env::args().collect();

    let command = args[1].clone();
    let name = "Harry";

    println!("args: {:?}", args);
    println!("command: {}", command);

    if command == "hello" {
        println!("Hello {}", name)
    } else if command == "bye" {
        println!("Bye {}", name)
    }
}
