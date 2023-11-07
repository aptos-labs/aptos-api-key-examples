import { Aptos, AptosConfig, ClientConfig, Network } from "@aptos-labs/ts-sdk";
import { command, run, string, option } from 'cmd-ts';

const main = async ({ indexerApiUrl, apiKey }: { indexerApiUrl: string, apiKey: string }) => {
  const clientConfig: ClientConfig = {
    TOKEN: apiKey
  };
  const config = new AptosConfig({ indexer: indexerApiUrl, clientConfig });
  const aptos = new Aptos(config);

  const response = await aptos.staking.getNumberOfDelegatorsForAllPools();

  console.log(response);
}

// This defines how to parse the CLI args.
const app = command({
  name: 'app',
  args: {
    indexerApiUrl: option({ type: string, long: 'indexer-api-url' }),
    apiKey: option({ type: string, long: 'api-key' }),
  },
  handler: main
});

run(app, process.argv.slice(2));
