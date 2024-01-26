import { ListItemBuilder } from 'sanity/structure';
import { BookCopy } from 'lucide-react';

import defineStructure from '../utils/define-structure';

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Blog')
    .schemaType('blog')
    .child(S.documentTypeList('blog').title('Blog'))
    .icon(BookCopy)
);
