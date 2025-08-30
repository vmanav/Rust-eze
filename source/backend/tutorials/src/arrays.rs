// Fixed Lists with same data type
use std::mem;

pub fn run() {
    let mut numbers: [i32; 5] = [1, 2, 3, 4, 5];
    // IMPORTANT: DATA TYPE and the LENGTH has to match

    println!("Array: {:?}", numbers);

    numbers[4] = 20;
    println!("Array: {:?}", numbers);

    println!("Length: {}", numbers.len());

    // Stack allocated byytes
    println!("Bytes Occupied: {} bytes", mem::size_of_val(&numbers));

    // Slices
    let slice1 = &numbers;
    println!("slice1: {:?}", slice1);
    let slice2 = &numbers[0..2];
    println!("slice2: {:?}", slice2);
    let slice3 = &numbers[2..];
    println!("slice3: {:?}", slice3);
}
