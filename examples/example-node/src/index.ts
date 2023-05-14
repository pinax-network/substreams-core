import { fetchSubstream } from "./fetch.js";
import { token } from "./token.js";
import { createPromiseClient } from "@bufbuild/connect";
import { createGrpcTransport } from "@bufbuild/connect-node";
import { Stream, createAuthInterceptor, createRegistry, createRequest, getModuleOrThrow } from "@fubhy/substreams";

const SUBSTREAM = "https://github.com/streamingfast/substreams-uniswap-v3/releases/download/v0.2.1/substreams.spkg";
const MODULE = "map_pools_created";

const substream = await fetchSubstream(SUBSTREAM);
const module = getModuleOrThrow(substream, MODULE);
const registry = createRegistry(substream);
const transport = createGrpcTransport({
  baseUrl: "https://api.streamingfast.io",
  httpVersion: "2",
  interceptors: [createAuthInterceptor(token)],
  jsonOptions: {
    typeRegistry: registry,
  },
});

const client = createPromiseClient(Stream, transport);
const request = createRequest(substream, module, {
  productionMode: true,
});

const stream = client.blocks(request);

for await (const response of stream) {
  const message = response.message;

  switch (message.case) {
    case "blockScopedData": {
      const output = message.value.output?.mapOutput;

      if (output !== undefined && output.value.byteLength > 0) {
        const json = output.toJson({
          typeRegistry: registry,
        });

        console.dir(json, { depth: 3, colors: true });
      }
    }
  }
}
