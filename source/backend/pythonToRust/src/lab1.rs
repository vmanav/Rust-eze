use std::cmp;
use std::env;
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

pub fn q2() {
    let mut input = String::new();
    let pie = 3.14;

    io::stdin()
        .read_line(&mut input)
        .expect("Failed to read line");

    let number: f32 = input.trim().parse().expect("Failed to parse line");
    println!("Number: {}", number);
    let area = pie * number * number;
    println!("Area = {}", area);
}

pub fn q4() {
    let args: Vec<String> = env::args().collect();
    let sec = 60;

    println!("Enter time in this format (DAYS) (HOURS) (MINS) (SECONDS)");
    let days: i32 = args[1]
        .clone()
        .trim()
        .parse()
        .expect("Failed to parse line");
    let hours: i32 = args[1]
        .clone()
        .trim()
        .parse()
        .expect("Failed to parse line");
    let min: i32 = args[1]
        .clone()
        .trim()
        .parse()
        .expect("Failed to parse line");
    let seconds: i32 = args[1]
        .clone()
        .trim()
        .parse()
        .expect("Failed to parse line");

    let total_time = seconds + min * sec + min * sec * sec + hours * sec * sec * sec;
    println!("Total time: {}", total_time);
}

pub fn q6() {
    let args: Vec<String> = env::args().collect();

    println!("Enter three sides of triangle (space seperated)");
    let s1: f32 = args[1]
        .clone()
        .trim()
        .parse()
        .expect("Failed to parse line");
    let s2: f32 = args[2]
        .clone()
        .trim()
        .parse()
        .expect("Failed to parse line");
    let s3: f32 = args[3]
        .clone()
        .trim()
        .parse()
        .expect("Failed to parse line");

    let s: f32 = (s1 + s2 + s3) / 2.0;
    let area: f32 = ((s) * (s - s1) * (s - s2) * (s - s3)).sqrt();
    println!("Total area: {}", area);
}

pub fn q7() {
    let args: Vec<String> = env::args().collect();

    println!("Enter three integers (space seperated)");
    let a: i32 = args[1]
        .clone()
        .trim()
        .parse()
        .expect("Failed to parse line");
    let b: i32 = args[2]
        .clone()
        .trim()
        .parse()
        .expect("Failed to parse line");
    let c: i32 = args[3]
        .clone()
        .trim()
        .parse()
        .expect("Failed to parse line");

    let min = cmp::min(a, cmp::min(b, c));
    let max = cmp::max(a, cmp::max(b, c));
    let middle = a + b + c - min - max;
    println!("Min: {}, Max: {}, Middle: {}.", min, max, middle);
}

pub fn run() {
    // q1();
    // q2();
    // q4();
    // q6();
    q7();
}
