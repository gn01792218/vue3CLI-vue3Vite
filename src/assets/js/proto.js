/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/light");

var $root = ($protobuf.roots["default"] || ($protobuf.roots["default"] = new $protobuf.Root()))
.addJSON({
  auth: {
    options: {
      go_package: "baccarat-game-server/protobufs/auth"
    },
    nested: {
      Information: {
        fields: {
          header: {
            type: "foundation.Header",
            id: 1
          },
          name: {
            type: "string",
            id: 2
          },
          wallet: {
            type: "double",
            id: 3
          }
        }
      },
      LoginCall: {
        fields: {
          header: {
            type: "foundation.Header",
            id: 1
          },
          account: {
            type: "string",
            id: 2
          },
          password: {
            type: "string",
            id: 3
          }
        }
      },
      LoginRecall: {
        fields: {
          header: {
            type: "foundation.Header",
            id: 1
          },
          status: {
            type: "int32",
            id: 2
          }
        }
      }
    }
  },
  foundation: {
    options: {
      go_package: "baccarat-game-server/protobufs/foundation"
    },
    nested: {
      Header: {
        fields: {
          uri: {
            type: "string",
            id: 1
          }
        }
      }
    }
  },
  lobby: {
    options: {
      go_package: "baccarat-game-server/protobufs/lobby"
    },
    nested: {
      LobbyInfo: {
        fields: {
          header: {
            type: "foundation.Header",
            id: 1
          },
          tables: {
            rule: "repeated",
            type: "TableInfo",
            id: 2
          }
        }
      },
      TableInfo: {
        fields: {
          uuid: {
            type: "string",
            id: 1
          },
          name: {
            type: "string",
            id: 2
          }
        }
      }
    }
  },
  table: {
    options: {
      go_package: "baccarat-game-server/protobufs/table"
    },
    nested: {
      Table: {
        fields: {
          betStatus: {
            type: "BetStatus",
            id: 1
          },
          streamingUrl: {
            type: "string",
            id: 2
          }
        }
      },
      TableJoinCall: {
        fields: {
          header: {
            type: "foundation.Header",
            id: 1
          },
          uuid: {
            type: "string",
            id: 2
          }
        }
      },
      TableJoinRecall: {
        fields: {
          header: {
            type: "foundation.Header",
            id: 1
          },
          table: {
            type: "Table",
            id: 2
          }
        }
      },
      BetStatus: {
        fields: {
          Banker: {
            type: "int32",
            id: 1
          },
          Player: {
            type: "int32",
            id: 2
          },
          Tie: {
            type: "int32",
            id: 3
          },
          BankerPair: {
            type: "int32",
            id: 4
          },
          PlayerPair: {
            type: "int32",
            id: 5
          },
          BankerNatural: {
            type: "int32",
            id: 6
          },
          PlayerNatural: {
            type: "int32",
            id: 7
          }
        }
      }
    }
  }
});

module.exports = $root;
