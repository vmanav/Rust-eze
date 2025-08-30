pub fn run() {
    let mut count = 0;
    // Infinite Loop
    loop {
        count += 1;
        println!("count : {}", count);
        if count == 5 {
            break;
        }
    }

    // // While Loop
    // while count <= 100 {
    //     if count % 15 == 0 {
    //         println!("{} - FizzBuzz", count);
    //     } else if count % 3 == 0 {
    //         println!("{} - Fizz", count);
    //     } else if count % 5 == 0 {
    //         println!("{} - Buzz", count)
    //     }
    //     count += 1;
    // }

    // For Range
    for x in 0..5 {
        println!("x : {}", x);
    }
}
