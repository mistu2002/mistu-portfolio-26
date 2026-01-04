import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function getProjects() {
  const dir = path.join(process.cwd(), "content/projects");
  const files = fs.readdirSync(dir);
  return files.map((filename) => {
    const file = fs.readFileSync(path.join(dir, filename), "utf8");
    const { data, content } = matter(file);
    return { slug: filename.replace(/\.md$/, ""), ...data, content };
  });
}
