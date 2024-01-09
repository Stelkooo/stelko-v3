import { TImageModule } from '@/types';
import SingleImage from './single.image';
import DoubleImage from './double.image';

export default function ImageModule({
  image,
  imageType,
  images,
}: TImageModule) {
  switch (imageType) {
    case 'single':
      return <SingleImage image={image} />;
    case 'double':
      return <DoubleImage images={images} />;
    default:
      return null;
  }
}
