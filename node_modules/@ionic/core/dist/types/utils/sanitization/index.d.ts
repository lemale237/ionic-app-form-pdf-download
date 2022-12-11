/**
 * Does a simple sanitization of all elements
 * in an untrusted string
 */
export declare const sanitizeDOMString: (untrustedString: string | IonicSafeString | undefined) => string | undefined;
export declare class IonicSafeString {
    value: string;
    constructor(value: string);
}
