import { config as BLOG } from "@/lib/server/config";

import { idToUuid } from "notion-utils";
import dayjs from "dayjs";
import api from "@/lib/server/notion-api";
import getAllPageIds from "./getAllPageIds";
import getPageProperties from "./getPageProperties";
import filterPublishedPosts from "./filterPublishedPosts";
import { BlockMap, Collection } from "notion-types";
import { Post } from "@/types/postTypes";

function sanitizeForJSON(value: any): any {
  if (value === undefined) return null;
  if (value === null) return null;
  if (Array.isArray(value)) {
    return value.map((item: any) => sanitizeForJSON(item));
  }
  if (typeof value === "object") {
    const result: { [key: string]: any } = {};
    for (const [key, val] of Object.entries(value)) {
      if (val === undefined) continue;
      result[key] = sanitizeForJSON(val);
    }
    return result;
  }
  return value;
}
/**
 * @param {{ includePages: boolean }} - false: posts only / true: include pages
 */
export async function getAllPosts(): Promise<Post[] | null> {
  const id = idToUuid(process.env.NOTION_PAGE_ID);

  const response = await api.getPage(id);

  const collection = Object.values(response.collection)[0]?.value as Collection;
  const collectionQuery = response.collection_query as unknown as Collection;
  const block = response.block;
  const schema = collection?.schema;

  const rawMetadata = block[id].value;

  // Check Type
  if (
    rawMetadata?.type !== "collection_view_page" &&
    rawMetadata?.type !== "collection_view"
  ) {
    console.log(`pageId "${id}" is not a database`);
    return null;
  } else {
    // Construct Data
    const pageIds = getAllPageIds(collectionQuery as unknown as Collection);

    const data = [];
    for (let i = 0; i < pageIds.length; i++) {
      const id = pageIds[i];
      const properties = await getPageProperties(
        id,
        block as unknown as BlockMap,
        schema
      );

      // Add fullwidth to properties
      properties.fullWidth = block[id].value?.format?.page_full_width ?? false;
      // Convert date (with timezone) to unix milliseconds timestamp
      properties.date = (
        properties?.date?.start_date
          ? dayjs.tz(properties?.date?.start_date)
          : dayjs(block[id].value?.created_time)
      ).valueOf();

      data.push(sanitizeForJSON(properties));
    }

    // remove all the the items doesn't meet requirements
    const posts = filterPublishedPosts({ posts: data }) as Post[];

    // Sort by date
    if (BLOG.sortByDate) {
      posts.sort((a: Post, b: Post) => b.date - a.date);
    }
    return posts;
  }
}
