import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { Post } from '../models';
//process.cwd() la folder goc
const BLOG_FOLDER = path.join(process.cwd(), 'blog');
//duong link ..../blog
export default async function getPostList(): Promise<Post[]> {
  //read all markdown file
  const fileNameList = fs.readdirSync(BLOG_FOLDER);
  //doc file trong folder blog
  const postList: Post[] = []
  for (let fileName of fileNameList) {
    const filePath = path.join(BLOG_FOLDER, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const {data, excerpt, content} = matter(fileContents, {excerpt_separator: '<!-- truncate-->'});
    postList.push({
        id: fileName,
        slug: data.slug,
        title: data.title,
        author: {
            name: data.author,
            title: data.author_title,
            profileUrl: data.author_url,
            avatarUrl: data.author_image_url, 
        },
        tagList: data.tags,
        publishedDate: new Date().getTime().toString(),
        description: excerpt || '',
        mdContent: content,

    })
  }
  return postList;
}
