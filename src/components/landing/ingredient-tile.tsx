import type { CSSProperties, FC, ReactNode } from "react";
import type { Flavor } from "@/types";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface IngredientTileProps {
  flavor: Flavor;
  className?: string;
  glass?: boolean;
}

/*
 * Each ingredient photo is a 3 x 2 sheet of square cells. A tile shows one
 * cell, zoomed in slightly (ZOOM percent) so the thin seams between cells
 * never reach the tile edge.
 */
const ZOOM = 130;

/*
 * Glass tiles use a copy of the sheet shot on solid blue. In the browser the
 * blue is turned into real transparency once per sheet, so only the
 * ingredient itself is drawn.
 */
const cutouts = new Map<string, Promise<string>>();

const makeCutout = (src: string): Promise<string> => {
  const cached = cutouts.get(src);
  if (cached) return cached;

  const job = new Promise<string>((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("No canvas"));

      ctx.drawImage(img, 0, 0);
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const px = data.data;

      for (let i = 0; i < px.length; i += 4) {
        const r = px[i];
        const g = px[i + 1];
        const b = px[i + 2];
        const top = Math.max(r, g);
        const spill = b - top;

        if (spill > 40) {
          // 40 to 120 fades out, anything bluer is fully clear.
          px[i + 3] = Math.max(0, Math.round(255 * (1 - (spill - 40) / 80)));
          px[i + 2] = top;
        }
      }

      ctx.putImageData(data, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => reject(new Error("Image failed to load"));
    img.src = src;
  });

  cutouts.set(src, job);
  return job;
};

const IngredientTile: FC<IngredientTileProps> = ({
  flavor,
  className,
  glass = false,
}): ReactNode => {
  const { sheet, col, row } = flavor.tile;
  const keySrc = sheet.replace(/\.jpg$/, "-key.jpg");
  const [cutout, setCutout] = useState<string | null>(null);

  useEffect(() => {
    if (!glass) return;

    let active = true;
    makeCutout(keySrc)
      .then((url) => {
        if (active) setCutout(url);
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, [glass, keySrc]);

  const crop: CSSProperties = {
    width: `${3 * ZOOM}%`,
    height: `${2 * ZOOM}%`,
    left: `${50 - (col + 0.5) * ZOOM}%`,
    top: `${50 - (row + 0.5) * ZOOM}%`,
  };

  if (glass) {
    return (
      <span className={cn("relative block overflow-hidden", className)}>
        {cutout && (
          <span className="absolute block" style={crop}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cutout}
              alt=""
              draggable={false}
              className="absolute inset-0 size-full object-cover"
            />
          </span>
        )}
      </span>
    );
  }

  return (
    <span className={cn("relative block overflow-hidden bg-cream", className)}>
      <span className="absolute block" style={crop}>
        <Image
          src={sheet}
          alt=""
          fill
          draggable={false}
          sizes="(max-width: 639px) 320px, 800px"
          className="object-cover"
        />
      </span>
    </span>
  );
};

export default IngredientTile;
