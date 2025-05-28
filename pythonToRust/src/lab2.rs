use std::cmp;
use std::env;
use std::io;
use std::io::Read;

pub fn q1() {
    let mut input = String::new();

    io::stdin()
        .read_line(&mut input)
        .expect("Failed to read line");

    let human_years: f64 = input.trim().parse().expect("Failed to parse line");
    println!("Human Years: {}", human_years);
    let dog_years;

    if human_years <= 2.0 {
        dog_years = human_years * 10.5;
    } else {
        dog_years = 2.0 * 10.5 + (human_years - 2.0) * 4.0;
    }
    println!("Dog Years: {}", dog_years)
}

pub fn q2() {
    let mut input = String::new();

    io::stdin()
        .read_line(&mut input)
        .expect("Failed to read line");

    let number: i32 = input.trim().parse().expect("Failed to parse line");
    println!("Number: {}", number);

    if (number % 2) == 0 {
        println!("{} is EVEN", number)
    } else {
        println!("{} is ODD", number)
    }
}

pub fn q3() {
    let args: Vec<String> = env::args().collect();

    println!("Enter a, b, and c constants of quadratic function");
    let a: f32 = args[1]
        .clone()
        .trim()
        .parse()
        .expect("Failed to parse line");
    let b: f32 = args[2]
        .clone()
        .trim()
        .parse()
        .expect("Failed to parse line");
    let c: f32 = args[3]
        .clone()
        .trim()
        .parse()
        .expect("Failed to parse line");

    let d = (b * b - 4.0 * a * c);
    if d == 0.0 {
        // Only one Root
        let ans = (-b) / (2.0 * a);
        println!("Root: {}", ans);
    } else if d < 0.0 {
        println!("No Real Roots");
    } else {
        let root_d = d.sqrt();
        let root1 = ((-b) + (root_d)) / (2.0 * a);
        let root2 = ((-b) - (root_d)) / (2.0 * a);
        println!("Root1: {}, Root2: {}", root1, root2);
    }
}

pub fn q4() {
    println!("Enter the number you want to find factorial of ?");

    let mut input = String::new();

    io::stdin()
        .read_line(&mut input)
        .expect("Failed to read line");

    let n: i32 = input.trim().parse().expect("failed to parse");
    let mut factorial = 1;
    for x in 1..(n + 1) {
        factorial = factorial * x;
    }
    println!("Factorial: {}", factorial);
}

pub fn q5() {
    println!("Enter the number");
    let mut input = String::new();
    io::stdin()
        .read_line(&mut input)
        .expect("Failed to read line");

    let n: i32 = input.trim().parse().expect("Failed to parse line");

    let mut result: Vec<i32> = Vec::new();
    for x in 2..=100 {
        if n % x == 0 && n != x {
            // Factor
            result.push(x);
        }
    }
    print!("{}: ", n);
    for x in result {
        print!("{} ", x);
    }
}

pub fn run() {
    // q1();
    // q2();
    // q3();
    // q4();
    q5();
}
