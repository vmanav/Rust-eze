// Traditional struct
// struct Color {
//     red: u8,
//     green: u8,
//     blue: u8,
// }

// // Tuple Struct
// struct Color(u8, u8, u8);

use std::string;

struct Person {
    first_name: String,
    last_name: String,
}

impl Person {
    // Construct
    fn new(first_name: &str, last_name: &str) -> Person {
        Person {
            first_name: first_name.to_string(),
            last_name: last_name.to_string(),
        }
    }
}

pub fn run() {
    // let mut c = Color {
    //     red: 255,
    //     green: 0,
    //     blue: 0,
    // };
    // c.red = 200;
    // println!("Color: {}, {} & {}", c.red, c.green, c.blue);

    // let mut c2 = Color(255, 128, 12);
    // c2.2 = 100;
    // println!("Color: {}, {} & {}", c2.0, c2.1, c2.2);

    let mut p1 = Person::new("Harry", "Potter");
}
