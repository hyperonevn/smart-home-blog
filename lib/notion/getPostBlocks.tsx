import api from "@/lib/server/notion-api";
import { type ExtendedRecordMap } from "notion-types";

export async function getPostBlocks(id: string): Promise<ExtendedRecordMap> {
  const recordMap = await api.getPage(id);
  return recordMap as ExtendedRecordMap;
}
