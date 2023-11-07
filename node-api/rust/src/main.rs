use anyhow::Result;
use aptos_sdk::rest_client::{AptosBaseUrl, ClientBuilder};
use aptos_sdk::types::account_address::AccountAddress;
use clap::Parser;
use url::Url;

#[derive(Debug, Parser)]
struct Args {
    #[clap(long)]
    node_api_url: Url,

    #[clap(long, env)]
    api_key: String,
}

#[tokio::main]
async fn main() -> Result<()> {
    let args = Args::parse();
    let url = AptosBaseUrl::Custom(args.node_api_url);
    let node_api_client = ClientBuilder::new(url).api_key(&args.api_key)?.build();
    let account = node_api_client
        .get_account(AccountAddress::from_str_strict("0x1")?)
        .await?;
    println!("Account: {:#?}", account);
    Ok(())
}
