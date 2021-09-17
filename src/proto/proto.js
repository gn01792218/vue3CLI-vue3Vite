/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/light");

var $root = ($protobuf.roots["default"] || ($protobuf.roots["default"] = new $protobuf.Root()))
.addJSON({
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
  }
});

module.exports = $root;
