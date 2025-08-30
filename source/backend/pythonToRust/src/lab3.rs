use rand::Rng;
use std::cmp;
use std::env;
use std::io;
use std::io::Read;
use std::io::stdin;
use std::os::unix::process::parent_id;

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

pub fn q2() {
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
    let mut input3 = String::new();
    io::stdin()
        .read_line(&mut input3)
        .expect("Failed to read line");
    let c: i32 = input3.trim().parse().expect("Failed to parse line");
    let min: i32 = cmp::min(a, cmp::min(b, c));
    let max = cmp::max(a, cmp::max(b, c));
    let median = a + b + c - min - max;
    println!("Median: {}", median);
}

pub fn q3() {
    let args: Vec<String> = env::args().collect();
    let n: i32 = args[1]
        .clone()
        .trim()
        .parse()
        .expect("Failed to parse line");

    let m = n / 3;

    for x in 1..=m {
        for y in 1..=n {
            print!("=")
        }
        println!();
    }
    for x in 1..=m {
        for y in 1..=m {
            print!("=")
        }
        for y in 1..=m {
            print!(" ")
        }
        for y in 1..=m {
            print!("=")
        }
        println!();
    }
    for x in 1..=m {
        for y in 1..=n {
            print!("=")
        }
        println!();
    }
}

pub fn center_string(text: &str, width: usize) {
    let length = text.len();
    let padding = (width - length) / 2;

    let mut result = String::new();
    for x in 1..=padding {
        result.push(' ');
    }
    result.push_str(text);
    print!("|");
    print!("{}", result);
}

pub fn q4() {
    center_string("hello", 11)
}

pub fn q5() {
    let mut last_flip: i32 = 0;
    let mut rng = rand::rng();

    for x in 1..=1000 {
        //flip coin
        let this_flip = rng.random_range(0..=1);

        if x != 1 {
            if (last_flip == 0 && this_flip == 0) {
                print!("Got 2 consecute head at {}th flip", x);
                break;
            }
        }
        last_flip = this_flip;
    }
    print!("1000");
}

pub fn run() {
    // q1();
    // q2();
    // q3();
    // q4();
    q5();
}
