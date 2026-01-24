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
    const result = await fetch(`${this.dns}/events/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  },

  setHandlers() {
    window.addEventListener("error", (ev) => {
      this.send({
        description: ev.message,
      });
    });
  },
};

export default Zendash;
