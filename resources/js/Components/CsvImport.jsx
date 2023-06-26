import React, { useState } from "react";

import axios from "axios";
import swal from "sweetalert";

function CsvImport() {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("csv_file", file);

        axios
            .post("/import-csv", formData)
            .then((response) => {
                console.log(response.data);
                // Handle success message or further actions
                swal("Good Job!", "CSV imported successfully", "success");
            })
            .catch((error) => {
                console.log(error.response.data);
                swal("Failed!", "CSV imported failed", "error");
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit" className="btn btn-success btn-sm mt-6">
                    Import CSV
                </button>
            </form>
        </div>
    );
}

export default CsvImport;
