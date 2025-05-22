use std::io;

pub fn q1() {
    let mut input = String::new();

    io::stdin()
        .read_line(&mut input)
        .expect("Failed to read line");

    let number: i32 = input.trim().parse().expect("Failed to parse line");
    println!("Number: {}", number);

    let mut sum = 0;
    for x in 1..(number + 1) {
        sum += x;
    }
    println!("Sum1 = {}", sum);

    println!("Sum2 = {}", number * (number + 1) / 2);
}

pub fn q1() {}

pub fn run() {
    q1();
}
