import Bootle from 'bottlejs';

import LogService from './services/LogService';

const bottle_instance = new Bootle();

function IoC({ logUrl } = {}) {
  if (!logUrl) throw new Error("logUrl is required");

  // inject service
  LogService(bottle_instance, logUrl);
  return bottle_instance.container;
}

export default IoC;