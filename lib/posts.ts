import fs from 'fs'
import path from 'path'
import util from 'util'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import {MDXRemoteSerializeResult} from "next-mdx-remote";

const postsDirectory = path.join(process.cwd(), 'posts');

export async function getSortedPostsData() {
    //get file names
    const fileNames = util.promisify(fs.readdir)(postsDirectory);
    const allPostData = (await fileNames).map(async fileName => {
        //remove .md from name, set as id
        const id = fileName.replace(/\.md$/, '');

        //read markdown file
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = util.promisify(fs.readFile)(fullPath, 'utf8');

        //use gray-matter to parse metadata section
        const matterResult = matter(await fileContents);

        return {
            id,
            ...(matterResult.data as { title: string }),
            date: matterResult.data.date?.toString()
        };
    });
    //sort the post
    return (await Promise.all(allPostData)).sort((a, b) => {
        let dateA = Date.parse(a.date);
        let dateB = Date.parse(b.date);
        if (dateA < dateB) {
            return 1;
        } else {
            return -1;
        }
    });
}

export async function getAllPostIds() {
    const fileNames = util.promisify(fs.readdir)(postsDirectory);
    return (await fileNames).map((fileName:any) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    });
}

async function renderWithReact(mdxCode:string): Promise<MDXRemoteSerializeResult> {
    return await serialize(mdxCode);
}

export async function getPostData(id: string) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = util.promisify(fs.readFile)(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(await fileContents);

    // Use mdx to convert markdown into HTML string
    const content: MDXRemoteSerializeResult = await serialize((await matterResult).content);

    return {
        id,
        content,
        ...(matterResult.data as { title: string }),
        date: matterResult.data.date?.toString(),
    }
}