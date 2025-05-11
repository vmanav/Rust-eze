// Types
// Primitive - Immutable fixed length literals stored in memory (stack)
// String - Growbale stored in memory heap, stored pointer to data

pub fn run() {
    // Primitive
    let string1 = "hello";
    println!("String : {}, Length: {}", string1, string1.len());
    // string1.push_str("World"); X Doesn't work in this case

    let mut string2 = String::from("Hello ");
    println!("String : {}, Length: {}", string2, string2.len());
    // Push Character
    string2.push('W');
    // Push String
    string2.push_str("orld");
    println!("String : {}, Length: {}", string2, string2.len());

    // Capacity (in BYTES)
    println!(
        "Capacity : {}, IsEmpty: {}",
        string2.capacity(),
        string2.is_empty()
    );

    // Contains
    println!("Contains World : {}", string2.contains("World"));
    println!("Contains Harry : {}", string2.contains("Harry"));

    // Replace
    println!(
        "Replace World to Harry : {}",
        string2.replace("World", "  Harry")
    );

    // Loop through Whitespaces
    for word in string2.split_whitespace() {
        println!("{}", word)
    }

    // Create with capacity
    let mut string3 = String::with_capacity(10);
    string3.push('a');
    string3.push('b');
    string3.push('c');
    println!("string 3: {}", string3);

    // Assertion Testing
    assert_eq!(3, string3.len());
    assert_eq!(2, string3.len());
}
