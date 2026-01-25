interface UserAgentData {
  brands: { brand: string; version: string }[];
  mobile: boolean;
  platform: string;
}

declare global {
  interface Navigator {
    userAgentData: UserAgentData;
  }
}

interface Zendash {
  dns: string | null;
  init: (config: ZendashConfig) => void;
  send: (payload: Record<string, any>) => void;
  setHandlers: () => void;
}

interface ZendashConfig {
  dns: string | null;
}

const Zendash: Zendash = {
  dns: null,

  async init(config) {
    this.dns = config.dns;
    this.setHandlers();
  },

  async send(payload) {
    const result = await fetch(this.dns!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  },

  setHandlers() {
    window.addEventListener("error", (ev) => {
      // UserAgentData gives better data rather than UserAgent
      let browser;
      let platform;

      if (navigator.userAgentData) {
        browser = `${navigator.userAgentData.brands[0].brand}@${navigator.userAgentData.brands[0].version}`;
        platform = navigator.userAgentData.platform;
      }

      this.send({
        description: ev.error.message,
        stack: ev.error.stack,
        type: ev.type,
        file: ev.filename,
        source: "window.onerror",
        platform,
        browser,
      });
    });
  },
};

export default Zendash;
