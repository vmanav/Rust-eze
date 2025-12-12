use std::io;

fn main (){
    println!("Enter you name ?");
    let mut name = String::new();
println!("[INPUT]");
    io::stdin().read_line(&mut name).unwrap();
    println!("Hi, {}", name);

    // String input then parsed into integer
    println!("Enter you Year of Birth ?");
    let mut birth_year = String::new();
println!("[INPUT]");
    io::stdin().read_line(&mut birth_year).unwrap();
    let birth_year: u32 = birth_year.trim().parse().unwrap();
    println!("Birth Year, {}", birth_year);
}
