use aptos_sdk::rest_client::Client;

fn main() {
    let rest_client = Client::new(NODE_URL.clone());
    println!("Hello, world!");
}
