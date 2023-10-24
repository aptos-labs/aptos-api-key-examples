use anyhow::Result;
use aptos_sdk::rest_client::{AptosBaseUrl, ClientBuilder};
use aptos_sdk::types::account_address::AccountAddress;
use url::Url;

#[tokio::main]
async fn main() -> Result<()> {
    let url = Url::parse("https://api.mainnet.aptoslabs.com").unwrap();
    let url = AptosBaseUrl::Custom(url);
    let rest_client = ClientBuilder::new(url).api_key("<key>")?.build();
    let account = rest_client
        .get_account(AccountAddress::from_str_strict("0x1")?)
        .await?;
    println!("Account: {:#?}", account);
    Ok(())
}
