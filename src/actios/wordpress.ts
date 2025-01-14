"use server";
import WPAPI from "wpapi";
import { parseDocument } from "htmlparser2";
import { db } from "@/lib/db";

interface ContentItem {
  paragraph?: { text: string; format: string; type: string }[];
  list?: {
    type: string;
    items: { text: string; format: string; type: string }[];
  };
  image?: { src: string; alt: string };
}
var wp = new WPAPI({ endpoint: "https://amtsilatipusat.net//wp-json" });

const getImageUrlAround700 = (data: any) => {
  const urlArray = [];
  const widthRange = 700;

  for (const key in data.sizes) {
    const size = data.sizes[key];
    if (size.width >= widthRange - 200 && size.width <= widthRange + 200) {
      urlArray.push(size.source_url);
    }
  }

  return urlArray;
};

const isArabic = (text: string): boolean => {
  const arabicPattern =
    /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  return arabicPattern.test(text);
};

function cleanText(input: string): string {
  // Menghapus tag HTML menggunakan regex
  const textWithoutHtml = input.replace(/<\/?[^>]+(>|$)/g, "");

  // Mengubah karakter HTML entities ke karakter asli
  const textWithEntitiesDecoded = textWithoutHtml
    .replace(/&#8211;/g, "–")
    .replace(/&nbsp;/g, " ")
    .replace(/&hellip;/g, "...")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#39;/g, "'");

  return textWithEntitiesDecoded.trim();
}

const convertContentToJson = (htmlContent: String): ContentItem[] => {
  // @ts-ignore
  const document = parseDocument(htmlContent);

  const content: ContentItem[] = [];

  let currentParagraph: { text: string; format: string; type: string }[] = [];

  // Traverse the HTML tree
  document.children.forEach((node) => {
    if (node.type === "tag") {
      // Handle paragraph nodes
      if (node.name === "p") {
        currentParagraph = [];
        node.children.forEach((child) => {
          if (child.type === "text") {
            const text = child.data.trim();
            if (text) {
              const type = isArabic(text) ? "arabic" : "text"; // Detect type (arabic or text)
              currentParagraph.push({ text, format: "normal", type });
            }
          }
          if (child.type === "tag" && child.name === "strong") {
            // @ts-ignore
            const text = child.children[0].data.trim();
            if (text) {
              const type = isArabic(text) ? "arabic" : "text";
              currentParagraph.push({ text, format: "bold", type });
            }
          }
        });
        if (currentParagraph.length > 0) {
          content.push({ paragraph: currentParagraph });
        }
      }

      // Handle list items
      if (node.name === "ul" || node.name === "ol") {
        const listItems = node.children
          .map((li) => {
            if (
              li.type === "tag" &&
              li.name === "li" &&
              li.children[0].type === "text"
            ) {
              const text = li.children[0].data.trim();
              if (text) {
                const type = isArabic(text) ? "arabic" : "text";
                return { text, format: "normal", type };
              }
            }
            return null;
          })
          .filter(Boolean);

        if (listItems.length > 0) {
          content.push({
            list: {
              type: node.name === "ul" ? "unordered" : "ordered",
              // @ts-ignore
              items: listItems,
            },
          });
        }
      }

      // Handle images
      if (node.name === "img") {
        const image = {
          src: node.attribs.src,
          alt: node.attribs.alt || "",
        };
        content.push({ image });
      }
      if (node.name === "figure") {
        node.childNodes.map((child) => {
          const image = {
            // @ts-ignore
            src: child.attribs.src,
            // @ts-ignore
            alt: child.attribs.alt || "",
          };
          content.push({ image });
        });
      }
    }
  });

  return content;
};

export const getPosts = async (id: number) => {
  const article = await wp
    .posts()
    .id(id)
    .embed()
    .get(function (err, data) {
      if (err) {
        console.log(err);
      }
      return data;
    });
  const authorName = article._embedded?.author?.[0]?.name || "Amtsilati";
  const category = article._embedded["wp:term"][0][0].name || "uncategory";
  const featureMedia =
    getImageUrlAround700(
      article._embedded["wp:featuredmedia"][0]["media_details"],
    ) || "uncategory";

  const content = convertContentToJson(article.content.rendered);
  const data = await db.article.create({
    data: {
      wordpressId: article.id,
      title: cleanText(article.title.rendered),
      content: content as any,
      excerpt: cleanText(article.excerpt.rendered) || null,
      slug: article.slug,
      status: article.status,
      type: article.type,
      author: authorName,
      category: category,
      publishedAt: new Date(article.date),
      featuredImage: featureMedia ? featureMedia[0] : null,
    },
  });
  return data;
};
