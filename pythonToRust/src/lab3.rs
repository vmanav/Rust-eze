use std::cmp;
use std::env;
use std::io;
use std::io::Read;

pub fn q1() {
    println!("Enter a and b as the two shorter sides");
    let mut input = String::new();
    io::stdin()
        .read_line(&mut input)
        .expect("Failed to read line");

    let a: i32 = input.trim().parse().expect("Failed to parse line");
    let mut input2 = String::new();
    io::stdin()
        .read_line(&mut input2)
        .expect("Failed to read line");
    let b: i32 = input2.trim().parse().expect("Failed to parse line");

    let hypotenus = (((a * a) + (b * b)) as f32).sqrt();
    println!("hypotenus: {}", hypotenus)
}

pub fn run() {
    q1();
}
