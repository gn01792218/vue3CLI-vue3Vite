import * as $protobuf from "protobufjs";
/** Properties of a PBUser. */
export interface IPBUser {

    /** PBUser userId */
    userId?: (number|null);

    /** PBUser name */
    name?: (string|null);

    /** PBUser mobile */
    mobile?: (string|null);
}

/** Represents a PBUser. */
export class PBUser implements IPBUser {

    /**
     * Constructs a new PBUser.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPBUser);

    /** PBUser userId. */
    public userId: number;

    /** PBUser name. */
    public name: string;

    /** PBUser mobile. */
    public mobile: string;

    /**
     * Creates a new PBUser instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PBUser instance
     */
    public static create(properties?: IPBUser): PBUser;

    /**
     * Encodes the specified PBUser message. Does not implicitly {@link PBUser.verify|verify} messages.
     * @param message PBUser message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPBUser, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PBUser message, length delimited. Does not implicitly {@link PBUser.verify|verify} messages.
     * @param message PBUser message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPBUser, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PBUser message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PBUser
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PBUser;

    /**
     * Decodes a PBUser message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PBUser
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PBUser;

    /**
     * Verifies a PBUser message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a PBUser message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PBUser
     */
    public static fromObject(object: { [k: string]: any }): PBUser;

    /**
     * Creates a plain object from a PBUser message. Also converts values to other types if specified.
     * @param message PBUser
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: PBUser, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PBUser to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
