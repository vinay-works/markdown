import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { toast } from "react-toastify";

const Indexpage = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [docsId, setDocsId] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isConverting, setIsConverting] = useState(false); 
  const handleInputChange = (event) => {
    const inputUrl = event.target.value;
    setUrl(inputUrl);
    setError("");

    const docsIDPattern = /\/document\/d\/([a-zA-Z0-9-_]+)\//;
    const match = inputUrl.match(docsIDPattern);
    if (match && match[1]) {
      setDocsId(match[1]);
    } else {
      setDocsId("");
      toast.error("Please Provice Public Google Docs Url");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!url.trim()) {
      // toast.error("Please Paste a Google Docs Url.");
      return;
    }
    if (!docsId) {
      toast.error("Please Paste a Google Docs Url.");
      return;
    }

  
    setIsSubmitted(true); 
    setIsConverting(true);
    setLoading(true); 
    convertToMarkdown(docsId); 
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown);
    toast.success("Markdown copied to clipboard!");
  };

  const convertToMarkdown = async (docsId) => {
    
    try {
      const res = await fetch(`/api/markdown-backend?docsId=${docsId}`, {
        method: "GET",
      });

      if (!res.ok) {
        toast.error("Please Paste a valid public Google Docs link.");
        return;
      }
      const data = await res.json();
      
      if (!data.markdown) {
        toast.error("Please Paste a valid public Google Docs link.");
        return;
      }
      // console.log(data.markdown);
      setMarkdown(data.markdown);
      toast.success("Conversion successful!");
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message);
      toast.error("Conversion failed. Please try again.");
    } finally {
      setLoading(false); 
      setIsConverting(false);
    }
  };

  const handleReset = () => {
    setUrl("");
    setDocsId("");
    setMarkdown("");
    setError("");
    setIsSubmitted(false);
    setIsConverting(false);
  };

  return (
    <main className="bg-white flex flex-col min-h-screen pt-16">
      <div className="px-4 pt-8 md:px-8 lg:px-16 xl:px-32 ">
        <div className="mx-auto">
          <div className="flex flex-col p-7 md:flex-row justify-center items-center">
            <h1 className="text-3xl  font-bold text-center text-black mb-4">
              Google Docs to Markdown Converter
            </h1>
          </div>
          <div className="mt-4 ">
            <p className="text-center flex justify-center text-gray-700 mb-8 ">
              Effortlessly convert Google Docs to markdown in just one click!
            </p>
          </div>
          <form
            className="flex flex-col items-center justify-center mb-2 mt-12"
            onSubmit={handleSubmit}
          >
            <input
              type="url"
              placeholder="https://docs.google.com/document/d/xxxxxxxxx_xxxxxxxx/edit"
              className="text-black max-w-lg w-full px-4 py-2 hover:border-black border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mb-2 placeholder-gray-500 placeholder-opacity-100"
              value={url}
              onChange={handleInputChange}
            />
            <div className="text-xs text-center text-gray-700 mb-4 ">
              Paste a Google Docs link with access level: Anyone on the internet
              with the link can view.
            </div>
            <div className="flex justify-center">
              {isSubmitted ? (
                isConverting ? (
                  <div className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-purple-500 focus:outline-none focus:bg-blue-700">
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="#1C64F2"
                      />
                    </svg>
                    Processing...
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-purple-500 focus:outline-none focus:bg-blue-700"
                  >
                    Reset
                  </button>
                )
              ) : (
                <button
                  type="submit"
                  className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-purple-500 focus:outline-none focus:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center"></div>
                  ) : (
                    "Convert To Markdown"
                  )}
                  {!loading && <FaArrowRightLong className="ml-2" />}
                </button>
              )}
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
          </form>
        </div>
      </div>

      <div className="bg-white px-4 md:px-8 lg:px-16 xl:px-32 mt-10 w-full">
        {markdown && (
          <>
            <div className=" p-4 rounded border-dashed border border-gray-500 ">
              <div className="flex justify-end items-center mb-4">
                <button
                  onClick={copyToClipboard}
                  className="flex justify-center items-center gap-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ml-2"
                >
                  Copy
                  <FaCopy />
                </button>
              </div>
              <textarea
                value={markdown}
                readOnly
                className="overflow-x-hidden w-full h-64 p-2 bg-white text-black"
              />
            </div>
          </>
        )}
      </div>


     
      {/* last section */}
      <div className="pb-8 mt-12">
        <div className="text-black font-bold text-lg flex flex-col lg:flex-row justify-center items-center mt-8">
          <h2>🤔 Questions or suggestions?</h2>
          <h2 className="lg:ml-1">Contact Us</h2>
        </div>
        <div className="hidden lg:flex justify-center mt-2">
          <p className="text-black">Found a bug or need more features?</p>
          <div className="text-blue-500 hover:text-blue-700 flex gap-2 items-center ml-2">
            <p className="text-black">Contact us on</p>
            <a href="mailto:hey@typeflo.io">hey@typeflo.io</a>
          </div>
        </div>
        <div className="lg:hidden mt-2">
          <div className="text-black flex flex-col items-center justify-center">
            <p className="text-center">Found a bug or need more features?</p>
            <div className="text-blue-500 hover:text-blue-700 flex gap-2 items-center">
              <p className="text-black">Contact us on</p>
              <a href="mailto:hey@typeflo.io">hey@typeflo.io</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Indexpage;
