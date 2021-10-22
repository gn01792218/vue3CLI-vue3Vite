/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const auth = $root.auth = (() => {

    /**
     * Namespace auth.
     * @exports auth
     * @namespace
     */
    const auth = {};

    auth.LoginCall = (function() {

        /**
         * Properties of a LoginCall.
         * @memberof auth
         * @interface ILoginCall
         * @property {foundation.IHeader|null} [header] LoginCall header
         * @property {string|null} [account] LoginCall account
         * @property {string|null} [password] LoginCall password
         */

        /**
         * Constructs a new LoginCall.
         * @memberof auth
         * @classdesc Represents a LoginCall.
         * @implements ILoginCall
         * @constructor
         * @param {auth.ILoginCall=} [properties] Properties to set
         */
        function LoginCall(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LoginCall header.
         * @member {foundation.IHeader|null|undefined} header
         * @memberof auth.LoginCall
         * @instance
         */
        LoginCall.prototype.header = null;

        /**
         * LoginCall account.
         * @member {string} account
         * @memberof auth.LoginCall
         * @instance
         */
        LoginCall.prototype.account = "";

        /**
         * LoginCall password.
         * @member {string} password
         * @memberof auth.LoginCall
         * @instance
         */
        LoginCall.prototype.password = "";

        /**
         * Creates a new LoginCall instance using the specified properties.
         * @function create
         * @memberof auth.LoginCall
         * @static
         * @param {auth.ILoginCall=} [properties] Properties to set
         * @returns {auth.LoginCall} LoginCall instance
         */
        LoginCall.create = function create(properties) {
            return new LoginCall(properties);
        };

        /**
         * Encodes the specified LoginCall message. Does not implicitly {@link auth.LoginCall.verify|verify} messages.
         * @function encode
         * @memberof auth.LoginCall
         * @static
         * @param {auth.ILoginCall} message LoginCall message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginCall.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                $root.foundation.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.account != null && Object.hasOwnProperty.call(message, "account"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.account);
            if (message.password != null && Object.hasOwnProperty.call(message, "password"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.password);
            return writer;
        };

        /**
         * Encodes the specified LoginCall message, length delimited. Does not implicitly {@link auth.LoginCall.verify|verify} messages.
         * @function encodeDelimited
         * @memberof auth.LoginCall
         * @static
         * @param {auth.ILoginCall} message LoginCall message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginCall.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LoginCall message from the specified reader or buffer.
         * @function decode
         * @memberof auth.LoginCall
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {auth.LoginCall} LoginCall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginCall.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.auth.LoginCall();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.header = $root.foundation.Header.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.account = reader.string();
                    break;
                case 3:
                    message.password = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LoginCall message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof auth.LoginCall
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {auth.LoginCall} LoginCall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginCall.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LoginCall message.
         * @function verify
         * @memberof auth.LoginCall
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LoginCall.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.header != null && message.hasOwnProperty("header")) {
                let error = $root.foundation.Header.verify(message.header);
                if (error)
                    return "header." + error;
            }
            if (message.account != null && message.hasOwnProperty("account"))
                if (!$util.isString(message.account))
                    return "account: string expected";
            if (message.password != null && message.hasOwnProperty("password"))
                if (!$util.isString(message.password))
                    return "password: string expected";
            return null;
        };

        /**
         * Creates a LoginCall message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof auth.LoginCall
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {auth.LoginCall} LoginCall
         */
        LoginCall.fromObject = function fromObject(object) {
            if (object instanceof $root.auth.LoginCall)
                return object;
            let message = new $root.auth.LoginCall();
            if (object.header != null) {
                if (typeof object.header !== "object")
                    throw TypeError(".auth.LoginCall.header: object expected");
                message.header = $root.foundation.Header.fromObject(object.header);
            }
            if (object.account != null)
                message.account = String(object.account);
            if (object.password != null)
                message.password = String(object.password);
            return message;
        };

        /**
         * Creates a plain object from a LoginCall message. Also converts values to other types if specified.
         * @function toObject
         * @memberof auth.LoginCall
         * @static
         * @param {auth.LoginCall} message LoginCall
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LoginCall.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.header = null;
                object.account = "";
                object.password = "";
            }
            if (message.header != null && message.hasOwnProperty("header"))
                object.header = $root.foundation.Header.toObject(message.header, options);
            if (message.account != null && message.hasOwnProperty("account"))
                object.account = message.account;
            if (message.password != null && message.hasOwnProperty("password"))
                object.password = message.password;
            return object;
        };

        /**
         * Converts this LoginCall to JSON.
         * @function toJSON
         * @memberof auth.LoginCall
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LoginCall.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LoginCall;
    })();

    auth.LoginRecall = (function() {

        /**
         * Properties of a LoginRecall.
         * @memberof auth
         * @interface ILoginRecall
         * @property {foundation.IHeader|null} [header] LoginRecall header
         * @property {number|null} [status] LoginRecall status
         */

        /**
         * Constructs a new LoginRecall.
         * @memberof auth
         * @classdesc Represents a LoginRecall.
         * @implements ILoginRecall
         * @constructor
         * @param {auth.ILoginRecall=} [properties] Properties to set
         */
        function LoginRecall(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LoginRecall header.
         * @member {foundation.IHeader|null|undefined} header
         * @memberof auth.LoginRecall
         * @instance
         */
        LoginRecall.prototype.header = null;

        /**
         * LoginRecall status.
         * @member {number} status
         * @memberof auth.LoginRecall
         * @instance
         */
        LoginRecall.prototype.status = 0;

        /**
         * Creates a new LoginRecall instance using the specified properties.
         * @function create
         * @memberof auth.LoginRecall
         * @static
         * @param {auth.ILoginRecall=} [properties] Properties to set
         * @returns {auth.LoginRecall} LoginRecall instance
         */
        LoginRecall.create = function create(properties) {
            return new LoginRecall(properties);
        };

        /**
         * Encodes the specified LoginRecall message. Does not implicitly {@link auth.LoginRecall.verify|verify} messages.
         * @function encode
         * @memberof auth.LoginRecall
         * @static
         * @param {auth.ILoginRecall} message LoginRecall message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginRecall.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                $root.foundation.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.status);
            return writer;
        };

        /**
         * Encodes the specified LoginRecall message, length delimited. Does not implicitly {@link auth.LoginRecall.verify|verify} messages.
         * @function encodeDelimited
         * @memberof auth.LoginRecall
         * @static
         * @param {auth.ILoginRecall} message LoginRecall message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginRecall.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LoginRecall message from the specified reader or buffer.
         * @function decode
         * @memberof auth.LoginRecall
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {auth.LoginRecall} LoginRecall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginRecall.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.auth.LoginRecall();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.header = $root.foundation.Header.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.status = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LoginRecall message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof auth.LoginRecall
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {auth.LoginRecall} LoginRecall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginRecall.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LoginRecall message.
         * @function verify
         * @memberof auth.LoginRecall
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LoginRecall.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.header != null && message.hasOwnProperty("header")) {
                let error = $root.foundation.Header.verify(message.header);
                if (error)
                    return "header." + error;
            }
            if (message.status != null && message.hasOwnProperty("status"))
                if (!$util.isInteger(message.status))
                    return "status: integer expected";
            return null;
        };

        /**
         * Creates a LoginRecall message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof auth.LoginRecall
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {auth.LoginRecall} LoginRecall
         */
        LoginRecall.fromObject = function fromObject(object) {
            if (object instanceof $root.auth.LoginRecall)
                return object;
            let message = new $root.auth.LoginRecall();
            if (object.header != null) {
                if (typeof object.header !== "object")
                    throw TypeError(".auth.LoginRecall.header: object expected");
                message.header = $root.foundation.Header.fromObject(object.header);
            }
            if (object.status != null)
                message.status = object.status | 0;
            return message;
        };

        /**
         * Creates a plain object from a LoginRecall message. Also converts values to other types if specified.
         * @function toObject
         * @memberof auth.LoginRecall
         * @static
         * @param {auth.LoginRecall} message LoginRecall
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LoginRecall.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.header = null;
                object.status = 0;
            }
            if (message.header != null && message.hasOwnProperty("header"))
                object.header = $root.foundation.Header.toObject(message.header, options);
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = message.status;
            return object;
        };

        /**
         * Converts this LoginRecall to JSON.
         * @function toJSON
         * @memberof auth.LoginRecall
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LoginRecall.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LoginRecall;
    })();

    auth.UserInfo = (function() {

        /**
         * Properties of a UserInfo.
         * @memberof auth
         * @interface IUserInfo
         * @property {foundation.IHeader|null} [header] UserInfo header
         * @property {auth.IUser|null} [user] UserInfo user
         */

        /**
         * Constructs a new UserInfo.
         * @memberof auth
         * @classdesc Represents a UserInfo.
         * @implements IUserInfo
         * @constructor
         * @param {auth.IUserInfo=} [properties] Properties to set
         */
        function UserInfo(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserInfo header.
         * @member {foundation.IHeader|null|undefined} header
         * @memberof auth.UserInfo
         * @instance
         */
        UserInfo.prototype.header = null;

        /**
         * UserInfo user.
         * @member {auth.IUser|null|undefined} user
         * @memberof auth.UserInfo
         * @instance
         */
        UserInfo.prototype.user = null;

        /**
         * Creates a new UserInfo instance using the specified properties.
         * @function create
         * @memberof auth.UserInfo
         * @static
         * @param {auth.IUserInfo=} [properties] Properties to set
         * @returns {auth.UserInfo} UserInfo instance
         */
        UserInfo.create = function create(properties) {
            return new UserInfo(properties);
        };

        /**
         * Encodes the specified UserInfo message. Does not implicitly {@link auth.UserInfo.verify|verify} messages.
         * @function encode
         * @memberof auth.UserInfo
         * @static
         * @param {auth.IUserInfo} message UserInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                $root.foundation.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.user != null && Object.hasOwnProperty.call(message, "user"))
                $root.auth.User.encode(message.user, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified UserInfo message, length delimited. Does not implicitly {@link auth.UserInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof auth.UserInfo
         * @static
         * @param {auth.IUserInfo} message UserInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserInfo message from the specified reader or buffer.
         * @function decode
         * @memberof auth.UserInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {auth.UserInfo} UserInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.auth.UserInfo();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.header = $root.foundation.Header.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.user = $root.auth.User.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof auth.UserInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {auth.UserInfo} UserInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserInfo message.
         * @function verify
         * @memberof auth.UserInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.header != null && message.hasOwnProperty("header")) {
                let error = $root.foundation.Header.verify(message.header);
                if (error)
                    return "header." + error;
            }
            if (message.user != null && message.hasOwnProperty("user")) {
                let error = $root.auth.User.verify(message.user);
                if (error)
                    return "user." + error;
            }
            return null;
        };

        /**
         * Creates a UserInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof auth.UserInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {auth.UserInfo} UserInfo
         */
        UserInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.auth.UserInfo)
                return object;
            let message = new $root.auth.UserInfo();
            if (object.header != null) {
                if (typeof object.header !== "object")
                    throw TypeError(".auth.UserInfo.header: object expected");
                message.header = $root.foundation.Header.fromObject(object.header);
            }
            if (object.user != null) {
                if (typeof object.user !== "object")
                    throw TypeError(".auth.UserInfo.user: object expected");
                message.user = $root.auth.User.fromObject(object.user);
            }
            return message;
        };

        /**
         * Creates a plain object from a UserInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof auth.UserInfo
         * @static
         * @param {auth.UserInfo} message UserInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.header = null;
                object.user = null;
            }
            if (message.header != null && message.hasOwnProperty("header"))
                object.header = $root.foundation.Header.toObject(message.header, options);
            if (message.user != null && message.hasOwnProperty("user"))
                object.user = $root.auth.User.toObject(message.user, options);
            return object;
        };

        /**
         * Converts this UserInfo to JSON.
         * @function toJSON
         * @memberof auth.UserInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserInfo;
    })();

    auth.User = (function() {

        /**
         * Properties of a User.
         * @memberof auth
         * @interface IUser
         * @property {string|null} [name] User name
         * @property {number|null} [wallet] User wallet
         */

        /**
         * Constructs a new User.
         * @memberof auth
         * @classdesc Represents a User.
         * @implements IUser
         * @constructor
         * @param {auth.IUser=} [properties] Properties to set
         */
        function User(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * User name.
         * @member {string} name
         * @memberof auth.User
         * @instance
         */
        User.prototype.name = "";

        /**
         * User wallet.
         * @member {number} wallet
         * @memberof auth.User
         * @instance
         */
        User.prototype.wallet = 0;

        /**
         * Creates a new User instance using the specified properties.
         * @function create
         * @memberof auth.User
         * @static
         * @param {auth.IUser=} [properties] Properties to set
         * @returns {auth.User} User instance
         */
        User.create = function create(properties) {
            return new User(properties);
        };

        /**
         * Encodes the specified User message. Does not implicitly {@link auth.User.verify|verify} messages.
         * @function encode
         * @memberof auth.User
         * @static
         * @param {auth.IUser} message User message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        User.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            if (message.wallet != null && Object.hasOwnProperty.call(message, "wallet"))
                writer.uint32(/* id 2, wireType 1 =*/17).double(message.wallet);
            return writer;
        };

        /**
         * Encodes the specified User message, length delimited. Does not implicitly {@link auth.User.verify|verify} messages.
         * @function encodeDelimited
         * @memberof auth.User
         * @static
         * @param {auth.IUser} message User message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        User.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a User message from the specified reader or buffer.
         * @function decode
         * @memberof auth.User
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {auth.User} User
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        User.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.auth.User();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.wallet = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a User message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof auth.User
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {auth.User} User
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        User.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a User message.
         * @function verify
         * @memberof auth.User
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        User.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.wallet != null && message.hasOwnProperty("wallet"))
                if (typeof message.wallet !== "number")
                    return "wallet: number expected";
            return null;
        };

        /**
         * Creates a User message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof auth.User
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {auth.User} User
         */
        User.fromObject = function fromObject(object) {
            if (object instanceof $root.auth.User)
                return object;
            let message = new $root.auth.User();
            if (object.name != null)
                message.name = String(object.name);
            if (object.wallet != null)
                message.wallet = Number(object.wallet);
            return message;
        };

        /**
         * Creates a plain object from a User message. Also converts values to other types if specified.
         * @function toObject
         * @memberof auth.User
         * @static
         * @param {auth.User} message User
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        User.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.name = "";
                object.wallet = 0;
            }
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.wallet != null && message.hasOwnProperty("wallet"))
                object.wallet = options.json && !isFinite(message.wallet) ? String(message.wallet) : message.wallet;
            return object;
        };

        /**
         * Converts this User to JSON.
         * @function toJSON
         * @memberof auth.User
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        User.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return User;
    })();

    return auth;
})();

export const bet = $root.bet = (() => {

    /**
     * Namespace bet.
     * @exports bet
     * @namespace
     */
    const bet = {};

    /**
     * Error enum.
     * @name bet.Error
     * @enum {number}
     * @property {number} ErrorDefault=0 ErrorDefault value
     * @property {number} BetIndexInvalid=1 BetIndexInvalid value
     * @property {number} BetAreaInvalid=2 BetAreaInvalid value
     * @property {number} ReachMaxLimit=3 ReachMaxLimit value
     * @property {number} RoundNotFound=4 RoundNotFound value
     * @property {number} NoEnoughWallet=5 NoEnoughWallet value
     */
    bet.Error = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "ErrorDefault"] = 0;
        values[valuesById[1] = "BetIndexInvalid"] = 1;
        values[valuesById[2] = "BetAreaInvalid"] = 2;
        values[valuesById[3] = "ReachMaxLimit"] = 3;
        values[valuesById[4] = "RoundNotFound"] = 4;
        values[valuesById[5] = "NoEnoughWallet"] = 5;
        return values;
    })();

    /**
     * BetArea enum.
     * @name bet.BetArea
     * @enum {number}
     * @property {number} BetAreaDefault=0 BetAreaDefault value
     * @property {number} Banker=1 Banker value
     * @property {number} Player=2 Player value
     * @property {number} BankerPair=3 BankerPair value
     * @property {number} Tie=4 Tie value
     * @property {number} PlayerPair=5 PlayerPair value
     */
    bet.BetArea = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "BetAreaDefault"] = 0;
        values[valuesById[1] = "Banker"] = 1;
        values[valuesById[2] = "Player"] = 2;
        values[valuesById[3] = "BankerPair"] = 3;
        values[valuesById[4] = "Tie"] = 4;
        values[valuesById[5] = "PlayerPair"] = 5;
        return values;
    })();

    bet.BetStatus = (function() {

        /**
         * Properties of a BetStatus.
         * @memberof bet
         * @interface IBetStatus
         * @property {number|null} [Banker] BetStatus Banker
         * @property {number|null} [Player] BetStatus Player
         * @property {number|null} [BankerPair] BetStatus BankerPair
         * @property {number|null} [Tie] BetStatus Tie
         * @property {number|null} [PlayerPair] BetStatus PlayerPair
         */

        /**
         * Constructs a new BetStatus.
         * @memberof bet
         * @classdesc Represents a BetStatus.
         * @implements IBetStatus
         * @constructor
         * @param {bet.IBetStatus=} [properties] Properties to set
         */
        function BetStatus(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BetStatus Banker.
         * @member {number} Banker
         * @memberof bet.BetStatus
         * @instance
         */
        BetStatus.prototype.Banker = 0;

        /**
         * BetStatus Player.
         * @member {number} Player
         * @memberof bet.BetStatus
         * @instance
         */
        BetStatus.prototype.Player = 0;

        /**
         * BetStatus BankerPair.
         * @member {number} BankerPair
         * @memberof bet.BetStatus
         * @instance
         */
        BetStatus.prototype.BankerPair = 0;

        /**
         * BetStatus Tie.
         * @member {number} Tie
         * @memberof bet.BetStatus
         * @instance
         */
        BetStatus.prototype.Tie = 0;

        /**
         * BetStatus PlayerPair.
         * @member {number} PlayerPair
         * @memberof bet.BetStatus
         * @instance
         */
        BetStatus.prototype.PlayerPair = 0;

        /**
         * Creates a new BetStatus instance using the specified properties.
         * @function create
         * @memberof bet.BetStatus
         * @static
         * @param {bet.IBetStatus=} [properties] Properties to set
         * @returns {bet.BetStatus} BetStatus instance
         */
        BetStatus.create = function create(properties) {
            return new BetStatus(properties);
        };

        /**
         * Encodes the specified BetStatus message. Does not implicitly {@link bet.BetStatus.verify|verify} messages.
         * @function encode
         * @memberof bet.BetStatus
         * @static
         * @param {bet.IBetStatus} message BetStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BetStatus.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Banker != null && Object.hasOwnProperty.call(message, "Banker"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.Banker);
            if (message.Player != null && Object.hasOwnProperty.call(message, "Player"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.Player);
            if (message.BankerPair != null && Object.hasOwnProperty.call(message, "BankerPair"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.BankerPair);
            if (message.Tie != null && Object.hasOwnProperty.call(message, "Tie"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.Tie);
            if (message.PlayerPair != null && Object.hasOwnProperty.call(message, "PlayerPair"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.PlayerPair);
            return writer;
        };

        /**
         * Encodes the specified BetStatus message, length delimited. Does not implicitly {@link bet.BetStatus.verify|verify} messages.
         * @function encodeDelimited
         * @memberof bet.BetStatus
         * @static
         * @param {bet.IBetStatus} message BetStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BetStatus.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BetStatus message from the specified reader or buffer.
         * @function decode
         * @memberof bet.BetStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {bet.BetStatus} BetStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BetStatus.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bet.BetStatus();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Banker = reader.int32();
                    break;
                case 2:
                    message.Player = reader.int32();
                    break;
                case 3:
                    message.BankerPair = reader.int32();
                    break;
                case 4:
                    message.Tie = reader.int32();
                    break;
                case 5:
                    message.PlayerPair = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BetStatus message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof bet.BetStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {bet.BetStatus} BetStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BetStatus.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BetStatus message.
         * @function verify
         * @memberof bet.BetStatus
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BetStatus.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Banker != null && message.hasOwnProperty("Banker"))
                if (!$util.isInteger(message.Banker))
                    return "Banker: integer expected";
            if (message.Player != null && message.hasOwnProperty("Player"))
                if (!$util.isInteger(message.Player))
                    return "Player: integer expected";
            if (message.BankerPair != null && message.hasOwnProperty("BankerPair"))
                if (!$util.isInteger(message.BankerPair))
                    return "BankerPair: integer expected";
            if (message.Tie != null && message.hasOwnProperty("Tie"))
                if (!$util.isInteger(message.Tie))
                    return "Tie: integer expected";
            if (message.PlayerPair != null && message.hasOwnProperty("PlayerPair"))
                if (!$util.isInteger(message.PlayerPair))
                    return "PlayerPair: integer expected";
            return null;
        };

        /**
         * Creates a BetStatus message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof bet.BetStatus
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {bet.BetStatus} BetStatus
         */
        BetStatus.fromObject = function fromObject(object) {
            if (object instanceof $root.bet.BetStatus)
                return object;
            let message = new $root.bet.BetStatus();
            if (object.Banker != null)
                message.Banker = object.Banker | 0;
            if (object.Player != null)
                message.Player = object.Player | 0;
            if (object.BankerPair != null)
                message.BankerPair = object.BankerPair | 0;
            if (object.Tie != null)
                message.Tie = object.Tie | 0;
            if (object.PlayerPair != null)
                message.PlayerPair = object.PlayerPair | 0;
            return message;
        };

        /**
         * Creates a plain object from a BetStatus message. Also converts values to other types if specified.
         * @function toObject
         * @memberof bet.BetStatus
         * @static
         * @param {bet.BetStatus} message BetStatus
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BetStatus.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.Banker = 0;
                object.Player = 0;
                object.BankerPair = 0;
                object.Tie = 0;
                object.PlayerPair = 0;
            }
            if (message.Banker != null && message.hasOwnProperty("Banker"))
                object.Banker = message.Banker;
            if (message.Player != null && message.hasOwnProperty("Player"))
                object.Player = message.Player;
            if (message.BankerPair != null && message.hasOwnProperty("BankerPair"))
                object.BankerPair = message.BankerPair;
            if (message.Tie != null && message.hasOwnProperty("Tie"))
                object.Tie = message.Tie;
            if (message.PlayerPair != null && message.hasOwnProperty("PlayerPair"))
                object.PlayerPair = message.PlayerPair;
            return object;
        };

        /**
         * Converts this BetStatus to JSON.
         * @function toJSON
         * @memberof bet.BetStatus
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BetStatus.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BetStatus;
    })();

    bet.BetCall = (function() {

        /**
         * Properties of a BetCall.
         * @memberof bet
         * @interface IBetCall
         * @property {foundation.IHeader|null} [header] BetCall header
         * @property {string|null} [gameUuid] BetCall gameUuid
         * @property {number|null} [betIndex] BetCall betIndex
         * @property {bet.BetArea|null} [betArea] BetCall betArea
         */

        /**
         * Constructs a new BetCall.
         * @memberof bet
         * @classdesc Represents a BetCall.
         * @implements IBetCall
         * @constructor
         * @param {bet.IBetCall=} [properties] Properties to set
         */
        function BetCall(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BetCall header.
         * @member {foundation.IHeader|null|undefined} header
         * @memberof bet.BetCall
         * @instance
         */
        BetCall.prototype.header = null;

        /**
         * BetCall gameUuid.
         * @member {string} gameUuid
         * @memberof bet.BetCall
         * @instance
         */
        BetCall.prototype.gameUuid = "";

        /**
         * BetCall betIndex.
         * @member {number} betIndex
         * @memberof bet.BetCall
         * @instance
         */
        BetCall.prototype.betIndex = 0;

        /**
         * BetCall betArea.
         * @member {bet.BetArea} betArea
         * @memberof bet.BetCall
         * @instance
         */
        BetCall.prototype.betArea = 0;

        /**
         * Creates a new BetCall instance using the specified properties.
         * @function create
         * @memberof bet.BetCall
         * @static
         * @param {bet.IBetCall=} [properties] Properties to set
         * @returns {bet.BetCall} BetCall instance
         */
        BetCall.create = function create(properties) {
            return new BetCall(properties);
        };

        /**
         * Encodes the specified BetCall message. Does not implicitly {@link bet.BetCall.verify|verify} messages.
         * @function encode
         * @memberof bet.BetCall
         * @static
         * @param {bet.IBetCall} message BetCall message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BetCall.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                $root.foundation.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.gameUuid != null && Object.hasOwnProperty.call(message, "gameUuid"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.gameUuid);
            if (message.betIndex != null && Object.hasOwnProperty.call(message, "betIndex"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.betIndex);
            if (message.betArea != null && Object.hasOwnProperty.call(message, "betArea"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.betArea);
            return writer;
        };

        /**
         * Encodes the specified BetCall message, length delimited. Does not implicitly {@link bet.BetCall.verify|verify} messages.
         * @function encodeDelimited
         * @memberof bet.BetCall
         * @static
         * @param {bet.IBetCall} message BetCall message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BetCall.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BetCall message from the specified reader or buffer.
         * @function decode
         * @memberof bet.BetCall
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {bet.BetCall} BetCall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BetCall.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bet.BetCall();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.header = $root.foundation.Header.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.gameUuid = reader.string();
                    break;
                case 3:
                    message.betIndex = reader.int32();
                    break;
                case 4:
                    message.betArea = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BetCall message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof bet.BetCall
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {bet.BetCall} BetCall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BetCall.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BetCall message.
         * @function verify
         * @memberof bet.BetCall
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BetCall.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.header != null && message.hasOwnProperty("header")) {
                let error = $root.foundation.Header.verify(message.header);
                if (error)
                    return "header." + error;
            }
            if (message.gameUuid != null && message.hasOwnProperty("gameUuid"))
                if (!$util.isString(message.gameUuid))
                    return "gameUuid: string expected";
            if (message.betIndex != null && message.hasOwnProperty("betIndex"))
                if (!$util.isInteger(message.betIndex))
                    return "betIndex: integer expected";
            if (message.betArea != null && message.hasOwnProperty("betArea"))
                switch (message.betArea) {
                default:
                    return "betArea: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                }
            return null;
        };

        /**
         * Creates a BetCall message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof bet.BetCall
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {bet.BetCall} BetCall
         */
        BetCall.fromObject = function fromObject(object) {
            if (object instanceof $root.bet.BetCall)
                return object;
            let message = new $root.bet.BetCall();
            if (object.header != null) {
                if (typeof object.header !== "object")
                    throw TypeError(".bet.BetCall.header: object expected");
                message.header = $root.foundation.Header.fromObject(object.header);
            }
            if (object.gameUuid != null)
                message.gameUuid = String(object.gameUuid);
            if (object.betIndex != null)
                message.betIndex = object.betIndex | 0;
            switch (object.betArea) {
            case "BetAreaDefault":
            case 0:
                message.betArea = 0;
                break;
            case "Banker":
            case 1:
                message.betArea = 1;
                break;
            case "Player":
            case 2:
                message.betArea = 2;
                break;
            case "BankerPair":
            case 3:
                message.betArea = 3;
                break;
            case "Tie":
            case 4:
                message.betArea = 4;
                break;
            case "PlayerPair":
            case 5:
                message.betArea = 5;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a BetCall message. Also converts values to other types if specified.
         * @function toObject
         * @memberof bet.BetCall
         * @static
         * @param {bet.BetCall} message BetCall
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BetCall.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.header = null;
                object.gameUuid = "";
                object.betIndex = 0;
                object.betArea = options.enums === String ? "BetAreaDefault" : 0;
            }
            if (message.header != null && message.hasOwnProperty("header"))
                object.header = $root.foundation.Header.toObject(message.header, options);
            if (message.gameUuid != null && message.hasOwnProperty("gameUuid"))
                object.gameUuid = message.gameUuid;
            if (message.betIndex != null && message.hasOwnProperty("betIndex"))
                object.betIndex = message.betIndex;
            if (message.betArea != null && message.hasOwnProperty("betArea"))
                object.betArea = options.enums === String ? $root.bet.BetArea[message.betArea] : message.betArea;
            return object;
        };

        /**
         * Converts this BetCall to JSON.
         * @function toJSON
         * @memberof bet.BetCall
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BetCall.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BetCall;
    })();

    bet.BetRecall = (function() {

        /**
         * Properties of a BetRecall.
         * @memberof bet
         * @interface IBetRecall
         * @property {foundation.IHeader|null} [header] BetRecall header
         * @property {number|null} [result] BetRecall result
         * @property {number|null} [totalBets] BetRecall totalBets
         * @property {bet.IBetStatus|null} [betStatus] BetRecall betStatus
         */

        /**
         * Constructs a new BetRecall.
         * @memberof bet
         * @classdesc Represents a BetRecall.
         * @implements IBetRecall
         * @constructor
         * @param {bet.IBetRecall=} [properties] Properties to set
         */
        function BetRecall(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BetRecall header.
         * @member {foundation.IHeader|null|undefined} header
         * @memberof bet.BetRecall
         * @instance
         */
        BetRecall.prototype.header = null;

        /**
         * BetRecall result.
         * @member {number} result
         * @memberof bet.BetRecall
         * @instance
         */
        BetRecall.prototype.result = 0;

        /**
         * BetRecall totalBets.
         * @member {number} totalBets
         * @memberof bet.BetRecall
         * @instance
         */
        BetRecall.prototype.totalBets = 0;

        /**
         * BetRecall betStatus.
         * @member {bet.IBetStatus|null|undefined} betStatus
         * @memberof bet.BetRecall
         * @instance
         */
        BetRecall.prototype.betStatus = null;

        /**
         * Creates a new BetRecall instance using the specified properties.
         * @function create
         * @memberof bet.BetRecall
         * @static
         * @param {bet.IBetRecall=} [properties] Properties to set
         * @returns {bet.BetRecall} BetRecall instance
         */
        BetRecall.create = function create(properties) {
            return new BetRecall(properties);
        };

        /**
         * Encodes the specified BetRecall message. Does not implicitly {@link bet.BetRecall.verify|verify} messages.
         * @function encode
         * @memberof bet.BetRecall
         * @static
         * @param {bet.IBetRecall} message BetRecall message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BetRecall.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                $root.foundation.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.result != null && Object.hasOwnProperty.call(message, "result"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.result);
            if (message.totalBets != null && Object.hasOwnProperty.call(message, "totalBets"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.totalBets);
            if (message.betStatus != null && Object.hasOwnProperty.call(message, "betStatus"))
                $root.bet.BetStatus.encode(message.betStatus, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified BetRecall message, length delimited. Does not implicitly {@link bet.BetRecall.verify|verify} messages.
         * @function encodeDelimited
         * @memberof bet.BetRecall
         * @static
         * @param {bet.IBetRecall} message BetRecall message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BetRecall.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BetRecall message from the specified reader or buffer.
         * @function decode
         * @memberof bet.BetRecall
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {bet.BetRecall} BetRecall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BetRecall.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bet.BetRecall();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.header = $root.foundation.Header.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.result = reader.int32();
                    break;
                case 3:
                    message.totalBets = reader.int32();
                    break;
                case 4:
                    message.betStatus = $root.bet.BetStatus.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BetRecall message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof bet.BetRecall
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {bet.BetRecall} BetRecall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BetRecall.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BetRecall message.
         * @function verify
         * @memberof bet.BetRecall
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BetRecall.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.header != null && message.hasOwnProperty("header")) {
                let error = $root.foundation.Header.verify(message.header);
                if (error)
                    return "header." + error;
            }
            if (message.result != null && message.hasOwnProperty("result"))
                if (!$util.isInteger(message.result))
                    return "result: integer expected";
            if (message.totalBets != null && message.hasOwnProperty("totalBets"))
                if (!$util.isInteger(message.totalBets))
                    return "totalBets: integer expected";
            if (message.betStatus != null && message.hasOwnProperty("betStatus")) {
                let error = $root.bet.BetStatus.verify(message.betStatus);
                if (error)
                    return "betStatus." + error;
            }
            return null;
        };

        /**
         * Creates a BetRecall message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof bet.BetRecall
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {bet.BetRecall} BetRecall
         */
        BetRecall.fromObject = function fromObject(object) {
            if (object instanceof $root.bet.BetRecall)
                return object;
            let message = new $root.bet.BetRecall();
            if (object.header != null) {
                if (typeof object.header !== "object")
                    throw TypeError(".bet.BetRecall.header: object expected");
                message.header = $root.foundation.Header.fromObject(object.header);
            }
            if (object.result != null)
                message.result = object.result | 0;
            if (object.totalBets != null)
                message.totalBets = object.totalBets | 0;
            if (object.betStatus != null) {
                if (typeof object.betStatus !== "object")
                    throw TypeError(".bet.BetRecall.betStatus: object expected");
                message.betStatus = $root.bet.BetStatus.fromObject(object.betStatus);
            }
            return message;
        };

        /**
         * Creates a plain object from a BetRecall message. Also converts values to other types if specified.
         * @function toObject
         * @memberof bet.BetRecall
         * @static
         * @param {bet.BetRecall} message BetRecall
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BetRecall.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.header = null;
                object.result = 0;
                object.totalBets = 0;
                object.betStatus = null;
            }
            if (message.header != null && message.hasOwnProperty("header"))
                object.header = $root.foundation.Header.toObject(message.header, options);
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = message.result;
            if (message.totalBets != null && message.hasOwnProperty("totalBets"))
                object.totalBets = message.totalBets;
            if (message.betStatus != null && message.hasOwnProperty("betStatus"))
                object.betStatus = $root.bet.BetStatus.toObject(message.betStatus, options);
            return object;
        };

        /**
         * Converts this BetRecall to JSON.
         * @function toJSON
         * @memberof bet.BetRecall
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BetRecall.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BetRecall;
    })();

    bet.BetResetCall = (function() {

        /**
         * Properties of a BetResetCall.
         * @memberof bet
         * @interface IBetResetCall
         * @property {foundation.IHeader|null} [header] BetResetCall header
         * @property {string|null} [gameUuid] BetResetCall gameUuid
         */

        /**
         * Constructs a new BetResetCall.
         * @memberof bet
         * @classdesc Represents a BetResetCall.
         * @implements IBetResetCall
         * @constructor
         * @param {bet.IBetResetCall=} [properties] Properties to set
         */
        function BetResetCall(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BetResetCall header.
         * @member {foundation.IHeader|null|undefined} header
         * @memberof bet.BetResetCall
         * @instance
         */
        BetResetCall.prototype.header = null;

        /**
         * BetResetCall gameUuid.
         * @member {string} gameUuid
         * @memberof bet.BetResetCall
         * @instance
         */
        BetResetCall.prototype.gameUuid = "";

        /**
         * Creates a new BetResetCall instance using the specified properties.
         * @function create
         * @memberof bet.BetResetCall
         * @static
         * @param {bet.IBetResetCall=} [properties] Properties to set
         * @returns {bet.BetResetCall} BetResetCall instance
         */
        BetResetCall.create = function create(properties) {
            return new BetResetCall(properties);
        };

        /**
         * Encodes the specified BetResetCall message. Does not implicitly {@link bet.BetResetCall.verify|verify} messages.
         * @function encode
         * @memberof bet.BetResetCall
         * @static
         * @param {bet.IBetResetCall} message BetResetCall message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BetResetCall.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                $root.foundation.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.gameUuid != null && Object.hasOwnProperty.call(message, "gameUuid"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.gameUuid);
            return writer;
        };

        /**
         * Encodes the specified BetResetCall message, length delimited. Does not implicitly {@link bet.BetResetCall.verify|verify} messages.
         * @function encodeDelimited
         * @memberof bet.BetResetCall
         * @static
         * @param {bet.IBetResetCall} message BetResetCall message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BetResetCall.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BetResetCall message from the specified reader or buffer.
         * @function decode
         * @memberof bet.BetResetCall
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {bet.BetResetCall} BetResetCall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BetResetCall.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bet.BetResetCall();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.header = $root.foundation.Header.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.gameUuid = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BetResetCall message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof bet.BetResetCall
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {bet.BetResetCall} BetResetCall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BetResetCall.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BetResetCall message.
         * @function verify
         * @memberof bet.BetResetCall
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BetResetCall.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.header != null && message.hasOwnProperty("header")) {
                let error = $root.foundation.Header.verify(message.header);
                if (error)
                    return "header." + error;
            }
            if (message.gameUuid != null && message.hasOwnProperty("gameUuid"))
                if (!$util.isString(message.gameUuid))
                    return "gameUuid: string expected";
            return null;
        };

        /**
         * Creates a BetResetCall message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof bet.BetResetCall
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {bet.BetResetCall} BetResetCall
         */
        BetResetCall.fromObject = function fromObject(object) {
            if (object instanceof $root.bet.BetResetCall)
                return object;
            let message = new $root.bet.BetResetCall();
            if (object.header != null) {
                if (typeof object.header !== "object")
                    throw TypeError(".bet.BetResetCall.header: object expected");
                message.header = $root.foundation.Header.fromObject(object.header);
            }
            if (object.gameUuid != null)
                message.gameUuid = String(object.gameUuid);
            return message;
        };

        /**
         * Creates a plain object from a BetResetCall message. Also converts values to other types if specified.
         * @function toObject
         * @memberof bet.BetResetCall
         * @static
         * @param {bet.BetResetCall} message BetResetCall
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BetResetCall.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.header = null;
                object.gameUuid = "";
            }
            if (message.header != null && message.hasOwnProperty("header"))
                object.header = $root.foundation.Header.toObject(message.header, options);
            if (message.gameUuid != null && message.hasOwnProperty("gameUuid"))
                object.gameUuid = message.gameUuid;
            return object;
        };

        /**
         * Converts this BetResetCall to JSON.
         * @function toJSON
         * @memberof bet.BetResetCall
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BetResetCall.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BetResetCall;
    })();

    bet.BetResetRecall = (function() {

        /**
         * Properties of a BetResetRecall.
         * @memberof bet
         * @interface IBetResetRecall
         * @property {foundation.IHeader|null} [header] BetResetRecall header
         * @property {number|null} [result] BetResetRecall result
         * @property {number|null} [totalBets] BetResetRecall totalBets
         * @property {bet.IBetStatus|null} [betStatus] BetResetRecall betStatus
         */

        /**
         * Constructs a new BetResetRecall.
         * @memberof bet
         * @classdesc Represents a BetResetRecall.
         * @implements IBetResetRecall
         * @constructor
         * @param {bet.IBetResetRecall=} [properties] Properties to set
         */
        function BetResetRecall(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BetResetRecall header.
         * @member {foundation.IHeader|null|undefined} header
         * @memberof bet.BetResetRecall
         * @instance
         */
        BetResetRecall.prototype.header = null;

        /**
         * BetResetRecall result.
         * @member {number} result
         * @memberof bet.BetResetRecall
         * @instance
         */
        BetResetRecall.prototype.result = 0;

        /**
         * BetResetRecall totalBets.
         * @member {number} totalBets
         * @memberof bet.BetResetRecall
         * @instance
         */
        BetResetRecall.prototype.totalBets = 0;

        /**
         * BetResetRecall betStatus.
         * @member {bet.IBetStatus|null|undefined} betStatus
         * @memberof bet.BetResetRecall
         * @instance
         */
        BetResetRecall.prototype.betStatus = null;

        /**
         * Creates a new BetResetRecall instance using the specified properties.
         * @function create
         * @memberof bet.BetResetRecall
         * @static
         * @param {bet.IBetResetRecall=} [properties] Properties to set
         * @returns {bet.BetResetRecall} BetResetRecall instance
         */
        BetResetRecall.create = function create(properties) {
            return new BetResetRecall(properties);
        };

        /**
         * Encodes the specified BetResetRecall message. Does not implicitly {@link bet.BetResetRecall.verify|verify} messages.
         * @function encode
         * @memberof bet.BetResetRecall
         * @static
         * @param {bet.IBetResetRecall} message BetResetRecall message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BetResetRecall.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                $root.foundation.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.result != null && Object.hasOwnProperty.call(message, "result"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.result);
            if (message.totalBets != null && Object.hasOwnProperty.call(message, "totalBets"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.totalBets);
            if (message.betStatus != null && Object.hasOwnProperty.call(message, "betStatus"))
                $root.bet.BetStatus.encode(message.betStatus, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified BetResetRecall message, length delimited. Does not implicitly {@link bet.BetResetRecall.verify|verify} messages.
         * @function encodeDelimited
         * @memberof bet.BetResetRecall
         * @static
         * @param {bet.IBetResetRecall} message BetResetRecall message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BetResetRecall.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BetResetRecall message from the specified reader or buffer.
         * @function decode
         * @memberof bet.BetResetRecall
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {bet.BetResetRecall} BetResetRecall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BetResetRecall.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bet.BetResetRecall();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.header = $root.foundation.Header.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.result = reader.int32();
                    break;
                case 3:
                    message.totalBets = reader.int32();
                    break;
                case 4:
                    message.betStatus = $root.bet.BetStatus.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BetResetRecall message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof bet.BetResetRecall
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {bet.BetResetRecall} BetResetRecall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BetResetRecall.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BetResetRecall message.
         * @function verify
         * @memberof bet.BetResetRecall
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BetResetRecall.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.header != null && message.hasOwnProperty("header")) {
                let error = $root.foundation.Header.verify(message.header);
                if (error)
                    return "header." + error;
            }
            if (message.result != null && message.hasOwnProperty("result"))
                if (!$util.isInteger(message.result))
                    return "result: integer expected";
            if (message.totalBets != null && message.hasOwnProperty("totalBets"))
                if (!$util.isInteger(message.totalBets))
                    return "totalBets: integer expected";
            if (message.betStatus != null && message.hasOwnProperty("betStatus")) {
                let error = $root.bet.BetStatus.verify(message.betStatus);
                if (error)
                    return "betStatus." + error;
            }
            return null;
        };

        /**
         * Creates a BetResetRecall message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof bet.BetResetRecall
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {bet.BetResetRecall} BetResetRecall
         */
        BetResetRecall.fromObject = function fromObject(object) {
            if (object instanceof $root.bet.BetResetRecall)
                return object;
            let message = new $root.bet.BetResetRecall();
            if (object.header != null) {
                if (typeof object.header !== "object")
                    throw TypeError(".bet.BetResetRecall.header: object expected");
                message.header = $root.foundation.Header.fromObject(object.header);
            }
            if (object.result != null)
                message.result = object.result | 0;
            if (object.totalBets != null)
                message.totalBets = object.totalBets | 0;
            if (object.betStatus != null) {
                if (typeof object.betStatus !== "object")
                    throw TypeError(".bet.BetResetRecall.betStatus: object expected");
                message.betStatus = $root.bet.BetStatus.fromObject(object.betStatus);
            }
            return message;
        };

        /**
         * Creates a plain object from a BetResetRecall message. Also converts values to other types if specified.
         * @function toObject
         * @memberof bet.BetResetRecall
         * @static
         * @param {bet.BetResetRecall} message BetResetRecall
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BetResetRecall.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.header = null;
                object.result = 0;
                object.totalBets = 0;
                object.betStatus = null;
            }
            if (message.header != null && message.hasOwnProperty("header"))
                object.header = $root.foundation.Header.toObject(message.header, options);
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = message.result;
            if (message.totalBets != null && message.hasOwnProperty("totalBets"))
                object.totalBets = message.totalBets;
            if (message.betStatus != null && message.hasOwnProperty("betStatus"))
                object.betStatus = $root.bet.BetStatus.toObject(message.betStatus, options);
            return object;
        };

        /**
         * Converts this BetResetRecall to JSON.
         * @function toJSON
         * @memberof bet.BetResetRecall
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BetResetRecall.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BetResetRecall;
    })();

    bet.BetError = (function() {

        /**
         * Properties of a BetError.
         * @memberof bet
         * @interface IBetError
         * @property {bet.Error|null} [error] BetError error
         * @property {string|null} [errorMessage] BetError errorMessage
         */

        /**
         * Constructs a new BetError.
         * @memberof bet
         * @classdesc Represents a BetError.
         * @implements IBetError
         * @constructor
         * @param {bet.IBetError=} [properties] Properties to set
         */
        function BetError(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BetError error.
         * @member {bet.Error} error
         * @memberof bet.BetError
         * @instance
         */
        BetError.prototype.error = 0;

        /**
         * BetError errorMessage.
         * @member {string} errorMessage
         * @memberof bet.BetError
         * @instance
         */
        BetError.prototype.errorMessage = "";

        /**
         * Creates a new BetError instance using the specified properties.
         * @function create
         * @memberof bet.BetError
         * @static
         * @param {bet.IBetError=} [properties] Properties to set
         * @returns {bet.BetError} BetError instance
         */
        BetError.create = function create(properties) {
            return new BetError(properties);
        };

        /**
         * Encodes the specified BetError message. Does not implicitly {@link bet.BetError.verify|verify} messages.
         * @function encode
         * @memberof bet.BetError
         * @static
         * @param {bet.IBetError} message BetError message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BetError.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.error);
            if (message.errorMessage != null && Object.hasOwnProperty.call(message, "errorMessage"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.errorMessage);
            return writer;
        };

        /**
         * Encodes the specified BetError message, length delimited. Does not implicitly {@link bet.BetError.verify|verify} messages.
         * @function encodeDelimited
         * @memberof bet.BetError
         * @static
         * @param {bet.IBetError} message BetError message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BetError.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BetError message from the specified reader or buffer.
         * @function decode
         * @memberof bet.BetError
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {bet.BetError} BetError
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BetError.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bet.BetError();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.error = reader.int32();
                    break;
                case 2:
                    message.errorMessage = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BetError message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof bet.BetError
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {bet.BetError} BetError
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BetError.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BetError message.
         * @function verify
         * @memberof bet.BetError
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BetError.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.error != null && message.hasOwnProperty("error"))
                switch (message.error) {
                default:
                    return "error: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                }
            if (message.errorMessage != null && message.hasOwnProperty("errorMessage"))
                if (!$util.isString(message.errorMessage))
                    return "errorMessage: string expected";
            return null;
        };

        /**
         * Creates a BetError message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof bet.BetError
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {bet.BetError} BetError
         */
        BetError.fromObject = function fromObject(object) {
            if (object instanceof $root.bet.BetError)
                return object;
            let message = new $root.bet.BetError();
            switch (object.error) {
            case "ErrorDefault":
            case 0:
                message.error = 0;
                break;
            case "BetIndexInvalid":
            case 1:
                message.error = 1;
                break;
            case "BetAreaInvalid":
            case 2:
                message.error = 2;
                break;
            case "ReachMaxLimit":
            case 3:
                message.error = 3;
                break;
            case "RoundNotFound":
            case 4:
                message.error = 4;
                break;
            case "NoEnoughWallet":
            case 5:
                message.error = 5;
                break;
            }
            if (object.errorMessage != null)
                message.errorMessage = String(object.errorMessage);
            return message;
        };

        /**
         * Creates a plain object from a BetError message. Also converts values to other types if specified.
         * @function toObject
         * @memberof bet.BetError
         * @static
         * @param {bet.BetError} message BetError
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BetError.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.error = options.enums === String ? "ErrorDefault" : 0;
                object.errorMessage = "";
            }
            if (message.error != null && message.hasOwnProperty("error"))
                object.error = options.enums === String ? $root.bet.Error[message.error] : message.error;
            if (message.errorMessage != null && message.hasOwnProperty("errorMessage"))
                object.errorMessage = message.errorMessage;
            return object;
        };

        /**
         * Converts this BetError to JSON.
         * @function toJSON
         * @memberof bet.BetError
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BetError.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BetError;
    })();

    return bet;
})();

export const dealer = $root.dealer = (() => {

    /**
     * Namespace dealer.
     * @exports dealer
     * @namespace
     */
    const dealer = {};

    /**
     * Suit enum.
     * @name dealer.Suit
     * @enum {number}
     * @property {number} Default=0 Default value
     * @property {number} Heart=1 Heart value
     * @property {number} Diamond=2 Diamond value
     * @property {number} Spade=3 Spade value
     * @property {number} Club=4 Club value
     */
    dealer.Suit = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "Default"] = 0;
        values[valuesById[1] = "Heart"] = 1;
        values[valuesById[2] = "Diamond"] = 2;
        values[valuesById[3] = "Spade"] = 3;
        values[valuesById[4] = "Club"] = 4;
        return values;
    })();

    dealer.Card = (function() {

        /**
         * Properties of a Card.
         * @memberof dealer
         * @interface ICard
         * @property {dealer.Suit|null} [Suit] Card Suit
         * @property {number|null} [point] Card point
         */

        /**
         * Constructs a new Card.
         * @memberof dealer
         * @classdesc Represents a Card.
         * @implements ICard
         * @constructor
         * @param {dealer.ICard=} [properties] Properties to set
         */
        function Card(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Card Suit.
         * @member {dealer.Suit} Suit
         * @memberof dealer.Card
         * @instance
         */
        Card.prototype.Suit = 0;

        /**
         * Card point.
         * @member {number} point
         * @memberof dealer.Card
         * @instance
         */
        Card.prototype.point = 0;

        /**
         * Creates a new Card instance using the specified properties.
         * @function create
         * @memberof dealer.Card
         * @static
         * @param {dealer.ICard=} [properties] Properties to set
         * @returns {dealer.Card} Card instance
         */
        Card.create = function create(properties) {
            return new Card(properties);
        };

        /**
         * Encodes the specified Card message. Does not implicitly {@link dealer.Card.verify|verify} messages.
         * @function encode
         * @memberof dealer.Card
         * @static
         * @param {dealer.ICard} message Card message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Card.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Suit != null && Object.hasOwnProperty.call(message, "Suit"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.Suit);
            if (message.point != null && Object.hasOwnProperty.call(message, "point"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.point);
            return writer;
        };

        /**
         * Encodes the specified Card message, length delimited. Does not implicitly {@link dealer.Card.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dealer.Card
         * @static
         * @param {dealer.ICard} message Card message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Card.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Card message from the specified reader or buffer.
         * @function decode
         * @memberof dealer.Card
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dealer.Card} Card
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Card.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dealer.Card();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Suit = reader.int32();
                    break;
                case 2:
                    message.point = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Card message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dealer.Card
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dealer.Card} Card
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Card.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Card message.
         * @function verify
         * @memberof dealer.Card
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Card.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Suit != null && message.hasOwnProperty("Suit"))
                switch (message.Suit) {
                default:
                    return "Suit: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            if (message.point != null && message.hasOwnProperty("point"))
                if (!$util.isInteger(message.point))
                    return "point: integer expected";
            return null;
        };

        /**
         * Creates a Card message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dealer.Card
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dealer.Card} Card
         */
        Card.fromObject = function fromObject(object) {
            if (object instanceof $root.dealer.Card)
                return object;
            let message = new $root.dealer.Card();
            switch (object.Suit) {
            case "Default":
            case 0:
                message.Suit = 0;
                break;
            case "Heart":
            case 1:
                message.Suit = 1;
                break;
            case "Diamond":
            case 2:
                message.Suit = 2;
                break;
            case "Spade":
            case 3:
                message.Suit = 3;
                break;
            case "Club":
            case 4:
                message.Suit = 4;
                break;
            }
            if (object.point != null)
                message.point = object.point | 0;
            return message;
        };

        /**
         * Creates a plain object from a Card message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dealer.Card
         * @static
         * @param {dealer.Card} message Card
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Card.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.Suit = options.enums === String ? "Default" : 0;
                object.point = 0;
            }
            if (message.Suit != null && message.hasOwnProperty("Suit"))
                object.Suit = options.enums === String ? $root.dealer.Suit[message.Suit] : message.Suit;
            if (message.point != null && message.hasOwnProperty("point"))
                object.point = message.point;
            return object;
        };

        /**
         * Converts this Card to JSON.
         * @function toJSON
         * @memberof dealer.Card
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Card.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Card;
    })();

    /**
     * Side enum.
     * @name dealer.Side
     * @enum {number}
     * @property {number} Default=0 Default value
     * @property {number} Banker=1 Banker value
     * @property {number} Player=2 Player value
     */
    dealer.Side = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "Default"] = 0;
        values[valuesById[1] = "Banker"] = 1;
        values[valuesById[2] = "Player"] = 2;
        return values;
    })();

    dealer.Draw = (function() {

        /**
         * Properties of a Draw.
         * @memberof dealer
         * @interface IDraw
         * @property {dealer.Side|null} [side] Draw side
         * @property {number|null} [position] Draw position
         * @property {dealer.ICard|null} [card] Draw card
         */

        /**
         * Constructs a new Draw.
         * @memberof dealer
         * @classdesc Represents a Draw.
         * @implements IDraw
         * @constructor
         * @param {dealer.IDraw=} [properties] Properties to set
         */
        function Draw(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Draw side.
         * @member {dealer.Side} side
         * @memberof dealer.Draw
         * @instance
         */
        Draw.prototype.side = 0;

        /**
         * Draw position.
         * @member {number} position
         * @memberof dealer.Draw
         * @instance
         */
        Draw.prototype.position = 0;

        /**
         * Draw card.
         * @member {dealer.ICard|null|undefined} card
         * @memberof dealer.Draw
         * @instance
         */
        Draw.prototype.card = null;

        /**
         * Creates a new Draw instance using the specified properties.
         * @function create
         * @memberof dealer.Draw
         * @static
         * @param {dealer.IDraw=} [properties] Properties to set
         * @returns {dealer.Draw} Draw instance
         */
        Draw.create = function create(properties) {
            return new Draw(properties);
        };

        /**
         * Encodes the specified Draw message. Does not implicitly {@link dealer.Draw.verify|verify} messages.
         * @function encode
         * @memberof dealer.Draw
         * @static
         * @param {dealer.IDraw} message Draw message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Draw.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.side != null && Object.hasOwnProperty.call(message, "side"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.side);
            if (message.position != null && Object.hasOwnProperty.call(message, "position"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.position);
            if (message.card != null && Object.hasOwnProperty.call(message, "card"))
                $root.dealer.Card.encode(message.card, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Draw message, length delimited. Does not implicitly {@link dealer.Draw.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dealer.Draw
         * @static
         * @param {dealer.IDraw} message Draw message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Draw.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Draw message from the specified reader or buffer.
         * @function decode
         * @memberof dealer.Draw
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dealer.Draw} Draw
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Draw.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dealer.Draw();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.side = reader.int32();
                    break;
                case 2:
                    message.position = reader.int32();
                    break;
                case 3:
                    message.card = $root.dealer.Card.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Draw message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dealer.Draw
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dealer.Draw} Draw
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Draw.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Draw message.
         * @function verify
         * @memberof dealer.Draw
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Draw.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.side != null && message.hasOwnProperty("side"))
                switch (message.side) {
                default:
                    return "side: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            if (message.position != null && message.hasOwnProperty("position"))
                if (!$util.isInteger(message.position))
                    return "position: integer expected";
            if (message.card != null && message.hasOwnProperty("card")) {
                let error = $root.dealer.Card.verify(message.card);
                if (error)
                    return "card." + error;
            }
            return null;
        };

        /**
         * Creates a Draw message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dealer.Draw
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dealer.Draw} Draw
         */
        Draw.fromObject = function fromObject(object) {
            if (object instanceof $root.dealer.Draw)
                return object;
            let message = new $root.dealer.Draw();
            switch (object.side) {
            case "Default":
            case 0:
                message.side = 0;
                break;
            case "Banker":
            case 1:
                message.side = 1;
                break;
            case "Player":
            case 2:
                message.side = 2;
                break;
            }
            if (object.position != null)
                message.position = object.position | 0;
            if (object.card != null) {
                if (typeof object.card !== "object")
                    throw TypeError(".dealer.Draw.card: object expected");
                message.card = $root.dealer.Card.fromObject(object.card);
            }
            return message;
        };

        /**
         * Creates a plain object from a Draw message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dealer.Draw
         * @static
         * @param {dealer.Draw} message Draw
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Draw.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.side = options.enums === String ? "Default" : 0;
                object.position = 0;
                object.card = null;
            }
            if (message.side != null && message.hasOwnProperty("side"))
                object.side = options.enums === String ? $root.dealer.Side[message.side] : message.side;
            if (message.position != null && message.hasOwnProperty("position"))
                object.position = message.position;
            if (message.card != null && message.hasOwnProperty("card"))
                object.card = $root.dealer.Card.toObject(message.card, options);
            return object;
        };

        /**
         * Converts this Draw to JSON.
         * @function toJSON
         * @memberof dealer.Draw
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Draw.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Draw;
    })();

    return dealer;
})();

export const foundation = $root.foundation = (() => {

    /**
     * Namespace foundation.
     * @exports foundation
     * @namespace
     */
    const foundation = {};

    foundation.Header = (function() {

        /**
         * Properties of a Header.
         * @memberof foundation
         * @interface IHeader
         * @property {route.URI|null} [uri] Header uri
         */

        /**
         * Constructs a new Header.
         * @memberof foundation
         * @classdesc Represents a Header.
         * @implements IHeader
         * @constructor
         * @param {foundation.IHeader=} [properties] Properties to set
         */
        function Header(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Header uri.
         * @member {route.URI} uri
         * @memberof foundation.Header
         * @instance
         */
        Header.prototype.uri = 0;

        /**
         * Creates a new Header instance using the specified properties.
         * @function create
         * @memberof foundation.Header
         * @static
         * @param {foundation.IHeader=} [properties] Properties to set
         * @returns {foundation.Header} Header instance
         */
        Header.create = function create(properties) {
            return new Header(properties);
        };

        /**
         * Encodes the specified Header message. Does not implicitly {@link foundation.Header.verify|verify} messages.
         * @function encode
         * @memberof foundation.Header
         * @static
         * @param {foundation.IHeader} message Header message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Header.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uri != null && Object.hasOwnProperty.call(message, "uri"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.uri);
            return writer;
        };

        /**
         * Encodes the specified Header message, length delimited. Does not implicitly {@link foundation.Header.verify|verify} messages.
         * @function encodeDelimited
         * @memberof foundation.Header
         * @static
         * @param {foundation.IHeader} message Header message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Header.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Header message from the specified reader or buffer.
         * @function decode
         * @memberof foundation.Header
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {foundation.Header} Header
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Header.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.foundation.Header();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.uri = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Header message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof foundation.Header
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {foundation.Header} Header
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Header.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Header message.
         * @function verify
         * @memberof foundation.Header
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Header.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uri != null && message.hasOwnProperty("uri"))
                switch (message.uri) {
                default:
                    return "uri: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                case 11:
                    break;
                }
            return null;
        };

        /**
         * Creates a Header message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof foundation.Header
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {foundation.Header} Header
         */
        Header.fromObject = function fromObject(object) {
            if (object instanceof $root.foundation.Header)
                return object;
            let message = new $root.foundation.Header();
            switch (object.uri) {
            case "Default":
            case 0:
                message.uri = 0;
                break;
            case "LoginCall":
            case 1:
                message.uri = 1;
                break;
            case "LoginRecall":
            case 2:
                message.uri = 2;
                break;
            case "LobbyInfo":
            case 3:
                message.uri = 3;
                break;
            case "UserInfo":
            case 4:
                message.uri = 4;
                break;
            case "TableJoinCall":
            case 5:
                message.uri = 5;
                break;
            case "TableJoinRecall":
            case 6:
                message.uri = 6;
                break;
            case "BetCall":
            case 7:
                message.uri = 7;
                break;
            case "BetRecall":
            case 8:
                message.uri = 8;
                break;
            case "BetResetCall":
            case 9:
                message.uri = 9;
                break;
            case "BetResetRecall":
            case 10:
                message.uri = 10;
                break;
            case "Draw":
            case 11:
                message.uri = 11;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a Header message. Also converts values to other types if specified.
         * @function toObject
         * @memberof foundation.Header
         * @static
         * @param {foundation.Header} message Header
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Header.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.uri = options.enums === String ? "Default" : 0;
            if (message.uri != null && message.hasOwnProperty("uri"))
                object.uri = options.enums === String ? $root.route.URI[message.uri] : message.uri;
            return object;
        };

        /**
         * Converts this Header to JSON.
         * @function toJSON
         * @memberof foundation.Header
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Header.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Header;
    })();

    foundation.Message = (function() {

        /**
         * Properties of a Message.
         * @memberof foundation
         * @interface IMessage
         * @property {foundation.IHeader|null} [header] Message header
         */

        /**
         * Constructs a new Message.
         * @memberof foundation
         * @classdesc Represents a Message.
         * @implements IMessage
         * @constructor
         * @param {foundation.IMessage=} [properties] Properties to set
         */
        function Message(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Message header.
         * @member {foundation.IHeader|null|undefined} header
         * @memberof foundation.Message
         * @instance
         */
        Message.prototype.header = null;

        /**
         * Creates a new Message instance using the specified properties.
         * @function create
         * @memberof foundation.Message
         * @static
         * @param {foundation.IMessage=} [properties] Properties to set
         * @returns {foundation.Message} Message instance
         */
        Message.create = function create(properties) {
            return new Message(properties);
        };

        /**
         * Encodes the specified Message message. Does not implicitly {@link foundation.Message.verify|verify} messages.
         * @function encode
         * @memberof foundation.Message
         * @static
         * @param {foundation.IMessage} message Message message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Message.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                $root.foundation.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Message message, length delimited. Does not implicitly {@link foundation.Message.verify|verify} messages.
         * @function encodeDelimited
         * @memberof foundation.Message
         * @static
         * @param {foundation.IMessage} message Message message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Message.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Message message from the specified reader or buffer.
         * @function decode
         * @memberof foundation.Message
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {foundation.Message} Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Message.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.foundation.Message();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.header = $root.foundation.Header.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Message message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof foundation.Message
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {foundation.Message} Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Message.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Message message.
         * @function verify
         * @memberof foundation.Message
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Message.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.header != null && message.hasOwnProperty("header")) {
                let error = $root.foundation.Header.verify(message.header);
                if (error)
                    return "header." + error;
            }
            return null;
        };

        /**
         * Creates a Message message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof foundation.Message
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {foundation.Message} Message
         */
        Message.fromObject = function fromObject(object) {
            if (object instanceof $root.foundation.Message)
                return object;
            let message = new $root.foundation.Message();
            if (object.header != null) {
                if (typeof object.header !== "object")
                    throw TypeError(".foundation.Message.header: object expected");
                message.header = $root.foundation.Header.fromObject(object.header);
            }
            return message;
        };

        /**
         * Creates a plain object from a Message message. Also converts values to other types if specified.
         * @function toObject
         * @memberof foundation.Message
         * @static
         * @param {foundation.Message} message Message
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Message.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.header = null;
            if (message.header != null && message.hasOwnProperty("header"))
                object.header = $root.foundation.Header.toObject(message.header, options);
            return object;
        };

        /**
         * Converts this Message to JSON.
         * @function toJSON
         * @memberof foundation.Message
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Message.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Message;
    })();

    return foundation;
})();

export const lobby = $root.lobby = (() => {

    /**
     * Namespace lobby.
     * @exports lobby
     * @namespace
     */
    const lobby = {};

    lobby.LobbyInfo = (function() {

        /**
         * Properties of a LobbyInfo.
         * @memberof lobby
         * @interface ILobbyInfo
         * @property {foundation.IHeader|null} [header] LobbyInfo header
         * @property {Array.<lobby.ITableInfo>|null} [tables] LobbyInfo tables
         */

        /**
         * Constructs a new LobbyInfo.
         * @memberof lobby
         * @classdesc Represents a LobbyInfo.
         * @implements ILobbyInfo
         * @constructor
         * @param {lobby.ILobbyInfo=} [properties] Properties to set
         */
        function LobbyInfo(properties) {
            this.tables = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LobbyInfo header.
         * @member {foundation.IHeader|null|undefined} header
         * @memberof lobby.LobbyInfo
         * @instance
         */
        LobbyInfo.prototype.header = null;

        /**
         * LobbyInfo tables.
         * @member {Array.<lobby.ITableInfo>} tables
         * @memberof lobby.LobbyInfo
         * @instance
         */
        LobbyInfo.prototype.tables = $util.emptyArray;

        /**
         * Creates a new LobbyInfo instance using the specified properties.
         * @function create
         * @memberof lobby.LobbyInfo
         * @static
         * @param {lobby.ILobbyInfo=} [properties] Properties to set
         * @returns {lobby.LobbyInfo} LobbyInfo instance
         */
        LobbyInfo.create = function create(properties) {
            return new LobbyInfo(properties);
        };

        /**
         * Encodes the specified LobbyInfo message. Does not implicitly {@link lobby.LobbyInfo.verify|verify} messages.
         * @function encode
         * @memberof lobby.LobbyInfo
         * @static
         * @param {lobby.ILobbyInfo} message LobbyInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LobbyInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                $root.foundation.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.tables != null && message.tables.length)
                for (let i = 0; i < message.tables.length; ++i)
                    $root.lobby.TableInfo.encode(message.tables[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified LobbyInfo message, length delimited. Does not implicitly {@link lobby.LobbyInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof lobby.LobbyInfo
         * @static
         * @param {lobby.ILobbyInfo} message LobbyInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LobbyInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LobbyInfo message from the specified reader or buffer.
         * @function decode
         * @memberof lobby.LobbyInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {lobby.LobbyInfo} LobbyInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LobbyInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.lobby.LobbyInfo();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.header = $root.foundation.Header.decode(reader, reader.uint32());
                    break;
                case 2:
                    if (!(message.tables && message.tables.length))
                        message.tables = [];
                    message.tables.push($root.lobby.TableInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LobbyInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof lobby.LobbyInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {lobby.LobbyInfo} LobbyInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LobbyInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LobbyInfo message.
         * @function verify
         * @memberof lobby.LobbyInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LobbyInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.header != null && message.hasOwnProperty("header")) {
                let error = $root.foundation.Header.verify(message.header);
                if (error)
                    return "header." + error;
            }
            if (message.tables != null && message.hasOwnProperty("tables")) {
                if (!Array.isArray(message.tables))
                    return "tables: array expected";
                for (let i = 0; i < message.tables.length; ++i) {
                    let error = $root.lobby.TableInfo.verify(message.tables[i]);
                    if (error)
                        return "tables." + error;
                }
            }
            return null;
        };

        /**
         * Creates a LobbyInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof lobby.LobbyInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {lobby.LobbyInfo} LobbyInfo
         */
        LobbyInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.lobby.LobbyInfo)
                return object;
            let message = new $root.lobby.LobbyInfo();
            if (object.header != null) {
                if (typeof object.header !== "object")
                    throw TypeError(".lobby.LobbyInfo.header: object expected");
                message.header = $root.foundation.Header.fromObject(object.header);
            }
            if (object.tables) {
                if (!Array.isArray(object.tables))
                    throw TypeError(".lobby.LobbyInfo.tables: array expected");
                message.tables = [];
                for (let i = 0; i < object.tables.length; ++i) {
                    if (typeof object.tables[i] !== "object")
                        throw TypeError(".lobby.LobbyInfo.tables: object expected");
                    message.tables[i] = $root.lobby.TableInfo.fromObject(object.tables[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a LobbyInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof lobby.LobbyInfo
         * @static
         * @param {lobby.LobbyInfo} message LobbyInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LobbyInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.tables = [];
            if (options.defaults)
                object.header = null;
            if (message.header != null && message.hasOwnProperty("header"))
                object.header = $root.foundation.Header.toObject(message.header, options);
            if (message.tables && message.tables.length) {
                object.tables = [];
                for (let j = 0; j < message.tables.length; ++j)
                    object.tables[j] = $root.lobby.TableInfo.toObject(message.tables[j], options);
            }
            return object;
        };

        /**
         * Converts this LobbyInfo to JSON.
         * @function toJSON
         * @memberof lobby.LobbyInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LobbyInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LobbyInfo;
    })();

    lobby.TableInfo = (function() {

        /**
         * Properties of a TableInfo.
         * @memberof lobby
         * @interface ITableInfo
         * @property {string|null} [uuid] TableInfo uuid
         * @property {string|null} [name] TableInfo name
         */

        /**
         * Constructs a new TableInfo.
         * @memberof lobby
         * @classdesc Represents a TableInfo.
         * @implements ITableInfo
         * @constructor
         * @param {lobby.ITableInfo=} [properties] Properties to set
         */
        function TableInfo(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TableInfo uuid.
         * @member {string} uuid
         * @memberof lobby.TableInfo
         * @instance
         */
        TableInfo.prototype.uuid = "";

        /**
         * TableInfo name.
         * @member {string} name
         * @memberof lobby.TableInfo
         * @instance
         */
        TableInfo.prototype.name = "";

        /**
         * Creates a new TableInfo instance using the specified properties.
         * @function create
         * @memberof lobby.TableInfo
         * @static
         * @param {lobby.ITableInfo=} [properties] Properties to set
         * @returns {lobby.TableInfo} TableInfo instance
         */
        TableInfo.create = function create(properties) {
            return new TableInfo(properties);
        };

        /**
         * Encodes the specified TableInfo message. Does not implicitly {@link lobby.TableInfo.verify|verify} messages.
         * @function encode
         * @memberof lobby.TableInfo
         * @static
         * @param {lobby.ITableInfo} message TableInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TableInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uuid != null && Object.hasOwnProperty.call(message, "uuid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.uuid);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            return writer;
        };

        /**
         * Encodes the specified TableInfo message, length delimited. Does not implicitly {@link lobby.TableInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof lobby.TableInfo
         * @static
         * @param {lobby.ITableInfo} message TableInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TableInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TableInfo message from the specified reader or buffer.
         * @function decode
         * @memberof lobby.TableInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {lobby.TableInfo} TableInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TableInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.lobby.TableInfo();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.uuid = reader.string();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TableInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof lobby.TableInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {lobby.TableInfo} TableInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TableInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TableInfo message.
         * @function verify
         * @memberof lobby.TableInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TableInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                if (!$util.isString(message.uuid))
                    return "uuid: string expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            return null;
        };

        /**
         * Creates a TableInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof lobby.TableInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {lobby.TableInfo} TableInfo
         */
        TableInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.lobby.TableInfo)
                return object;
            let message = new $root.lobby.TableInfo();
            if (object.uuid != null)
                message.uuid = String(object.uuid);
            if (object.name != null)
                message.name = String(object.name);
            return message;
        };

        /**
         * Creates a plain object from a TableInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof lobby.TableInfo
         * @static
         * @param {lobby.TableInfo} message TableInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TableInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.uuid = "";
                object.name = "";
            }
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                object.uuid = message.uuid;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            return object;
        };

        /**
         * Converts this TableInfo to JSON.
         * @function toJSON
         * @memberof lobby.TableInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TableInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TableInfo;
    })();

    return lobby;
})();

export const route = $root.route = (() => {

    /**
     * Namespace route.
     * @exports route
     * @namespace
     */
    const route = {};

    /**
     * URI enum.
     * @name route.URI
     * @enum {number}
     * @property {number} Default=0 Default value
     * @property {number} LoginCall=1 LoginCall value
     * @property {number} LoginRecall=2 LoginRecall value
     * @property {number} LobbyInfo=3 LobbyInfo value
     * @property {number} UserInfo=4 UserInfo value
     * @property {number} TableJoinCall=5 TableJoinCall value
     * @property {number} TableJoinRecall=6 TableJoinRecall value
     * @property {number} BetCall=7 BetCall value
     * @property {number} BetRecall=8 BetRecall value
     * @property {number} BetResetCall=9 BetResetCall value
     * @property {number} BetResetRecall=10 BetResetRecall value
     * @property {number} Draw=11 Draw value
     */
    route.URI = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "Default"] = 0;
        values[valuesById[1] = "LoginCall"] = 1;
        values[valuesById[2] = "LoginRecall"] = 2;
        values[valuesById[3] = "LobbyInfo"] = 3;
        values[valuesById[4] = "UserInfo"] = 4;
        values[valuesById[5] = "TableJoinCall"] = 5;
        values[valuesById[6] = "TableJoinRecall"] = 6;
        values[valuesById[7] = "BetCall"] = 7;
        values[valuesById[8] = "BetRecall"] = 8;
        values[valuesById[9] = "BetResetCall"] = 9;
        values[valuesById[10] = "BetResetRecall"] = 10;
        values[valuesById[11] = "Draw"] = 11;
        return values;
    })();

    return route;
})();

export const table = $root.table = (() => {

    /**
     * Namespace table.
     * @exports table
     * @namespace
     */
    const table = {};

    table.Table = (function() {

        /**
         * Properties of a Table.
         * @memberof table
         * @interface ITable
         * @property {table.IBetStatus|null} [betStatus] Table betStatus
         * @property {string|null} [streamingUrl] Table streamingUrl
         */

        /**
         * Constructs a new Table.
         * @memberof table
         * @classdesc Represents a Table.
         * @implements ITable
         * @constructor
         * @param {table.ITable=} [properties] Properties to set
         */
        function Table(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Table betStatus.
         * @member {table.IBetStatus|null|undefined} betStatus
         * @memberof table.Table
         * @instance
         */
        Table.prototype.betStatus = null;

        /**
         * Table streamingUrl.
         * @member {string} streamingUrl
         * @memberof table.Table
         * @instance
         */
        Table.prototype.streamingUrl = "";

        /**
         * Creates a new Table instance using the specified properties.
         * @function create
         * @memberof table.Table
         * @static
         * @param {table.ITable=} [properties] Properties to set
         * @returns {table.Table} Table instance
         */
        Table.create = function create(properties) {
            return new Table(properties);
        };

        /**
         * Encodes the specified Table message. Does not implicitly {@link table.Table.verify|verify} messages.
         * @function encode
         * @memberof table.Table
         * @static
         * @param {table.ITable} message Table message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Table.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.betStatus != null && Object.hasOwnProperty.call(message, "betStatus"))
                $root.table.BetStatus.encode(message.betStatus, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.streamingUrl != null && Object.hasOwnProperty.call(message, "streamingUrl"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.streamingUrl);
            return writer;
        };

        /**
         * Encodes the specified Table message, length delimited. Does not implicitly {@link table.Table.verify|verify} messages.
         * @function encodeDelimited
         * @memberof table.Table
         * @static
         * @param {table.ITable} message Table message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Table.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Table message from the specified reader or buffer.
         * @function decode
         * @memberof table.Table
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {table.Table} Table
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Table.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.table.Table();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.betStatus = $root.table.BetStatus.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.streamingUrl = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Table message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof table.Table
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {table.Table} Table
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Table.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Table message.
         * @function verify
         * @memberof table.Table
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Table.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.betStatus != null && message.hasOwnProperty("betStatus")) {
                let error = $root.table.BetStatus.verify(message.betStatus);
                if (error)
                    return "betStatus." + error;
            }
            if (message.streamingUrl != null && message.hasOwnProperty("streamingUrl"))
                if (!$util.isString(message.streamingUrl))
                    return "streamingUrl: string expected";
            return null;
        };

        /**
         * Creates a Table message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof table.Table
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {table.Table} Table
         */
        Table.fromObject = function fromObject(object) {
            if (object instanceof $root.table.Table)
                return object;
            let message = new $root.table.Table();
            if (object.betStatus != null) {
                if (typeof object.betStatus !== "object")
                    throw TypeError(".table.Table.betStatus: object expected");
                message.betStatus = $root.table.BetStatus.fromObject(object.betStatus);
            }
            if (object.streamingUrl != null)
                message.streamingUrl = String(object.streamingUrl);
            return message;
        };

        /**
         * Creates a plain object from a Table message. Also converts values to other types if specified.
         * @function toObject
         * @memberof table.Table
         * @static
         * @param {table.Table} message Table
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Table.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.betStatus = null;
                object.streamingUrl = "";
            }
            if (message.betStatus != null && message.hasOwnProperty("betStatus"))
                object.betStatus = $root.table.BetStatus.toObject(message.betStatus, options);
            if (message.streamingUrl != null && message.hasOwnProperty("streamingUrl"))
                object.streamingUrl = message.streamingUrl;
            return object;
        };

        /**
         * Converts this Table to JSON.
         * @function toJSON
         * @memberof table.Table
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Table.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Table;
    })();

    table.TableJoinCall = (function() {

        /**
         * Properties of a TableJoinCall.
         * @memberof table
         * @interface ITableJoinCall
         * @property {foundation.IHeader|null} [header] TableJoinCall header
         * @property {string|null} [uuid] TableJoinCall uuid
         */

        /**
         * Constructs a new TableJoinCall.
         * @memberof table
         * @classdesc Represents a TableJoinCall.
         * @implements ITableJoinCall
         * @constructor
         * @param {table.ITableJoinCall=} [properties] Properties to set
         */
        function TableJoinCall(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TableJoinCall header.
         * @member {foundation.IHeader|null|undefined} header
         * @memberof table.TableJoinCall
         * @instance
         */
        TableJoinCall.prototype.header = null;

        /**
         * TableJoinCall uuid.
         * @member {string} uuid
         * @memberof table.TableJoinCall
         * @instance
         */
        TableJoinCall.prototype.uuid = "";

        /**
         * Creates a new TableJoinCall instance using the specified properties.
         * @function create
         * @memberof table.TableJoinCall
         * @static
         * @param {table.ITableJoinCall=} [properties] Properties to set
         * @returns {table.TableJoinCall} TableJoinCall instance
         */
        TableJoinCall.create = function create(properties) {
            return new TableJoinCall(properties);
        };

        /**
         * Encodes the specified TableJoinCall message. Does not implicitly {@link table.TableJoinCall.verify|verify} messages.
         * @function encode
         * @memberof table.TableJoinCall
         * @static
         * @param {table.ITableJoinCall} message TableJoinCall message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TableJoinCall.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                $root.foundation.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.uuid != null && Object.hasOwnProperty.call(message, "uuid"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.uuid);
            return writer;
        };

        /**
         * Encodes the specified TableJoinCall message, length delimited. Does not implicitly {@link table.TableJoinCall.verify|verify} messages.
         * @function encodeDelimited
         * @memberof table.TableJoinCall
         * @static
         * @param {table.ITableJoinCall} message TableJoinCall message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TableJoinCall.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TableJoinCall message from the specified reader or buffer.
         * @function decode
         * @memberof table.TableJoinCall
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {table.TableJoinCall} TableJoinCall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TableJoinCall.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.table.TableJoinCall();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.header = $root.foundation.Header.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.uuid = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TableJoinCall message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof table.TableJoinCall
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {table.TableJoinCall} TableJoinCall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TableJoinCall.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TableJoinCall message.
         * @function verify
         * @memberof table.TableJoinCall
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TableJoinCall.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.header != null && message.hasOwnProperty("header")) {
                let error = $root.foundation.Header.verify(message.header);
                if (error)
                    return "header." + error;
            }
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                if (!$util.isString(message.uuid))
                    return "uuid: string expected";
            return null;
        };

        /**
         * Creates a TableJoinCall message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof table.TableJoinCall
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {table.TableJoinCall} TableJoinCall
         */
        TableJoinCall.fromObject = function fromObject(object) {
            if (object instanceof $root.table.TableJoinCall)
                return object;
            let message = new $root.table.TableJoinCall();
            if (object.header != null) {
                if (typeof object.header !== "object")
                    throw TypeError(".table.TableJoinCall.header: object expected");
                message.header = $root.foundation.Header.fromObject(object.header);
            }
            if (object.uuid != null)
                message.uuid = String(object.uuid);
            return message;
        };

        /**
         * Creates a plain object from a TableJoinCall message. Also converts values to other types if specified.
         * @function toObject
         * @memberof table.TableJoinCall
         * @static
         * @param {table.TableJoinCall} message TableJoinCall
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TableJoinCall.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.header = null;
                object.uuid = "";
            }
            if (message.header != null && message.hasOwnProperty("header"))
                object.header = $root.foundation.Header.toObject(message.header, options);
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                object.uuid = message.uuid;
            return object;
        };

        /**
         * Converts this TableJoinCall to JSON.
         * @function toJSON
         * @memberof table.TableJoinCall
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TableJoinCall.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TableJoinCall;
    })();

    table.TableJoinRecall = (function() {

        /**
         * Properties of a TableJoinRecall.
         * @memberof table
         * @interface ITableJoinRecall
         * @property {foundation.IHeader|null} [header] TableJoinRecall header
         * @property {table.ITable|null} [table] TableJoinRecall table
         */

        /**
         * Constructs a new TableJoinRecall.
         * @memberof table
         * @classdesc Represents a TableJoinRecall.
         * @implements ITableJoinRecall
         * @constructor
         * @param {table.ITableJoinRecall=} [properties] Properties to set
         */
        function TableJoinRecall(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TableJoinRecall header.
         * @member {foundation.IHeader|null|undefined} header
         * @memberof table.TableJoinRecall
         * @instance
         */
        TableJoinRecall.prototype.header = null;

        /**
         * TableJoinRecall table.
         * @member {table.ITable|null|undefined} table
         * @memberof table.TableJoinRecall
         * @instance
         */
        TableJoinRecall.prototype.table = null;

        /**
         * Creates a new TableJoinRecall instance using the specified properties.
         * @function create
         * @memberof table.TableJoinRecall
         * @static
         * @param {table.ITableJoinRecall=} [properties] Properties to set
         * @returns {table.TableJoinRecall} TableJoinRecall instance
         */
        TableJoinRecall.create = function create(properties) {
            return new TableJoinRecall(properties);
        };

        /**
         * Encodes the specified TableJoinRecall message. Does not implicitly {@link table.TableJoinRecall.verify|verify} messages.
         * @function encode
         * @memberof table.TableJoinRecall
         * @static
         * @param {table.ITableJoinRecall} message TableJoinRecall message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TableJoinRecall.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                $root.foundation.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.table != null && Object.hasOwnProperty.call(message, "table"))
                $root.table.Table.encode(message.table, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified TableJoinRecall message, length delimited. Does not implicitly {@link table.TableJoinRecall.verify|verify} messages.
         * @function encodeDelimited
         * @memberof table.TableJoinRecall
         * @static
         * @param {table.ITableJoinRecall} message TableJoinRecall message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TableJoinRecall.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TableJoinRecall message from the specified reader or buffer.
         * @function decode
         * @memberof table.TableJoinRecall
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {table.TableJoinRecall} TableJoinRecall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TableJoinRecall.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.table.TableJoinRecall();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.header = $root.foundation.Header.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.table = $root.table.Table.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TableJoinRecall message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof table.TableJoinRecall
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {table.TableJoinRecall} TableJoinRecall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TableJoinRecall.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TableJoinRecall message.
         * @function verify
         * @memberof table.TableJoinRecall
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TableJoinRecall.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.header != null && message.hasOwnProperty("header")) {
                let error = $root.foundation.Header.verify(message.header);
                if (error)
                    return "header." + error;
            }
            if (message.table != null && message.hasOwnProperty("table")) {
                let error = $root.table.Table.verify(message.table);
                if (error)
                    return "table." + error;
            }
            return null;
        };

        /**
         * Creates a TableJoinRecall message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof table.TableJoinRecall
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {table.TableJoinRecall} TableJoinRecall
         */
        TableJoinRecall.fromObject = function fromObject(object) {
            if (object instanceof $root.table.TableJoinRecall)
                return object;
            let message = new $root.table.TableJoinRecall();
            if (object.header != null) {
                if (typeof object.header !== "object")
                    throw TypeError(".table.TableJoinRecall.header: object expected");
                message.header = $root.foundation.Header.fromObject(object.header);
            }
            if (object.table != null) {
                if (typeof object.table !== "object")
                    throw TypeError(".table.TableJoinRecall.table: object expected");
                message.table = $root.table.Table.fromObject(object.table);
            }
            return message;
        };

        /**
         * Creates a plain object from a TableJoinRecall message. Also converts values to other types if specified.
         * @function toObject
         * @memberof table.TableJoinRecall
         * @static
         * @param {table.TableJoinRecall} message TableJoinRecall
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TableJoinRecall.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.header = null;
                object.table = null;
            }
            if (message.header != null && message.hasOwnProperty("header"))
                object.header = $root.foundation.Header.toObject(message.header, options);
            if (message.table != null && message.hasOwnProperty("table"))
                object.table = $root.table.Table.toObject(message.table, options);
            return object;
        };

        /**
         * Converts this TableJoinRecall to JSON.
         * @function toJSON
         * @memberof table.TableJoinRecall
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TableJoinRecall.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TableJoinRecall;
    })();

    table.BetStatus = (function() {

        /**
         * Properties of a BetStatus.
         * @memberof table
         * @interface IBetStatus
         * @property {number|null} [Banker] BetStatus Banker
         * @property {number|null} [Player] BetStatus Player
         * @property {number|null} [Tie] BetStatus Tie
         * @property {number|null} [BankerPair] BetStatus BankerPair
         * @property {number|null} [PlayerPair] BetStatus PlayerPair
         * @property {number|null} [BankerNatural] BetStatus BankerNatural
         * @property {number|null} [PlayerNatural] BetStatus PlayerNatural
         */

        /**
         * Constructs a new BetStatus.
         * @memberof table
         * @classdesc Represents a BetStatus.
         * @implements IBetStatus
         * @constructor
         * @param {table.IBetStatus=} [properties] Properties to set
         */
        function BetStatus(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BetStatus Banker.
         * @member {number} Banker
         * @memberof table.BetStatus
         * @instance
         */
        BetStatus.prototype.Banker = 0;

        /**
         * BetStatus Player.
         * @member {number} Player
         * @memberof table.BetStatus
         * @instance
         */
        BetStatus.prototype.Player = 0;

        /**
         * BetStatus Tie.
         * @member {number} Tie
         * @memberof table.BetStatus
         * @instance
         */
        BetStatus.prototype.Tie = 0;

        /**
         * BetStatus BankerPair.
         * @member {number} BankerPair
         * @memberof table.BetStatus
         * @instance
         */
        BetStatus.prototype.BankerPair = 0;

        /**
         * BetStatus PlayerPair.
         * @member {number} PlayerPair
         * @memberof table.BetStatus
         * @instance
         */
        BetStatus.prototype.PlayerPair = 0;

        /**
         * BetStatus BankerNatural.
         * @member {number} BankerNatural
         * @memberof table.BetStatus
         * @instance
         */
        BetStatus.prototype.BankerNatural = 0;

        /**
         * BetStatus PlayerNatural.
         * @member {number} PlayerNatural
         * @memberof table.BetStatus
         * @instance
         */
        BetStatus.prototype.PlayerNatural = 0;

        /**
         * Creates a new BetStatus instance using the specified properties.
         * @function create
         * @memberof table.BetStatus
         * @static
         * @param {table.IBetStatus=} [properties] Properties to set
         * @returns {table.BetStatus} BetStatus instance
         */
        BetStatus.create = function create(properties) {
            return new BetStatus(properties);
        };

        /**
         * Encodes the specified BetStatus message. Does not implicitly {@link table.BetStatus.verify|verify} messages.
         * @function encode
         * @memberof table.BetStatus
         * @static
         * @param {table.IBetStatus} message BetStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BetStatus.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Banker != null && Object.hasOwnProperty.call(message, "Banker"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.Banker);
            if (message.Player != null && Object.hasOwnProperty.call(message, "Player"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.Player);
            if (message.Tie != null && Object.hasOwnProperty.call(message, "Tie"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.Tie);
            if (message.BankerPair != null && Object.hasOwnProperty.call(message, "BankerPair"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.BankerPair);
            if (message.PlayerPair != null && Object.hasOwnProperty.call(message, "PlayerPair"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.PlayerPair);
            if (message.BankerNatural != null && Object.hasOwnProperty.call(message, "BankerNatural"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.BankerNatural);
            if (message.PlayerNatural != null && Object.hasOwnProperty.call(message, "PlayerNatural"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.PlayerNatural);
            return writer;
        };

        /**
         * Encodes the specified BetStatus message, length delimited. Does not implicitly {@link table.BetStatus.verify|verify} messages.
         * @function encodeDelimited
         * @memberof table.BetStatus
         * @static
         * @param {table.IBetStatus} message BetStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BetStatus.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BetStatus message from the specified reader or buffer.
         * @function decode
         * @memberof table.BetStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {table.BetStatus} BetStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BetStatus.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.table.BetStatus();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Banker = reader.int32();
                    break;
                case 2:
                    message.Player = reader.int32();
                    break;
                case 3:
                    message.Tie = reader.int32();
                    break;
                case 4:
                    message.BankerPair = reader.int32();
                    break;
                case 5:
                    message.PlayerPair = reader.int32();
                    break;
                case 6:
                    message.BankerNatural = reader.int32();
                    break;
                case 7:
                    message.PlayerNatural = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BetStatus message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof table.BetStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {table.BetStatus} BetStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BetStatus.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BetStatus message.
         * @function verify
         * @memberof table.BetStatus
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BetStatus.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Banker != null && message.hasOwnProperty("Banker"))
                if (!$util.isInteger(message.Banker))
                    return "Banker: integer expected";
            if (message.Player != null && message.hasOwnProperty("Player"))
                if (!$util.isInteger(message.Player))
                    return "Player: integer expected";
            if (message.Tie != null && message.hasOwnProperty("Tie"))
                if (!$util.isInteger(message.Tie))
                    return "Tie: integer expected";
            if (message.BankerPair != null && message.hasOwnProperty("BankerPair"))
                if (!$util.isInteger(message.BankerPair))
                    return "BankerPair: integer expected";
            if (message.PlayerPair != null && message.hasOwnProperty("PlayerPair"))
                if (!$util.isInteger(message.PlayerPair))
                    return "PlayerPair: integer expected";
            if (message.BankerNatural != null && message.hasOwnProperty("BankerNatural"))
                if (!$util.isInteger(message.BankerNatural))
                    return "BankerNatural: integer expected";
            if (message.PlayerNatural != null && message.hasOwnProperty("PlayerNatural"))
                if (!$util.isInteger(message.PlayerNatural))
                    return "PlayerNatural: integer expected";
            return null;
        };

        /**
         * Creates a BetStatus message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof table.BetStatus
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {table.BetStatus} BetStatus
         */
        BetStatus.fromObject = function fromObject(object) {
            if (object instanceof $root.table.BetStatus)
                return object;
            let message = new $root.table.BetStatus();
            if (object.Banker != null)
                message.Banker = object.Banker | 0;
            if (object.Player != null)
                message.Player = object.Player | 0;
            if (object.Tie != null)
                message.Tie = object.Tie | 0;
            if (object.BankerPair != null)
                message.BankerPair = object.BankerPair | 0;
            if (object.PlayerPair != null)
                message.PlayerPair = object.PlayerPair | 0;
            if (object.BankerNatural != null)
                message.BankerNatural = object.BankerNatural | 0;
            if (object.PlayerNatural != null)
                message.PlayerNatural = object.PlayerNatural | 0;
            return message;
        };

        /**
         * Creates a plain object from a BetStatus message. Also converts values to other types if specified.
         * @function toObject
         * @memberof table.BetStatus
         * @static
         * @param {table.BetStatus} message BetStatus
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BetStatus.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.Banker = 0;
                object.Player = 0;
                object.Tie = 0;
                object.BankerPair = 0;
                object.PlayerPair = 0;
                object.BankerNatural = 0;
                object.PlayerNatural = 0;
            }
            if (message.Banker != null && message.hasOwnProperty("Banker"))
                object.Banker = message.Banker;
            if (message.Player != null && message.hasOwnProperty("Player"))
                object.Player = message.Player;
            if (message.Tie != null && message.hasOwnProperty("Tie"))
                object.Tie = message.Tie;
            if (message.BankerPair != null && message.hasOwnProperty("BankerPair"))
                object.BankerPair = message.BankerPair;
            if (message.PlayerPair != null && message.hasOwnProperty("PlayerPair"))
                object.PlayerPair = message.PlayerPair;
            if (message.BankerNatural != null && message.hasOwnProperty("BankerNatural"))
                object.BankerNatural = message.BankerNatural;
            if (message.PlayerNatural != null && message.hasOwnProperty("PlayerNatural"))
                object.PlayerNatural = message.PlayerNatural;
            return object;
        };

        /**
         * Converts this BetStatus to JSON.
         * @function toJSON
         * @memberof table.BetStatus
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BetStatus.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BetStatus;
    })();

    return table;
})();

export { $root as default };
