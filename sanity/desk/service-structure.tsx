import { ListItemBuilder } from 'sanity/desk';
import { PencilRuler } from 'lucide-react';

import defineStructure from '../utils/define-structure';

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Services')
    .schemaType('service')
    .child(S.documentTypeList('service').title('Services'))
    .icon(PencilRuler)
);
