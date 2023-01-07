import React from "react";

interface Props {
    onFileLoad: (fileContents: string) => void;
}

const FileInput: React.FC<Props> = ({ onFileLoad }) => {


    const processFile = (file: File) => {
        // Validate the file extension
        if (file.name.endsWith('.dbc')) {
            // Create a FileReader instance
            const fileReader = new FileReader();

            // Set the onload event handler
            fileReader.onload = (event) => {
                // Get the file contents
                if (event && event.target) {
                    event.preventDefault();
                    console.log(event)
                    const fileContents = event.target.result as string;

                    // Call the onFileLoad callback with the file contents
                    onFileLoad(fileContents);
                }
            };
            // Read the file contents
            fileReader.readAsText(file);
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Get the selected file
        let file: File | null;
        const {files} = event.target;
        if (files) {
            file = files[0];
            processFile(file);
        }
    };

    const handleDropEvent = (event: any) =>{
        event.preventDefault();
        const items = event.dataTransfer.items;
        const file = items[0];
        if (file && file.kind === 'file') {
            const dbcFile = file.getAsFile();
            processFile(dbcFile);
        }
    }
    return (
        <div className="flex items-center justify-center w-full" onDrop={handleDropEvent} onDragOver={(event)=>{event.preventDefault()}}>
            <label htmlFor="dropzone-file"
                   className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor"
                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or
                        drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Upload a DBC file (.dbc)</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange}/>
            </label>
        </div>
);
};

export default FileInput;