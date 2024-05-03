import * as mammoth from "mammoth";
import axios from "axios";

// For Node.js
import * as html2md from 'html-markdown';



export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const docsId = searchParams.get("docsId");

  const url = `https://docs.google.com/feeds/download/documents/export/Export?id=${docsId}&exportFormat=docx`;
  var result = await axios.get(url, { responseType: "arraybuffer" }).catch((error) => {
      return error.message;
    });

  var buffers = [];

  if (result.data) {
    buffers.push(Buffer.from(result.data));
    var buffer = Buffer.concat(buffers);
    var options = {
      styleMap: [
        "strike => del",
        "p[style-name='Title'] => h1:fresh",
        "p[style-name='Heading 1'] => h1:fresh",
        "p[style-name='Heading 2'] => h2:fresh",
        "p[style-name='Heading 3'] => h3:fresh",
        "p[style-name='Heading 4'] => h4:fresh",
        "p[style-name='Heading 5'] => h5:fresh",
        "p[style-name='Heading 6'] => h6:fresh",
        "u => u",
        "b => b",
      ],
      convertImage: mammoth.images.inline(function (element) {
        return element.read("base64").then(function (imageBuffer) {
          return {
            src: "data:" + element.contentType + ";base64," + imageBuffer,
          };
        });
      }),
    };

    const markdown = await mammoth.convertToHtml(
      { buffer: buffer },
      options
    );
    if (!markdown) {
      return Response.json({ error: true, markdown: null });
    }
    var md1 = html2md.html2mdFromString(markdown.value);
    return Response.json({ error: false, markdown: md1});
  } else {
    return Response.json({ error: true, markdown: null });
  }
}


