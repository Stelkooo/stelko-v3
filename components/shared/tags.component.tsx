import { TTag } from '@/types';
import { Badge } from '../ui/badge';

type Props = { tags?: TTag[] };

export default function Tags({ tags }: Props) {
  if (!tags) return null;

  return (
    <ul className="relative flex flex-wrap gap-2">
      {tags
        ? tags.map((tag) => (
            <li key={tag._key}>
              <Badge>{tag.name}</Badge>
            </li>
          ))
        : null}
    </ul>
  );
}
