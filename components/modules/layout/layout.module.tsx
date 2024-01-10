import { TLayoutModule } from '@/types';
import HeadingTextLayout from './heading-text.layout';
import ImageTextLayout from './image-text.layout';
import ColumnLayout from './column.layout';

export default function LayoutModule({
  heading,
  headingTextCard,
  imageTextCard,
  layoutType,
  threeColumnCards,
  twoColumnCards,
}: TLayoutModule) {
  switch (layoutType) {
    case 'headingTextCard':
      return (
        <HeadingTextLayout
          heading={heading}
          headingTextCard={headingTextCard}
        />
      );
    case 'imageTextCard':
      return (
        <ImageTextLayout heading={heading} imageTextCard={imageTextCard} />
      );
    case 'threeColumnCards':
      return (
        <ColumnLayout
          columnNumber={3}
          heading={heading}
          threeColumnCards={threeColumnCards}
        />
      );
    case 'twoColumnCards':
      return <ColumnLayout heading={heading} twoColumnCards={twoColumnCards} />;
    default:
      return null;
  }
}
