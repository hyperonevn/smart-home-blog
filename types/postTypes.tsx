export interface PostAuthor {
  id: string;
  first_name?: string;
  last_name?: string;
  profile_photo?: string;
}

export interface DateProperty {
  start_date: string;
  end_date?: string;
  time_zone?: string;
}

export interface Post {
  id: string;
  Author?: PostAuthor[];
  "Publication Date"?: DateProperty;
  "Hero Image"?: string;
  "Link for A-S"?: string;
  Category?: string[];
  Notes?: string;
  Slug?: string;
  "Meta Description"?: string;
  "Related Articles"?: string;
  Subtitle?: string;
  Tags?: string[];
  Status?: "Published" | "Draft" | string;
  Description?: string;
  URL?: string;
  Title: string;
  fullWidth?: boolean;
  date: number; // timestamp (UNIX ms)
}
