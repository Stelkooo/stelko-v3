import { ListItemBuilder } from 'sanity/desk';
import { Puzzle } from 'lucide-react';

import defineStructure from '../utils/define-structure';

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Reusable Modules')
    .schemaType('reusableModule')
    .child(S.documentTypeList('reusableModule').title('Reusable Modules'))
    .icon(Puzzle)
);
