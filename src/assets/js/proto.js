/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/light";

const $root = ($protobuf.roots["default"] || ($protobuf.roots["default"] = new $protobuf.Root()))
.addJSON({
  auth: {
    options: {
      go_package: "baccarat-game-server/protobufs/auth"
    },
    nested: {
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
      },
      UserInfo: {
        fields: {
          header: {
            type: "foundation.Header",
            id: 1
          },
          user: {
            type: "User",
            id: 2
          }
        }
      },
      User: {
        fields: {
          name: {
            type: "string",
            id: 1
          },
          wallet: {
            type: "double",
            id: 2
          }
        }
      }
    }
  },
  bet: {
    options: {
      go_package: "baccarat-game-server/protobufs/bet"
    },
    nested: {
      Error: {
        values: {
          Default: 1,
          BetIndexInvalid: 2,
          BetAreaInvalid: 3,
          ReachMaxLimit: 4,
          RoundNotFound: 5
        }
      },
      BetArea: {
        values: {
          Banker: 1,
          Player: 2,
          BankerPair: 3,
          Tie: 4,
          PlayerPair: 5
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
          BankerPair: {
            type: "int32",
            id: 3
          },
          Tie: {
            type: "int32",
            id: 4
          },
          PlayerPair: {
            type: "int32",
            id: 5
          }
        }
      },
      BetCall: {
        fields: {
          gameUuid: {
            type: "string",
            id: 1
          },
          betIndex: {
            type: "int32",
            id: 2
          },
          betArea: {
            type: "BetArea",
            id: 3
          }
        }
      },
      BetRecall: {
        fields: {
          result: {
            type: "int32",
            id: 1
          },
          betStatus: {
            type: "BetStatus",
            id: 2
          }
        }
      },
      BetError: {
        fields: {
          error: {
            type: "Error",
            id: 1
          },
          errorMessage: {
            type: "string",
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
            type: "route.URI",
            id: 1
          }
        }
      },
      Message: {
        fields: {
          header: {
            type: "foundation.Header",
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
  route: {
    options: {
      go_package: "baccarat-game-server/protobufs/route"
    },
    nested: {
      URI: {
        values: {
          Default: 0,
          LoginCall: 1,
          LoginRecall: 2,
          LobbyInfo: 3,
          UserInfo: 4,
          TableJoinCall: 5,
          TableJoinRecall: 6,
          BetCall: 7,
          BetRecall: 8
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

export { $root as default };
