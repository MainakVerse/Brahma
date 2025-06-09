import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';
import { GalaxyParams } from './types';
import { GalaxyParamsSchema } from './helpers';

export const encodeGalaxyParams = (params: GalaxyParams): string => {
  return compressToEncodedURIComponent(JSON.stringify(params));
};

export const decodeGalaxyParams = (encoded: string): GalaxyParams | null => {
  try {
    const json = decompressFromEncodedURIComponent(encoded);
    if (!json) return null;
    const parsed = JSON.parse(json);
    const result = GalaxyParamsSchema.safeParse(parsed);
    return result.success ? result.data : null;
  } catch {
    return null;
  }
};
