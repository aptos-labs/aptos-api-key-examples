import { Aptos, AptosConfig, ClientConfig, Network } from "@aptos-labs/ts-sdk";
import { command, run, string, option } from 'cmd-ts';

const main = async ({ nodeApiUrl, apiKey }: { nodeApiUrl: string, apiKey: string }) => {
  const clientConfig: ClientConfig = {
    TOKEN: apiKey
  };
  const config = new AptosConfig({ fullnode: nodeApiUrl, network: Network.MAINNET, clientConfig });
  const aptos = new Aptos(config);

  const response = await aptos.account.getAccountInfo({ accountAddress: "0x1" });

  console.log(response);
}

// This defines how to parse the CLI args.
const app = command({
  name: 'app',
  args: {
    nodeApiUrl: option({ type: string, long: 'node-api-url' }),
    apiKey: option({ type: string, long: 'api-key' }),
  },
  handler: main
});

run(app, process.argv.slice(2));
