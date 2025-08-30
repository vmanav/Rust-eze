enum Movement {
    // Variant
    Up,
    Down,
    Left,
    Right,
}

fn move_avatar(m: Movement) {
    // Perform Action depending on info

    match m {
        Movement::Down => println!("Avatar going Down"),
        Movement::Up => println!("Avatar going Up"),
        Movement::Left => println!("Avatar going Left"),
        Movement::Right => println!("Avatar going Right"),
    }
}

pub fn run() {
    let avatar1 = Movement::Down;
    let avatar2 = Movement::Up;
    let avatar3 = Movement::Left;
    let avatar4 = Movement::Right;

    move_avatar(avatar1);
    move_avatar(avatar2);
    move_avatar(avatar3);
    move_avatar(avatar4);
}
