import * as $protobuf from "protobufjs";
/** Namespace auth. */
export namespace auth {

    /** Properties of an Information. */
    interface IInformation {

        /** Information header */
        header?: (foundation.IHeader|null);

        /** Information name */
        name?: (string|null);

        /** Information wallet */
        wallet?: (number|null);
    }

    /** Represents an Information. */
    class Information implements IInformation {

        /**
         * Constructs a new Information.
         * @param [properties] Properties to set
         */
        constructor(properties?: auth.IInformation);

        /** Information header. */
        public header?: (foundation.IHeader|null);

        /** Information name. */
        public name: string;

        /** Information wallet. */
        public wallet: number;

        /**
         * Creates a new Information instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Information instance
         */
        public static create(properties?: auth.IInformation): auth.Information;

        /**
         * Encodes the specified Information message. Does not implicitly {@link auth.Information.verify|verify} messages.
         * @param message Information message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: auth.IInformation, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Information message, length delimited. Does not implicitly {@link auth.Information.verify|verify} messages.
         * @param message Information message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: auth.IInformation, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Information message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Information
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): auth.Information;

        /**
         * Decodes an Information message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Information
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): auth.Information;

        /**
         * Verifies an Information message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Information message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Information
         */
        public static fromObject(object: { [k: string]: any }): auth.Information;

        /**
         * Creates a plain object from an Information message. Also converts values to other types if specified.
         * @param message Information
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: auth.Information, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Information to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LoginCall. */
    interface ILoginCall {

        /** LoginCall header */
        header?: (foundation.IHeader|null);

        /** LoginCall account */
        account?: (string|null);

        /** LoginCall password */
        password?: (string|null);
    }

    /** Represents a LoginCall. */
    class LoginCall implements ILoginCall {

        /**
         * Constructs a new LoginCall.
         * @param [properties] Properties to set
         */
        constructor(properties?: auth.ILoginCall);

        /** LoginCall header. */
        public header?: (foundation.IHeader|null);

        /** LoginCall account. */
        public account: string;

        /** LoginCall password. */
        public password: string;

        /**
         * Creates a new LoginCall instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LoginCall instance
         */
        public static create(properties?: auth.ILoginCall): auth.LoginCall;

        /**
         * Encodes the specified LoginCall message. Does not implicitly {@link auth.LoginCall.verify|verify} messages.
         * @param message LoginCall message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: auth.ILoginCall, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LoginCall message, length delimited. Does not implicitly {@link auth.LoginCall.verify|verify} messages.
         * @param message LoginCall message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: auth.ILoginCall, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LoginCall message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LoginCall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): auth.LoginCall;

        /**
         * Decodes a LoginCall message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LoginCall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): auth.LoginCall;

        /**
         * Verifies a LoginCall message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LoginCall message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LoginCall
         */
        public static fromObject(object: { [k: string]: any }): auth.LoginCall;

        /**
         * Creates a plain object from a LoginCall message. Also converts values to other types if specified.
         * @param message LoginCall
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: auth.LoginCall, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LoginCall to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LoginRecall. */
    interface ILoginRecall {

        /** LoginRecall header */
        header?: (foundation.IHeader|null);

        /** LoginRecall status */
        status?: (number|null);
    }

    /** Represents a LoginRecall. */
    class LoginRecall implements ILoginRecall {

        /**
         * Constructs a new LoginRecall.
         * @param [properties] Properties to set
         */
        constructor(properties?: auth.ILoginRecall);

        /** LoginRecall header. */
        public header?: (foundation.IHeader|null);

        /** LoginRecall status. */
        public status: number;

        /**
         * Creates a new LoginRecall instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LoginRecall instance
         */
        public static create(properties?: auth.ILoginRecall): auth.LoginRecall;

        /**
         * Encodes the specified LoginRecall message. Does not implicitly {@link auth.LoginRecall.verify|verify} messages.
         * @param message LoginRecall message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: auth.ILoginRecall, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LoginRecall message, length delimited. Does not implicitly {@link auth.LoginRecall.verify|verify} messages.
         * @param message LoginRecall message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: auth.ILoginRecall, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LoginRecall message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LoginRecall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): auth.LoginRecall;

        /**
         * Decodes a LoginRecall message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LoginRecall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): auth.LoginRecall;

        /**
         * Verifies a LoginRecall message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LoginRecall message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LoginRecall
         */
        public static fromObject(object: { [k: string]: any }): auth.LoginRecall;

        /**
         * Creates a plain object from a LoginRecall message. Also converts values to other types if specified.
         * @param message LoginRecall
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: auth.LoginRecall, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LoginRecall to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}

/** Namespace foundation. */
export namespace foundation {

    /** Properties of a Header. */
    interface IHeader {

        /** Header uri */
        uri?: (string|null);
    }

    /** Represents a Header. */
    class Header implements IHeader {

        /**
         * Constructs a new Header.
         * @param [properties] Properties to set
         */
        constructor(properties?: foundation.IHeader);

        /** Header uri. */
        public uri: string;

        /**
         * Creates a new Header instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Header instance
         */
        public static create(properties?: foundation.IHeader): foundation.Header;

        /**
         * Encodes the specified Header message. Does not implicitly {@link foundation.Header.verify|verify} messages.
         * @param message Header message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: foundation.IHeader, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Header message, length delimited. Does not implicitly {@link foundation.Header.verify|verify} messages.
         * @param message Header message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: foundation.IHeader, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Header message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Header
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): foundation.Header;

        /**
         * Decodes a Header message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Header
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): foundation.Header;

        /**
         * Verifies a Header message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Header message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Header
         */
        public static fromObject(object: { [k: string]: any }): foundation.Header;

        /**
         * Creates a plain object from a Header message. Also converts values to other types if specified.
         * @param message Header
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: foundation.Header, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Header to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}

/** Namespace lobby. */
export namespace lobby {

    /** Properties of a LobbyInfo. */
    interface ILobbyInfo {

        /** LobbyInfo header */
        header?: (foundation.IHeader|null);

        /** LobbyInfo tables */
        tables?: (lobby.ITableInfo[]|null);
    }

    /** Represents a LobbyInfo. */
    class LobbyInfo implements ILobbyInfo {

        /**
         * Constructs a new LobbyInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: lobby.ILobbyInfo);

        /** LobbyInfo header. */
        public header?: (foundation.IHeader|null);

        /** LobbyInfo tables. */
        public tables: lobby.ITableInfo[];

        /**
         * Creates a new LobbyInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LobbyInfo instance
         */
        public static create(properties?: lobby.ILobbyInfo): lobby.LobbyInfo;

        /**
         * Encodes the specified LobbyInfo message. Does not implicitly {@link lobby.LobbyInfo.verify|verify} messages.
         * @param message LobbyInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: lobby.ILobbyInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LobbyInfo message, length delimited. Does not implicitly {@link lobby.LobbyInfo.verify|verify} messages.
         * @param message LobbyInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: lobby.ILobbyInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LobbyInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LobbyInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): lobby.LobbyInfo;

        /**
         * Decodes a LobbyInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LobbyInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): lobby.LobbyInfo;

        /**
         * Verifies a LobbyInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LobbyInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LobbyInfo
         */
        public static fromObject(object: { [k: string]: any }): lobby.LobbyInfo;

        /**
         * Creates a plain object from a LobbyInfo message. Also converts values to other types if specified.
         * @param message LobbyInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: lobby.LobbyInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LobbyInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TableInfo. */
    interface ITableInfo {

        /** TableInfo uuid */
        uuid?: (string|null);

        /** TableInfo name */
        name?: (string|null);
    }

    /** Represents a TableInfo. */
    class TableInfo implements ITableInfo {

        /**
         * Constructs a new TableInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: lobby.ITableInfo);

        /** TableInfo uuid. */
        public uuid: string;

        /** TableInfo name. */
        public name: string;

        /**
         * Creates a new TableInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TableInfo instance
         */
        public static create(properties?: lobby.ITableInfo): lobby.TableInfo;

        /**
         * Encodes the specified TableInfo message. Does not implicitly {@link lobby.TableInfo.verify|verify} messages.
         * @param message TableInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: lobby.ITableInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TableInfo message, length delimited. Does not implicitly {@link lobby.TableInfo.verify|verify} messages.
         * @param message TableInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: lobby.ITableInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TableInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TableInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): lobby.TableInfo;

        /**
         * Decodes a TableInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TableInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): lobby.TableInfo;

        /**
         * Verifies a TableInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TableInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TableInfo
         */
        public static fromObject(object: { [k: string]: any }): lobby.TableInfo;

        /**
         * Creates a plain object from a TableInfo message. Also converts values to other types if specified.
         * @param message TableInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: lobby.TableInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TableInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}

/** Namespace table. */
export namespace table {

    /** Properties of a Table. */
    interface ITable {

        /** Table betStatus */
        betStatus?: (table.IBetStatus|null);

        /** Table streamingUrl */
        streamingUrl?: (string|null);
    }

    /** Represents a Table. */
    class Table implements ITable {

        /**
         * Constructs a new Table.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITable);

        /** Table betStatus. */
        public betStatus?: (table.IBetStatus|null);

        /** Table streamingUrl. */
        public streamingUrl: string;

        /**
         * Creates a new Table instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Table instance
         */
        public static create(properties?: table.ITable): table.Table;

        /**
         * Encodes the specified Table message. Does not implicitly {@link table.Table.verify|verify} messages.
         * @param message Table message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITable, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Table message, length delimited. Does not implicitly {@link table.Table.verify|verify} messages.
         * @param message Table message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITable, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Table message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Table
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): table.Table;

        /**
         * Decodes a Table message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Table
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): table.Table;

        /**
         * Verifies a Table message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Table message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Table
         */
        public static fromObject(object: { [k: string]: any }): table.Table;

        /**
         * Creates a plain object from a Table message. Also converts values to other types if specified.
         * @param message Table
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.Table, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Table to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TableJoinCall. */
    interface ITableJoinCall {

        /** TableJoinCall header */
        header?: (foundation.IHeader|null);

        /** TableJoinCall uuid */
        uuid?: (string|null);
    }

    /** Represents a TableJoinCall. */
    class TableJoinCall implements ITableJoinCall {

        /**
         * Constructs a new TableJoinCall.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITableJoinCall);

        /** TableJoinCall header. */
        public header?: (foundation.IHeader|null);

        /** TableJoinCall uuid. */
        public uuid: string;

        /**
         * Creates a new TableJoinCall instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TableJoinCall instance
         */
        public static create(properties?: table.ITableJoinCall): table.TableJoinCall;

        /**
         * Encodes the specified TableJoinCall message. Does not implicitly {@link table.TableJoinCall.verify|verify} messages.
         * @param message TableJoinCall message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITableJoinCall, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TableJoinCall message, length delimited. Does not implicitly {@link table.TableJoinCall.verify|verify} messages.
         * @param message TableJoinCall message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITableJoinCall, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TableJoinCall message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TableJoinCall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): table.TableJoinCall;

        /**
         * Decodes a TableJoinCall message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TableJoinCall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): table.TableJoinCall;

        /**
         * Verifies a TableJoinCall message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TableJoinCall message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TableJoinCall
         */
        public static fromObject(object: { [k: string]: any }): table.TableJoinCall;

        /**
         * Creates a plain object from a TableJoinCall message. Also converts values to other types if specified.
         * @param message TableJoinCall
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TableJoinCall, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TableJoinCall to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TableJoinRecall. */
    interface ITableJoinRecall {

        /** TableJoinRecall header */
        header?: (foundation.IHeader|null);

        /** TableJoinRecall table */
        table?: (table.ITable|null);
    }

    /** Represents a TableJoinRecall. */
    class TableJoinRecall implements ITableJoinRecall {

        /**
         * Constructs a new TableJoinRecall.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITableJoinRecall);

        /** TableJoinRecall header. */
        public header?: (foundation.IHeader|null);

        /** TableJoinRecall table. */
        public table?: (table.ITable|null);

        /**
         * Creates a new TableJoinRecall instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TableJoinRecall instance
         */
        public static create(properties?: table.ITableJoinRecall): table.TableJoinRecall;

        /**
         * Encodes the specified TableJoinRecall message. Does not implicitly {@link table.TableJoinRecall.verify|verify} messages.
         * @param message TableJoinRecall message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITableJoinRecall, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TableJoinRecall message, length delimited. Does not implicitly {@link table.TableJoinRecall.verify|verify} messages.
         * @param message TableJoinRecall message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITableJoinRecall, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TableJoinRecall message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TableJoinRecall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): table.TableJoinRecall;

        /**
         * Decodes a TableJoinRecall message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TableJoinRecall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): table.TableJoinRecall;

        /**
         * Verifies a TableJoinRecall message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TableJoinRecall message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TableJoinRecall
         */
        public static fromObject(object: { [k: string]: any }): table.TableJoinRecall;

        /**
         * Creates a plain object from a TableJoinRecall message. Also converts values to other types if specified.
         * @param message TableJoinRecall
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TableJoinRecall, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TableJoinRecall to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BetStatus. */
    interface IBetStatus {

        /** BetStatus Banker */
        Banker?: (number|null);

        /** BetStatus Player */
        Player?: (number|null);

        /** BetStatus Tie */
        Tie?: (number|null);

        /** BetStatus BankerPair */
        BankerPair?: (number|null);

        /** BetStatus PlayerPair */
        PlayerPair?: (number|null);

        /** BetStatus BankerNatural */
        BankerNatural?: (number|null);

        /** BetStatus PlayerNatural */
        PlayerNatural?: (number|null);
    }

    /** Represents a BetStatus. */
    class BetStatus implements IBetStatus {

        /**
         * Constructs a new BetStatus.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.IBetStatus);

        /** BetStatus Banker. */
        public Banker: number;

        /** BetStatus Player. */
        public Player: number;

        /** BetStatus Tie. */
        public Tie: number;

        /** BetStatus BankerPair. */
        public BankerPair: number;

        /** BetStatus PlayerPair. */
        public PlayerPair: number;

        /** BetStatus BankerNatural. */
        public BankerNatural: number;

        /** BetStatus PlayerNatural. */
        public PlayerNatural: number;

        /**
         * Creates a new BetStatus instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BetStatus instance
         */
        public static create(properties?: table.IBetStatus): table.BetStatus;

        /**
         * Encodes the specified BetStatus message. Does not implicitly {@link table.BetStatus.verify|verify} messages.
         * @param message BetStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.IBetStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BetStatus message, length delimited. Does not implicitly {@link table.BetStatus.verify|verify} messages.
         * @param message BetStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.IBetStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BetStatus message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BetStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): table.BetStatus;

        /**
         * Decodes a BetStatus message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BetStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): table.BetStatus;

        /**
         * Verifies a BetStatus message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BetStatus message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BetStatus
         */
        public static fromObject(object: { [k: string]: any }): table.BetStatus;

        /**
         * Creates a plain object from a BetStatus message. Also converts values to other types if specified.
         * @param message BetStatus
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.BetStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BetStatus to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
