import React from "react";

export default function Documentation() {
  return (
    <div className="bg-white font-sans leading-normal tracking-normal max-screen-wrapper mb-[40px]">
      <header className="text-black py-4 border-r-[1px] border-gray-200">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-semibold">Note App Documentation</h1>
        </div>
        <div>
          <p>List</p>
        </div>
      </header>

      <main className="container mx-auto px-8 py-8 max-screen-inner">
        <section>
          <h2 className="text-3xl font-bold mb-4">Formatting Options</h2>
          <p className="mb-4 text-gray-700">
            Enhance your notes with the following formatting options:
          </p>
          <section id="text-formatting" className="mt-[50px]">
            <h2 className="text-2xl font-bold mb-4">Text Formatting</h2>

            <div
              className="bg-gray-100/30 rounded-lg p-6 mb-6"
              style={{ boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)" }}
            >
              {" "}
              <h3 className="text-xl font-semibold mb-3">Headings</h3>
              <p className="text-gray-700 mb-2">
                Use <code className="bg-gray-200 px-1 rounded">#</code>{" "}
                characters followed by a space to create headings. The number of{" "}
                <code>#</code> characters determines the heading level:
              </p>
              <ul className="list-disc list-inside mb-4">
                <li>
                  <code className="bg-gray-200 px-1 rounded">#</code> creates a
                  level 1 heading
                </li>
                <li>
                  <code className="bg-gray-200 px-1 rounded">##</code> creates a
                  level 2 heading
                </li>
                <li>
                  <code className="bg-gray-200 px-1 rounded">###</code> creates
                  a level 3 heading
                </li>
                <li>...and so on up to 6 levels.</li>
              </ul>
              <p className="text-gray-800 italic">Example:</p>
              <pre className="bg-gray-100 p-2 rounded text-gray-800">
                # Heading 1 ## Heading 2 ### Heading 3 #### Heading 4 #####
                Heading 5 ###### Heading 6
              </pre>
            </div>

            <div
              className="bg-gray-100/30 rounded-lg p-6 mb-6"
              style={{ boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)" }}
            >
              <h3 className="text-xl font-semibold mb-3">Bold</h3>
              <p className="text-gray-700 mb-2">
                Wrap your text with{" "}
                <code className="bg-gray-200 px-1 rounded">**</code> or press{" "}
                <strong>ctrl + b</strong>
              </p>
              <p className="text-gray-800 italic">Example:</p>
              <pre className="bg-gray-100 py-4 p-3 rounded text-gray-800">
                **This is bold text**
              </pre>
            </div>

            <div
              className="bg-gray-100/30 rounded-lg p-6 mb-6"
              style={{ boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)" }}
            >
              <h3 className="text-xl font-semibold mb-3">Italics</h3>
              <p className="text-gray-700 mb-2">
                Wrap your text with{" "}
                <code className="bg-gray-200 px-1 rounded">*</code> or press{" "}
                <strong>ctrl + i</strong>
              </p>
              <p className="text-gray-800 italic">Example:</p>
              <pre className="bg-gray-100 py-4 p-3 rounded text-gray-800">
                *This is italicized text*
              </pre>
            </div>
          </section>

          <section id="lists" className="mt-[50px]">
            <h2 className="text-3xl font-bold mb-4">Lists</h2>
            <div
              className="bg-gray-100/30 rounded-lg p-6 mb-6"
              style={{ boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)" }}
            >
              <h3 className="text-xl font-semibold mt-6 mb-3">Bullet List</h3>
              <p className="text-gray-700 mb-2">
                Use a hyphen <code className="bg-gray-200 px-1 rounded">-</code>{" "}
                followed by a space.
              </p>
              <p className="text-gray-800 italic">Example:</p>
              <pre className="bg-gray-100 py-4 p-3 rounded text-gray-800">
                - Item 1
              </pre>
            </div>

            <div
              className="bg-gray-100/30 rounded-lg p-6 mb-6"
              style={{ boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)" }}
            >
              <h3 className="text-xl font-semibold mt-6 mb-3">Numbered List</h3>
              <p className="text-gray-700 mb-2">
                Use numbers followed by a period{" "}
                <code className="bg-gray-200 px-1 rounded">1.</code>
              </p>
              <p className="text-gray-800 italic">Example:</p>
              <pre className="bg-gray-100 py-4 p-3 rounded text-gray-800">
                1. Step one 2. Step two 3. Step three
              </pre>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
