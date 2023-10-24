import argparse
import asyncio
import logging

from aptos_sdk.account_address import AccountAddress
from aptos_sdk.async_client import RestClient

logging.basicConfig(level="INFO", format="%(asctime)s - %(levelname)s - %(message)s")


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("-d", "--debug", action="store_true")
    parser.add_argument("--node-api-url", required=True)
    parser.add_argument("--api-key", required=True)
    args = parser.parse_args()
    return args


async def main():
    args = parse_args()

    if args.debug:
        logging.setLevel("DEBUG")

    node_api_client = RestClient(args.node_api_url)
    node_api_client.client.headers["Authorization"] = f"Bearer {args.api_key}"

    response = await node_api_client.account(AccountAddress.from_str("0x1"))

    print(response)


if __name__ == "__main__":
    asyncio.run(main())
