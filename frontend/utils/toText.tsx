function hexToReadableText(hexString: any) {
  const bytes = Buffer.from(hexString, "hex");
  const text = new TextDecoder("utf-8").decode(bytes);
  return text;
}

export default hexToReadableText;
