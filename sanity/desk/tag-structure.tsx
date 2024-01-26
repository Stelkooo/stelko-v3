import { ListItemBuilder } from 'sanity/structure';
import { Tags } from 'lucide-react';

import defineStructure from '../utils/define-structure';

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Tags')
    .schemaType('tag')
    .child(S.documentTypeList('tag').title('Tags'))
    .icon(Tags)
);
