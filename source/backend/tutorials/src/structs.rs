// Traditional struct
// struct Color {
//     red: u8,
//     green: u8,
//     blue: u8,
// }

// // Tuple Struct
// struct Color(u8, u8, u8);

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

    // Get Full Name
    fn full_name(&self) -> String {
        format!("{} {}", self.first_name, self.last_name)
    }

    // Change Name
    fn set_last_name(&mut self, last_name: &str) {
        self.last_name = last_name.to_string();
    }

    // Name to Tupple
    fn name_to_tuple(self) -> (String, String) {
        (self.first_name, self.last_name)
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
    println!("Person p1: {} {}", p1.first_name, p1.last_name);
    println!("Person p1, w full_name function: {}", p1.full_name());
    p1.set_last_name("Dumbledore");
    println!("Person p1, w full_name function: {}", p1.full_name());
    println!("Person p1, w tuple: {:?}", p1.name_to_tuple());
}
