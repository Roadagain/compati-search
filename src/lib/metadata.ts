export interface Metadata {
  /**
   * キャラクターの呼称
   */
  character: string;
}

type WouldBeMetadata = { [K in keyof Metadata]?: unknown };

export const isMetadata = (obj: WouldBeMetadata): obj is Metadata => {
  return typeof obj.character === 'string';
};
