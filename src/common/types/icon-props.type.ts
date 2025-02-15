import Image from 'next/image';
import type { ComponentProps } from 'react';

export type IconProps = Omit<ComponentProps<typeof Image>, 'src' | 'alt'>;
