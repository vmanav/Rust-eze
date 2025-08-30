use rand::Rng;
use std::cmp;
use std::env;
use std::io;
use std::io::Read;
use std::io::stdin;
use std::os::unix::process::parent_id;

pub fn q1() {
    let vowels = "aeiouAEIOU";
    let mut input = String::new();
    io::stdin()
        .read_line(&mut input)
        .expect("Failed to read line");

    let text: String = input.trim().parse().expect("Failed to parse line");
    let mut result = String::new();
    for ch in text.chars() {
        if !vowels.contains(ch) {
            result.push(ch);
        }
    }

    println!("String W/O vowels: {}", result)
}

pub fn q2(text: &str) {
    for word in text.split_whitespace() {
        let mut interim = String::new();
        // let first = word.chars().next().unwrap().to_ascii_uppercase();
        interim.push(word.chars().next().unwrap().to_ascii_uppercase());
        interim.push_str(&word[1..]);
        println!("{:?}", interim);
    }
}

pub fn run() {
    // q1();
    q2("this is python");
    // q3();
    // q4();
    // q5();
}
