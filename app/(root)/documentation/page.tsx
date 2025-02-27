import React from "react";
import "./styles.css";

export default function Documentation() {
  return (
    <div className="bg-white font-sans leading-normal tracking-normal max-screen-wrapper mt-[60px] scroll-smooth font-poppins dark:bg-gray-800">
      <header className="hidden md:block text-black pt-8 fixed left-0 w-[250px] pl-2">
        <div className="container mx-auto">
          <h1 className="text-[20px] font-bold dark:text-white">
            Note App Documentation
          </h1>
        </div>
        <div className="container mt-5 gap-2 flex flex-col">
          <p className="text-[15px] text-gray-700 dark:text-gray-400">
            <a
              href="#headings"
              className="hover:text-blue-400 transition-colors duration-300"
            >
              Headings
            </a>
          </p>
          <p className="text-[15px] text-gray-700 dark:text-gray-400">
            <a
              href="#bold"
              className="hover:text-blue-400 transition-colors duration-300"
            >
              Bold
            </a>
          </p>
          <p className="text-[15px] text-gray-700 dark:text-gray-400">
            <a
              href="#italics"
              className="hover:text-blue-400 transition-colors duration-300"
            >
              Italics
            </a>
          </p>
          <p className="text-[15px] text-gray-700 dark:text-gray-400">
            <a
              href="#underline"
              className="hover:text-blue-400 transition-colors duration-300"
            >
              Underline
            </a>
          </p>
          <p className="text-[15px] text-gray-700 dark:text-gray-400">
            <a
              href="#bullet"
              className="hover:text-blue-400 transition-colors duration-300"
            >
              Bullet List
            </a>
          </p>
          <p className="text-[15px] text-gray-700 dark:text-gray-400">
            <a
              href="#numbered"
              className="hover:text-blue-400 transition-colors duration-300"
            >
              Numbered List
            </a>
          </p>
          <p className="text-[15px] text-gray-700 dark:text-gray-400">
            <a
              href="#quote"
              className="hover:text-blue-400 transition-colors duration-300"
            >
              Block Quote
            </a>
          </p>
          <p className="text-[15px] text-gray-700 dark:text-gray-400">
            <a
              href="#code"
              className="hover:text-blue-400 transition-colors duration-300"
            >
              Inline Code
            </a>
          </p>
        </div>
      </header>

      <main className="w-full px-1 md:px-8 py-8 md:ml-[250px] md:border-l-[1px] border-gray-200 dark:border-gray-900/50">
        <section>
          <h2 className="text-3xl font-bold mb-4">Formatting Options</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-400">
            Enhance your notes with the following formatting options:
          </p>
          <section id="text-formatting" className="mt-[50px]">
            <h2 className="text-2xl font-bold mb-4">Text Formatting</h2>

            <div
              className="bg-gray-100/30 dark:bg-gray-600/30 rounded-lg p-6 mb-6 scroll-mt-24"
              style={{ boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)" }}
              id="headings"
            >
              {" "}
              <h3 className="text-xl font-semibold mb-3">Headings</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-3 text-[14px]">
                Use{" "}
                <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded text-[14px]">
                  #
                </code>{" "}
                characters followed by a space to create headings. The number of{" "}
                <code>#</code> characters determines the heading level:
              </p>
              <ul className="list-disc list-inside mb-4 dark:text-gray-400 text-[14px]">
                <li>
                  <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">
                    #
                  </code>{" "}
                  creates a level 1 heading
                </li>
                <li>
                  <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">
                    ##
                  </code>{" "}
                  creates a level 2 heading
                </li>
                <li>
                  <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">
                    ###
                  </code>{" "}
                  creates a level 3 heading
                </li>
                <li>...and so on up to 6 levels.</li>
              </ul>
              <p className="text-gray-800 dark:text-gray-400 mb-1 text-[15px]">
                Example:
              </p>
              <pre className="bg-gray-100 dark:bg-gray-800 text-[14px] py-4 p-3 rounded text-gray-800 dark:text-gray-400 break-words w-full h-auto ">
                # Heading 1 <br />
                ## Heading 2 <br />
                ### Heading 3 <br />
                #### Heading 4 <br />
                ##### Heading 5 <br />
                ###### Heading 6
              </pre>
            </div>

            <div
              className="bg-gray-100/30 dark:bg-gray-600/30 rounded-lg p-6 mb-6 scroll-mt-24 text-[14px]"
              style={{ boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)" }}
              id="bold"
            >
              <h3 className="text-xl font-semibold mb-3">Bold</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-2">
                Wrap your text with{" "}
                <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">
                  **
                </code>{" "}
                or press <strong>ctrl + b</strong>
              </p>
              <p className="text-gray-800 dark:text-gray-400 mb-2">Example:</p>
              <pre className="bg-gray-100 dark:bg-gray-800 py-4 p-3 rounded text-gray-800 dark:text-gray-400">
                **This is bold text**
              </pre>
            </div>

            <div
              className="bg-gray-100/30 dark:bg-gray-600/30 rounded-lg p-6 mb-6 scroll-mt-24 text-[14px]"
              style={{ boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)" }}
              id="italics"
            >
              <h3 className="text-xl font-semibold mb-3">Italics</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-2">
                Wrap your text with{" "}
                <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">
                  *
                </code>{" "}
                or press <strong>ctrl + i</strong>
              </p>
              <p className="text-gray-800 dark:text-gray-400 mb-2">Example:</p>

              <pre className="bg-gray-100 dark:bg-gray-800 py-4 p-3 rounded text-gray-800 dark:text-gray-400">
                *This is italicized text*
              </pre>
            </div>

            <div
              className="bg-gray-100/30 dark:bg-gray-600/30 rounded-lg p-6 mb-6 scroll-mt-24 text-[14px]"
              style={{ boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)" }}
              id="underline"
            >
              <h3 className="text-xl font-semibold mb-3">Underline</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-2">
                Use{" "}
                <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">
                  Ctrl + U
                </code>{" "}
                to underline text.
              </p>
              <p className="text-gray-800 dark:text-gray-400 mb-2">Example:</p>
              <pre className="bg-gray-100 dark:bg-gray-800 py-4 p-3 rounded text-gray-800 dark:text-gray-400">
                <u>This text is underlined</u>
              </pre>
            </div>
          </section>

          <section id="lists" className="mt-[50px]">
            <h2 className="text-3xl font-bold mb-4">Lists</h2>
            <div
              className="bg-gray-100/30 dark:bg-gray-600/30 rounded-lg p-6 mb-6 scroll-mt-24 text-[14px]"
              style={{ boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)" }}
              id="bullet"
            >
              <h3 className="text-xl font-semibold mb-3">Bullet List</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-2">
                Use a hyphen{" "}
                <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">
                  -
                </code>{" "}
                followed by a space.
              </p>
              <p className="text-gray-800 dark:text-gray-400 mb-2">Example:</p>
              <pre className="bg-gray-100 dark:bg-gray-800 py-4 p-3 rounded text-gray-800 dark:text-gray-400">
                - Item 1
              </pre>
            </div>

            <div
              className="bg-gray-100/30 dark:bg-gray-600/30 rounded-lg p-6 mb-6 scroll-mt-24 text-[14px]"
              style={{ boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)" }}
              id="numbered"
            >
              <h3 className="text-xl font-semibold mb-3">Numbered List</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-2">
                Use numbers followed by a period{" "}
                <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">
                  1.
                </code>
              </p>
              <p className="text-gray-800 dark:text-gray-400 mb-2">Example:</p>
              <pre className="bg-gray-100 dark:bg-gray-800 py-4 p-3 rounded text-gray-800 dark:text-gray-400">
                1. Step one <br />
                2. Step two <br />
                3. Step three
              </pre>
            </div>
          </section>

          <section id="lists" className="mt-[50px]">
            <h2 className="text-3xl font-bold mb-4">Quote and Code</h2>
            <div
              className="bg-gray-100/30 dark:bg-gray-600/30 rounded-lg p-6 mb-6 scroll-mt-24 text-[14px]"
              style={{ boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)" }}
              id="quote"
            >
              <h3 className="text-xl font-semibold mb-3">Block Quote</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-2 text-[14px]">
                Start your text with{" "}
                <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">
                  &gt;
                </code>{" "}
                to create a block quote.
              </p>
              <p className="text-gray-800 dark:text-gray-400 mb-2">Example:</p>
              <pre className="bg-gray-100 dark:bg-gray-800 py-4 p-3 rounded text-gray-800 dark:text-gray-400">
                &gt; This is a block quote.
              </pre>
            </div>

            <div
              className="bg-gray-100/30 dark:bg-gray-600/30 rounded-lg p-6 mb-6 scroll-mt-24 text-[14px]"
              style={{ boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)" }}
              id="code"
            >
              <h3 className="text-xl font-semibold mb-3">Inline Code</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-2">
                Wrap your text with{" "}
                <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">
                  `
                </code>{" "}
                to create inline code.
              </p>
              <p className="text-gray-800 dark:text-gray-400 mb-2">Example:</p>
              <pre className="bg-gray-100 dark:bg-gray-800 py-4 p-3 rounded text-gray-800 dark:text-gray-400">
                `This is inline code`
              </pre>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
