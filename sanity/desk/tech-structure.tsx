import { ListItemBuilder } from 'sanity/structure';
import { Cpu } from 'lucide-react';

import defineStructure from '../utils/define-structure';

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Tech')
    .schemaType('tech')
    .child(S.documentTypeList('tech').title('Tech'))
    .icon(Cpu)
);
