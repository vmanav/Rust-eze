export const userInputs = {
    title: "Handling User Inputs",
    content: `
Now taking input from the user iis quite different in Rust, that what we have in *Python*. In Python we can just promt the user for input using the \`input()\` function, but Rust requires slighty more work.

We have to use the \`std::io\` module and the \`read_line() \` function to fetch input from the user. This input will always be a string but we can always parse it to the required data type.
~~~
fn main() {
    let mut name = String::new();
    io::stdin().read_line(&mut name).unwrap();
}
~~~

Now let's look at some examples with various data types for user inputs.
`,
    baseCode: `use std::io;

fn main (){
    println!("Enter you name ?");
    let mut name = String::new();
    io::stdin().read_line(&mut name).unwrap();
    println!("Hi, {}", name);

    // String input then parsed into integer
    println!("Enter you Year of Birth ?");
    let mut birth_year = String::new();
    io::stdin().read_line(&mut birth_year).unwrap();
    let birth_year: u32 = birth_year.trim().parse().unwrap();
    println!("Birth Year, {}", birth_year);
}
`,
    examples: [
        {
            title: "Sum from 1 to N",
            code: `use std::io;
fn main() {
    let mut input = String::new();
    println!("Enter a number to find sum from 1 to that number");
    io::stdin().read_line(&mut input).expect("Failed to read line");
    let number: i32 = input.trim().parse().expect("Failed to parse line");
    println!("Number you enetered: {}", number);
    let mut sum = 0;
    for x in 1..(number + 1) {
        sum += x;
    }
    println!("Sum (calculated from loop) = {}", sum);
    println!("Sum (calculated from formula) = {}", number * (number + 1) / 2);
}`
        },
        {
            title: "Circular Area with Radius as Input",
            code: `use std::io;

fn main(){
    let mut input = String::new();
    let pie = 3.14;
    println!("Enter the radius ?");
    io::stdin().read_line(&mut input).expect("Failed to read line");

    let number: f32 = input.trim().parse().expect("Failed to parse line");
    println!("Number: {}", number);
    let area = pie * number * number;
    println!("Area = {}", area);
}`
        },
        {
            title: "Convert total time to seconds",
            code: `use std::io;

fn main() {
    let sec = 60;
    let mut days = String::new();
    println!("Enter days ?");
    io::stdin().read_line(&mut days).expect("Failed to read line");
    let daysParsed: i32 = days.trim().parse().expect("Failed to parse line");
    
    println!("Enter hours ?");
    let mut hours = String::new();
    io::stdin().read_line(&mut hours).expect("Failed to read line");
    let hoursParsed: i32 = hours.trim().parse().expect("Failed to parse line");
    
    println!("Enter minutes ?");
    let mut minutes = String::new();
    io::stdin().read_line(&mut minutes).expect("Failed to read line");
    let minutesParsed: i32 = minutes.trim().parse().expect("Failed to parse line");
    
    println!("Enter seconds ?");
    let mut seconds = String::new();
    io::stdin().read_line(&mut seconds).expect("Failed to read line");
    let secondsParsed: i32 = seconds.trim().parse().expect("Failed to parse line");

    let total_time = secondsParsed  + minutesParsed * sec + hoursParsed * sec * sec * sec;
    println!("Total time: {} seconds", total_time);
}`
        }
        , {
            title: "Min, Max and Middle of three Inputs",
            code: `use std::io;
use std::cmp;

fn main() {
    let sec = 60;
    let mut first = String::new();
    println!("Enter first number ?");
    io::stdin().read_line(&mut first).expect("Failed to read line");
    let a: i32 = first.trim().parse().expect("Failed to parse line");

    let mut second = String::new();
    println!("Enter second number ?");
    io::stdin().read_line(&mut second).expect("Failed to read line");
    let b: i32 = second.trim().parse().expect("Failed to parse line");

    let mut third = String::new();
    println!("Enter third number ?");
    io::stdin().read_line(&mut third).expect("Failed to read line");
    let c: i32 = third.trim().parse().expect("Failed to parse line");
  
    let minimum = cmp::min(a, cmp::min(b, c));
    let maximum = cmp::max(a, cmp::max(b, c));
    let middle = a + b + c - minimum - maximum;
    println!("Min: {}, Max: {}, Middle: {}.", minimum, maximum, middle);
}`
        }
    ]
}