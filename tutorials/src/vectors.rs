// Vectors - Resizable arrays
use std::mem;

pub fn run() {
    let mut numbers: Vec<i32> = vec![1, 2, 3, 4, 5];

    println!("Vector: {:?}", numbers);

    numbers[4] = 20;
    println!("Vector: {:?}", numbers);

    println!("Length: {}", numbers.len());

    // Stack allocated byytes
    println!("Bytes Occupied: {} bytes", mem::size_of_val(&numbers));

    // Add to Vector
    numbers.push(5);
    numbers.push(6);
    numbers.push(100);
    numbers.pop();

    // Slices
    let slice1 = &numbers;
    println!("slice1: {:?}", slice1);
    let slice2 = &numbers[0..2];
    println!("slice2: {:?}", slice2);
    let slice3 = &numbers[2..];
    println!("slice3: {:?}", slice3);

    // Loop through vectors
    for ele in numbers.iter() {
        println!("element : {}", ele);
    }

    // Loop and Mutate
    for ele in numbers.iter_mut() {
        *ele *= 2;
    }
    println!("Mutated vector : {:?}", numbers);
}
