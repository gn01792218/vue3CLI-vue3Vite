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
