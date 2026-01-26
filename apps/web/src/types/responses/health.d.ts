type Status = "up" | "down";

interface HealthResponse {
  status: "ok" | "error";
  info: {
    database: {
      status: Status;
    };
    memory_heap: {
      status: Status;
    };
    storage: {
      status: Status;
    };
  };
  error: {
    database?: {
      status: "down";
    };
    memory_heap?: {
      status: "down";
    };
    storage?: {
      status: "down";
    };
  };
  details: {
    database: {
      status: Status;
    };
    memory_heap: {
      status: Status;
    };
    storage: {
      status: Status;
    };
  };
}
