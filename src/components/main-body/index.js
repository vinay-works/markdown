import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-toastify";

const Indexpage = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [docsId, setDocsId] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isConverting, setIsConverting] = useState(false); // New state to track conversion

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

    setIsSubmitted(true); // Set isSubmitted to true when the form is submitted
    setIsConverting(true); // Start conversion process
    setLoading(true); // Set loading to true before starting the conversion
    convertToMarkdown(docsId); // Pass setLoading as an argument
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown);
    toast.success("Markdown copied to clipboard!");
  };

  const convertToMarkdown = async (docsId) => {
    try {
      const response = await axios.get(`/api/markdown-backend?docsId=${docsId}`);
      console.log(response.data.markdown);
      setMarkdown(response.data.markdown);
      toast.success("Conversion successful!");
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message);
      toast.error("Conversion failed. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after the conversion is complete
      setIsConverting(false); // Stop conversion process
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
          {isSubmitted? (
            isConverting? (
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
              {loading? (
                <div className="flex items-center">
                </div>
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
              <div>
                <h3 className="text-center text-black font-bold text-xl">
                  Converted Markdown
                </h3>
                
              </div>
              <div className="flex justify-end items-center mb-4">
                <button
                  onClick={copyToClipboard}
                  className="flex justify-center items-center gap-2 bg-blue-600 text-white p-2 rounded hover:bg-purple-500 focus:outline-none ml-2"
                >
                    Copy
                
                  <FaCopy />
                </button>
              </div>
              <textarea
                value={markdown}
                readOnly
                className="w-full h-64 p-2 bg-white text-black"
              />
            </div>
          </>
        )}
      </div>
      <div className=" h-30  rounded-lg text-black flex flex-col justify-center items-center mt-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 md:px-8 lg:px-16 xl:px-32">
          <div class="p-8 border border-gray-200 rounded-lg">
            <div class="bg-yellow-100 rounded-full w-16 h-16 flex justify-center items-center text-orange-500  mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-11 h-11 hover:animate-pulse"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <h2 class="uppercase mt-6 text-black font-medium text-center mb-3">
              Easy Image Downloads
            </h2>
            <p class="font-light text-sm text-gray-500 mb-3 text-center">
              Download individual images or the entire collection with ease.
            </p>
          </div>

          <div class="p-8 border border-gray-200 rounded-lg">
            <div class="bg-green-100 rounded-full w-16 h-16 flex justify-center items-center text-green-500  mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-11 h-11 hover:animate-pulse"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <h2 class="uppercase mt-6 text-black font-medium text-center mb-3">
              Privacy Assured
            </h2>
            <p class="font-light text-sm text-gray-500 mb-3 text-center">
              Your data remains secure; we only require the Google Docs URL for
              extraction.
            </p>
          </div>

          <div class="p-8 border border-gray-200 rounded-lg">
            <div class="bg-indigo-100 rounded-full w-16 h-16 flex justify-center items-center text-indigo-500  mx-auto ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-11 h-11 hover:animate-pulse"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <h2 class="uppercase mt-6 text-black font-medium text-center mb-3">
              Faster Workflow
            </h2>
            <p class="font-light text-sm text-gray-500 mb-3 text-center">
              Install our Google Workspace extension for seamless image
              downloads.
            </p>
            <div class="flex justify-center">
              <a
                href="#"
                class="bg-indigo-400 text-white px-3 py-1 rounded-md  focus:outline-none  inline-block "
              >
                Coming Soon
              </a>
            </div>
          </div>
        </div>
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
