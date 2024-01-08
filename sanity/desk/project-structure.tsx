import { ListItemBuilder } from 'sanity/desk';
import { Presentation } from 'lucide-react';

import defineStructure from '../utils/define-structure';

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Projects')
    .schemaType('project')
    .child(S.documentTypeList('project').title('Projects'))
    .icon(Presentation)
);
