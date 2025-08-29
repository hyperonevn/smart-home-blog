import { useEffect, useState } from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useConfig } from "@/lib/config";
import { BlogConfig } from "@/types";

dayjs.extend(localizedFormat);

const loaded: { [key: string]: boolean | Promise<void> } = {};

interface FormattedDateProps {
  date: string | Date;
}

export default function FormattedDate({ date }: FormattedDateProps) {
  const config = useConfig() as unknown as BlogConfig;
  const lang = config.lang.slice(0, 2);
  const [isLocaleLoaded, setIsLocaleLoaded] = useState<boolean>(
    loaded[lang] === true
  );

  useEffect(() => {
    if (!isLocaleLoaded) {
      loaded[lang] ??= import(`dayjs/locale/${lang}.js`).then(
        () => {
          loaded[lang] = true;
          dayjs.locale(lang);
        },
        () => console.warn(`dayjs locale \`${lang}\` not found`)
      );
      if (loaded[lang] instanceof Promise) {
        loaded[lang].then(() => setIsLocaleLoaded(true));
      }
    }
  }, [isLocaleLoaded, lang]);

  return <span>{dayjs(date).format("ll")}</span>;
}
