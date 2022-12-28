interface Props {
    onFileLoad: (fileContents: string) => void;
}

const FileInput: React.FC<Props> = ({ onFileLoad }) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Get the selected file
        let file: File | null;
        const {files} = event.target;
        if (files) {
            file = files[0];

            // Validate the file extension
            if (file.name.endsWith('.dbc')) {
                // Create a FileReader instance
                const fileReader = new FileReader();

                // Set the onload event handler
                fileReader.onload = (event) => {
                    // Get the file contents
                    if (event && event.target) {
                        const fileContents = event.target.result as string;

                        // Call the onFileLoad callback with the file contents
                        onFileLoad(fileContents);
                    }
                };

                // Read the file contents
                fileReader.readAsText(file);
            }
        }
    };

    return (
        <input type="file" accept=".dbc" onChange={handleFileChange} />
    );
};

export default FileInput;