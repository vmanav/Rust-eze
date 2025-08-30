export const introduction = {

    title: "Introduction",
    content:
        `
Let's start with the very first program in any programming language, the "Hello, world!", here is a sample code for this program.

~~~
fn main() {
    println!("Hello World!");
}
~~~
Now let’s deep dive into this piece of code in detail. Here’s the first building block:

~~~
fn main() {
}
~~~
This is the main function which is the startting point of a Rust program. The \`fn\` keyword defines it and it does not take any parameters and also does not return any values.
Next, a pair of curly braces (\`{}\`) are used to wrap the body of the main function in it.

~~~
println!("Hello, world!");
~~~
And then, this line does all the magic. The \`println!\` used here is not a function call but actually a macro (notice there is an exclamation mark ! after it). This macro prints whatever string is passed to it, in this case a "Hello World!" enclosed in double quotes.
Finally, we have added a semicolon (\`;\`) at the end which indicates that the expression is complete and we can move to the next one.

#### Now, lets move on to the next lesson where we will learn about variables and data types.
`,
    baseCode: `fn main() {
    println!("Hello, world!");
}
`,
    examples: []
}