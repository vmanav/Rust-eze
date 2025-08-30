export const variablesAndMutability = {
    title: "Variables and Mutability",
    content: `
Now, moving on to another fundamental concept in Rust, which we may add is very important for anyone who is coming from Python. This lessson mainly focusses on how the default behaviour of variables in Rust is Immutability.

~~~
let var = 5;
println!("value of var is: {}", var);
~~~

This is a basic variable declaration, which by default sets the variable as immutable.
Now, if we try to change the value of \`var\` to lets say 6, it will give us an error (*Give the sample code a try*): 

~~~
var = 6;
println!("value of var is: {}", var);
~~~
Now, lets try using the **\`mut\`** keyword which makes the variable mutable and allows us to change its value.
~~~
let mut var = 5;
println!("value of var is: {}", var);
var = 6;
println!("value of var is: {}", var);
// No erros and updated the value of \`var\` to 6.
~~~

Now, moving on to the data types of these variables in Rust. There are several data types in Rust, but we will start with the most common ones here.
- **i32**: 32-bit signed integer (*default for integers*).
- **u32**: 32-bit unsigned integer.
- **f32**: 32-bit floating point number.
- **f64**: 64-bit floating point number (*default for floats*).
- **bool**: Boolean value, either true or false.
- **char**: Single character, which can be any Unicode character.
- **String**: Collection of characters.

Rust can usually infer the data type of a variable, but we can also explicitly specify it if required.
~~~
fn main() {
    let age: u32 = 30;
    println!("Age: {}", age);
    // Age: 30
}
~~~
`,
    baseCode: `
fn main() {
    let var = 5;
    println!("value of var is: {}", var);
    var = 6;
    println!("value of var is: {}", var);
}
    `
    ,
    examples: [
        {
            title: "Basic data types and their usages",
            code: `
fn main() {

    let model: i32 = 2025;
    println!("Model: {}", model);
    // Model: 2025

    let engine: f64 = 5.8;
    println!("Engine: {}", engine);
    // Engine: 5.8

    let is_turbocharged: bool = true;
    println!("Is Turbocharged: {}", is_turbocharged);
    // Is Turbocharged: true

    let engine_type: char = 'V';
    println!("Engine Type: {}", engine_type);
    // Engine Type: V
}
`
        },
    ],
    footer: `**Now, lets move on to the next lesson where we learn about handling user inputs from the terminal.**`
}