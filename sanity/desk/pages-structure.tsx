import { ListItemBuilder } from 'sanity/desk';
import { Files } from 'lucide-react';

import defineStructure from '../utils/define-structure';

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Pages')
    .schemaType('page')
    .child(S.documentTypeList('page').title('Pages'))
    .icon(Files)
);
