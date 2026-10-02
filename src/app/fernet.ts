import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Fernet {

  HMAC_LEN = 32;
  HEADER_LEN = 1 + 8 + 16;
  key_: ArrayBuffer | null = null;

  setKey(key_: string) {
    this.key_ = this.hex_string_to_array_buffer(key_);
  }

  setUInt8Key(key_: ArrayBuffer) {
    this.key_ = key_;
  }

  hex_string_to_array_buffer(hex_string: string): ArrayBuffer {
    return new Uint8Array(hex_string.match(/../g)!.map(h=>parseInt(h, 16))).buffer;
  }

  async decrypt(cyphertext: string) {
    if (this.key_ === null) {
      throw "No Key"
    }
    let data = this.hex_string_to_array_buffer(cyphertext);
    let timestamp = data.slice(1, 9);
    let body = data.slice(0, data.byteLength-this.HMAC_LEN);
    let iv = data.slice(9, this.HEADER_LEN);
    let crypto_key = await window.crypto.subtle.importKey("raw", this.key_.slice(this.key_.byteLength/2, this.key_.byteLength), "AES-CBC", false, ["decrypt"]);
    let processed_cyphertext = body.slice(this.HEADER_LEN, body.byteLength);
    try {
      let plaintext = await window.crypto.subtle.decrypt(
        {
          name: "AES-CBC",
          iv: iv
        },
        crypto_key,
        processed_cyphertext
      );
      return plaintext;
    } catch (err) {
      console.info(err);
      throw err;
    }
  }
}
