import { createThirdwebClient } from "thirdweb";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = "173c7eeee7a6ad6230b6b9249c522986";

export const client = createThirdwebClient({
  clientId: clientId,
});