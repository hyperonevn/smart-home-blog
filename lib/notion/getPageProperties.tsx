import { getTextContent, getDateValue } from "notion-utils";
import api from "@/lib/server/notion-api";
import { BlockMap } from "notion-types";

async function getPageProperties(id: string, block: BlockMap, schema: any) {
  const rawProperties = Object.entries(block?.[id]?.value?.properties || []);
  const excludeProperties = ["date", "select", "multi_select", "person"];
  const properties: Record<string, any> = {};
  for (let i: number = 0; i < rawProperties.length; i++) {
    const [key, val]: [string, any] = rawProperties[i];
    properties.id = id;
    if (schema[key]?.type && !excludeProperties.includes(schema[key].type)) {
      properties[schema[key].name] = getTextContent(val);
    } else {
      switch (schema[key]?.type) {
        case "date": {
          const { type, ...cleanedDate } = getDateValue(val) as any;
          properties[schema[key].name] = cleanedDate;
          break;
        }
        case "select":
        case "multi_select": {
          const selects: string = getTextContent(val);
          if (selects[0]?.length) {
            properties[schema[key].name] = selects.split(",");
          }
          break;
        }
        case "person": {
          const rawUsers: Array<Array<any>> = val.flat();
          const users: Array<{
            id: string;
            first_name?: string;
            last_name?: string;
            profile_photo?: string;
          }> = [];
          for (let j: number = 0; j < rawUsers.length; j++) {
            if (rawUsers[j][0][1]) {
              const userId: Array<string> = rawUsers[j][0];
              const res: any = await api.getUsers(userId);
              const resValue: any =
                res?.recordMapWithRoles?.notion_user?.[userId[1]]?.value;
              const user: {
                id: string;
                first_name?: string;
                last_name?: string;
                profile_photo?: string;
              } = {
                id: resValue?.id,
                first_name: resValue?.given_name,
                last_name: resValue?.family_name,
                profile_photo: resValue?.profile_photo,
              };
              users.push(user);
            }
          }
          properties[schema[key].name] = users;
          break;
        }
        default:
          break;
      }
    }
  }
  return properties;
}

export { getPageProperties as default };
