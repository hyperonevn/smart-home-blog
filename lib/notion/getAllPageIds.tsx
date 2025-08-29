import { idToUuid } from "notion-utils";
import { Collection, PageMap } from "notion-types";

export default function getAllPageIds(
  collectionQuery: Collection,
  viewId?: string
): string[] {
  const views = Object.values(collectionQuery)[0];

  let pageIds: string[] = [];

  if (viewId) {
    const vId = idToUuid(viewId);
    pageIds = views[vId]?.blockIds ?? [];
  } else {
    const pageSet = new Set<string>();
    Object.values(views).forEach((view: any) => {
      view?.collection_group_results?.blockIds?.forEach((id: string) => {
        pageSet.add(id);
      });
    });
    pageIds = [...pageSet];
  }

  return pageIds;
}
